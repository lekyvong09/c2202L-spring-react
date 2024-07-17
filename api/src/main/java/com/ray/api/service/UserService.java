package com.ray.api.service;

import com.ray.api.entity.domain.User;
import com.ray.api.exception.CustomRuntimeException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    User addNewUser(User user, String[] role, MultipartFile profileImage) throws IOException;
    User updateUser(User user, String[] role, MultipartFile profileImage) throws IOException;
    void resetPassword(String email) throws CustomRuntimeException;
    void deleteUser(long id) throws CustomRuntimeException, IOException;
    User register(User user);
}
