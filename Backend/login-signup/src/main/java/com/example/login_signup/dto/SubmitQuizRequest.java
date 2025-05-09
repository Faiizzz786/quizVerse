package com.example.login_signup.dto;

import com.example.login_signup.model.Response;

import java.util.List;

public class SubmitQuizRequest {
    private  String email;
    private List<Response> responses;
    private long timeTakenInSeconds;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getters and Setters
    public List<Response> getResponses() {
        return responses;
    }

    public void setResponses(List<Response> responses) {
        this.responses = responses;
    }

    public long getTimeTakenInSeconds() {
        return timeTakenInSeconds;
    }

    public void setTimeTakenInSeconds(long timeTakenInSeconds) {
        this.timeTakenInSeconds = timeTakenInSeconds;
    }
}

