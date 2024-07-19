package com.ray.api.service;

import com.ray.api.dto.BasketDto;
import jakarta.servlet.http.HttpServletResponse;

public interface BasketService {
    BasketDto getBasket(String cookieBuyerId,
                        String loggedInUsername,
                        HttpServletResponse response);
}
