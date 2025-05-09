package com.example.login_signup.security;



//import org.springframework.context.annotation.Configuration;
//import org.springframework.messaging.simp.config.MessageBrokerRegistry;
//import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
//import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
//import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
//
////@Configuration
////@EnableWebSocketMessageBroker
////public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
////
////    @Override
////    public void configureMessageBroker(MessageBrokerRegistry config) {
////        // Enable a simple in-memory broker
////        config.enableSimpleBroker("/topic", "/queue");
////        // Prefix for client-to-server messages
////        config.setApplicationDestinationPrefixes("/app");
////    }
////
////    @Override
////    public void registerStompEndpoints(StompEndpointRegistry registry) {
////        // Register the "/ws" endpoint for WebSocket connection
////        registry.addEndpoint("/ws").withSockJS();
////    }
////}
//
////@Configuration
////@EnableWebSocketMessageBroker
////public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
////
////    @Override
////    public void configureMessageBroker(MessageBrokerRegistry config) {
////        config.enableSimpleBroker("/topic", "/queue");
////        config.setApplicationDestinationPrefixes("/app");
////    }
////
////    @Override
////    public void registerStompEndpoints(StompEndpointRegistry registry) {
////        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
////    }
////}
//
//
//@Configuration
//@EnableWebSocketMessageBroker
//public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
//
//    @Override
//    public void configureMessageBroker(MessageBrokerRegistry config) {
//        config.enableSimpleBroker("/topic", "/queue");
//        config.setApplicationDestinationPrefixes("/app");
//    }
//
//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        // Add SockJS endpoint
//        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
//
//        // Also add a raw WebSocket endpoint
//        registry.addEndpoint("/ws/game/{gameId}")
//                .setAllowedOriginPatterns("*");
//    }
//}
//
//



import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // SockJS endpoint
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:3000")
                .withSockJS()
                .setClientLibraryUrl("https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js");

        // Raw WebSocket endpoint
        registry.addEndpoint("/ws/game/{gameId}")
                .setAllowedOrigins("http://localhost:3000");
    }
}