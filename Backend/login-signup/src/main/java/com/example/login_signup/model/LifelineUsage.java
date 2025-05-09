package com.example.login_signup.model;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LifelineUsage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String lifelineType;
    private boolean used;

    // Default constructor required by JPA
    public LifelineUsage() {
    }

    public LifelineUsage(String userId, String lifelineType, boolean used) {
        this.userId = userId;
        this.lifelineType = lifelineType;
        this.used = used;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getLifelineType() {
        return lifelineType;
    }

    public void setLifelineType(String lifelineType) {
        this.lifelineType = lifelineType;
    }

    public boolean isUsed() {
        return used;
    }

    public void setUsed(boolean used) {
        this.used = used;
    }
}
