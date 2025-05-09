package com.example.login_signup.model;



import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;

    // @ManyToMany
    @ManyToMany(fetch = FetchType.EAGER) // Force it to load questions
    private List<Question> questions;

//    private List<Question> questions;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}


