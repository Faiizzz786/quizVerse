package com.example.login_signup.dto;

public class CorrectAnswer {
    private Integer questionId;
    private String correctOption;

    // Constructor
    public CorrectAnswer(Integer questionId, String correctOption) {
        this.questionId = questionId;
        this.correctOption = correctOption;
    }

    // Getters and setters
    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public String getCorrectOption() {
        return correctOption;
    }

    public void setCorrectOption(String correctOption) {
        this.correctOption = correctOption;
    }
}
