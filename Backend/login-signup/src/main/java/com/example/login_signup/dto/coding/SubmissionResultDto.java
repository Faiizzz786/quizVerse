package com.example.login_signup.dto.coding;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class SubmissionResultDto {
    private boolean success;
    private List<TestCaseResult> testCaseResults;
    private String timeComplexity;
    private String spaceComplexity;
    private String optimizedCode;
    private String errorMessage;
    private LearningMaterials learningMaterials;

    @Data
    @NoArgsConstructor
    public static class TestCaseResult {
        private String input;
        private String expectedOutput;
        private String actualOutput;
        private boolean passed;
        private String executionTime;
        private String memoryUsed;

        public String getInput() {
            return input;
        }

        public void setInput(String input) {
            this.input = input;
        }

        public String getExpectedOutput() {
            return expectedOutput;
        }

        public void setExpectedOutput(String expectedOutput) {
            this.expectedOutput = expectedOutput;
        }

        public String getActualOutput() {
            return actualOutput;
        }

        public void setActualOutput(String actualOutput) {
            this.actualOutput = actualOutput;
        }

        public String getExecutionTime() {
            return executionTime;
        }

        public void setExecutionTime(String executionTime) {
            this.executionTime = executionTime;
        }

        public String getMemoryUsed() {
            return memoryUsed;
        }

        public void setMemoryUsed(String memoryUsed) {
            this.memoryUsed = memoryUsed;
        }

        public boolean isPassed() {
            return passed;
        }

        public void setPassed(boolean passed) {
            this.passed = passed;
        }
    }

    @Data
    @NoArgsConstructor
    public static class LearningMaterials {
        private String conceptExplanation;
        private List<String> tipsTricks;
        private String furtherReadingResources;

        public String getConceptExplanation() {
            return conceptExplanation;
        }

        public void setConceptExplanation(String conceptExplanation) {
            this.conceptExplanation = conceptExplanation;
        }

        public List<String> getTipsTricks() {
            return tipsTricks;
        }

        public void setTipsTricks(List<String> tipsTricks) {
            this.tipsTricks = tipsTricks;
        }

        public String getFurtherReadingResources() {
            return furtherReadingResources;
        }

        public void setFurtherReadingResources(String furtherReadingResources) {
            this.furtherReadingResources = furtherReadingResources;
        }
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
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

    public String getOptimizedCode() {
        return optimizedCode;
    }

    public void setOptimizedCode(String optimizedCode) {
        this.optimizedCode = optimizedCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public List<TestCaseResult> getTestCaseResults() {
        return testCaseResults;
    }

    public void setTestCaseResults(List<TestCaseResult> testCaseResults) {
        this.testCaseResults = testCaseResults;
    }

    public LearningMaterials getLearningMaterials() {
        return learningMaterials;
    }

    public void setLearningMaterials(LearningMaterials learningMaterials) {
        this.learningMaterials = learningMaterials;
    }
}
