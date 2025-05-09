//package com.example.login_signup.service.coding;
//
//import com.example.login_signup.dto.coding.SubmissionDto;
//import com.example.login_signup.dto.coding.SubmissionResultDto;
//import com.example.login_signup.model.coding.CodingQuestion;
//import com.example.login_signup.repository.coding.CodingQuestionRepository;
//import org.json.JSONArray;
//import org.json.JSONObject;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class JudgeService {
//
//    @Value("${judge.api.url}")
//    private String judgeApiUrl;
//
//    @Value("${judge.api.key}")
//    private String judgeApiKey;
//
//    @Value("${gemini.api.url}")
//    private String geminiApiUrl;
//
//    @Value("${gemini.api.key}")
//    private String geminiApiKey;
//
//    private final RestTemplate restTemplate;
//    private final CodingQuestionRepository questionRepository;
//
//    public JudgeService(CodingQuestionRepository questionRepository) {
//        this.questionRepository = questionRepository;
//        this.restTemplate = new RestTemplate();
//    }
//
//    public SubmissionResultDto evaluateSubmission(SubmissionDto submission) {
//        SubmissionResultDto result = new SubmissionResultDto();
//
//        try {
//            // Retrieve the question
//            Optional<CodingQuestion> questionOpt = questionRepository.findById(submission.getQuestionId());
//
//            if (questionOpt.isEmpty()) {
//                result.setSuccess(false);
//                result.setErrorMessage("Question not found");
//                return result;
//            }
//
//            CodingQuestion question = questionOpt.get();
//            List<SubmissionResultDto.TestCaseResult> testCaseResults = new ArrayList<>();
//            boolean allPassed = true;
//
//            // Call Judge API for each test case            Optional<CodingQuestion> questionOpt = questionRepository.findById(submission.getQuestionId());
//            for (CodingQuestion.TestCase testCase : question.getTestCases()) {
//                SubmissionResultDto.TestCaseResult testResult = evaluateTestCase(
//                        submission.getCode(),
//                        submission.getLanguage(),
//                        testCase
//                );
//
//                testCaseResults.add(testResult);
//                if (!testResult.isPassed()) {
//                    allPassed = false;
//                }
//            }
//
//            result.setTestCaseResults(testCaseResults);
//            result.setSuccess(allPassed);
//
//            // If all test cases passed, generate additional information
//            if (allPassed) {
//                // Generate complexity analysis and learning materials
//                enrichSubmissionResult(result, submission, question);
//            } else {
//                // Generate learning materials for incorrect solutions
//                result.setLearningMaterials(generateLearningMaterials(submission, question, false));
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            result.setSuccess(false);
//            result.setErrorMessage("Error evaluating submission: " + e.getMessage());
//        }
//
//        return result;
//    }
//
//    private SubmissionResultDto.TestCaseResult evaluateTestCase(String code, String language, CodingQuestion.TestCase testCase) {
//        SubmissionResultDto.TestCaseResult result = new SubmissionResultDto.TestCaseResult();
//        result.setInput(testCase.getInput());
//        result.setExpectedOutput(testCase.getOutput());
//
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//            headers.set("X-API-KEY", judgeApiKey);
//
//            JSONObject requestBody = new JSONObject();
//            requestBody.put("language_id", getLanguageId(language));
//            requestBody.put("source_code", code);
//            requestBody.put("stdin", testCase.getInput());
//            requestBody.put("expected_output", testCase.getOutput());
//
//            HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);
//            ResponseEntity<String> response = restTemplate.postForEntity(judgeApiUrl + "/submissions", request, String.class);
//
//            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
//                JSONObject jsonResponse = new JSONObject(response.getBody());
//                String token = jsonResponse.getString("token");
//
//                // Poll for results
//                Boolean completed = false;
//                JSONObject submissionResult = null;
//
//                for (int i = 0; i < 10 && !completed; i++) {
//                    Thread.sleep(1000); // Wait for 1 second before polling
//
//                    ResponseEntity<String> resultResponse = restTemplate.getForEntity(
//                            judgeApiUrl + "/submissions/" + token,
//                            String.class
//                    );
//
//                    if (resultResponse.getStatusCode().is2xxSuccessful() && resultResponse.getBody() != null) {
//                        submissionResult = new JSONObject(resultResponse.getBody());
//                        String status = submissionResult.getJSONObject("status").getString("id");
//
//                        if (status.equals("3")) { // Accepted
//                            completed = true;
//                            result.setPassed(true);
//                        } else if (status.equals("4")) { // Wrong Answer
//                            completed = true;
//                            result.setPassed(false);
//                        } else if (Integer.parseInt(status) > 4) { // Error or other status
//                            completed = true;
//                            result.setPassed(false);
//                        }
//                    }
//                }
//
//                if (submissionResult != null) {
//                    result.setActualOutput(submissionResult.optString("stdout", ""));
//                    result.setExecutionTime(submissionResult.optString("time", "0") + " sec");
//                    result.setMemoryUsed(submissionResult.optString("memory", "0") + " KB");
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            result.setPassed(false);
//            result.setActualOutput("Error: " + e.getMessage());
//        }
//
//        return result;
//    }
//
//    private int getLanguageId(String language) {
//        // Map language name to Judge API language ID
//        return switch (language.toLowerCase()) {
//            case "java" -> 62;  // Java (OpenJDK 13.0.1)
//            case "python" -> 71; // Python (3.8.1)
//            case "javascript" -> 63; // JavaScript (Node.js 12.14.0)
//            case "c++" -> 54;  // C++ (GCC 9.2.0)
//            default -> 71; // Default to Python
//        };
//    }
//
//    private void enrichSubmissionResult(SubmissionResultDto result, SubmissionDto submission, CodingQuestion question) {
//        // Set predefined complexity from question
//        result.setTimeComplexity(question.getTimeComplexity());
//        result.setSpaceComplexity(question.getSpaceComplexity());
//
//        // Generate optimized code using Gemini
//        result.setOptimizedCode(generateOptimizedCode(submission, question));
//
//        // Generate learning materials
//        result.setLearningMaterials(generateLearningMaterials(submission, question, true));
//    }
//
//    private String generateOptimizedCode(SubmissionDto submission, CodingQuestion question) {
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//
//            String prompt = String.format(
//                    "You are a code optimization expert. Given the following code that solves a LeetCode-style problem, " +
//                            "please optimize it for better time and space complexity if possible. " +
//                            "If it's already optimal, explain why.\n\n" +
//                            "Problem Description:\n%s\n\n" +
//                            "Original %s Solution:\n```\n%s\n```\n\n" +
//                            "Please provide an optimized version of this code with the same language. " +
//                            "Include ONLY the optimized code, no explanations.",
//                    question.getDescription(),
//                    submission.getLanguage(),
//                    submission.getCode()
//            );
//
//            JSONObject requestBody = new JSONObject();
//            JSONArray contents = new JSONArray();
//            JSONObject content = new JSONObject();
//            JSONArray parts = new JSONArray();
//            JSONObject part = new JSONObject();
//
//            part.put("text", prompt);
//            parts.put(part);
//            content.put("parts", parts);
//            contents.put(content);
//            requestBody.put("contents", contents);
//
//            String url = geminiApiUrl + "?key=" + geminiApiKey;
//            HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);
//
//            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
//
//            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
//                JSONObject jsonResponse = new JSONObject(response.getBody());
//                JSONArray candidates = jsonResponse.getJSONArray("candidates");
//                if (!candidates.isEmpty()) {
//                    JSONObject candidate = candidates.getJSONObject(0);
//                    JSONObject candidateContent = candidate.getJSONObject("content");
//                    JSONArray contentParts = candidateContent.getJSONArray("parts");
//                    if (!contentParts.isEmpty()) {
//                        String text = contentParts.getJSONObject(0).getString("text");
//
//                        // Clean up the code if it's wrapped in code blocks
//                        if (text.startsWith("```")) {
//                            int startIndex = text.indexOf("\n") + 1;
//                            int endIndex = text.lastIndexOf("```");
//                            if (endIndex > startIndex) {
//                                text = text.substring(startIndex, endIndex).trim();
//                            }
//                        }
//
//                        return text;
//                    }
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return "// Optimized code generation failed";
//    }
//
//    private SubmissionResultDto.LearningMaterials generateLearningMaterials(
//            SubmissionDto submission, CodingQuestion question, boolean isCorrect) {
//        SubmissionResultDto.LearningMaterials materials = new SubmissionResultDto.LearningMaterials();
//
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//
//            String prompt = String.format(
//                    "You are a coding tutor. Based on the following %s submission for a LeetCode-style problem, " +
//                            "generate learning materials that will help the user improve their coding skills. " +
//                            "The user's solution is %s.\n\n" +
//                            "Problem Description:\n%s\n\n" +
//                            "User's %s Solution:\n```\n%s\n```\n\n" +
//                            "Please provide the following in JSON format:\n" +
//                            "{\n" +
//                            "  \"conceptExplanation\": \"Explanation of the key concepts needed to solve this problem\",\n" +
//                            "  \"tipsTricks\": [\"tip1\", \"tip2\", \"tip3\"],\n" +
//                            "  \"furtherReadingResources\": \"Suggestions for learning more about these concepts\"\n" +
//                            "}\n\n" +
//                            "Return ONLY the JSON, no additional text.",
//                    submission.getLanguage(),
//                    isCorrect ? "correct" : "incorrect",
//                    question.getDescription(),
//                    submission.getLanguage(),
//                    submission.getCode()
//            );
//
//            JSONObject requestBody = new JSONObject();
//            JSONArray contents = new JSONArray();
//            JSONObject content = new JSONObject();
//            JSONArray parts = new JSONArray();
//            JSONObject part = new JSONObject();
//
//            part.put("text", prompt);
//            parts.put(part);
//            content.put("parts", parts);
//            contents.put(content);
//            requestBody.put("contents", contents);
//
//            String url = geminiApiUrl + "?key=" + geminiApiKey;
//            HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);
//
//            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
//
//            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
//                JSONObject jsonResponse = new JSONObject(response.getBody());
//                JSONArray candidates = jsonResponse.getJSONArray("candidates");
//                if (!candidates.isEmpty()) {
//                    JSONObject candidate = candidates.getJSONObject(0);
//                    JSONObject candidateContent = candidate.getJSONObject("content");
//                    JSONArray contentParts = candidateContent.getJSONArray("parts");
//                    if (!contentParts.isEmpty()) {
//                        String text = contentParts.getJSONObject(0).getString("text");
//
//                        // Clean up JSON formatting
//                        if (text.startsWith("```json")) {
//                            text = text.substring(7);
//                        }
//                        if (text.endsWith("```")) {
//                            text = text.substring(0, text.length() - 3);
//                        }
//                        text = text.trim();
//
//                        JSONObject learningJson = new JSONObject(text);
//                        materials.setConceptExplanation(learningJson.getString("conceptExplanation"));
//
//                        JSONArray tipsArray = learningJson.getJSONArray("tipsTricks");
//                        List<String> tipsList = new ArrayList<>();
//                        for (int i = 0; i < tipsArray.length(); i++) {
//                            tipsList.add(tipsArray.getString(i));
//                        }
//                        materials.setTipsTricks(tipsList);
//
//                        materials.setFurtherReadingResources(learningJson.getString("furtherReadingResources"));
//
//                        return materials;
//                    }
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        // Default values if generation fails
//        materials.setConceptExplanation("Focus on understanding the algorithm and data structure concepts relevant to this problem.");
//        List<String> defaultTips = new ArrayList<>();
//        defaultTips.add("Practice with similar problems to build pattern recognition.");
//        defaultTips.add("Learn to analyze time and space complexity.");
//        defaultTips.add("Practice breaking down problems into smaller steps.");
//        materials.setTipsTricks(defaultTips);
//        materials.setFurtherReadingResources("Check out resources on algorithms and data structures fundamental to this problem type.");
//
//        return materials;
//    }
//}











