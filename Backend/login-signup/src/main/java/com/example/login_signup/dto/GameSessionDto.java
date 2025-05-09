package com.example.login_signup.dto;

import java.util.List;
import java.util.Map;

public class GameSessionDto {
    private String id;
    private List<UserDto> participants;
    private QuizDto quiz;
    private String status;
    private Map<String, Integer> scores;
    private int currentQuestionIndex;
    private Map<String, Map<String, Boolean>> usedLifelines;

    // Getters and setters
}
