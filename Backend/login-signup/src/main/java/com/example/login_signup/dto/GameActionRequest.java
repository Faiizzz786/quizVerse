package com.example.login_signup.dto;

import com.example.login_signup.model.ActionType;

public class GameActionRequest {
    private String gameSessionId;
    private ActionType actionType;
    private String questionId;
    private String answerId;
    private String emojiCode;
    private String lifelineType;
    private String message;

    // Getters and setters

    public String getMessage() {  // Getter for message
        return message;
    }

    public void setMessage(String message) {  // Setter for message
        this.message = message;
    }

    public String getGameSessionId() {
        return gameSessionId;
    }

    public void setGameSessionId(String gameSessionId) {
        this.gameSessionId = gameSessionId;
    }

    public ActionType getActionType() {
        return actionType;
    }

    public void setActionType(ActionType actionType) {
        this.actionType = actionType;
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
}