package com.example.login_signup.service.coding;

import com.example.login_signup.dto.coding.SubmissionDto;
import com.example.login_signup.dto.coding.SubmissionResultDto;
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
import java.util.Optional;

//@Service
//public class JudgeService {
//
//    @Value("${judge.api.url}")
//    private String judgeApiUrl;
//
//    @Value("${judge.api.key}")
//    private String judgeApiKey;
//
//    @Value("${gemini.api.url}")
//    private String geminiApiUrl;
//
//    @Value("${gemini.api.key}")
//    private String geminiApiKey;
//
//    private final RestTemplate restTemplate;
//    private final CodingQuestionRepository questionRepository;
//
//    public JudgeService(CodingQuestionRepository questionRepository) {
//        this.questionRepository = questionRepository;
//        this.restTemplate = new RestTemplate();
//    }
//
//    public SubmissionResultDto evaluateSubmission(SubmissionDto submission) {
//        SubmissionResultDto result = new SubmissionResultDto();
//
//        try {
//            Optional<CodingQuestion> questionOpt = questionRepository.findById(submission.getQuestionId());
//
//            if (questionOpt.isEmpty()) {
//                result.setSuccess(false);
//                result.setErrorMessage("Question not found");
//                return result;
//            }
//
//            CodingQuestion question = questionOpt.get();
//            List<SubmissionResultDto.TestCaseResult> testCaseResults = new ArrayList<>();
//            boolean allPassed = true;
//
//            for (CodingQuestion.TestCase testCase : question.getTestCases()) {
//                SubmissionResultDto.TestCaseResult testResult = evaluateTestCase(
//                        submission.getCode(),
//                        submission.getLanguage(),
//                        testCase
//                );
//
//                testCaseResults.add(testResult);
//                if (!testResult.isPassed()) {
//                    allPassed = false;
//                }
//            }
//
//            result.setTestCaseResults(testCaseResults);
//            result.setSuccess(allPassed);
//
//            if (allPassed) {
//                enrichSubmissionResult(result, submission, question);
//            } else {
//                result.setLearningMaterials(generateLearningMaterials(submission, question, false));
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            result.setSuccess(false);
//            result.setErrorMessage("Error evaluating submission: " + e.getMessage());
//        }
//
//        return result;
//    }
//
//    private SubmissionResultDto.TestCaseResult evaluateTestCase(String code, String language, CodingQuestion.TestCase testCase) {
//        SubmissionResultDto.TestCaseResult result = new SubmissionResultDto.TestCaseResult();
//        result.setInput(testCase.getInput());
//        result.setExpectedOutput(testCase.getOutput());
//
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//            headers.set("X-RapidAPI-Key", judgeApiKey);
//            headers.set("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com");
//
//            JSONObject requestBody = new JSONObject();
//            requestBody.put("language_id", getLanguageId(language));
//            requestBody.put("source_code", code);
//            requestBody.put("stdin", testCase.getInput());
//            requestBody.put("expected_output", testCase.getOutput());
//
//            String submissionUrl = judgeApiUrl + "/submissions?base64_encoded=false&wait=false";
//            HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);
//            ResponseEntity<String> response = restTemplate.postForEntity(submissionUrl, request, String.class);
//
//            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
//                JSONObject jsonResponse = new JSONObject(response.getBody());
//                String token = jsonResponse.getString("token");
//
//                // Poll for results
//                boolean completed = false;
//                JSONObject submissionResult = null;
//
//                for (int i = 0; i < 10 && !completed; i++) {
//                    Thread.sleep(1000); // Wait 1 second before polling
//
//                    String resultUrl = judgeApiUrl + "/submissions/" + token + "?base64_encoded=false";
//                    ResponseEntity<String> resultResponse = restTemplate.getForEntity(resultUrl, String.class);
//
//                    if (resultResponse.getStatusCode().is2xxSuccessful() && resultResponse.getBody() != null) {
//                        submissionResult = new JSONObject(resultResponse.getBody());
//                        String statusId = submissionResult.getJSONObject("status").getString("id");
//
//                        if (statusId.equals("3")) { // Accepted
//                            completed = true;
//                            result.setPassed(true);
//                        } else if (statusId.equals("4")) { // Wrong Answer
//                            completed = true;
//                            result.setPassed(false);
//                        } else if (Integer.parseInt(statusId) > 4) { // Compilation Error or Runtime Error
//                            completed = true;
//                            result.setPassed(false);
//                        }
//                    }
//                }
//
//                if (submissionResult != null) {
//                    result.setActualOutput(submissionResult.optString("stdout", ""));
//                    result.setExecutionTime(submissionResult.optString("time", "0") + " sec");
//                    result.setMemoryUsed(submissionResult.optString("memory", "0") + " KB");
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            result.setPassed(false);
//            result.setActualOutput("Error: " + e.getMessage());
//        }
//
//        return result;
//    }
//
//    private int getLanguageId(String language) {
//        return switch (language.toLowerCase()) {
//            case "java" -> 62;
//            case "python" -> 71;
//            case "javascript" -> 63;
//            case "c++" -> 54;
//            default -> 71;
//        };
//    }
//
//    private void enrichSubmissionResult(SubmissionResultDto result, SubmissionDto submission, CodingQuestion question) {
//        result.setTimeComplexity(question.getTimeComplexity());
//        result.setSpaceComplexity(question.getSpaceComplexity());
//        result.setOptimizedCode(generateOptimizedCode(submission, question));
//        result.setLearningMaterials(generateLearningMaterials(submission, question, true));
//    }
//
//    private String generateOptimizedCode(SubmissionDto submission, CodingQuestion question) {
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//
//            String prompt = String.format(
//                    "You are a code optimization expert. Given the following code that solves a LeetCode-style problem, " +
//                            "please optimize it for better time and space complexity if possible. " +
//                            "If it's already optimal, explain why.\n\n" +
//                            "Problem Description:\n%s\n\n" +
//                            "Original %s Solution:\n```\n%s\n```\n\n" +
//                            "Please provide an optimized version of this code with the same language. " +
//                            "Include ONLY the optimized code, no explanations.",
//                    question.getDescription(),
//                    submission.getLanguage(),
//                    submission.getCode()
//            );
//
//            JSONObject requestBody = new JSONObject();
//            JSONArray contents = new JSONArray();
//            JSONObject content = new JSONObject();
//            JSONArray parts = new JSONArray();
//            JSONObject part = new JSONObject();
//
//            part.put("text", prompt);
//            parts.put(part);
//            content.put("parts", parts);
//            contents.put(content);
//            requestBody.put("contents", contents);
//
//            String url = geminiApiUrl + "?key=" + geminiApiKey;
//            HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);
//
//            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
//
//            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
//                JSONObject jsonResponse = new JSONObject(response.getBody());
//                JSONArray candidates = jsonResponse.getJSONArray("candidates");
//                if (!candidates.isEmpty()) {
//                    JSONObject candidate = candidates.getJSONObject(0);
//                    JSONObject candidateContent = candidate.getJSONObject("content");
//                    JSONArray contentParts = candidateContent.getJSONArray("parts");
//                    if (!contentParts.isEmpty()) {
//                        String text = contentParts.getJSONObject(0).getString("text");
//
//                        if (text.startsWith("```")) {
//                            int startIndex = text.indexOf("\n") + 1;
//                            int endIndex = text.lastIndexOf("```");
//                            if (endIndex > startIndex) {
//                                text = text.substring(startIndex, endIndex).trim();
//                            }
//                        }
//
//                        return text;
//                    }
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return "// Optimized code generation failed";
//    }
//
//    private SubmissionResultDto.LearningMaterials generateLearningMaterials(
//            SubmissionDto submission, CodingQuestion question, boolean isCorrect) {
//        SubmissionResultDto.LearningMaterials materials = new SubmissionResultDto.LearningMaterials();
//
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//
//            String prompt = String.format(
//                    "You are a coding tutor. Based on the following %s submission for a LeetCode-style problem, " +
//                            "generate learning materials that will help the user improve their coding skills. " +
//                            "The user's solution is %s.\n\n" +
//                            "Problem Description:\n%s\n\n" +
//                            "User's %s Solution:\n```\n%s\n```\n\n" +
//                            "Please provide the following in JSON format:\n" +
//                            "{\n" +
//                            "  \"conceptExplanation\": \"Explanation of the key concepts needed to solve this problem\",\n" +
//                            "  \"tipsTricks\": [\"tip1\", \"tip2\", \"tip3\"],\n" +
//                            "  \"furtherReadingResources\": \"Suggestions for learning more about these concepts\"\n" +
//                            "}\n\n" +
//                            "Return ONLY the JSON, no additional text.",
//                    submission.getLanguage(),
//                    isCorrect ? "correct" : "incorrect",
//                    question.getDescription(),
//                    submission.getLanguage(),
//                    submission.getCode()
//            );
//
//            JSONObject requestBody = new JSONObject();
//            JSONArray contents = new JSONArray();
//            JSONObject content = new JSONObject();
//            JSONArray parts = new JSONArray();
//            JSONObject part = new JSONObject();
//
//            part.put("text", prompt);
//            parts.put(part);
//            content.put("parts", parts);
//            contents.put(content);
//            requestBody.put("contents", contents);
//
//            String url = geminiApiUrl + "?key=" + geminiApiKey;
//            HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);
//
//            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
//
//            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
//                JSONObject jsonResponse = new JSONObject(response.getBody());
//                JSONArray candidates = jsonResponse.getJSONArray("candidates");
//                if (!candidates.isEmpty()) {
//                    JSONObject candidate = candidates.getJSONObject(0);
//                    JSONObject candidateContent = candidate.getJSONObject("content");
//                    JSONArray contentParts = candidateContent.getJSONArray("parts");
//                    if (!contentParts.isEmpty()) {
//                        String text = contentParts.getJSONObject(0).getString("text");
//
//                        if (text.startsWith("```json")) {
//                            text = text.substring(7);
//                        }
//                        if (text.endsWith("```")) {
//                            text = text.substring(0, text.length() - 3);
//                        }
//                        text = text.trim();
//
//                        JSONObject learningJson = new JSONObject(text);
//                        materials.setConceptExplanation(learningJson.getString("conceptExplanation"));
//
//                        JSONArray tipsArray = learningJson.getJSONArray("tipsTricks");
//                        List<String> tipsList = new ArrayList<>();
//                        for (int i = 0; i < tipsArray.length(); i++) {
//                            tipsList.add(tipsArray.getString(i));
//                        }
//                        materials.setTipsTricks(tipsList);
//
//                        materials.setFurtherReadingResources(learningJson.getString("furtherReadingResources"));
//                        return materials;
//                    }
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        materials.setConceptExplanation("Focus on understanding the algorithm and data structure concepts relevant to this problem.");
//        List<String> defaultTips = new ArrayList<>();
//        defaultTips.add("Practice with similar problems to build pattern recognition.");
//        defaultTips.add("Learn to analyze time and space complexity.");
//        defaultTips.add("Practice breaking down problems into smaller steps.");
//        materials.setTipsTricks(defaultTips);
//        materials.setFurtherReadingResources("Check out resources on algorithms and data structures fundamental to this problem type.");
//
//        return materials;
//    }
//}
//



