package com.example.login_signup.dto;

public class AIQuizRequest {
    private String paragraph;
    private String category;
    private int numQ;
    private String title;

    // Getters and setters
    public String getParagraph() {
        return paragraph;
    }

    public void setParagraph(String paragraph) {
        this.paragraph = paragraph;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getNumQ() {
        return numQ;
    }

    public void setNumQ(int numQ) {
        this.numQ = numQ;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
