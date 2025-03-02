const { pool } = require("../db/config.js");

exports.agregarUsuarios = async (username, email, password) => {
    try {
        const SQLquery = "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id, username, email;";
        const SQLValues = [username, email, password];
        const result = await pool.query(SQLquery, SQLValues);
        return result.rows[0]; // Devuelve el usuario creado
    } catch (error) {
        throw new Error("Error al registrar usuario: " + error.message);
    }
};

exports.getUserEmail = async (email) => {
    try {
        const SQLquery = "SELECT * FROM users WHERE email = $1;";
        const SQLValues = [email];
        const result = await pool.query(SQLquery, SQLValues);
        return result.rows[0]; // Devuelve el usuario encontrado
    } catch (error) {
        throw new Error("Error al obtener usuario por email: " + error.message);
    }
};

exports.usuarios = async () => {
    try {
        const SQLquery = "SELECT id, username, email FROM users;";
        const result = await pool.query(SQLquery);
        return result.rows; // Devuelve todos los usuarios
    } catch (error) {
        throw new Error("Error al obtener usuarios: " + error.message);
    }
};
//usuarios.js