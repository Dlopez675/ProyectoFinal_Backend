const { obtenerCategorias } = require("../models/categorias");

exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await obtenerCategorias();
        res.status(200).json({ categorias });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};
//categoriasController.js

