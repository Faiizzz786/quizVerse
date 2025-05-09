package com.example.login_signup.controller;

import com.example.login_signup.service.HintService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/game")
public class ScrambledGameController {

    private final HintService hintService;

    public ScrambledGameController(HintService hintService) {
        this.hintService = hintService;
    }

    @GetMapping("/start")
    public ResponseEntity<Map<String, String>> startGame(@RequestParam int level) {
        String word = hintService.generateWord(level).toLowerCase().replaceAll("[^a-z]", ""); // sanitize
        String scrambled = hintService.scrambleWord(word);

        Map<String, String> response = new HashMap<>();
        response.put("scrambledWord", scrambled);
       response.put("originalWord", word); // Only send this for dev/testing; remove in production

        return ResponseEntity.ok(response);
    }

    @GetMapping("/hint")
    public ResponseEntity<String> getHint(
            @RequestParam String word,
            @RequestParam int level,
            @RequestParam String type
    ) {
        String hint = hintService.generateHint(word, level, type);
        return ResponseEntity.ok(hint);
    }
}

