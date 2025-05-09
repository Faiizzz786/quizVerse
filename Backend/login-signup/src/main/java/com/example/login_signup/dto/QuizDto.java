package com.example.login_signup.dto;

public class QuizDto {
    private Integer id;
    private String title;
    private String category;
    private int questionCount;

    public QuizDto(Integer id, String title, String category, int questionCount) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.questionCount = questionCount;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getQuestionCount() {
        return questionCount;
    }

    public void setQuestionCount(int questionCount) {
        this.questionCount = questionCount;
    }
}
