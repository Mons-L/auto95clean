CREATE TABLE product(
    id INT AUTO_INCREMENT,
    label VARCHAR(256) NOT NULL,
    description VARCHAR(512) NOT NULL,
    image_path VARCHAR(512) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE formula_type(
    id INT AUTO_INCREMENT,
    label VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE formula(
    id INT AUTO_INCREMENT,
    label VARCHAR(256) NOT NULL,
    description VARCHAR(512) NOT NULL,
    formula_type_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(formula_type_id) REFERENCES formula_type(id)
);

CREATE TABLE city(
    id INT AUTO_INCREMENT,
    label VARCHAR(256) NOT NULL,
    postal_code CHAR(5) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE task(
    id INT AUTO_INCREMENT,
    label VARCHAR(256) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE vehicle_type(
    id INT AUTO_INCREMENT,
    label VARCHAR(256) NOT NULL,
    description VARCHAR(512) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE address(
    id INT AUTO_INCREMENT,
    number VARCHAR(4),
    label VARCHAR(256) NOT NULL,
    city_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(city_id) REFERENCES city(id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT,
    firstname VARCHAR(256) NOT NULL,
    lastname VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    password VARCHAR(256),
    phone CHAR(10),
    role VARCHAR(256) NOT NULL,
    address_id INT,
    PRIMARY KEY(id),
    UNIQUE(email),
    FOREIGN KEY(address_id) REFERENCES address(id)
);

CREATE TABLE orders(
    id INT AUTO_INCREMENT,
    order_date DATE NOT NULL,
    delivery_type VARCHAR(256) NOT NULL,
    delivery_charges DECIMAL(6,2) NOT NULL,
    payment_mode VARCHAR(256) NOT NULL,
    status VARCHAR(256) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE message(
    id INT AUTO_INCREMENT,
    message VARCHAR(512) NOT NULL,
    state VARCHAR(256) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE orders_product(
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY(order_id, product_id),
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES product(id)
);

CREATE TABLE orders_address(
    order_id INT,
    address_id INT,
    type VARCHAR(256) NOT NULL,
    PRIMARY KEY(order_id, address_id),
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(address_id) REFERENCES address(id)
);

CREATE TABLE reservation(
    id INT AUTO_INCREMENT,
    state VARCHAR(256) NOT NULL,
    reservation_date DATETIME NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone CHAR(10),
    immatriculation VARCHAR(20) NOT NULL,
    user_id INT NOT NULL,
    formula_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(formula_id) REFERENCES formula(id)
);



CREATE TABLE formula_task(
    formula_id INT,
    task_id INT,
    PRIMARY KEY(formula_id, task_id),
    FOREIGN KEY(formula_id) REFERENCES formula(id),
    FOREIGN KEY(task_id) REFERENCES task(id)
);

CREATE TABLE formula_vehicle_type(
    formula_id INT,
    vehicle_type_id INT,
    price DECIMAL(6,2) NOT NULL,
    PRIMARY KEY(formula_id, vehicle_type_id),
    FOREIGN KEY(formula_id) REFERENCES formula(id),
    FOREIGN KEY(vehicle_type_id) REFERENCES vehicle_type(id)
);