package com.ray.api.dao;

import com.ray.api.entity.Product;
import com.ray.api.entity.ProductCategory;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {

    public static Specification<Product> searchByName(String name) {
        return (root, query, criteriaBuilder) -> name.equals("all")
                ? criteriaBuilder.conjunction()
                : criteriaBuilder.like(root.get("name"), "%" + name + "%");
    }

    public static Specification<Product> filterByBrand(String brand) {
        return (root, query, criteriaBuilder) -> brand.equals("all")
                ? criteriaBuilder.conjunction()
                : criteriaBuilder.equal(root.get("brand"), brand);
    }

    public static Specification<Product> filterByCategoryId(Long categoryId) {
        return ((root, query, criteriaBuilder) -> {
            Join<Product, ProductCategory> productCategory = root.join("category");
            return categoryId == 0
                    ? criteriaBuilder.conjunction()
                    : criteriaBuilder.equal(productCategory.get("id"), categoryId);
        });
    }
}
