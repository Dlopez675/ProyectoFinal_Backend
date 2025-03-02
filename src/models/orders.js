const { pool } = require("../db/config");

// Crear una nueva orden
exports.createOrder = async (user_id) => {
    try {
        const SQLquery = `
            INSERT INTO orders (user_id)
            VALUES ($1)
            RETURNING id;
        `;
        const SQLValues = [user_id];
        const result = await pool.query(SQLquery, SQLValues);
        return result.rows[0].id;
    } catch (error) {
        throw new Error("Error al crear la orden: " + error.message);
    }
};

// Agregar ítems a una orden
exports.addItemsToOrder = async (orderId, items) => {
    try {
        for (const item of items) {
            const SQLquery = `
                INSERT INTO order_items (order_id, product_id, quantity, price)
                VALUES ($1, $2, $3, $4);
            `;
            const SQLValues = [orderId, item.product_id, item.quantity, item.price];
            await pool.query(SQLquery, SQLValues);
        }
    } catch (error) {
        throw new Error("Error al agregar ítems a la orden: " + error.message);
    }
};

// Obtener órdenes por usuario
exports.getOrdersByUser = async (user_id) => {
    try {
        const SQLquery = `
            SELECT 
                o.id AS order_id,
                json_agg(json_build_object(
                    'product_name', p.product_name,
                    'quantity', oi.quantity,
                    'price', oi.price,
                    'img', p.img
                )) AS productos
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = $1
            GROUP BY o.id;
        `;
        const SQLValues = [user_id];
        const result = await pool.query(SQLquery, SQLValues);
        return result.rows;
    } catch (error) {
        throw new Error("Error al obtener órdenes: " + error.message);
    }
};

// Obtener órdenes por usuario
exports.getOrdersByUser = async (user_id) => {
    try {
        const SQLquery = `
            SELECT 
                o.id AS order_id,
                json_agg(json_build_object(
                    'product_name', p.product_name,
                    'quantity', oi.quantity,
                    'price', oi.price,
                    'img', p.img
                )) AS productos
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = $1
            GROUP BY o.id;
        `;
        const SQLValues = [user_id];
        const result = await pool.query(SQLquery, SQLValues);
        return result.rows;
    } catch (error) {
        throw new Error("Error al obtener órdenes: " + error.message);
    }
};


exports.saveFormularioCompra = async (order_id, user_id, formData) => {
    try {
        const SQLquery = `
            INSERT INTO formulario_compra (order_id, user_id, nombre, apellido, direccion, numero_tarjeta, fecha_vencimiento, cvv)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const SQLValues = [
            order_id,
            user_id,
            formData.nombre,
            formData.apellido,
            formData.direccion,
            formData.numeroTarjeta,
            formData.fechaVencimiento,
            formData.cvv,
        ];
        const result = await pool.query(SQLquery, SQLValues);
        return result.rows[0];
    } catch (error) {
        throw new Error("Error al guardar el formulario de compra: " + error.message);
    }
};
//orders.js