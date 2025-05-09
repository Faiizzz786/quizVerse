package com.example.login_signup.controller;

import com.example.login_signup.dto.AIQuizRequest;
import com.example.login_signup.dto.LearningMaterialsDto;
import com.example.login_signup.dto.QuizSubmissionDto;
import com.example.login_signup.model.Quiz;
import com.example.login_signup.model.Response;
import com.example.login_signup.service.AIQuizService;
import com.example.login_signup.service.QuizService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins = "*")
public class AIQuizController {

    @Autowired
    private AIQuizService aiQuizService;

    @PostMapping("/create-with-ai")
    public ResponseEntity<?> createQuizWithAI(@RequestBody AIQuizRequest request) {
        try {
            Quiz createdQuiz = aiQuizService.generateAndSaveQuiz(
                    request.getParagraph(),
                    request.getCategory(),
                    request.getNumQ(),
                    request.getTitle()
            );
            return new ResponseEntity<>(createdQuiz, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to create quiz: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
   @Autowired
   private QuizService quizService;

    @PostMapping("/learning-materials-alt/{id}")
    public ResponseEntity<?> getLearningMaterialsAlt(
            @PathVariable Integer id,
            @RequestBody QuizSubmissionDto submissionDto,
            @RequestParam String email) {
        // Initialize logger
        Logger log = LoggerFactory.getLogger(getClass());

        // Log some info
        log.info("Received id: {}", id);
        log.info("Received email: {}", email);
        log.info("Received responses: {}", submissionDto.getResponses());

        if (submissionDto.getResponses() == null || submissionDto.getResponses().isEmpty()) {
            return ResponseEntity.badRequest().body("No responses provided");
        }

        // Convert QuizSubmissionDto to List<Response>
        List<Response> responses = new ArrayList<>();
        for (QuizSubmissionDto.ResponseDto respDto : submissionDto.getResponses()) {
            Response response = new Response();
            response.setQuestionId(respDto.getQuestionId());
            response.setResponse(respDto.getSelectedAnswer());
            responses.add(response);
        }

        ResponseEntity<LearningMaterialsDto> result = quizService.generateLearningMaterials(id, responses, email);

        if (result.getBody() != null && result.getBody().getMaterials() != null && result.getBody().getMaterials().isEmpty()) {
            return ResponseEntity.ok().body("All answers appear to be correct! No learning materials needed.");
        }

        return result;
    }
}
