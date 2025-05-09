package com.example.login_signup.repository;


import com.example.login_signup.model.JwtToken;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

import java.util.Optional;

//public interface JwtTokenRepository extends JpaRepository<JwtToken, Long> {
//    Optional<JwtToken> findByToken(String token);
//    // Optional<JwtToken> findByEmail(String token);
//
//    void deleteByToken(String token);
//
//    void deleteAllByEmail(String email);
//
//}
public interface JwtTokenRepository extends JpaRepository<JwtToken, Long> {
    Optional<JwtToken> findByToken(String token);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Transactional
    void deleteByToken(String token);
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Transactional
    void deleteAllByEmail(String email);
}

