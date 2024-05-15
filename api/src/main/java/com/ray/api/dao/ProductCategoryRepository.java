package com.ray.api.dao;

import com.ray.api.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    ProductCategory findByCategoryName(String categoryName);
}
