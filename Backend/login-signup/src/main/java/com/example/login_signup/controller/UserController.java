package com.example.login_signup.controller;
import com.example.login_signup.dto.ResetPasswordRequest;
import com.example.login_signup.model.JwtToken;
import com.example.login_signup.model.LoginAttempt;
import com.example.login_signup.repository.JwtTokenRepository;
import com.example.login_signup.repository.LoginAttemptRepository;
import com.example.login_signup.model.User;
import com.example.login_signup.service.RateLimiterService;
import com.example.login_signup.service.UserService;

import io.github.bucket4j.Bucket;
import jakarta.persistence.EntityManager;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam String token) {
        try {
            String message = userService.verifyEmail(token);
            return ResponseEntity.ok("<html><body style='text-align:center; font-family:Arial; margin-top:50px;'>" +
                    "<h2 style='color:green;'>✅ Email Verified Successfully!</h2>" +
                    "<p>You can now login to your account.</p>" +
                    "<a href='http://localhost:3000/login' style='padding:10px 20px; background-color:blue; color:white; text-decoration:none; border-radius:5px;'>Go to Login</a>" +
                    "</body></html>");
        } catch (ResponseStatusException ex) {
            return ResponseEntity.status(ex.getStatusCode()).body("<html><body style='text-align:center; font-family:Arial; margin-top:50px;'>" +
                    "<h2 style='color:red;'>❌ Invalid or Expired Token!</h2>" +
                    "<p>Please check your email or request a new verification link.</p>" +
                    "</body></html>");
        }
    }
    @Autowired
    private LoginAttemptRepository loginAttemptRepository;
    @Autowired
    private RateLimiterService rateLimiterService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest, HttpServletRequest request) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        String ip = request.getRemoteAddr();
        Bucket bucket = rateLimiterService.resolveBucket(ip);
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(Map.of(
                    "error", "Too many requests. Try again later."
            ));
        }
        LoginAttempt loginAttempt = loginAttemptRepository.findById(email).orElse(null);

        if (loginAttempt != null && userService.isAccountLocked(loginAttempt)) {  // ✅ Use userService
            long remainingTime = (loginAttempt.getLockTime().getTime() + 30 * 60 * 1000) - System.currentTimeMillis();
            return ResponseEntity.status(HttpStatus.LOCKED).body(Map.of(
                    "error", "Account is locked due to multiple failed login attempts.",
                    "locked", true,
                    "remainingTime", remainingTime
            ));
        }

        try {
//            JwtToken jwtResponse = userService.authenticateUser(email, password);
//            userService.resetFailedLoginAttempts(email);
//            return ResponseEntity.ok(jwtResponse);
            JwtToken jwtResponse = userService.authenticateUser(email, password);
            userService.resetFailedLoginAttempts(email);

            return ResponseEntity.ok(Map.of("token", jwtResponse.getToken()));
        } catch (RuntimeException e) {
            // userService.trackFailedLogin(email); // ✅ Use userService
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
        }
    }

    @Autowired
    private JwtTokenRepository jwtTokenRepository;

    @Transactional
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid token"));
        }

        String token = authHeader.substring(7).trim(); // Remove "Bearer " and trim whitespace
        System.out.println("Received Token: '" + token + "'");

        try {
            jwtTokenRepository.deleteByToken(token);
            return ResponseEntity.ok(Collections.singletonMap("message", "Successfully logged out"));
        } catch (Exception e) {
            System.err.println("Error deleting token: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Failed to process logout"));
        }
    }
//@Autowired
//private EntityManager entityManager;
//
//    @Transactional
//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid token"));
//        }
//
//        String token = authHeader.substring(7).trim();
//        System.out.println("Attempting to delete token: '" + token + "'");
//
//        // Execute a direct delete query
//        int deletedCount = entityManager.createQuery(
//                        "DELETE FROM JwtToken j WHERE j.token = :token")
//                .setParameter("token", token)
//                .executeUpdate();
//
//        System.out.println("Deleted " + deletedCount + " tokens");
//
//        return ResponseEntity.ok(Collections.singletonMap("message",
//                "Logout processed. Deleted " + deletedCount + " tokens"));
//    }












    // Forgot Password - Request password reset
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email cannot be empty!");
        }

        Optional<User> userOptional = userService.findByEmail(email.trim());
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found!");
        }

        User user = userOptional.get();
        if (!user.isVerified()) {
            return ResponseEntity.badRequest().body("You are not verified yet. Please verify your email first.");
        }

        return ResponseEntity.ok(userService.requestPasswordReset(email.trim())); // ✅ Pass extracted email
    }

    // Reset Password - Use the token to reset password
    @GetMapping("/reset-password")
    public ResponseEntity<String> verifyResetToken(@RequestParam String token) {
        boolean isValid = userService.verifyResetToken(token);

        if (!isValid) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token");
        }

//        return ResponseEntity.ok("<html><body style='text-align:center; font-family:Arial; margin-top:50px;'>" +
//                "<h2 style='color:green;'>✅ Email Verified Successfully!</h2>" +
//                "<p>You can now login to your account.</p>" +
//                "<a href='http://localhost:3000/reset-password' style='padding:10px 20px; background-color:blue; color:white; text-decoration:none; border-radius:5px;'>Go to Login</a>" +
//                "</body></html>");
        return ResponseEntity.ok("<html><body style='text-align:center; font-family:Arial; margin-top:50px;'>" +
                "<h2 style='color:green;'>✅ Token Verified Successfully!</h2>" +
                "<p>You can now reset your password.</p>" +
                "<a href='http://localhost:3000/reset-password?token=" + token +
                "' style='padding:10px 20px; background-color:blue; color:white; text-decoration:none; border-radius:5px;'>Reset Password</a>" +
                "</body></html>");

    }
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        System.out.println("Full Request Body: " + request); // ✅ Debugging
        System.out.println("Received token: " + request.getToken());  // ✅ Check token
        System.out.println("New password: " + request.getNewPassword());

        if (request.getToken() == null || request.getToken().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token is missing in the request");
        }
        return ResponseEntity.ok(userService.resetPassword(request.getToken(), request.getNewPassword()));
    }



}
