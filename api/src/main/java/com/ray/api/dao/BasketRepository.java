package com.ray.api.dao;

import com.ray.api.entity.Basket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BasketRepository extends JpaRepository<Basket, Long> {
    List<Basket> findByBuyerId(String buyerId);
}
