package com.ray.api.service;

import com.ray.api.entity.domain.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    User addNewUser(User user, String[] role, MultipartFile profileImage) throws IOException;
    User updateUser(User user, String[] role, MultipartFile profileImage) throws IOException;
}
