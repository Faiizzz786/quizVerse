package com.example.login_signup.dto;


import java.util.List;

public class QuizSubmissionResult {
        private int correctCount;
        private List<CorrectAnswer> correctAnswers;

        // Constructor
        public QuizSubmissionResult(int correctCount, List<CorrectAnswer> correctAnswers) {
            this.correctCount = correctCount;
            this.correctAnswers = correctAnswers;
        }

        // Getters and setters
        public int getCorrectCount() {
            return correctCount;
        }

        public void setCorrectCount(int correctCount) {
            this.correctCount = correctCount;
        }

        public List<CorrectAnswer> getCorrectAnswers() {
            return correctAnswers;
        }

        public void setCorrectAnswers(List<CorrectAnswer> correctAnswers) {
            this.correctAnswers = correctAnswers;
        }
    }



