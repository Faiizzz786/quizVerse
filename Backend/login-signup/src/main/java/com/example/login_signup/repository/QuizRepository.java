package com.example.login_signup.repository;

import com.example.login_signup.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz,Integer> {
    Optional<Quiz> findById(Integer id);

    @Query("SELECT q FROM Quiz q JOIN FETCH q.questions")
    List<Quiz> findAllWithQuestions();

}
