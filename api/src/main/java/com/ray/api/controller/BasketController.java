package com.ray.api.controller;

import com.ray.api.dao.BasketItemRepository;
import com.ray.api.dao.BasketRepository;
import com.ray.api.dao.ProductRepository;
import com.ray.api.dto.BasketDto;
import com.ray.api.dto.BasketItemDto;
import com.ray.api.entity.Basket;
import com.ray.api.entity.BasketItem;
import com.ray.api.entity.Product;
import jakarta.persistence.NoResultException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/baskets")
public class BasketController {
    private final ProductRepository productRepository;
    private final BasketRepository basketRepository;
    private final BasketItemRepository basketItemRepository;

    @Autowired
    public BasketController(ProductRepository productRepository, BasketRepository basketRepository, BasketItemRepository basketItemRepository) {
        this.productRepository = productRepository;
        this.basketRepository = basketRepository;
        this.basketItemRepository = basketItemRepository;
    }

    @GetMapping
    public ResponseEntity<BasketDto> getBasket(@CookieValue(name = "buyerId", defaultValue = "") String buyerId) {
        List<Basket> basketList = basketRepository.findByBuyerId(buyerId);

        if (basketList.isEmpty())
            throw new NoResultException("Cannot find the basket");

        List<BasketItemDto> basketItemDtoList = basketList.get(0).getBasketItems()
                .stream().map(item -> new BasketItemDto(
                    item.getProduct().getId(),
                    item.getProduct().getName(),
                    item.getProduct().getUnitPrice(),
                    item.getProduct().getImageUrl(),
                    item.getProduct().getBrand(),
                    item.getProduct().getCategory().getCategoryName(),
                    item.getQuantity()
                ))
                .collect(Collectors.toList());

        BasketDto basketDto = new BasketDto();
        basketDto.setId(basketList.get(0).getId());
        basketDto.setBuyerId(basketList.get(0).getBuyerId());
        basketDto.setBasketItems(basketItemDtoList);
        return new ResponseEntity<>(basketDto, HttpStatus.OK);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<BasketDto> addItemToBasket(@RequestParam("productId") Long productId,
                                                     @RequestParam("quantity") int quantity,
                                                     @CookieValue(name = "buyerId", defaultValue = "") String buyerId,
                                                     HttpServletResponse response) {
        Basket basket;

        List<Basket> basketList = basketRepository.findByBuyerId(buyerId);

        if (basketList == null || basketList.isEmpty()) {
            buyerId = UUID.randomUUID().toString();
            Cookie cookie = new Cookie("buyerId", buyerId);
            cookie.setMaxAge(30*24*60*60);
            response.addCookie(cookie);
            basket = new Basket(buyerId);
        } else {
            basket = basketList.get(0);
        }

        Product product = productRepository.findById(productId).get();
        basket.addItem(product, quantity);
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
                .collect(Collectors.toList());

        BasketDto basketDto = new BasketDto();
        basketDto.setId(returnBasket.getId());
        basketDto.setBuyerId(returnBasket.getBuyerId());
        basketDto.setBasketItems(basketItemDtoList);
        return new ResponseEntity<>(basketDto, HttpStatus.OK);
    }


    @DeleteMapping
    @Transactional
    public ResponseEntity<BasketDto> removeBasketItem(@RequestParam("productId") Long productId,
                                                      @RequestParam("quantity") int quantity,
                                                      @CookieValue(name = "buyerId", defaultValue = "") String buyerId) {
        List<Basket> basketList = basketRepository.findByBuyerId(buyerId);

        if (basketList.isEmpty())
            throw new NoResultException("Cannot find the basket");

        Basket basket = basketList.get(0);

        BasketItem existingItem =
                basket.getBasketItems().stream().filter(i -> i.getProduct().getId().equals(productId))
                        .findAny().orElse(null);

        if (existingItem == null)
            throw new NoResultException("The basket doesn't have this product");

        int newQuantity = existingItem.getQuantity() - quantity;
        existingItem.setQuantity(newQuantity);

        if (newQuantity <= 0) {
            basket.getBasketItems().remove(existingItem);
            basketItemRepository.delete(existingItem);
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
                .collect(Collectors.toList());

        BasketDto basketDto = new BasketDto();
        basketDto.setId(returnBasket.getId());
        basketDto.setBuyerId(returnBasket.getBuyerId());
        basketDto.setBasketItems(basketItemDtoList);
        return new ResponseEntity<>(basketDto, HttpStatus.OK);
    }

}
