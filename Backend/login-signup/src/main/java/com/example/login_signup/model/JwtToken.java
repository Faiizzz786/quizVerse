//package com.example.login_signup.model;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "jwt_tokens")
//public class JwtToken {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false, unique = true)
//    private String token;
//
//    public JwtToken() {}
//
//    public JwtToken(String token) {
//        this.token = token;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public String getToken() {
//        return token;
//    }
//
//    public void setToken(String token) {
//        this.token = token;
//    }
//
//}



package com.example.login_signup.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "jwt_tokens")
public class JwtToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, unique = true, length = 512)
    private String token;

    @Column(nullable = false)
    private Timestamp createdAt;

    public JwtToken() {}

    public JwtToken(String email, String token) {
        this.email = email;
        this.token = token;
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getToken() {
        return token;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}






