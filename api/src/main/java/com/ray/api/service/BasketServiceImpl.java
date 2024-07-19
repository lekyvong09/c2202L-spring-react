package com.ray.api.service;

import com.google.common.base.Strings;
import com.ray.api.dao.BasketRepository;
import com.ray.api.dto.BasketDto;
import com.ray.api.dto.BasketItemDto;
import com.ray.api.entity.Basket;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;
import java.util.stream.Collectors;

public class BasketServiceImpl implements BasketService {
    private final BasketRepository basketRepository;

    @Autowired
    public BasketServiceImpl(BasketRepository basketRepository) {
        this.basketRepository = basketRepository;
    }

    @Override
    public BasketDto getBasket(String cookieBuyerId, String loggedInUsername, HttpServletResponse response) {
        /// not provide JWT token , loggedInUsername is "anonymousUser"
        String buyer = !"anonymousUser".equals(loggedInUsername)
                            ? loggedInUsername
                            : Strings.isNullOrEmpty(cookieBuyerId)
                                ? UUID.randomUUID().toString()
                                : cookieBuyerId;

        List<Basket> tempBasketList = basketRepository.findByBuyerId(cookieBuyerId);
        List<Basket> userBasketList = "anonymousUser".equals(loggedInUsername)
                                        ? new ArrayList<>()
                                        : basketRepository.findByBuyerId(loggedInUsername);
        boolean isTempBasketEmpty = tempBasketList.isEmpty() || tempBasketList.get(0).getBasketItems().isEmpty();
        boolean isUserBasketEmpty = userBasketList.isEmpty() || userBasketList.get(0).getBasketItems().isEmpty();

        Basket basket;

        if (isTempBasketEmpty && !isUserBasketEmpty) {
            basket = userBasketList.get(0);
        } else if (!isTempBasketEmpty) {
            if (!isUserBasketEmpty && !cookieBuyerId.equals(loggedInUsername)) {
                basketRepository.deleteById(userBasketList.get(0).getId());
            }
            basket = tempBasketList.get(0);
            basket.setBuyerId(buyer);
        } else {
            if (tempBasketList.isEmpty()) {
                Cookie cookie = new Cookie("buyerId", buyer);
                cookie.setMaxAge(30 * 24 * 60 * 60);
                cookie.setPath("/");
                response.addCookie(cookie);
                basket = new Basket(buyer);
                basket.setBasketItems(new HashSet<>());
            } else {
                basket = tempBasketList.get(0);
                basket.setBuyerId(buyer);
            }
        }

        Basket returnBasket = basketRepository.save(basket);
        List<BasketItemDto> basketItemDtoList = returnBasket.getBasketItems()
                .stream().map(item -> new BasketItemDto(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getProduct().getUnitPrice(),
                        item.getProduct().getImageUrl(),
                        item.getProduct().getBrand(),
                        item.getProduct().getCategory().getCategoryName(),
                        item.getQuantity()
                ))
                .sorted(Comparator.comparingLong(i -> i.getProductId()))
                .collect(Collectors.toList());

        BasketDto basketDto = new BasketDto();
        basketDto.setId(returnBasket.getId());
        basketDto.setBuyerId(returnBasket.getBuyerId());
        basketDto.setBasketItems(basketItemDtoList);

        return basketDto;
    }
}
