package com.example.login_signup.repository.coding;

import com.example.login_signup.model.coding.CodingQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodingQuestionRepository extends JpaRepository<CodingQuestion, Long> {
    List<CodingQuestion> findByDifficulty(String difficulty);
    List<CodingQuestion> findByCategory(String category);
    List<CodingQuestion> findByDifficultyAndCategory(String difficulty, String category);
}
