package com.example.login_signup.dto;

public class ResetPasswordRequest {
    private String token;
    private String newPassword;


    public ResetPasswordRequest() {}


    public ResetPasswordRequest(String token, String newPassword) {
        this.token = token;
        this.newPassword = newPassword;
    }


    public String getToken() {
        return token;
    }

    public String getNewPassword() {
        return newPassword;
    }


    public void setToken(String token) {
        this.token = token;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
    @Override
    public String toString() {
        return "ResetPasswordRequest{" +
                "token='" + token + '\'' +
                ", newPassword='" + newPassword + '\'' +
                '}';
    }
}
