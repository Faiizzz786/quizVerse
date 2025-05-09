package com.example.login_signup.dto;

import java.util.List;

public class LearningMaterialsDto {
    private List<IncorrectQuestionMaterial> materials;

    public LearningMaterialsDto() {
    }

    public LearningMaterialsDto(List<IncorrectQuestionMaterial> materials) {
        this.materials = materials;
    }

    public List<IncorrectQuestionMaterial> getMaterials() {
        return materials;
    }

    public void setMaterials(List<IncorrectQuestionMaterial> materials) {
        this.materials = materials;
    }

    public static class IncorrectQuestionMaterial {
        private Integer questionId;
        private String questionText;
        private String userAnswer;
        private String correctAnswer;
        private Flashcard flashcard;
        private String summary;
        private List<String> studyGuide;  // Changed from String to List<String>

        public IncorrectQuestionMaterial() {
        }

        public Integer getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Integer questionId) {
            this.questionId = questionId;
        }

        public String getQuestionText() {
            return questionText;
        }

        public void setQuestionText(String questionText) {
            this.questionText = questionText;
        }

        public String getUserAnswer() {
            return userAnswer;
        }

        public void setUserAnswer(String userAnswer) {
            this.userAnswer = userAnswer;
        }

        public String getCorrectAnswer() {
            return correctAnswer;
        }

        public void setCorrectAnswer(String correctAnswer) {
            this.correctAnswer = correctAnswer;
        }

        public Flashcard getFlashcard() {
            return flashcard;
        }

        public void setFlashcard(Flashcard flashcard) {
            this.flashcard = flashcard;
        }

        public String getSummary() {
            return summary;
        }

        public void setSummary(String summary) {
            this.summary = summary;
        }

        public List<String> getStudyGuide() {  // Updated getter
            return studyGuide;
        }

        public void setStudyGuide(List<String> studyGuide) {  // Updated setter
            this.studyGuide = studyGuide;
        }
    }

    public static class Flashcard {
        private String question;
        private String answer;

        public Flashcard() {
        }

        public Flashcard(String question, String answer) {
            this.question = question;
            this.answer = answer;
        }

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }

        public String getAnswer() {
            return answer;
        }

        public void setAnswer(String answer) {
            this.answer = answer;
        }
    }
}
