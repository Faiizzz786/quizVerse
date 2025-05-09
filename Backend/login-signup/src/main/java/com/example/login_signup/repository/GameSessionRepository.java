package com.example.login_signup.repository;

import com.example.login_signup.model.GameSession;
import com.example.login_signup.model.GameStatus;
import com.example.login_signup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// GameSessionRepository.java
public interface GameSessionRepository extends JpaRepository<GameSession, String> {
    List<GameSession> findByStatus(GameStatus status);
    List<GameSession> findByParticipantsContaining(User user);
}
