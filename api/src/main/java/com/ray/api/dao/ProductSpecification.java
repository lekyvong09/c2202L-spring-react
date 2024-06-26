package com.ray.api.dao;

import com.ray.api.entity.Product;
import com.ray.api.entity.ProductCategory;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductSpecification {
    private final ProductCategoryRepository productCategoryRepository;

    @Autowired
    public ProductSpecification(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    public static Specification<Product> searchByName(String name) {
        return (root, query, criteriaBuilder) -> name.equals("all")
                ? criteriaBuilder.conjunction()
                : criteriaBuilder.like(root.get("name"), "%" + name + "%");
    }

    public static Specification<Product> filterByBrand(String inputBrandList) {
        return (root, query, criteriaBuilder) ->
        {
            if (inputBrandList.equals("all")) {
                return criteriaBuilder.conjunction();
            } else {
                List<Predicate> predicates = new ArrayList<>();
                String[] brandList = inputBrandList.split(",", -1);
                for (String brand : brandList) {
                    predicates.add(criteriaBuilder.equal(root.get("brand"), brand.trim()));
                }
                return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
            }
        };
    }

    public Specification<Product> filterByCategoryId(String categoryList) {
        return ((root, query, criteriaBuilder) -> {
            if (categoryList.equals("all")) {
                return criteriaBuilder.conjunction();
            } else {
                Join<Product, ProductCategory> productCategory = root.join("category");

                List<Predicate> predicates = new ArrayList<>();
                String[] categoryNameList = categoryList.split(",", -1);
                for (String categoryName : categoryNameList) {
                    ProductCategory category = productCategoryRepository.findByCategoryNameIsIgnoreCase(categoryName.trim());

                    if (category != null) {
                        predicates.add(criteriaBuilder.equal(productCategory.get("id"), category.getId()));
                    }
                }
                return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
            }
        });
    }
}