@Service
public class JudgeService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final RestTemplate restTemplate;
    private final CodingQuestionRepository questionRepository;

    public JudgeService(CodingQuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
        this.restTemplate = new RestTemplate();
    }

    public SubmissionResultDto evaluateSubmission(SubmissionDto submission) {
        SubmissionResultDto result = new SubmissionResultDto();

        try {
            Optional<CodingQuestion> questionOpt = questionRepository.findById(submission.getQuestionId());

            if (questionOpt.isEmpty()) {
                result.setSuccess(false);
                result.setErrorMessage("Question not found");
                return result;
            }

            CodingQuestion question = questionOpt.get();
            List<SubmissionResultDto.TestCaseResult> testCaseResults = new ArrayList<>();
            boolean allPassed = true;

            for (CodingQuestion.TestCase testCase : question.getTestCases()) {
                SubmissionResultDto.TestCaseResult testResult = evaluateTestCaseWithGemini(
                        submission.getCode(),
                        submission.getLanguage(),
                        testCase
                );

                testCaseResults.add(testResult);
                if (!testResult.isPassed()) {
                    allPassed = false;
                }
            }

            result.setTestCaseResults(testCaseResults);
            result.setSuccess(allPassed);

            if (allPassed) {
                enrichSubmissionResult(result, submission, question);
            } else {
                result.setLearningMaterials(generateLearningMaterials(submission, question, false));
            }

        } catch (Exception e) {
            e.printStackTrace();
            result.setSuccess(false);
            result.setErrorMessage("Error evaluating submission: " + e.getMessage());
        }

        return result;
    }

    private SubmissionResultDto.TestCaseResult evaluateTestCaseWithGemini(String code, String language, CodingQuestion.TestCase testCase) {
        SubmissionResultDto.TestCaseResult result = new SubmissionResultDto.TestCaseResult();
        result.setInput(testCase.getInput());
        result.setExpectedOutput(testCase.getOutput());

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String prompt = String.format(
                    "You are a code evaluator. Execute the following %s code with the provided input and return the output. " +
                            "Do NOT modify the code. Execute it exactly as provided.\n\n" +
                            "Code:\n```%s\n%s\n```\n\n" +
                            "Input:\n```\n%s\n```\n\n" +
                            "Expected Output:\n```\n%s\n```\n\n" +
                            "Please provide the following in JSON format:\n" +
                            "{\n" +
                            "  \"actualOutput\": \"The actual output from executing the code\",\n" +
                            "  \"passed\": boolean indicating if actualOutput equals expectedOutput,\n" +
                            "  \"executionTime\": \"Estimated execution time (or N/A if not applicable)\",\n" +
                            "  \"memoryUsed\": \"Estimated memory used (or N/A if not applicable)\",\n" +
                            "  \"error\": \"Any compilation or runtime errors (empty string if none)\"\n" +
                            "}\n\n" +
                            "Return ONLY the JSON, no additional text. Be extremely accurate when comparing output.",
                    language,
                    language,
                    code,
                    testCase.getInput(),
                    testCase.getOutput()
            );

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

            String url = geminiApiUrl + "?key=" + geminiApiKey;
            HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JSONObject jsonResponse = new JSONObject(response.getBody());
                JSONArray candidates = jsonResponse.getJSONArray("candidates");
                if (!candidates.isEmpty()) {
                    JSONObject candidate = candidates.getJSONObject(0);
                    JSONObject candidateContent = candidate.getJSONObject("content");
                    JSONArray contentParts = candidateContent.getJSONArray("parts");
                    if (!contentParts.isEmpty()) {
                        String text = contentParts.getJSONObject(0).getString("text");

                        // Extract JSON if wrapped in code blocks
                        if (text.startsWith("```json")) {
                            text = text.substring(7);
                        } else if (text.startsWith("```")) {
                            text = text.substring(text.indexOf("\n") + 1);
                        }
                        if (text.endsWith("```")) {
                            text = text.substring(0, text.lastIndexOf("```"));
                        }
                        text = text.trim();

                        JSONObject resultJson = new JSONObject(text);
                        result.setActualOutput(resultJson.getString("actualOutput"));
                        result.setPassed(resultJson.getBoolean("passed"));
                        result.setExecutionTime(resultJson.getString("executionTime"));
                        result.setMemoryUsed(resultJson.getString("memoryUsed"));

                        // Add error info to actualOutput if there was an error
                        if (resultJson.has("error") && !resultJson.getString("error").isEmpty()) {
                            result.setActualOutput(result.getActualOutput() + "\nError: " + resultJson.getString("error"));
                        }

                        return result;
                    }
                }
            }

            // If we got here, something went wrong with the Gemini API response
            result.setPassed(false);
            result.setActualOutput("Error: Unable to evaluate code with Gemini API");
            result.setExecutionTime("N/A");
            result.setMemoryUsed("N/A");

        } catch (Exception e) {
            e.printStackTrace();
            result.setPassed(false);
            result.setActualOutput("Error: " + e.getMessage());
            result.setExecutionTime("N/A");
            result.setMemoryUsed("N/A");
        }

        return result;
    }

    private void enrichSubmissionResult(SubmissionResultDto result, SubmissionDto submission, CodingQuestion question) {
        result.setTimeComplexity(question.getTimeComplexity());
        result.setSpaceComplexity(question.getSpaceComplexity());
        result.setOptimizedCode(generateOptimizedCode(submission, question));
        result.setLearningMaterials(generateLearningMaterials(submission, question, true));
    }

    private String generateOptimizedCode(SubmissionDto submission, CodingQuestion question) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String prompt = String.format(
                    "You are a code optimization expert. Given the following code that solves a LeetCode-style problem, " +
                            "please optimize it for better time and space complexity if possible. " +
                            "If it's already optimal, explain why.\n\n" +
                            "Problem Description:\n%s\n\n" +
                            "Original %s Solution:\n```\n%s\n```\n\n" +
                            "Please provide an optimized version of this code with the same language. " +
                            "Include ONLY the optimized code, no explanations.",
                    question.getDescription(),
                    submission.getLanguage(),
                    submission.getCode()
            );

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

            String url = geminiApiUrl + "?key=" + geminiApiKey;
            HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JSONObject jsonResponse = new JSONObject(response.getBody());
                JSONArray candidates = jsonResponse.getJSONArray("candidates");
                if (!candidates.isEmpty()) {
                    JSONObject candidate = candidates.getJSONObject(0);
                    JSONObject candidateContent = candidate.getJSONObject("content");
                    JSONArray contentParts = candidateContent.getJSONArray("parts");
                    if (!contentParts.isEmpty()) {
                        String text = contentParts.getJSONObject(0).getString("text");

                        if (text.startsWith("```")) {
                            int startIndex = text.indexOf("\n") + 1;
                            int endIndex = text.lastIndexOf("```");
                            if (endIndex > startIndex) {
                                text = text.substring(startIndex, endIndex).trim();
                            }
                        }

                        return text;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "// Optimized code generation failed";
    }

    private SubmissionResultDto.LearningMaterials generateLearningMaterials(
            SubmissionDto submission, CodingQuestion question, boolean isCorrect) {
        SubmissionResultDto.LearningMaterials materials = new SubmissionResultDto.LearningMaterials();

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String prompt = String.format(
                    "You are a coding tutor. Based on the following %s submission for a LeetCode-style problem, " +
                            "generate learning materials that will help the user improve their coding skills. " +
                            "The user's solution is %s.\n\n" +
                            "Problem Description:\n%s\n\n" +
                            "User's %s Solution:\n```\n%s\n```\n\n" +
                            "Please provide the following in JSON format:\n" +
                            "{\n" +
                            "  \"conceptExplanation\": \"Explanation of the key concepts needed to solve this problem\",\n" +
                            "  \"tipsTricks\": [\"tip1\", \"tip2\", \"tip3\"],\n" +
                            "  \"furtherReadingResources\": \"Suggestions for learning more about these concepts\"\n" +
                            "}\n\n" +
                            "Return ONLY the JSON, no additional text.",
                    submission.getLanguage(),
                    isCorrect ? "correct" : "incorrect",
                    question.getDescription(),
                    submission.getLanguage(),
                    submission.getCode()
            );

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

            String url = geminiApiUrl + "?key=" + geminiApiKey;
            HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JSONObject jsonResponse = new JSONObject(response.getBody());
                JSONArray candidates = jsonResponse.getJSONArray("candidates");
                if (!candidates.isEmpty()) {
                    JSONObject candidate = candidates.getJSONObject(0);
                    JSONObject candidateContent = candidate.getJSONObject("content");
                    JSONArray contentParts = candidateContent.getJSONArray("parts");
                    if (!contentParts.isEmpty()) {
                        String text = contentParts.getJSONObject(0).getString("text");

                        if (text.startsWith("```json")) {
                            text = text.substring(7);
                        }
                        if (text.endsWith("```")) {
                            text = text.substring(0, text.length() - 3);
                        }
                        text = text.trim();

                        JSONObject learningJson = new JSONObject(text);
                        materials.setConceptExplanation(learningJson.getString("conceptExplanation"));

                        JSONArray tipsArray = learningJson.getJSONArray("tipsTricks");
                        List<String> tipsList = new ArrayList<>();
                        for (int i = 0; i < tipsArray.length(); i++) {
                            tipsList.add(tipsArray.getString(i));
                        }
                        materials.setTipsTricks(tipsList);

                        materials.setFurtherReadingResources(learningJson.getString("furtherReadingResources"));
                        return materials;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        materials.setConceptExplanation("Focus on understanding the algorithm and data structure concepts relevant to this problem.");
        List<String> defaultTips = new ArrayList<>();
        defaultTips.add("Practice with similar problems to build pattern recognition.");
        defaultTips.add("Learn to analyze time and space complexity.");
        defaultTips.add("Practice breaking down problems into smaller steps.");
        materials.setTipsTricks(defaultTips);
        materials.setFurtherReadingResources("Check out resources on algorithms and data structures fundamental to this problem type.");

        return materials;
    }
}