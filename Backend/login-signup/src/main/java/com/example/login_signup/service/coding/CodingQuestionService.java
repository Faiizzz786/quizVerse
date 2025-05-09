package com.example.login_signup.service.coding;

import com.example.login_signup.dto.coding.CodingQuestionDto;
import com.example.login_signup.model.coding.CodingQuestion;
import com.example.login_signup.repository.coding.CodingQuestionRepository;
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
import java.util.List;
import java.util.Random;

@Service
public class CodingQuestionService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final CodingQuestionRepository questionRepository;
    private final Random random = new Random();

    public CodingQuestionService(CodingQuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
        this.restTemplate = new RestTemplate();
    }

    public CodingQuestionDto generateCodingQuestion(String difficulty, String category) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Construct the prompt for Gemini
            String prompt = String.format(
                    "Generate a LeetCode-style coding question with the following details. " +
                            "Return ONLY valid JSON in the following format, no additional text:\n" +
                            "{\n" +
                            "  \"title\": \"Question title\",\n" +
                            "  \"description\": \"Detailed problem description\",\n" +
                            "  \"difficulty\": \"%s\",\n" +
                            "  \"category\": \"%s\",\n" +
                            "  \"examples\": [\n" +
                            "    {\n" +
                            "      \"input\": \"Example input\",\n" +
                            "      \"output\": \"Expected output\",\n" +
                            "      \"explanation\": \"Step by step explanation\"\n" +
                            "    }\n" +
                            "  ],\n" +
                            "  \"constraints\": [\"constraint1\", \"constraint2\"],\n" +
                            "  \"testCases\": [\n" +
                            "    {\n" +
                            "      \"input\": \"Test input\",\n" +
                            "      \"output\": \"Expected output\"\n" +
                            "    }\n" +
                            "  ],\n" +
                            "  \"templateSolutions\": {\n" +
                            "    \"python\": \"Python solution template\",\n" +
                            "    \"java\": \"Java solution template\",\n" +
                            "    \"javascript\": \"JavaScript solution template\"\n" +
                            "  },\n" +
                            "  \"solutionExplanation\": \"Explanation of the approach\",\n" +
                            "  \"timeComplexity\": \"Time complexity analysis\",\n" +
                            "  \"spaceComplexity\": \"Space complexity analysis\"\n" +
                            "}\n",
                    difficulty, category
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

            String url = geminiApiUrl + "?key=" + apiKey;
            HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                // Parse Gemini response
                JSONObject jsonResponse = new JSONObject(response.getBody());
                JSONArray candidates = jsonResponse.getJSONArray("candidates");
                if (!candidates.isEmpty()) {
                    JSONObject candidate = candidates.getJSONObject(0);
                    JSONObject candidateContent = candidate.getJSONObject("content");
                    JSONArray contentParts = candidateContent.getJSONArray("parts");
                    if (!contentParts.isEmpty()) {
                        String text = contentParts.getJSONObject(0).getString("text");

                        // Clean up the JSON if needed
                        if (text.startsWith("```json")) {
                            text = text.substring(7);
                        }
                        if (text.endsWith("```")) {
                            text = text.substring(0, text.length() - 3);
                        }
                        text = text.trim();

                        // Parse the JSON response
                        JSONObject questionJson = new JSONObject(text);

                        // Create and save the coding question
                        CodingQuestion question = new CodingQuestion();
                        question.setTitle(questionJson.getString("title"));
                        question.setDescription(questionJson.getString("description"));
                        question.setDifficulty(questionJson.getString("difficulty"));
                        question.setCategory(questionJson.getString("category"));

                        // Parse examples
                        List<CodingQuestion.Example> examples = new ArrayList<>();
                        JSONArray examplesJson = questionJson.getJSONArray("examples");
                        for (int i = 0; i < examplesJson.length(); i++) {
                            JSONObject exampleJson = examplesJson.getJSONObject(i);
                            CodingQuestion.Example example = new CodingQuestion.Example(
                                    exampleJson.getString("input"),
                                    exampleJson.getString("output"),
                                    exampleJson.getString("explanation")
                            );
                            examples.add(example);
                        }
                        question.setExamples(examples);

                        // Parse constraints
                        List<String> constraints = new ArrayList<>();
                        JSONArray constraintsJson = questionJson.getJSONArray("constraints");
                        for (int i = 0; i < constraintsJson.length(); i++) {
                            constraints.add(constraintsJson.getString(i));
                        }
                        question.setConstraints(constraints);

                        // Parse test cases
                        List<CodingQuestion.TestCase> testCases = new ArrayList<>();
                        JSONArray testCasesJson = questionJson.getJSONArray("testCases");
                        for (int i = 0; i < testCasesJson.length(); i++) {
                            JSONObject testCaseJson = testCasesJson.getJSONObject(i);
                            CodingQuestion.TestCase testCase = new CodingQuestion.TestCase(
                                    testCaseJson.getString("input"),
                                    testCaseJson.getString("output")
                            );
                            testCases.add(testCase);
                        }
                        question.setTestCases(testCases);

                        // Parse template solutions
                        JSONObject templateSolutionsJson = questionJson.getJSONObject("templateSolutions");
                        question.setPythonTemplate(templateSolutionsJson.getString("python"));
                        question.setJavaTemplate(templateSolutionsJson.getString("java"));
                        question.setJavascriptTemplate(templateSolutionsJson.getString("javascript"));

                        question.setSolutionExplanation(questionJson.getString("solutionExplanation"));
                        question.setTimeComplexity(questionJson.getString("timeComplexity"));
                        question.setSpaceComplexity(questionJson.getString("spaceComplexity"));

                        // Save the question to the database
                        questionRepository.save(question);

                        // Convert to DTO and return
                        return convertToDto(question);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        // If generation fails, return a random question from the database (fallback)
        return getRandomQuestion(difficulty, category);
    }

    public CodingQuestionDto getRandomQuestion(String difficulty, String category) {
        List<CodingQuestion> questions;

        if (difficulty != null && category != null) {
            questions = questionRepository.findByDifficultyAndCategory(difficulty, category);
        } else if (difficulty != null) {
            questions = questionRepository.findByDifficulty(difficulty);
        } else if (category != null) {
            questions = questionRepository.findByCategory(category);
        } else {
            questions = questionRepository.findAll();
        }

        if (questions.isEmpty()) {
            return null;
        }

        CodingQuestion randomQuestion = questions.get(random.nextInt(questions.size()));
        return convertToDto(randomQuestion);
    }

    private CodingQuestionDto convertToDto(CodingQuestion question) {
        // Implement conversion from entity to DTO
        CodingQuestionDto dto = new CodingQuestionDto();
        dto.setId(question.getId());
        dto.setTitle(question.getTitle());
        dto.setDescription(question.getDescription());
        dto.setDifficulty(question.getDifficulty());
        dto.setCategory(question.getCategory());
        dto.setExamples(question.getExamples());
        dto.setConstraints(question.getConstraints());
        // Don't include test cases and solution in the DTO to prevent cheating
        dto.setTemplates(new CodingQuestionDto.Templates(
                question.getPythonTemplate(),
                question.getJavaTemplate(),
                question.getJavascriptTemplate()
        ));
        return dto;
    }
}
