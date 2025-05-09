package com.example.login_signup.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;




@Entity
public class QuizResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer quizId;

    private String userEmail;

    private Integer score;

    private LocalDateTime submittedAt;

    private Long timeTakenInSeconds;

    @ElementCollection
    private List<String> selectedAnswers;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getQuizId() {
        return quizId;
    }

    public void setQuizId(Integer quizId) {
        this.quizId = quizId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public List<String> getSelectedAnswers() {
        return selectedAnswers;
    }

    public void setSelectedAnswers(List<String> selectedAnswers) {
        this.selectedAnswers = selectedAnswers;
    }

    public Long getTimeTakenInSeconds() {
        return timeTakenInSeconds;
    }

    public void setTimeTakenInSeconds(Long timeTakenInSeconds) {
        this.timeTakenInSeconds = timeTakenInSeconds;
    }
}


