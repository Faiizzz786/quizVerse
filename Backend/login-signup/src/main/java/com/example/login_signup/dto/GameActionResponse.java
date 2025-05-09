package com.example.login_signup.dto;

import java.util.Map;

public class GameActionResponse {
    private String gameSessionId;
    private String actionType;
    private String userId; // email or id
    private String username;
    private String questionId;
    private String answerId;
    private Boolean isCorrect;
    private Integer points;
    private Map<String, Integer> updatedScores;
    private String emojiCode;
    private String lifelineType;
    private Object lifelineResult;

    // Default constructor
    public GameActionResponse() {}

    // Constructor for answer action
    public GameActionResponse(String actionType, String userId, boolean isCorrect, Map<String, Integer> updatedScores) {
        this.actionType = actionType;
        this.userId = userId;
        this.isCorrect = isCorrect;
        this.updatedScores = updatedScores;
    }

    public Boolean getCorrect() {
        return isCorrect;
    }

    public void setCorrect(Boolean correct) {
        isCorrect = correct;
    }

    // Constructor for lifeline action
    public GameActionResponse(String actionType, String userId, String lifelineType, Object lifelineResult) {
        this.actionType = actionType;
        this.userId = userId;
        this.lifelineType = lifelineType;
        this.lifelineResult = lifelineResult;
    }

    // Getters and setters for all fields

    public String getGameSessionId() {
        return gameSessionId;
    }

    public void setGameSessionId(String gameSessionId) {
        this.gameSessionId = gameSessionId;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getAnswerId() {
        return answerId;
    }

    public void setAnswerId(String answerId) {
        this.answerId = answerId;
    }

    public Boolean getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Map<String, Integer> getUpdatedScores() {
        return updatedScores;
    }

    public void setUpdatedScores(Map<String, Integer> updatedScores) {
        this.updatedScores = updatedScores;
    }

    public String getEmojiCode() {
        return emojiCode;
    }

    public void setEmojiCode(String emojiCode) {
        this.emojiCode = emojiCode;
    }

    public String getLifelineType() {
        return lifelineType;
    }

    public void setLifelineType(String lifelineType) {
        this.lifelineType = lifelineType;
    }

    public Object getLifelineResult() {
        return lifelineResult;
    }

    public void setLifelineResult(Object lifelineResult) {
        this.lifelineResult = lifelineResult;
    }
}
