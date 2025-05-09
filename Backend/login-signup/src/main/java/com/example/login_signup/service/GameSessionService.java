package com.example.login_signup.service;

import com.example.login_signup.model.GameSession;
import com.example.login_signup.model.GameStatus;
import com.example.login_signup.model.User;
import com.example.login_signup.model.Quiz;
import com.example.login_signup.model.Question;
import com.example.login_signup.dto.GameActionRequest;
import com.example.login_signup.dto.GameActionResponse;
import com.example.login_signup.repository.GameSessionRepository;
import com.example.login_signup.service.QuizService;
import com.example.login_signup.service.UserService;
import com.example.login_signup.service.LifelineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import static com.example.login_signup.model.ActionType.*;

@Service
public class GameSessionService {
    private final GameSessionRepository gameSessionRepository;
    private final QuizService quizService;
    private final UserService userService;
    private final LifelineService lifelineService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public GameSessionService(GameSessionRepository gameSessionRepository,
                              QuizService quizService,
                              UserService userService,
                              LifelineService lifelineService,
                              SimpMessagingTemplate messagingTemplate) {
        this.gameSessionRepository = gameSessionRepository;
        this.quizService = quizService;
        this.userService = userService;
        this.lifelineService = lifelineService;
        this.messagingTemplate = messagingTemplate;
    }


//
//    public GameSession createGameSession(String quizId, String email) {
//        User host = userService.getUserByEmail(email); // ✅ changed this
//        Quiz quiz = quizService.getQuizById(quizId);
//        GameSession session = new GameSession(quiz, host);
//        session.addParticipant(host);
//        session.setStatus(GameStatus.WAITING);
//        return gameSessionRepository.save(session);
//    }
public GameSession createGameSession(String quizId, String email) {
    // Log the incoming data to the console (or log file depending on configuration)
    System.out.println("Received quizId: " + quizId);
    System.out.println("Received email: " + email);

    User host = userService.getUserByEmail(email); // ✅ changed this
    Quiz quiz = quizService.getQuizById(quizId);

    // Log the Quiz and User objects being fetched
    System.out.println("Fetched Quiz: " + quiz);
    System.out.println("Fetched User: " + host);

    GameSession session = new GameSession(quiz, host);
    session.addParticipant(host);
    session.setStatus(GameStatus.WAITING);

    GameSession savedSession = gameSessionRepository.save(session);

    // Log the saved session
    System.out.println("Created and saved GameSession: " + savedSession);

    return savedSession;
}



    //    public GameSession joinGameSession(String gameSessionId, String userId) {
//        GameSession session = gameSessionRepository.findById(gameSessionId).orElseThrow();
//        User user = userService.getUserById(userId);
//        session.addParticipant(user);
//        return gameSessionRepository.save(session);
//    }
    public GameSession joinGameSession(String gameSessionId, String email) {
        GameSession session = gameSessionRepository.findById(gameSessionId).orElseThrow();
        User user = userService.getUserByEmail(email); // ✅ changed this
        session.addParticipant(user);
        return gameSessionRepository.save(session);
    }


    public void startGameSession(String gameSessionId) {
        GameSession session = gameSessionRepository.findById(gameSessionId).orElseThrow();
        session.setStatus(GameStatus.IN_PROGRESS);
        session.setCurrentQuestionIndex(0);
        session.setStartedAt(LocalDateTime.now());
        gameSessionRepository.save(session);
        sendGameUpdate(session);
    }

