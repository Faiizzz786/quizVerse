package com.example.login_signup.controller;

import com.example.login_signup.dto.GameActionRequest;
import com.example.login_signup.dto.GameActionResponse;
import com.example.login_signup.model.GameSession;
import com.example.login_signup.model.Question;
import com.example.login_signup.repository.GameSessionRepository;
import com.example.login_signup.service.GameSessionService;
import com.example.login_signup.service.LifelineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameSessionService gameSessionService;
    private final LifelineService lifelineService;

    @Autowired
    public GameController(GameSessionService gameSessionService, LifelineService lifelineService) {
        this.gameSessionService = gameSessionService;
        this.lifelineService = lifelineService;
    }

    // Start a new game session
    @PostMapping("/start/{quizId}/{email}")
    public ResponseEntity<GameSession> startGameSession(@PathVariable String quizId, @PathVariable String email) {
        GameSession session = gameSessionService.createGameSession(quizId, email);
        return ResponseEntity.ok(session);
    }

    // Join an existing game session
    @PostMapping("/join/{gameSessionId}/{email}")
    public ResponseEntity<GameSession> joinGameSession(@PathVariable String gameSessionId, @PathVariable String email) {
        GameSession session = gameSessionService.joinGameSession(gameSessionId, email);
        return ResponseEntity.ok(session);
    }

    // Start a game session (set to in progress)
    @PostMapping("/begin/{gameSessionId}")
    public ResponseEntity<GameSession> startGame(@PathVariable String gameSessionId) {
        gameSessionService.startGameSession(gameSessionId);
        return ResponseEntity.ok().build();
    }

    // End the game session
    @PostMapping("/end/{gameSessionId}")
    public ResponseEntity<GameSession> endGameSession(@PathVariable String gameSessionId) {
        GameSession session = gameSessionService.endGameSession(gameSessionId);
        return ResponseEntity.ok(session);
    }

    // Process player action (Answer, Emoji, Lifeline, Chat)
    @PostMapping("/action/{email}")
    public ResponseEntity<GameActionResponse> processAction(@PathVariable String email, @RequestBody GameActionRequest request) {
        GameActionResponse response = gameSessionService.processPlayerAction(email, request);
        return ResponseEntity.ok(response);
    }
    @Autowired
    public GameSessionRepository gameSessionRepository;
    // Apply 50-50 lifeline
    @PostMapping("/lifeline/fiftyfifty/{gameSessionId}")
    public ResponseEntity<GameActionResponse> applyFiftyFifty(@PathVariable String gameSessionId, @RequestBody String questionId) {
        // Fetch the GameSession and Question from the database
        GameSession session = gameSessionRepository.findById(gameSessionId).orElseThrow(() -> new IllegalArgumentException("Game session not found"));
        Question question = session.getQuiz().getQuestions().stream()
                .filter(q -> q.getId().toString().equals(questionId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Question not found"));
        Map<String, Boolean> options = lifelineService.applyFiftyFifty(question);

        // Pass the Question to the service
        GameActionResponse response = new GameActionResponse("lifeline", session.getHost().getEmail(), "50-50 used", options);
        return ResponseEntity.ok(response);
    }

    // Skip question lifeline
    @PostMapping("/lifeline/skip/{gameSessionId}")
    public ResponseEntity<GameActionResponse> applySkip(@PathVariable String gameSessionId) {
        // Fetch the GameSession from the database
        GameSession session = gameSessionRepository.findById(gameSessionId)
                .orElseThrow(() -> new IllegalArgumentException("Game session not found"));

        // Apply the skip action and get the response
        GameActionResponse response = lifelineService.applySkip(session);

        // Return the response
        return ResponseEntity.ok(response);
    }

    @GetMapping("/session/{gameSessionId}")
    public ResponseEntity<GameSession> getSession(@PathVariable String gameSessionId) {
        return ResponseEntity.ok(gameSessionRepository.findById(gameSessionId).orElseThrow());
    }



}

