package com.example.login_signup.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.sql.Timestamp;
@Entity
public class LoginAttempt {



    @Id
    private String email;  // Email as the primary key
    private int failedAttempts;
    private boolean locked;
    private Timestamp lockTime;

    // No-argument constructor required by JPA
    public LoginAttempt() {}

    // Constructor to initialize email
    public LoginAttempt(String email) {
        this.email = email;
        this.failedAttempts = 0;  // Initialize failed attempts to 0
        this.locked = false;      // Account not locked by default
        this.lockTime = null;     // No lock time initially
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getFailedAttempts() {
        return failedAttempts;
    }

    public void setFailedAttempts(int failedAttempts) {
        this.failedAttempts = failedAttempts;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    public Timestamp getLockTime() {
        return lockTime;
    }

    public void setLockTime(Timestamp lockTime) {
        this.lockTime = lockTime;
    }

}
