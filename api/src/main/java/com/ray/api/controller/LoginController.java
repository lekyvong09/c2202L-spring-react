package com.ray.api.controller;

import com.ray.api.constant.SecurityConstant;
import com.ray.api.dao.UserRepository;
import com.ray.api.dto.BasketDto;
import com.ray.api.entity.domain.User;
import com.ray.api.entity.domain.UserPrincipal;
import com.ray.api.service.BasketService;
import com.ray.api.utility.JWTTokenProvider;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

//@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class LoginController {
    private final UserRepository userRepository;
    private final JWTTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final BasketService basketService;

    @Autowired
    public LoginController(UserRepository userRepository,
                           JWTTokenProvider jwtTokenProvider,
                           AuthenticationManager authenticationManager, BasketService basketService) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
        this.basketService = basketService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user,
                                                     @CookieValue(name = "buyerId", defaultValue = "") String buyerId,
                                                     HttpServletResponse response) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        User loginUser = userRepository.findUserByUsername(user.getUsername());
        UserPrincipal userPrincipal = new UserPrincipal(loginUser);

        BasketDto basketDto = basketService.getBasket(buyerId, userPrincipal.getUsername(), response);
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("user", loginUser);
        responseBody.put("basket", basketDto);

        HttpHeaders jwtTokenHeader = new HttpHeaders();
        jwtTokenHeader.add(SecurityConstant.JWT_TOKEN_HEADER, jwtTokenProvider.generateJwtToken(userPrincipal));
        return new ResponseEntity<>(responseBody, jwtTokenHeader, HttpStatus.OK);
    }
}
