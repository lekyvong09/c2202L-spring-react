SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS product_category;
CREATE TABLE IF NOT EXISTS product_category (
    id int(11) NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS product;
CREATE TABLE IF NOT EXISTS product (
    id int(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    description VARCHAR(1255) DEFAULT NULL,
    unit_price DECIMAL(13,2) DEFAULT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    units_in_stock INT(11) DEFAULT NULL,
    category_id int(11) DEFAULT NULL,
    brand VARCHAR(255) DEFAULT NULL,
    date_created DATETIME(6) DEFAULT NULL,
    last_updated DATETIME(6) DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES product_category (id)
);

DROP TABLE IF EXISTS basket;
CREATE TABLE IF NOT EXISTS basket (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    buyer_id VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS basket_item;
CREATE TABLE IF NOT EXISTS basket_item (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    quantity INT(11) DEFAULT NULL,
    basket_id BIGINT(20) DEFAULT NULL,
    product_id int(11) DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_basket_item_product FOREIGN KEY (product_id) REFERENCES product (id),
    CONSTRAINT fk_basket_item_basket FOREIGN KEY (basket_id) REFERENCES basket (id)
);

SET FOREIGN_KEY_CHECKS=1;