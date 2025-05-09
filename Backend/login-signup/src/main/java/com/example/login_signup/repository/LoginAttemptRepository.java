package com.example.login_signup.repository;

import com.example.login_signup.model.LoginAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoginAttemptRepository extends JpaRepository<LoginAttempt, String> {
    Optional<LoginAttempt> findByEmail(String email);
}

