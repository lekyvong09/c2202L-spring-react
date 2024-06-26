package com.ray.api.controller;


import com.ray.api.dao.ProductCategoryRepository;
import com.ray.api.dao.ProductRepository;
import com.ray.api.dao.ProductSpecification;
import com.ray.api.dto.PageInfo;
import com.ray.api.dto.ProductReturnDto;
import com.ray.api.entity.Product;
import com.ray.api.entity.ProductCategory;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

import static com.ray.api.dao.ProductSpecification.*;

@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductSpecification productSpecification;

    @Autowired
    public ProductController(ProductRepository productRepository,
                             ProductCategoryRepository productCategoryRepository, ProductSpecification productSpecification) {
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.productSpecification = productSpecification;
    }

    @GetMapping
    public ResponseEntity<List<ProductReturnDto>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductReturnDto> result = products.stream()
                .map(product -> new ProductReturnDto(product)).collect(Collectors.toList());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductReturnDto> getProductById(@PathVariable("productId") Long productId) {
        Product product = productRepository.findById(productId).get();
        return new ResponseEntity<>(new ProductReturnDto(product), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProductReturnDto> addNewProduct(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("unitPrice") String unitPrice,
            @RequestParam("brand") String brand,
            @RequestParam("unitsInStock") int unitsInStock,
            @RequestParam("productCategory") String productCategory,
            @RequestParam(value = "productImage", required = false) MultipartFile productImage) throws IOException {

        String imageFileName = "";
        if (productImage != null) {
            String imageFileExt = FilenameUtils.getExtension(productImage.getOriginalFilename());
            if (!Arrays.asList(MimeTypeUtils.IMAGE_JPEG_VALUE,
                    MimeTypeUtils.IMAGE_PNG_VALUE, MimeTypeUtils.IMAGE_GIF_VALUE).contains(productImage.getContentType())) {
                throw new RuntimeException(productImage.getOriginalFilename() + " is not an image file");
            }

            Path fileFolder = Paths.get("upload", "image");
            if (!Files.exists(fileFolder)) {
                Files.createDirectories(fileFolder);
            }

            imageFileName = UUID.randomUUID().toString() + "." + imageFileExt;
            Path filePath = fileFolder.resolve(imageFileName);
            Files.copy(productImage.getInputStream(), filePath);
        }

        Product newProduct = new Product();
        newProduct.setName(name);
        newProduct.setDescription(description);
        newProduct.setUnitPrice(new BigDecimal(unitPrice));
        newProduct.setBrand(brand);
        newProduct.setUnitsInStock(unitsInStock);
        newProduct.setImageUrl(imageFileName);

        ProductCategory category = productCategoryRepository.findByCategoryNameIsIgnoreCase(productCategory);
        newProduct.setCategory(category);

        productRepository.save(newProduct);

        return new ResponseEntity<>(new ProductReturnDto(newProduct), HttpStatus.OK);
    }


    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchProduct(@RequestParam(value="name", defaultValue = "all") String name,
                                                             @RequestParam(value="brand", defaultValue = "all") String brand,
                                                             @RequestParam(value="category", defaultValue = "all") String category,
                                                             @RequestParam(value = "pageNumber", defaultValue = "0") Integer pageNumber,
                                                             @RequestParam(value = "pageSize", defaultValue = "1000") Integer pageSize,
                                                             @RequestParam(value = "sort", defaultValue = "name") String sortBy){
        Page<Product> products = productRepository.findAll(
                Specification.where(searchByName(name)
                        .and(filterByBrand(brand))
                        .and(productSpecification.filterByCategoryId(category))
                ),
                PageRequest.of(
                        pageNumber,
                        pageSize,
                        sortBy.equals("priceAsc")
                            ? Sort.by("unitPrice").ascending()
                            : sortBy.equals("priceDesc")
                                ? Sort.by("unitPrice").descending()
                                : Sort.by("name").ascending()
                )
        );

        List<ProductReturnDto> returnDtoList = products.stream().map(item -> new ProductReturnDto(item)).collect(Collectors.toList());

        PageInfo myPage = new PageInfo(products.getNumber(),
                                        products.getTotalElements(),
                                        products.getTotalPages(),
                                        products.getSize());

        Map<String, Object> response = new HashMap<>();
        response.put("data", returnDtoList);
        response.put("page", myPage);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
