package com.example.login_signup.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


import java.sql.Timestamp;

@Entity
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Timestamp getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Timestamp expiryDate) {
        this.expiryDate = expiryDate;
    }

    private String token;
    private String email;
    private Timestamp expiryDate;

    // getters and setters
}
