require("dotenv").config();
const { Pool } = require("pg");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,  // Puerto corregido
    database: process.env.DB_NAME
};

const pool = new Pool(config);

module.exports = { pool };
//config.js