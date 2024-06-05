package com.ray.api.dto;


import lombok.Data;

import java.math.BigDecimal;

@Data
public class BasketItemDto {
    private Long productId;
    private String name;
    private BigDecimal unitPrice;
    private String imageUrl;
    private String brand;
    private String category;
    private int quantity;

    public BasketItemDto(Long productId, String name, BigDecimal unitPrice, String imageUrl, String brand, String category, int quantity) {
        this.productId = productId;
        this.name = name;
        this.unitPrice = unitPrice;
        this.imageUrl = imageUrl;
        this.brand = brand;
        this.category = category;
        this.quantity = quantity;
    }
}
