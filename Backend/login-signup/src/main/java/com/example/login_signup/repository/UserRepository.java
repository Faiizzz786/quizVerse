package com.example.login_signup.repository;

import com.example.login_signup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Fixed the incorrect method signature
    // Removed this line: Optional<User> findById(Integer Long);
    // JpaRepository already provides findById(Long id)

    @Query("SELECT u FROM User u WHERE LOWER(TRIM(u.email)) = LOWER(TRIM(:email))")
    Optional<User> findByEmail(@Param("email") String email);

    boolean existsByEmail(String email);

    void deleteByEmail(@Param("email") String email);

    Optional<User> findByVerificationToken(String token);
}