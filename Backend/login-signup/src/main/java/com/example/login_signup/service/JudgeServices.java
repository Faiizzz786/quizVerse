package com.example.login_signup.service;



import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class JudgeServices {

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://judge0-ce.p.rapidapi.com")
            .defaultHeader("X-RapidAPI-Key", "<e8ebeb3b17msh897b9aef6b96d0fp165e47jsn1b3f4f587119>")
            .defaultHeader("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com")
            .build();

    public Mono<Map> submitCode(String sourceCode, String language, String input, String expectedOutput) {
        return webClient.post()
                .uri("/submissions?base64_encoded=false&wait=true")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of(
                        "language_id", getLanguageId(language),
                        "source_code", sourceCode,
                        "stdin", input,
                        "expected_output", expectedOutput
                ))
                .retrieve()
                .bodyToMono(Map.class);
    }

    private int getLanguageId(String language) {
        return switch (language.toLowerCase()) {
            case "cpp" -> 54;
            case "java" -> 62;
            case "python" -> 71;
            case "javascript" -> 63;
            default -> throw new IllegalArgumentException("Unsupported language: " + language);
        };
    }
}

