package com.example.login_signup.repository;

import com.example.login_signup.model.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByUserEmail(String email);
}

