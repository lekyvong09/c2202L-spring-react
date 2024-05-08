package com.ray.api.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="product")
@Getter
@Setter
@ToString
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    @Column(name="unit_price")
    private BigDecimal unitPrice;
    @Column(name="image_url")
    private String imageUrl;
    private String brand;
    @Column(name="units_in_stock")
    private int unitsInStock;
    @Column(name="date_created")
    @CreationTimestamp
    private Date dateCreated;
    @Column(name="last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

    @ManyToOne
    @JoinColumn(name = "category_id")
//    @JsonIgnore
    private ProductCategory category;

    public Product() {
    }
}
