package com.ray.api.dto;

import com.ray.api.entity.Product;
import com.ray.api.entity.ProductCategory;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;


@Getter
@Setter
@ToString
public class ProductReturnDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal unitPrice;
    private String imageUrl;
    private String brand;
    private int unitsInStock;
    private String category;

    public ProductReturnDto() {
    }

    public ProductReturnDto(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.unitPrice = product.getUnitPrice();
        this.imageUrl = product.getImageUrl();
        this.brand = product.getBrand();
        this.unitsInStock = product.getUnitsInStock();
        this.category = product.getCategory().getCategoryName();
    }
}
