package com.ray.api.dto;


import lombok.Data;

import java.util.List;

@Data
public class BasketDto {
    private Long id;
    private String buyerId;
    private List<BasketItemDto> basketItems;
}
