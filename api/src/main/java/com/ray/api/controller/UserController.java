package com.ray.api.controller;

import com.ray.api.constant.FileConstant;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;

@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/user")
public class UserController {
    @GetMapping(path = "/image/profile/{username}", produces = IMAGE_JPEG_VALUE)
    public byte[] getTempProfileImage(@PathVariable("username") String username) throws IOException {
        URL url = new URL("https://robohash.org/" + username);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try (InputStream inputStream = url.openStream()) {
            byte[] chunk = new byte[1024];

            int bytesRead;
            while ((bytesRead = inputStream.read(chunk)) > 0) {
                byteArrayOutputStream.write(chunk, 0, bytesRead);
            }
        }
        return byteArrayOutputStream.toByteArray();
    }

    @GetMapping(path = "/image/{username}/{fileName}", produces = IMAGE_JPEG_VALUE)
    public byte[] getProfileImage(@PathVariable("username") String username, @PathVariable("fileName") String fileName) throws IOException {
        return Files.readAllBytes(Paths.get(FileConstant.USER_FOLDER + username + File.separator + fileName));
    }
}
