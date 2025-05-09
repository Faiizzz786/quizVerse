package com.example.login_signup.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class HintService {

    @Value("${gemini.api.url:https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent}")
    private String geminiApiUrl;

    @Value("${gemini.api.key:your-gemini-api-key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public HintService() {
        this.restTemplate = new RestTemplate();
    }

    public String generateHint(String word, int level, String hintType) {
        return switch (hintType.toLowerCase()) {
            case "definition" -> getFromGemini("Give only a fun and indirect definition for the word: " + word + ". Do not reveal the word.");
            case "synonym" -> getFromGemini("Give only a synonym for the word: " + word + ". Do not say the original word.");
            case "category" -> getFromGemini("Tell what category the word belongs to, but do not reveal or repeat the word '" + word + "'.");
            case "emoji" -> getFromGemini("Give only emoji clues that represent the word '" + word + "', but do not say the word itself.");
            case "riddle" -> getFromGemini("Create a clever riddle where the answer is '" + word + "', but do not say the answer.");
            case "haiku" -> getFromGemini("Write a haiku that indirectly describes the word '" + word + "' without revealing it.");

            case "funny-description" -> getFromGemini("Give a funny and exaggerated description of the word: " + word + ". Make it humorous, but do not reveal the word.");
            case "animal-analogy" -> getFromGemini("Describe the word: " + word + " as if it were an animal. Do not reveal the word.");
            case "superhero-power" -> getFromGemini("Describe the word: " + word + " as if it had a superpower. Do not reveal the word.");
            case "historical-figure" -> getFromGemini("Describe the word: " + word + " as if it were a famous historical figure. Do not reveal the word.");

            default -> "No hint available.";

        };

    }

    private final Set<String> usedWords = new HashSet<>();

    public String generateWord(int level) {
        int attempts = 0;
        String word;

        do {
            String prompt = """
            Generate a unique and creative English word for a word unscramble game.
            Difficulty level: %d. Only return the word, no explanation.
            Avoid commonly repeated words like 'apple', 'table', 'chair'.
            Use less obvious but still valid words appropriate to the level.
        """.formatted(level);

            word = getFromGemini(prompt).toLowerCase().replaceAll("[^a-z]", ""); // sanitize
            attempts++;
        } while (usedWords.contains(word) && attempts < 5);

        usedWords.add(word);
        return word;
    }


    public String scrambleWord(String word) {
        List<Character> characters = word.chars().mapToObj(c -> (char) c).collect(Collectors.toList());
        Collections.shuffle(characters);
        StringBuilder scrambled = new StringBuilder();
        characters.forEach(scrambled::append);
        return scrambled.toString();
    }

    private String getFromGemini(String prompt) {
        String requestBody = """
        {
          "contents": [{
            "parts": [{"text": "%s"}]
          }]
        }
        """.formatted(prompt);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(geminiApiUrl + "?key=" + apiKey, entity, String.class);

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response.getBody());
            return root.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText("Could not generate response.");
        } catch (Exception e) {
            return "Error parsing Gemini response.";
        }
    }
}
