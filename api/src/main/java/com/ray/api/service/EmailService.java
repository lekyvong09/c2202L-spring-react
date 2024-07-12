package com.ray.api.service;

public interface EmailService {
    void sendSimpleMessage(String to, String subject, String text);
}
