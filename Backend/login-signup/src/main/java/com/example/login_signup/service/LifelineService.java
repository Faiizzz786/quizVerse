package com.example.login_signup.service;

import com.example.login_signup.dto.GameActionResponse;
import com.example.login_signup.model.GameSession;
import com.example.login_signup.model.GameStatus;
import com.example.login_signup.model.Question;
import com.example.login_signup.repository.GameSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LifelineService {

    private final GameSessionRepository gameSessionRepository;

    @Autowired
    public LifelineService(GameSessionRepository gameSessionRepository) {
        this.gameSessionRepository = gameSessionRepository;
    }

    public Map<String, Boolean> applyFiftyFifty(Question question) {
        List<String> incorrect = question.getOptions().stream()
                .filter(opt -> !opt.equals(question.getRightAnswer()))
                .collect(Collectors.toList());
        Collections.shuffle(incorrect);
        Map<String, Boolean> result = new HashMap<>();
        result.put(question.getRightAnswer(), true);
        result.put(incorrect.get(0), false); // Keep one incorrect option
        return result;
    }

    public GameActionResponse applySkip(GameSession session) {
        // Handle the skip action and advance to the next question
        advanceToNextQuestion(session);

        // Return a GameActionResponse with the skip message
        return new GameActionResponse("lifeline", session.getHost().getEmail(), "skip", null);
    }

    private void advanceToNextQuestion(GameSession session) {
        int nextIndex = session.getCurrentQuestionIndex() + 1;

        if (nextIndex < session.getQuiz().getQuestions().size()) {
            session.setCurrentQuestionIndex(nextIndex);
            gameSessionRepository.save(session);
        } else {
            endGameSession(session);
        }
    }

    private void endGameSession(GameSession session) {
        session.setStatus(GameStatus.ENDED);
        gameSessionRepository.save(session);
    }
}