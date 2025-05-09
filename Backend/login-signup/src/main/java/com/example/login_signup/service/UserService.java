package com.example.login_signup.service;

import com.example.login_signup.exception.CustomException;
import com.example.login_signup.model.*;
import com.example.login_signup.repository.LoginAttemptRepository;
import com.example.login_signup.repository.PasswordResetTokenRepository;
import com.example.login_signup.repository.UserRepository;
import com.example.login_signup.repository.JwtTokenRepository;
import com.example.login_signup.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;
    private final Map<String, Integer> loginAttempts = new ConcurrentHashMap<>();
    private final JwtUtil jwtUtil;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       JavaMailSender mailSender, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
        this.jwtUtil = jwtUtil;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }



    public String registerUser(User user) {
        // Validate email format
        if (!isValidEmail(user.getEmail())) {
            throw new CustomException("Invalid email format", HttpStatus.BAD_REQUEST.value());
        }

        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new CustomException("Email already exists", HttpStatus.BAD_REQUEST.value());
        }

        // Validate password
        if (!isValidPassword(user.getPassword())) {
            throw new CustomException(
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character.",
                    HttpStatus.BAD_REQUEST.value());
        }

        // Encrypt password and set verification token
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setVerificationToken(UUID.randomUUID().toString());
        user.setVerified(false);
        userRepository.save(user);

        // Send verification email
        sendVerificationEmail(user);
        return "Registration successful! Verify your email.";
    }

    public String verifyEmail(String token) {
        Optional<User> optionalUser = userRepository.findByVerificationToken(token);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setVerified(true);
            user.setVerificationToken(null);
            userRepository.save(user);
            return "Email verification successful!";
        } else {
            throw new CustomException("Invalid or expired verification token.", HttpStatus.BAD_REQUEST.value());
        }
    }

    @Autowired
    private JwtTokenRepository jwtTokenRepository;

