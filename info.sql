INSERT INTO USERS (id, username, email, password) VALUES
(1, 'juan_pizza', 'juan@email.com', '123456'),
(2, 'maria_love_pizza', 'maria@email.com', '123456'),
(3, 'pedro_chef', 'pedro@email.com', '123456'),
(4, 'ana_delivery', 'ana@email.com', '123456');

INSERT INTO CATEGORIES (id, name) VALUES
(1, 'Clásicas'),
(2, 'Especiales'),
(3, 'Veganas'),
(4, 'Postres');

INSERT INTO PRODUCTS (id, product_name, description, img, category_id, user_id, price, stock) VALUES
(1, 'Pizza Margarita', 'Pizza con salsa de tomate, mozzarella y albahaca.', 'margarita.jpg', 1, 3, 150.00, 50),
(2, 'Pizza Pepperoni', 'Pizza con extra de queso y pepperoni.', 'pepperoni.jpg', 1, 3, 180.00, 40),
(3, 'Pizza Cuatro Quesos', 'Pizza con mozzarella, cheddar, gorgonzola y parmesano.', 'cuatroquesos.jpg', 2, 3, 200.00, 30),
(4, 'Pizza Hawaiana', 'Pizza con piña y jamón.', 'hawaiana.jpg', 1, 3, 170.00, 35),
(5, 'Pizza Vegana', 'Pizza con base de vegetales y queso vegano.', 'vegana.jpg', 3, 3, 190.00, 25),
(6, 'Calzone Napolitano', 'Masa rellena de queso y jamón, horneado.', 'calzone.jpg', 2, 3, 160.00, 20),
(7, 'Pizza Brownie', 'Postre de brownie con trozos de chocolate.', 'brownie.jpg', 4, 3, 120.00, 15);

INSERT INTO ORDERS (id, user_id, status, created_at) VALUES
(1, 1, 'Pendiente', '2025-02-22 14:30:00'),
(2, 2, 'En proceso', '2025-02-22 15:00:00'),
(3, 1, 'Entregado', '2025-02-21 18:20:00'),
(4, 2, 'Cancelado', '2025-02-20 12:10:00');


INSERT INTO ORDER_ITEMS (id, order_id, product_id, quantity, price) VALUES
(1, 1, 2, 1, 180.00),
(2, 1, 4, 2, 340.00),
(3, 2, 3, 1, 200.00),
(4, 3, 1, 1, 150.00),
(5, 3, 7, 2, 240.00);

INSERT INTO FAVORITES (id, user_id, product_id) VALUES
(1, 1, 2),
(2, 1, 3),
(3, 2, 5),
(4, 2, 1);