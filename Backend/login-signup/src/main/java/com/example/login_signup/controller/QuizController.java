package com.example.login_signup.controller;



import com.example.login_signup.dto.QuizDto;
import com.example.login_signup.dto.QuizSubmissionResult;
import com.example.login_signup.repository.QuizResultRepository;
import com.example.login_signup.security.JwtUtil;
import com.example.login_signup.dto.SubmitQuizRequest;
import com.example.login_signup.model.*;
import com.example.login_signup.service.QuizService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("quiz")
public class QuizController {
    @Autowired
    QuizService quizService;
    @PostMapping("create")
    public ResponseEntity<String> createQuiz(@RequestParam String category, @RequestParam int numQ, @RequestParam String title){
        return quizService.createQuiz(category, numQ, title);

    }


    @GetMapping("all")
    public ResponseEntity<List<QuizDto>> getAllQuizzes() {
        return new ResponseEntity<>(quizService.getAllQuizSummaries(), HttpStatus.OK);
    }



    @GetMapping("get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestion(@PathVariable Integer id){
        return quizService.getQuizQuestions(id);
    }

//    @PostMapping("submit/{id}")
//    public ResponseEntity<Integer> submitQuiz(@PathVariable Integer id,
//                                              @RequestBody SubmitQuizRequest request) {
//        String email = request.getEmail(); // Assuming the email is sent in the request body
//        long timeTakenInSeconds = request.getTimeTakenInSeconds(); // The time taken for the quiz
//
//        // Call the service to calculate the result
//        return quizService.calculateResult(id, request.getResponses(), email, timeTakenInSeconds);
//    }

    @PostMapping("submit/{id}")
    public ResponseEntity<QuizSubmissionResult> submitQuiz(@PathVariable Integer id,
                                                           @RequestBody SubmitQuizRequest request) {
        String email = request.getEmail();
        long timeTakenInSeconds = request.getTimeTakenInSeconds();

        // Call the service to calculate the detailed result
        return quizService.calculateDetailedResult(id, request.getResponses(), email, timeTakenInSeconds);
    }


    @Autowired
    private QuizResultRepository quizResultRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @GetMapping("/results")
    public ResponseEntity<List<QuizResult>> getUserResults(HttpServletRequest request) {
        String token = jwtUtil.extractToken(request);
        System.out.println("🔐 Token in controller: " + token);
        String email = jwtUtil.extractUsername(token); // assuming you have a utility method
        System.out.println("Extracted email" + email);
        List<QuizResult> results = quizResultRepository.findByUserEmail(email);
        return ResponseEntity.ok(results);
    }


}
