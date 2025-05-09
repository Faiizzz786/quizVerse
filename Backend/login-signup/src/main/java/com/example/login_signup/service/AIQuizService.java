package com.example.login_signup.service;

import com.example.login_signup.model.Question;
import com.example.login_signup.model.Quiz;
import com.example.login_signup.repository.QuestionRepository;
import com.example.login_signup.repository.QuizRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AIQuizService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    public Quiz generateAndSaveQuiz(String paragraph, String category, int numQ, String title) {
        try {
            // Step 1: Generate questions using Gemini
            JsonNode generatedQuizData = generateQuestionsWithGemini(paragraph, category, numQ, title);

            // Step 2: Create and save questions
            List<Question> savedQuestions = saveGeneratedQuestions(generatedQuizData, category);

            // Step 3: Create and save quiz
            Quiz quiz = new Quiz();
            quiz.setTitle(title);
            quiz.setQuestions(savedQuestions);

            // Step 4: Save quiz to database
            return quizRepository.save(quiz);

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate quiz: " + e.getMessage(), e);
        }
    }


    private List<Question> saveGeneratedQuestions(JsonNode generatedQuizData, String category) {
        List<Question> savedQuestions = new ArrayList<>();
        JsonNode questionsNode = generatedQuizData.get("questions");

        if (questionsNode != null && questionsNode.isArray()) {
            for (JsonNode questionNode : questionsNode) {
                Question question = new Question();

                question.setQuestionTitle(questionNode.get("question").asText());
                question.setCategory(category);
                question.setDifficultyLevel("Medium");

                JsonNode options = questionNode.get("options");
                if (options != null && options.size() == 4) {
                    question.setOption1(options.get(0).asText());
                    question.setOption2(options.get(1).asText());
                    question.setOption3(options.get(2).asText());
                    question.setOption4(options.get(3).asText());
                }

                question.setRightAnswer(questionNode.get("answer").asText());

                Question savedQuestion = questionRepository.save(question);
                savedQuestions.add(savedQuestion);
            }
        }

        return savedQuestions;
    }





//    private JsonNode generateQuestionsWithGemini(String paragraph, String category, int numQ, String title) throws Exception {
//        // Set up API request
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        // Create request body
//        Map<String, Object> requestBody = new HashMap<>();
//        List<Map<String, Object>> contents = new ArrayList<>();
//
//        // Prepare the content based on the paragraph and the requested number of questions
//        Map<String, Object> content = new HashMap<>();
//        List<Map<String, String>> parts = new ArrayList<>();
//        Map<String, String> part = new HashMap<>();
//        part.put("text", String.format(
//                "Create %d multiple-choice questions based on this paragraph:\n\n\"%s\"\n\n" +
//                        "Make sure the questions are related to the content and have 4 options.",
//                numQ, paragraph));
//        parts.add(part);
//
//        content.put("parts", parts);
//        contents.add(content);
//
//        requestBody.put("contents", contents);
//
//        // Create HTTP entity
//        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
//
//        // Send request to Gemini API
//        ResponseEntity<Map> response = restTemplate.exchange(
//                String.format("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=%s", apiKey),
//                HttpMethod.POST,
//                entity,
//                Map.class
//        );
//
//        // Process response
//        Map<String, Object> responseBody = response.getBody();
//        List<Map<String, Object>> responseContents = (List<Map<String, Object>>) responseBody.get("contents");
//        String generatedContent = (String) responseContents.get(0).get("text");
//
//        // Parse and return the generated questions
//        return objectMapper.readTree(generatedContent);
//    }

    private JsonNode generateQuestionsWithGemini(String paragraph, String category, int numQ, String title) throws Exception {
        // Set up API request
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create request body
        Map<String, Object> requestBody = new HashMap<>();
        List<Map<String, Object>> contents = new ArrayList<>();

        // Prepare the content based on the paragraph and the requested number of questions
        Map<String, Object> content = new HashMap<>();
        List<Map<String, String>> parts = new ArrayList<>();
        Map<String, String> part = new HashMap<>();
        part.put("text", String.format(
                "Generate %d multiple-choice questions based on the following paragraph:\n\n\"%s\"\n\n" +
                        "Return ONLY a valid **JSON array** of questions in the following format:\n" +
                        "[{\"question\": \"Question text\", \"options\": [\"Option1\", \"Option2\", \"Option3\", \"Option4\"], \"answer\": \"Correct Option\"}].\n" +
                        "Do not include any extra text or explanations. The response should be purely the JSON array.",
                numQ, paragraph));


        parts.add(part);

        content.put("parts", parts);
        contents.add(content);

        requestBody.put("contents", contents);

        // Create HTTP entity
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // Send request to Gemini API
        ResponseEntity<Map> response = restTemplate.exchange(
                String.format("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=%s", apiKey),
                HttpMethod.POST,
                entity,
                Map.class
        );

        // Process response
        Map<String, Object> responseBody = response.getBody();

        // Debugging: Log the response
        System.out.println("API response body: " + responseBody);

        // Check if responseBody contains the 'candidates' field
        if (responseBody != null && responseBody.containsKey("candidates")) {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                // Extract the generated content from the first candidate
                Map<String, Object> candidate = candidates.get(0);
                Map<String, Object> candidateContent = (Map<String, Object>) candidate.get("content");
                List<Map<String, Object>> candidateParts = (List<Map<String, Object>>) candidateContent.get("parts");

                if (candidateParts != null && !candidateParts.isEmpty()) {
                    // Extract the text (questions) from the first part
                    String generatedContent = (String) candidateParts.get(0).get("text");

                    // Parse and return the generated questions
//                    ObjectNode responseNode = objectMapper.createObjectNode();
//                    responseNode.put("questions", generatedContent);
//
//                    return responseNode;

                    // Clean the response by removing the backticks
                    String cleanedContent = generatedContent.replace("```json", "").replace("```", "").trim();

                    // Parse the cleaned JSON string
                    ObjectNode responseNode = objectMapper.createObjectNode();
                    JsonNode parsedQuestionsArray = objectMapper.readTree(cleanedContent);
                    responseNode.set("questions", parsedQuestionsArray); // Set parsed questions in the response node

                    return responseNode;
                } else {
                    throw new RuntimeException("No parts found in the candidate content");
                }
            } else {
                throw new RuntimeException("No candidates found in API response");
            }
        } else {
            throw new RuntimeException("API response does not contain expected 'candidates' field");
        }
    }



}
