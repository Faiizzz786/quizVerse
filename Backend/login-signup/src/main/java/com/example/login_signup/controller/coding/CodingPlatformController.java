package com.example.login_signup.controller.coding;

import com.example.login_signup.dto.coding.CodingQuestionDto;
import com.example.login_signup.dto.coding.SubmissionDto;
import com.example.login_signup.dto.coding.SubmissionResultDto;
import com.example.login_signup.service.coding.CodingQuestionService;
import com.example.login_signup.service.coding.JudgeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CodingPlatformController {

    private final CodingQuestionService questionService;
    private final JudgeService judgeService;

    public CodingPlatformController(CodingQuestionService questionService, JudgeService judgeService) {
        this.questionService = questionService;
        this.judgeService = judgeService;
    }

    @GetMapping("/questions/generate")
    public ResponseEntity<CodingQuestionDto> generateQuestion(
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String category) {
        CodingQuestionDto question = questionService.generateCodingQuestion(difficulty, category);
        if (question == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(question);
    }

    @GetMapping("/questions/random")
    public ResponseEntity<CodingQuestionDto> getRandomQuestion(
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String category) {
        CodingQuestionDto question = questionService.getRandomQuestion(difficulty, category);
        if (question == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(question);
    }

    @PostMapping("/submissions/evaluate")
    public ResponseEntity<SubmissionResultDto> evaluateSubmission(@RequestBody SubmissionDto submission) {
        SubmissionResultDto result = judgeService.evaluateSubmission(submission);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/languages")
    public ResponseEntity<List<Map<String, Object>>> getSupportedLanguages() {
        // Return a list of supported programming languages
        List<Map<String, Object>> languages = List.of(
                createLanguageMap("java", "Java"),
                createLanguageMap("python", "Python"),
                createLanguageMap("javascript", "JavaScript"),
                createLanguageMap("c++", "C++")
        );
        return ResponseEntity.ok(languages);
    }

    private Map<String, Object> createLanguageMap(String id, String name) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("name", name);
        return map;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        // Return a list of problem categories
        List<String> categories = List.of(
                "Arrays",
                "Strings",
                "Linked Lists",
                "Trees",
                "Graphs",
                "Dynamic Programming",
                "Sorting",
                "Searching",
                "Greedy Algorithms",
                "Recursion"
        );
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/difficulties")
    public ResponseEntity<List<String>> getDifficulties() {
        // Return a list of difficulty levels
        List<String> difficulties = List.of("Easy", "Medium", "Hard");
        return ResponseEntity.ok(difficulties);
    }
}



