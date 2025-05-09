package com.example.login_signup.service;

import com.example.login_signup.dto.LearningMaterialsDto;
import com.example.login_signup.model.Question;
import com.example.login_signup.model.Response;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AILearningService {

    @Value("${gemini.api.url:https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent}")
    private String geminiApiUrl;

    @Value("${gemini.api.key:your-gemini-api-key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public AILearningService() {
        this.restTemplate = new RestTemplate();
    }

    public LearningMaterialsDto generateLearningMaterials(List<Question> allQuestions, List<Response> userResponses) {
        List<LearningMaterialsDto.IncorrectQuestionMaterial> materials = new ArrayList<>();

        // Process only incorrect answers
        for (int i = 0; i < userResponses.size() && i < allQuestions.size(); i++) {
            Question question = allQuestions.get(i);
            Response response = userResponses.get(i);

            // Safely handle null responses
            String userResponse = response.getResponse();

            // If userResponse is null or doesn't match correct answer, it's considered incorrect
            if (userResponse == null || !userResponse.equalsIgnoreCase(question.getRightAnswer())) {
                LearningMaterialsDto.IncorrectQuestionMaterial material = generateMaterialForQuestion(
                        question,
                        userResponse != null ? userResponse : "No answer provided"
                );
                materials.add(material);
            }
        }

        return new LearningMaterialsDto(materials);
    }

    private LearningMaterialsDto.IncorrectQuestionMaterial generateMaterialForQuestion(Question question, String userAnswer) {
        LearningMaterialsDto.IncorrectQuestionMaterial material = new LearningMaterialsDto.IncorrectQuestionMaterial();
        material.setQuestionId(question.getId());
        material.setQuestionText(question.getQuestionTitle());
        material.setUserAnswer(userAnswer);
        material.setCorrectAnswer(question.getRightAnswer());

        try {
            // Call Gemini API to generate learning materials
            Map<String, Object> aiResponse = callGeminiAPI(question, userAnswer);

            // Process the AI response
            if (aiResponse != null) {
                // Set flashcard
                String flashcardQuestion = (String) aiResponse.getOrDefault("flashcardQuestion",
                        "Review: " + question.getQuestionTitle());
                String flashcardAnswer = (String) aiResponse.getOrDefault("flashcardAnswer",
                        "The correct answer is: " + question.getRightAnswer());
                material.setFlashcard(new LearningMaterialsDto.Flashcard(flashcardQuestion, flashcardAnswer));

                // Set summary and study guide
                material.setSummary((String) aiResponse.getOrDefault("summary", generateDefaultSummary(question)));
                material.setStudyGuide((List<String>) aiResponse.getOrDefault("studyGuide", generateDefaultStudyGuide(question)));
            } else {
                // Set default values if AI response is null
                setDefaultValues(material, question);
            }
        } catch (Exception e) {
            e.printStackTrace();
            // Handle exceptions by setting default values
            setDefaultValues(material, question);
        }

        return material;
    }

    private Map<String, Object> callGeminiAPI(Question question, String userAnswer) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Construct the prompt for Gemini
            String prompt = String.format(
                    "You are a learning assistant. Based on the following incorrect answer provided by a student during a quiz, " +
                            "generate relevant learning materials. The materials should help the student understand their mistake and improve their knowledge.\n\n" +
                            "Question: %s\n" +
                            "Options:\n1. %s\n2. %s\n3. %s\n4. %s\n" +
                            "User's Answer: %s\n" +
                            "Correct Answer: %s\n" +
                            "Category: %s\n\n" +
                            "Please provide the following in JSON format:\n" +
                            "1. flashcardQuestion: A question for a flashcard to aid memorization\n" +
                            "2. flashcardAnswer: The answer to the flashcard question\n" +
                            "3. summary: A concise explanation of why the correct answer is right and why the user's answer is wrong\n" +
                            "4. studyGuide: A short set of tips to help better understand this concept\n\n" +
                            "Return ONLY the JSON, no additional text.",
                    question.getQuestionTitle(),
                    question.getOption1(),
                    question.getOption2(),
                    question.getOption3(),
                    question.getOption4(),
                    userAnswer,
                    question.getRightAnswer(),
                    question.getCategory()
            );

            // Construct Gemini API request payload
            JSONObject requestBody = new JSONObject();
            JSONArray contents = new JSONArray();
            JSONObject content = new JSONObject();
            JSONArray parts = new JSONArray();
            JSONObject part = new JSONObject();

            part.put("text", prompt);
            parts.put(part);
            content.put("parts", parts);
            contents.put(content);
            requestBody.put("contents", contents);

            // Add query parameters to URL
            String url = geminiApiUrl + "?key=" + apiKey;

            HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);

            // Send the request
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            System.out.println("Gemini API Response Status: " + response.getStatusCode()); // Log status code
            System.out.println("Response Body: " + response.getBody()); // Log response body for debugging


            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                // Parse Gemini response
                JSONObject jsonResponse = new JSONObject(response.getBody());
                JSONArray candidates = jsonResponse.getJSONArray("candidates");
                if (!candidates.isEmpty()) {
                    JSONObject candidate = candidates.getJSONObject(0);
                    JSONObject content1 = candidate.getJSONObject("content");
                    JSONArray parts1 = content1.getJSONArray("parts");
                    if (!parts1.isEmpty()) {
                        String text = parts1.getJSONObject(0).getString("text");
                        // Strip code block formatting like ```json\n ... ```
                        if (text.startsWith("```json")) {
                            text = text.substring(7); // remove the "```json"
                        }
                        if (text.endsWith("```")) {
                            text = text.substring(0, text.length() - 3); // remove the trailing "```"
                        }
                        text = text.trim(); // clean up any extra whitespace

                        // Log cleaned text for debugging
                        System.out.println("Cleaned Gemini JSON Text:\n" + text);
                        // Parse the JSON response
                        JSONObject learningMaterial = new JSONObject(text);
                        Map<String, Object> result = new HashMap<>();
                        result.put("flashcardQuestion", learningMaterial.getString("flashcardQuestion"));
                        result.put("flashcardAnswer", learningMaterial.getString("flashcardAnswer"));
                        result.put("summary", learningMaterial.getString("summary"));

                        // Extract studyGuide as List<String>
                        JSONArray guideArray = learningMaterial.getJSONArray("studyGuide");
                        List<String> guideList = new ArrayList<>();
                        for (int i = 0; i < guideArray.length(); i++) {
                            guideList.add(guideArray.getString(i));
                        }
                        result.put("studyGuide", guideList);

                        // Debug prints
                        System.out.println("Flashcard Question: " + learningMaterial.getString("flashcardQuestion"));
                        System.out.println("Flashcard Answer: " + learningMaterial.getString("flashcardAnswer"));
                        System.out.println("Summary: " + learningMaterial.getString("summary"));
                        System.out.println("Study Guide: " + guideList);

                        System.out.println("Final Result: " + result);
                        return result;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error while calling Gemini API: " + e.getMessage());
        }

        return null;
    }

    private void setDefaultValues(LearningMaterialsDto.IncorrectQuestionMaterial material, Question question) {
        material.setFlashcard(new LearningMaterialsDto.Flashcard(
                "Review: " + question.getQuestionTitle(),
                "The correct answer is: " + question.getRightAnswer()
        ));
        material.setSummary(generateDefaultSummary(question));
        material.setStudyGuide(generateDefaultStudyGuide(question));
    }

    private String generateDefaultSummary(Question question) {
        return "This question is related to the category: " + question.getCategory() + ". " +
                "The correct option is: " + question.getRightAnswer() + ".";
    }

    private List<String> generateDefaultStudyGuide(Question question) {
        List<String> guideList = new ArrayList<>();
        guideList.add("To better understand this topic, focus on reviewing key concepts in " +
                question.getCategory() + ". Try to understand why " + question.getRightAnswer() +
                " is the correct answer by studying related materials.");
        return guideList;
    }
}