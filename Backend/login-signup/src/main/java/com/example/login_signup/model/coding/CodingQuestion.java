package com.example.login_signup.model.coding;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class CodingQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public List<Example> getExamples() {
        return examples;
    }

    public String getPythonTemplate() {
        return pythonTemplate;
    }

    public void setPythonTemplate(String pythonTemplate) {
        this.pythonTemplate = pythonTemplate;
    }

    public String getJavaTemplate() {
        return javaTemplate;
    }

    public void setJavaTemplate(String javaTemplate) {
        this.javaTemplate = javaTemplate;
    }

    public String getJavascriptTemplate() {
        return javascriptTemplate;
    }

    public void setJavascriptTemplate(String javascriptTemplate) {
        this.javascriptTemplate = javascriptTemplate;
    }

    public String getSolutionExplanation() {
        return solutionExplanation;
    }

    public void setSolutionExplanation(String solutionExplanation) {
        this.solutionExplanation = solutionExplanation;
    }

    public String getTimeComplexity() {
        return timeComplexity;
    }

    public void setTimeComplexity(String timeComplexity) {
        this.timeComplexity = timeComplexity;
    }

    public String getSpaceComplexity() {
        return spaceComplexity;
    }

    public void setSpaceComplexity(String spaceComplexity) {
        this.spaceComplexity = spaceComplexity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<TestCase> getTestCases() {
        return testCases;
    }

    public void setTestCases(List<TestCase> testCases) {
        this.testCases = testCases;
    }

    public void setExamples(List<Example> examples) {
        this.examples = examples;
    }

    @Column(columnDefinition = "TEXT")
    private String description;

    private String difficulty;
    private String category;

    @ElementCollection
    private List<Example> examples;

    public List<String> getConstraints() {
        return constraints;
    }

    public void setConstraints(List<String> constraints) {
        this.constraints = constraints;
    }

    @ElementCollection
    private List<String> constraints;

    @ElementCollection
    private List<TestCase> testCases;

    @Column(columnDefinition = "TEXT")
    private String pythonTemplate;

    @Column(columnDefinition = "TEXT")
    private String javaTemplate;

    @Column(columnDefinition = "TEXT")
    private String javascriptTemplate;

    @Column(columnDefinition = "TEXT")
    private String solutionExplanation;

    private String timeComplexity;
    private String spaceComplexity;

    @Embeddable
    @Data
//    @NoArgsConstructor
//    @AllArgsConstructor
    public static class Example {
        private String input;
        private String output;

        @Column(columnDefinition = "TEXT")
        private String explanation;
        public Example() {}

        public Example(String input, String output, String explanation) {
            this.input = input;
            this.output = output;
            this.explanation = explanation;
        }

    }

    @Embeddable
//    @Data
//    @NoArgsConstructor
//    @AllArgsConstructor
    public static class TestCase {
        private String input;
        private String output;

        public TestCase() {}

        public TestCase(String input, String output) {
            this.input = input;
            this.output = output;
        }

        public String getInput() {
            return input;
        }

        public void setInput(String input) {
            this.input = input;
        }

        public String getOutput() {
            return output;
        }

        public void setOutput(String output) {
            this.output = output;
        }
    }
}

