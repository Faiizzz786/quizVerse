package com.example.login_signup.dto.coding;

import com.example.login_signup.model.coding.CodingQuestion;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CodingQuestionDto {
    private Long id;



    private String title;
    private String description;
    private String difficulty;
    private String category;
    private List<com.example.login_signup.model.coding.CodingQuestion.Example> examples;
    private List<String> constraints;
    private Templates templates;




    @Data
    @NoArgsConstructor
    public static class Templates {
        private String python;
        private String java;
        private String javascript;

        public Templates(String python, String java, String javascript) {
            this.python = python;
            this.java = java;
            this.javascript = javascript;
        }
    }



    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<CodingQuestion.Example> getExamples() {
        return examples;
    }

    public void setExamples(List<CodingQuestion.Example> examples) {
        this.examples = examples;
    }

    public List<String> getConstraints() {
        return constraints;
    }

    public void setConstraints(List<String> constraints) {
        this.constraints = constraints;
    }

    public Templates getTemplates() {
        return templates;
    }

    public void setTemplates(Templates templates) {
        this.templates = templates;
    }
}