//    public JwtToken authenticateUser(String email, String password) {
//        System.out.println("Inside authenticateUser method");
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new CustomException("User not found", HttpStatus.BAD_REQUEST.value()));
//        System.out.println("User found: " + user.getEmail());
//        if (!user.isVerified()) {
//            throw new CustomException("Please verify your email before logging in.", HttpStatus.FORBIDDEN.value());
//        }
//
//        if (!passwordEncoder.matches(password, user.getPassword())) {
//            trackFailedLogin(email);
//            throw new CustomException("Invalid credentials", HttpStatus.UNAUTHORIZED.value());
//        }
//
//        resetFailedLoginAttempts(email);
//        // String token = jwtUtil.generateToken(email);
//        // return new JwtToken(token);
//
//        String token = jwtUtil.generateToken(email);
//        System.out.println("Generated JWT Token: " + token);
//        JwtToken jwtToken = new JwtToken(email, token);
//        jwtTokenRepository.save(jwtToken); // ✅ Save token in DB
//
//        return jwtToken;
//    }
public JwtToken authenticateUser(String email, String password) {
    try {
        // Log entry into the method
        System.out.println("Inside authenticateUser method");

        // Check if user exists in the database
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    // Log failure if user is not found
                    System.out.println("User not found with email: " + email);
                    return new CustomException("User not found", HttpStatus.BAD_REQUEST.value());
                });
        // Log user information
        System.out.println("User found: " + user.getEmail());
        System.out.println("User verification status: " + user.isVerified());

        // Log if the user is verified
        if (!user.isVerified()) {
            System.out.println("User " + email + " is not verified.");
            throw new CustomException("Please verify your email before logging in.", HttpStatus.FORBIDDEN.value());
        }
        System.out.println("User verification check passed");

        // Log password matching check
        boolean passwordMatches = passwordEncoder.matches(password, user.getPassword());
        System.out.println("Password match check: " + passwordMatches);

        // If password does not match, log and track failed login
        if (!passwordMatches) {
            trackFailedLogin(email);
            System.out.println("Invalid credentials for user: " + email);
            throw new CustomException("Invalid credentials", HttpStatus.UNAUTHORIZED.value());
        }
        System.out.println("Password validation passed");

        // Log before resetting failed login attempts
        System.out.println("Resetting failed login attempts for: " + email);

        try {
            resetFailedLoginAttempts(email);
            System.out.println("Successfully reset failed login attempts");
        } catch (Exception e) {
            System.out.println("Error in resetFailedLoginAttempts: " + e.getMessage());
            e.printStackTrace();
        }

        System.out.println("Before checking account lock status");
        // Check if account is locked
        Optional<LoginAttempt> loginAttemptOptional = loginAttemptRepository.findByEmail(email);
        if (loginAttemptOptional.isPresent()) {
            LoginAttempt loginAttempt = loginAttemptOptional.get();
            System.out.println("Login attempt record found: locked=" + loginAttempt.isLocked() +
                    ", failedAttempts=" + loginAttempt.getFailedAttempts() +
                    ", lockTime=" + loginAttempt.getLockTime());

            if (loginAttempt.isLocked()) {
                System.out.println("User account is locked: " + email);
                throw new CustomException("Account is locked due to multiple failed attempts", HttpStatus.FORBIDDEN.value());
            }
        } else {
            System.out.println("No login attempt record found for user");
        }

        System.out.println("Account lock check passed");

        // Generate JWT token
        System.out.println("About to generate JWT token");
        String token = jwtUtil.generateToken(email);
        // Log the generated token (only log token generation, don't log the full token for security reasons)
        System.out.println("Generated JWT Token for email: " + email);

        // Create JwtToken object
        JwtToken jwtToken = new JwtToken(email, token);
        System.out.println("JwtToken object created");

        // Save token in DB and log the action
        System.out.println("About to save token in DB");
        jwtTokenRepository.save(jwtToken);
        System.out.println("JWT Token saved in DB for user: " + email);

        // Return the JwtToken object
        System.out.println("Authentication successful, returning token");
        return jwtToken;
    } catch (Exception e) {
        System.out.println("Unexpected exception in authenticateUser: " + e.getMessage());
        e.printStackTrace();
        throw e;
    }
}


    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    private boolean isValidPassword(String password) {
        // Password must contain at least one uppercase letter, one digit, and one
        // special character
        return password.matches("^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
    }

    private boolean isValidEmail(String email) {
        // Regex for basic email validation
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@" +
                "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    private void sendVerificationEmail(User user) {
        String subject = "Email Verification";
        String verificationUrl = "http://localhost:9099/api/auth/verify?token=" + user.getVerificationToken();
        String message = "Hello " + user.getName() + ",\n\nPlease verify your email by clicking the link below:\n"
                + verificationUrl +
                "\n\nIf you did not register, please ignore this email.";

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailMessage.setFrom("your_email@gmail.com");

        mailSender.send(mailMessage);
    }

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    // Request Password Reset (forgot password)
    public String requestPasswordReset(String email) {
        System.out.println("Received email: " + email);
        // User user = userRepository.findByEmail(email)
        // .orElseThrow(() -> new CustomException("User not found", 400));

        System.out.println("🔍 Received email for reset: [" + email + "]"); // Debug log

        if (email == null || email.trim().isEmpty()) {
            throw new CustomException("Email cannot be empty", 400);
        }

        Optional<User> userOpt = userRepository.findByEmail(email.trim());
        if (userOpt.isEmpty()) {
            System.out.println("❌ No user found with email: [" + email + "]");
            throw new CustomException("User not found", 400);
        }

        User user = userOpt.get();
        System.out.println("✅ User found: " + user.getEmail());

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setEmail(email);
        resetToken.setToken(token);
        resetToken.setExpiryDate(new Timestamp(System.currentTimeMillis() + 3600000)); // Token valid for 1 hour
        passwordResetTokenRepository.save(resetToken);

        // Send email with token
        sendResetEmail(user, token);
        return "Password reset email sent!";
    }

    // Reset Password using token
    public boolean verifyResetToken(String token) {
        Optional<PasswordResetToken> tokenOptional = passwordResetTokenRepository.findByToken(token);
        return tokenOptional.isPresent();
    }

    public String resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new CustomException("Invalid or expired token", 400));

        if (resetToken.getExpiryDate().before(new Timestamp(System.currentTimeMillis()))) {
            throw new CustomException("Token has expired", 400);
        }

        User user = userRepository.findByEmail(resetToken.getEmail())
                .orElseThrow(() -> new CustomException("User not found", 400));

        // Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Delete the token (once it's used)
        passwordResetTokenRepository.delete(resetToken);

        return "Password successfully reset!";
    }

    private void sendResetEmail(User user, String token) {
        String resetUrl = "http://localhost:9099/api/auth/reset-password?token=" + token;
        String subject = "Password Reset Request";
        String message = "Hello " + user.getName() + ",\n\n" +
                "To reset your password, click the link below:\n" +
                resetUrl +
                "\n\nIf you did not request a password reset, please ignore this email.";

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailMessage.setFrom("your_email@gmail.com");

        mailSender.send(mailMessage);
    }

    // private void trackFailedLogin(String email) {
    // loginAttempts.put(email, loginAttempts.getOrDefault(email, 0) + 1);
    // if (loginAttempts.get(email) >= 5) {
    // throw new CustomException("Account locked due to multiple failed login
    // attempts.", HttpStatus.LOCKED.value());
    // }
    // }
    @Autowired
    private LoginAttemptRepository loginAttemptRepository;

    public void trackFailedLogin(String email) {
        LoginAttempt loginAttempt = loginAttemptRepository.findById(email)
                .orElse(new LoginAttempt(email));

        loginAttempt.setFailedAttempts(loginAttempt.getFailedAttempts() + 1);

        if (loginAttempt.getFailedAttempts() >= 5) {
            loginAttempt.setLocked(true);
            loginAttempt.setLockTime(new Timestamp(System.currentTimeMillis()));
            loginAttemptRepository.save(loginAttempt);
            throw new CustomException("Account locked due to multiple failed login attempts.",
                    HttpStatus.LOCKED.value());
        } else {
            loginAttemptRepository.save(loginAttempt);
        }
    }

    public void resetFailedLoginAttempts(String email) {
        LoginAttempt loginAttempt = loginAttemptRepository.findById(email)
                .orElse(null); // Instead of throwing exception

        if (loginAttempt != null) {
            loginAttempt.setFailedAttempts(0);
            loginAttempt.setLocked(false);
            loginAttempt.setLockTime(null);
            loginAttemptRepository.save(loginAttempt);
            System.out.println("Reset failed login attempts for: " + email);
        } else {
            // No login attempt record exists - this is fine
            System.out.println("No login attempt record to reset for: " + email);
        }
    }

    public boolean isAccountLocked(LoginAttempt loginAttempt) {
        if (loginAttempt.isLocked()) {
            long lockDuration = 30 * 60 * 1000; // 30 minutes
            long timeSinceLock = System.currentTimeMillis() - loginAttempt.getLockTime().getTime();
            if (timeSinceLock > lockDuration) {
                // Unlock account after cooldown
                loginAttempt.setLocked(false);
                loginAttempt.setFailedAttempts(0);
                loginAttempt.setLockTime(null);
                loginAttemptRepository.save(loginAttempt);
                return false; // Account unlocked
            }
            return true; // Account still locked
        }
        return false; // Account not locked
    }

}
