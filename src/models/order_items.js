const { pool } = require('../db/config');

exports.createOrder = async (user_id) => {
    try {
        const newOrderQuery = `
            INSERT INTO orders (user_id, status)
            VALUES ($1, 'En proceso')
            RETURNING id
        `;
        const newOrder = await pool.query(newOrderQuery, [user_id]);
        return newOrder.rows[0].id;
    } catch (error) {
        throw new Error("Error al crear orden: " + error.message);
    }
};

exports.addItemsToOrder = async (orderId, items) => {
    try {
        for (const item of items) {
            await pool.query(
                `INSERT INTO order_items (order_id, product_id, quantity, price)
                 VALUES ($1, $2, $3, $4)`,
                [orderId, item.product_id, item.quantity, item.price]
            );
        }
    } catch (error) {
        throw new Error("Error al agregar productos a la orden: " + error.message);
    }
};
//order_items.js