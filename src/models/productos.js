const { pool } = require("../db/config");

exports.agregarProducto = async (product_name, description, img, category_id, user_id, price, stock, ingredients) => {
  try {
    const SQLquery = `
      INSERT INTO PRODUCTS (product_name, description, img, category_id, user_id, price, stock, ingredients)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const SQLValues = [product_name, description, img, category_id, user_id, price, stock, ingredients.join(',')];
    const result = await pool.query(SQLquery, SQLValues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al agregar producto: " + error.message);
  }
};

exports.obtenerProductos = async () => {
  try {
    const SQLquery = `
      SELECT 
        p.*, 
        u.username AS vendedor 
      FROM PRODUCTS p
      JOIN USERS u ON p.user_id = u.id;
    `;
    const result = await pool.query(SQLquery);
    return result.rows.map((product) => ({
      ...product,
      ingredients: product.ingredients || "",
    }));
  } catch (error) {
    throw new Error("Error al obtener productos: " + error.message);
  }
};

exports.editarProducto = async (id, product_name, description, img, category_id, user_id, price, stock, ingredients) => {
  try {
    const SQLquery = `
      UPDATE PRODUCTS
      SET product_name = $1, description = $2, img = $3, category_id = $4, user_id = $5, price = $6, stock = $7, ingredients = $8
      WHERE id = $9
      RETURNING *;
    `;
    const SQLValues = [product_name, description, img, category_id, user_id, price, stock, ingredients.join(','), id];
    const result = await pool.query(SQLquery, SQLValues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al editar producto: " + error.message);
  }
};

exports.eliminarProducto = async (id) => {
  try {
    const SQLquery = "DELETE FROM PRODUCTS WHERE id = $1 RETURNING *;";
    const SQLValues = [id];
    const result = await pool.query(SQLquery, SQLValues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al eliminar producto: " + error.message);
  }
};

exports.obtenerProductoPorId = async (id) => {
  try {
    const SQLquery = `
      SELECT 
        p.*, 
        u.username AS vendedor 
      FROM PRODUCTS p
      JOIN USERS u ON p.user_id = u.id
      WHERE p.id = $1;
    `;
    const result = await pool.query(SQLquery, [id]);
    if (result.rows.length === 0) {
      return null; // Si no se encuentra la pizza, devuelve null
    }
    return result.rows[0]; // Devuelve el primer resultado (único producto)
  } catch (error) {
    throw new Error("Error al obtener el producto: " + error.message);
  }
};
//productos.js