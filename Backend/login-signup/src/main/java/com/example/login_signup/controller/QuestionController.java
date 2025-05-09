package com.example.login_signup.controller;

import com.example.login_signup.model.Question;
import com.example.login_signup.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question")  // Added '/api' for clarity and RESTful structure
@CrossOrigin(origins = "*") // Optional, allows frontend/other origins
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    // ✅ Get all questions
    @GetMapping("/all")
    public ResponseEntity<List<Question>> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    // ✅ Get questions by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String category) {
        return questionService.getAllQuestionsByCategory(category);
    }

    // ✅ Add a new question
    @PostMapping("/add")
    public ResponseEntity<String> addQuestion(@RequestBody Question question) {
        return questionService.addQuestion(question);
    }
}
