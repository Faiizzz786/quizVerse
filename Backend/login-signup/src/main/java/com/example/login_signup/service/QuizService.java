package com.example.login_signup.service;

import com.example.login_signup.dto.CorrectAnswer;
import com.example.login_signup.dto.LearningMaterialsDto;
import com.example.login_signup.dto.QuizSubmissionResult;
import com.example.login_signup.model.*;
import com.example.login_signup.repository.QuestionRepository;
import com.example.login_signup.repository.QuizRepository;
import com.example.login_signup.repository.QuizResultRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.example.login_signup.dto.QuizDto;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public Quiz getQuizById(String quizId) {
        return quizRepository.findById(Integer.parseInt(quizId))
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + quizId));
    }


    public List<QuizDto> getAllQuizSummaries() {
        List<Quiz> quizzes = quizRepository.findAllWithQuestions();
        List<QuizDto> summaries = new ArrayList<>();

        for (Quiz quiz : quizzes) {
            String category = quiz.getQuestions().isEmpty() ? "Unknown" : quiz.getQuestions().get(0).getCategory();
            summaries.add(new QuizDto(
                    quiz.getId(),
                    quiz.getTitle(),
                    category,
                    quiz.getQuestions().size()
            ));
        }

        return summaries;
    }


    // Create quiz based on category and number of questions
    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {
        try {
            List<Question> questions = questionRepository.findRandomQuestionsByCategory(category, numQ);
            if (questions.size() < numQ) {
                return new ResponseEntity<>("Not enough questions available for the given category", HttpStatus.BAD_REQUEST);
            }

            Quiz quiz = new Quiz();
            quiz.setTitle(title);
            quiz.setQuestions(questions);
            quizRepository.save(quiz);

            return new ResponseEntity<>("Quiz created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to create quiz", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }


    // Retrieve quiz questions without exposing correct answers
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
        try {
            Optional<Quiz> quizOptional = quizRepository.findById(id);
            if (!quizOptional.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            List<Question> questionsFromDB = quizOptional.get().getQuestions();
            List<QuestionWrapper> questionsForUser = new ArrayList<>();

            for (Question q : questionsFromDB) {
                QuestionWrapper qw = new QuestionWrapper(
                        q.getId(),
                        q.getQuestionTitle(),
                        q.getOption1(),
                        q.getOption2(),
                        q.getOption3(),
                        q.getOption4()
                );
                questionsForUser.add(qw);
            }

            return new ResponseEntity<>(questionsForUser, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Autowired
    private QuizResultRepository quizResultRepository;

    // Evaluate submitted quiz responses
    // Evaluate submitted quiz responses
    public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses, String email, long timeTakenInSeconds) {
        try {
            Optional<Quiz> quizOptional = quizRepository.findById(id);
            if (!quizOptional.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            List<Question> questions = quizOptional.get().getQuestions();

            int right = 0;
            List<String> selected = new ArrayList<>();

            for (int i = 0; i < responses.size(); i++) {
                selected.add(responses.get(i).getResponse());
                if (i < questions.size() &&
                        responses.get(i).getResponse().equalsIgnoreCase(questions.get(i).getRightAnswer())) {
                    right++;
                }
            }

            QuizResult result = new QuizResult();
            result.setQuizId(id);
            result.setUserEmail(email);
            result.setScore(right);
            result.setSelectedAnswers(selected);
            result.setSubmittedAt(LocalDateTime.now());
            result.setTimeTakenInSeconds(timeTakenInSeconds);

            quizResultRepository.save(result);

            return new ResponseEntity<>(right, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // New method for detailed results
    public ResponseEntity<QuizSubmissionResult> calculateDetailedResult(Integer id, List<Response> responses, String email, long timeTakenInSeconds) {
        try {
            Optional<Quiz> quizOptional = quizRepository.findById(id);
            if (!quizOptional.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            List<Question> questions = quizOptional.get().getQuestions();
            int right = 0;
            List<String> selected = new ArrayList<>();
            List<CorrectAnswer> correctAnswers = new ArrayList<>();

            // Create list of all correct answers
            for (Question question : questions) {
                correctAnswers.add(new CorrectAnswer(question.getId(), question.getRightAnswer()));
            }

            for (int i = 0; i < responses.size(); i++) {
                selected.add(responses.get(i).getResponse());
                if (i < questions.size() &&
                        responses.get(i).getResponse().equalsIgnoreCase(questions.get(i).getRightAnswer())) {
                    right++;
                }
            }

            QuizResult result = new QuizResult();
            result.setQuizId(id);
            result.setUserEmail(email);
            result.setScore(right);
            result.setSelectedAnswers(selected);
            result.setSubmittedAt(LocalDateTime.now());
            result.setTimeTakenInSeconds(timeTakenInSeconds);

            quizResultRepository.save(result);

            QuizSubmissionResult quizResult = new QuizSubmissionResult(right, correctAnswers);
            return new ResponseEntity<>(quizResult, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new QuizSubmissionResult(0, new ArrayList<>()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Autowired
    private AILearningService aiLearningService;
    public ResponseEntity<LearningMaterialsDto> generateLearningMaterials(Integer quizId, List<Response> responses, String email) {
        Logger log = LoggerFactory.getLogger(getClass());
        try {
            log.info("Starting to generate learning materials for quiz ID: {}, responses count: {}", quizId, responses.size());

            Optional<Quiz> quizOptional = quizRepository.findById(quizId);
            if (!quizOptional.isPresent()) {
                log.error("Quiz with ID {} not found", quizId);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            List<Question> questions = quizOptional.get().getQuestions();
            log.info("Found {} questions for quiz", questions.size());

            // Log question and response details for debugging
            for (Question q : questions) {
                log.info("Question ID: {}, Title: {}, RightAnswer: {}", q.getId(), q.getQuestionTitle(), q.getRightAnswer());
            }

            for (Response r : responses) {
                log.info("Response for Question ID: {}, Selected Answer: {}", r.getQuestionId(), r.getResponse());
            }

            // Only pass the questions and responses to the AI service
            LearningMaterialsDto learningMaterials = aiLearningService.generateLearningMaterials(questions, responses);

            log.info("Generated learning materials count: {}", learningMaterials.getMaterials().size());

            // If there are no materials generated (all answers were correct), send appropriate message
            if (learningMaterials.getMaterials().isEmpty()) {
                log.info("No learning materials generated - all answers appear to be correct");
                // Create a default response for all correct answers
                return new ResponseEntity<>(
                        new LearningMaterialsDto(new ArrayList<>()),
                        HttpStatus.OK
                );
            }

            return new ResponseEntity<>(learningMaterials, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error generating learning materials", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
