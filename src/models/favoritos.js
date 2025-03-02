const { pool } = require("../db/config");

// Agregar un favorito
exports.agregarFavorito = async (user_id, product_id) => {
    try {
        const SQLquery = "INSERT INTO FAVORITES (user_id, product_id) VALUES ($1, $2) RETURNING *;";
        const SQLValues = [user_id, product_id];
        const result = await pool.query(SQLquery, SQLValues);
        return result.rows[0];
    } catch (error) {
        throw new Error("Error al agregar favorito: " + error.message);
    }
};

// Eliminar un favorito
exports.eliminarFavorito = async (user_id, product_id) => {
    try {
        const SQLquery = "DELETE FROM FAVORITES WHERE user_id = $1 AND product_id = $2 RETURNING *;";
        const SQLValues = [user_id, product_id];
        const result = await pool.query(SQLquery, SQLValues);
        return result.rows[0];
    } catch (error) {
        throw new Error("Error al eliminar favorito: " + error.message);
    }
};

// Obtener todos los favoritos de un usuario
exports.obtenerFavoritos = async (user_id) => {
    try {
        const SQLquery = `
            SELECT 
                p.*, 
                u.username AS vendedor 
            FROM FAVORITES f
            JOIN PRODUCTS p ON f.product_id = p.id
            JOIN USERS u ON p.user_id = u.id
            WHERE f.user_id = $1;
        `;
        const SQLValues = [user_id];
        const result = await pool.query(SQLquery, SQLValues);
        return result.rows;
    } catch (error) {
        throw new Error("Error al obtener favoritos: " + error.message);
    }
};

// Verificar si un producto ya es favorito
exports.esFavorito = async (user_id, product_id) => {
    try {
        const SQLquery = "SELECT * FROM FAVORITES WHERE user_id = $1 AND product_id = $2;";
        const SQLValues = [user_id, product_id];
        const result = await pool.query(SQLquery, SQLValues);
        return result.rows.length > 0;
    } catch (error) {
        throw new Error("Error al verificar favorito: " + error.message);
    }
};
//favoritos.js