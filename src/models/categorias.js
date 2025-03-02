const { pool } = require("../db/config");

exports.obtenerCategorias = async () => {
    try {
        const SQLquery = "SELECT * FROM CATEGORIES";
        const result = await pool.query(SQLquery);
        return result.rows;
    } catch (error) {
        throw new Error("Error al obtener categorías: " + error.message);
    }
};
//categorias.js