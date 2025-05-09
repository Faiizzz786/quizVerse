//package com.example.login_signup.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//import java.util.List;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//    @Bean
//    public RestTemplate restTemplate() {
//        return new RestTemplate();
//    }
//
//
//    @Autowired
//    private JwtRequestFilter jwtRequestFilter;
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        return http
//                .csrf(csrf -> csrf.disable()) // Disable CSRF for API-based authentication
//                .cors(cors -> cors.configurationSource(request -> {
//                    var corsConfig = new org.springframework.web.cors.CorsConfiguration();
//                    corsConfig.setAllowedOrigins(List.of("http://localhost:3000"));
//                    corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
//                    corsConfig.setAllowedHeaders(List.of("*"));
//                    corsConfig.setAllowCredentials(true); // Set this to true
//                    return corsConfig;
//                }))
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/auth/register", "/api/auth/login", "/api/auth/verify" , "/api/auth/forgot-password", "/api/auth/reset-password","/api/auth/logout","/api/question/**", "/quiz/**", "/quiz/learning-materials-alt/**","api/game/**","/ws/**").permitAll()
//                        .anyRequest().authenticated()
//                )
//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
//                .build();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
//        return authConfig.getAuthenticationManager();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://localhost:3000")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE")
//                        .allowedHeaders("*")
//                        .allowCredentials(true);
//
//            }
//        };
//    }
//}



package com.example.login_signup.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(request -> {
                    var corsConfig = new org.springframework.web.cors.CorsConfiguration();
                    corsConfig.setAllowedOrigins(List.of("http://localhost:3000")); // ✅ no wildcard
                    corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
                    corsConfig.setAllowedHeaders(List.of("*"));
                    corsConfig.setAllowCredentials(true);
                    return corsConfig;
                }))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/auth/register", "/api/auth/login", "/api/auth/verify",
                                "/api/auth/forgot-password", "/api/auth/reset-password",
                                "/api/auth/logout", "/api/question/**", "/quiz/**",
                                "/quiz/learning-materials-alt/**", "api/game/**", "/ws/**","api/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