    public GameActionResponse processPlayerAction(String email, GameActionRequest request) {
        GameSession session = gameSessionRepository.findById(request.getGameSessionId()).orElseThrow();
        User user = userService.getUserByEmail(email);

        switch (request.getActionType()) {
            case ANSWER:
//                return handleAnswer(session, user, request.getAnswerId());
                return handleAnswer(session, user, request.getQuestionId(), request.getAnswerId());

            case EMOJI:
                return handleEmoji(session, user, request.getEmojiCode());
            case LIFELINE:
                return handleLifeline(session, user, request.getLifelineType());
            case CHAT:
                return handleChat(session, user, request.getMessage());
            default:
                throw new IllegalArgumentException("Invalid action type");
        }
    }

//    private GameActionResponse handleAnswer(GameSession session, User user, String answer) {
//        Question currentQuestion = session.getCurrentQuestion();
//        boolean isCorrect = currentQuestion.getRightAnswer().equals(answer);
//        session.updatePlayerScore(user.getId().toString(), isCorrect ? 10 : 0);
//        gameSessionRepository.save(session);
//        sendGameUpdate(session);
//        return new GameActionResponse("answer", user.getEmail(), isCorrect ? "Correct!" : "Incorrect!", session.getScores());
//    }
//private GameActionResponse handleAnswer(GameSession session, User user, String questionId, String answerId) {
//    Question currentQuestion = session.getCurrentQuestion();
//
//    // Validate if the submitted questionId matches the current one
//    if (!currentQuestion.getId().toString().equals(questionId)) {
//        throw new IllegalArgumentException("Invalid question ID submitted");
//    }
//
//    boolean isCorrect = currentQuestion.getRightAnswer().equals(answerId);
//    int points = isCorrect ? 10 : 0;
//
//    // Update score
//    session.updatePlayerScore(user.getId().toString(), points);
//    gameSessionRepository.save(session);
//    sendGameUpdate(session);
//
//    // ✅ Return full response
//    GameActionResponse response = new GameActionResponse();
//    response.setGameSessionId(session.getId());
//    response.setActionType("ANSWER");
//    response.setUserId(user.getEmail());
//    //response.setUsername(user.getUsername());
//    response.setQuestionId(questionId);
//    response.setAnswerId(answerId);
//    response.setIsCorrect(isCorrect);
//    response.setPoints(points);
//    response.setUpdatedScores(session.getScores());
//
//    return response;
//}
private GameActionResponse handleAnswer(GameSession session, User user, String questionId, String answerId) {
    Question currentQuestion = session.getCurrentQuestion();
    boolean isCorrect = currentQuestion.getRightAnswer().equals(answerId);
    int points = isCorrect ? 10 : 0;

    session.updatePlayerScore(user.getId().toString(), points);
    gameSessionRepository.save(session); // Save score update

    // 🔁 Move to next question
    advanceToNextQuestion(session.getId());

    sendGameUpdate(session);

    GameActionResponse response = new GameActionResponse();
    response.setGameSessionId(session.getId());
    response.setActionType("ANSWER");
    response.setUserId(user.getEmail());
    response.setQuestionId(questionId);
    response.setAnswerId(answerId);
    response.setIsCorrect(isCorrect);
    response.setPoints(points);
    response.setUpdatedScores(session.getScores());

    return response;
}






    private GameActionResponse handleEmoji(GameSession session, User user, String emoji) {
        messagingTemplate.convertAndSend("/topic/game/" + session.getId(),
                new GameActionResponse("emoji", user.getEmail(), emoji, null));
        return null;
    }

    private GameActionResponse handleChat(GameSession session, User user, String message) {
        messagingTemplate.convertAndSend("/topic/game/" + session.getId(),
                new GameActionResponse("chat", user.getEmail(), message, null));
        return null;
    }

    private GameActionResponse handleLifeline(GameSession session, User user, String lifelineType) {
        if (lifelineType.equalsIgnoreCase("fifty-fifty")) {
            Map<String, Boolean> options = lifelineService.applyFiftyFifty(session.getCurrentQuestion());
            return new GameActionResponse("lifeline", user.getEmail(), "50-50 used", options);
        } else if (lifelineType.equalsIgnoreCase("skip")) {
            lifelineService.applySkip(session);
            advanceToNextQuestion(session.getId());
            return new GameActionResponse("lifeline", user.getEmail(), "Question skipped", null);
        }
        return null;
    }

    public void advanceToNextQuestion(String gameSessionId) {
        GameSession session = gameSessionRepository.findById(gameSessionId).orElseThrow();
        int nextIndex = session.getCurrentQuestionIndex() + 1;

        if (nextIndex < session.getQuiz().getQuestions().size()) {
            session.setCurrentQuestionIndex(nextIndex);
            gameSessionRepository.save(session);
            sendGameUpdate(session);
        } else {
            endGameSession(gameSessionId);
        }
    }

    public GameSession endGameSession(String gameSessionId) {
        GameSession session = gameSessionRepository.findById(gameSessionId).orElseThrow();
        session.setStatus(GameStatus.ENDED);  // Now this should work
        gameSessionRepository.save(session);
        sendGameUpdate(session);
        return session;
    }


//    public void sendGameUpdate(GameSession session) {
//        messagingTemplate.convertAndSend("/topic/game/" + session.getId(),
//                new GameActionResponse("update", "System", "Game updated", session.getScores()));
//    }

    public void sendGameUpdate(GameSession session) {
        // Make sure the session has the latest current question
        GameSession updatedSession = gameSessionRepository.findById(session.getId()).orElseThrow();

        messagingTemplate.convertAndSend(
                "/topic/game/" + updatedSession.getId(),
                updatedSession // Send the full updated session, not a custom response
        );
    }

}
