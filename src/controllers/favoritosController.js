const { agregarFavorito, eliminarFavorito, obtenerFavoritos, esFavorito } = require("../models/favoritos");

// Alternar entre agregar y eliminar un favorito
exports.toggleFavorito = async (req, res) => {
    const { product_id } = req.body;
    const user_id = req.user.id;

    try {
        // Verificar si el producto ya es favorito
        const favoritoExistente = await esFavorito(user_id, product_id);

        if (favoritoExistente) {
            // Si ya es favorito, eliminarlo
            await eliminarFavorito(user_id, product_id);
            res.status(200).json({ message: "Favorito eliminado" });
        } else {
            // Si no es favorito, agregarlo
            await agregarFavorito(user_id, product_id);
            res.status(201).json({ message: "Favorito agregado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al manejar favorito", error: error.message });
    }
};

// Obtener todos los favoritos de un usuario
exports.obtenerFavoritos = async (req, res) => {
    const user_id = req.user.id;

    try {
        const favoritos = await obtenerFavoritos(user_id);
        res.status(200).json({ favoritos });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener favoritos", error: error.message });
    }
};
//favoritosController.js