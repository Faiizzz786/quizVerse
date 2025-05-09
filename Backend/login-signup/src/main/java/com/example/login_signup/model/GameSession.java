package com.example.login_signup.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Entity
public class GameSession {
    @Id
    private String id;

    @PrePersist
    public void generateId() {
        if (this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
    }


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "game_participants",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> participants;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "host_id")
    private User host;

    private Date createdAt;
    private Date startedAt;
    private Date completedAt;

    @Enumerated(EnumType.STRING)
    private GameStatus status; // WAITING, IN_PROGRESS, COMPLETED

    @ElementCollection
    @CollectionTable(name = "game_scores",
            joinColumns = @JoinColumn(name = "game_id"))
    @MapKeyColumn(name = "user_id")
    @Column(name = "score")
    private Map<String, Integer> scores;

    // Fixed the problematic nested Map by using a proper structure
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "game_id")
    private List<LifelineUsage> lifelineUsages = new ArrayList<>();

    private int currentQuestionIndex;

    // No-args constructor required by JPA
    public GameSession() {
    }

    public GameSession(Quiz quiz, User host) {
        this.quiz = quiz;
        this.host = host;
        this.createdAt = Date.from(LocalDateTime.now()
                .atZone(ZoneId.systemDefault())
                .toInstant());
        this.participants = new ArrayList<>();
    }

    public Question getCurrentQuestion() {
        // Check if there are questions in the quiz
        if (quiz != null && quiz.getQuestions() != null && currentQuestionIndex < quiz.getQuestions().size()) {
            return quiz.getQuestions().get(currentQuestionIndex); // Get the current question by index
        }
        return null; // Or throw an exception, based on your design
    }

    public void updatePlayerScore(String userId, int points) {
        if (scores == null) {
            // Initialize scores map if it's null
            scores = new HashMap<>();
        }
        scores.put(userId, scores.getOrDefault(userId, 0) + points);
    }

    // New method to track lifeline usage
    public void useLifeline(String userId, String lifelineType) {
        LifelineUsage usage = new LifelineUsage(userId, lifelineType, true);
        lifelineUsages.add(usage);
    }

    // New method to check if a lifeline has been used
    public boolean hasUsedLifeline(String userId, String lifelineType) {
        for (LifelineUsage usage : lifelineUsages) {
            if (usage.getUserId().equals(userId) &&
                    usage.getLifelineType().equals(lifelineType) &&
                    usage.isUsed()) {
                return true;
            }
        }
        return false;
    }

    // New method to get all lifelines used by a player
    public List<String> getUsedLifelinesForPlayer(String userId) {
        List<String> used = new ArrayList<>();
        for (LifelineUsage usage : lifelineUsages) {
            if (usage.getUserId().equals(userId) && usage.isUsed()) {
                used.add(usage.getLifelineType());
            }
        }
        return used;
    }

    // Getters and setters
    public User getHost() {
        return host;
    }

    public void setHost(User host) {
        this.host = host;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<User> getParticipants() {
        return participants;
    }

    public void setParticipants(List<User> participants) {
        this.participants = participants;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public GameStatus getStatus() {
        return status;
    }

    public void setStatus(GameStatus status) {
        this.status = status;
    }

    public Map<String, Integer> getScores() {
        return scores;
    }

    public void setScores(Map<String, Integer> scores) {
        this.scores = scores;
    }

    public List<LifelineUsage> getLifelineUsages() {
        return lifelineUsages;
    }

    public void setLifelineUsages(List<LifelineUsage> lifelineUsages) {
        this.lifelineUsages = lifelineUsages;
    }

    public int getCurrentQuestionIndex() {
        return currentQuestionIndex;
    }

    public void setCurrentQuestionIndex(int currentQuestionIndex) {
        this.currentQuestionIndex = currentQuestionIndex;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime localDateTime) {
        this.startedAt = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }

    public Date getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Date completedAt) {
        this.completedAt = completedAt;
    }

    public void addParticipant(User user) {
        if (participants == null) {
            participants = new ArrayList<>();
        }
        participants.add(user);
    }
}