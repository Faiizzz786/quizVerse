package com.example.login_signup.dto;

import java.util.List;

public class QuizSubmissionDto {
    private List<ResponseDto> responses;

    // Getters and Setters

    public List<ResponseDto> getResponses() {
        return responses;
    }

    public void setResponses(List<ResponseDto> responses) {
        this.responses = responses;
    }

    public static class ResponseDto {
        private Integer questionId;
        private String selectedAnswer;

        public Integer getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Integer questionId) {
            this.questionId = questionId;
        }

        public String getSelectedAnswer() {
            return selectedAnswer;
        }

        public void setSelectedAnswer(String selectedAnswer) {
            this.selectedAnswer = selectedAnswer;
        }
    }
}
