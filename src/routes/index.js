const express = require("express");
const router = express.Router();
const auth = require("../midlewares/auth.js");
const usuariosController = require("../controllers/usuarioController.js");
const productosController = require("../controllers/productosController.js");
const categoriasController = require("../controllers/categoriasController.js");
const ordersController = require("../controllers/ordersController.js"); // Asegúrate de que este archivo existe
const favoritosController = require("../controllers/favoritosController.js");

module.exports = () => {
    // Ruta de bienvenida
    router.get("/", (req, res) => {
        res.status(200).send("Bienvenido a mi MarketPlace");
    });

    // Rutas de Usuarios
    router.post("/crear_cuenta", usuariosController.registrarUsuario);
    router.post("/iniciar_sesion", usuariosController.login);
    router.get("/usuarios", auth, usuariosController.obtenerUsuarios);

    // Rutas de Productos
    router.post("/productos", auth, productosController.crearProducto);
    router.get("/productos", productosController.obtenerProductos);
    router.put("/productos/:id", auth, productosController.actualizarProducto);
    router.delete("/productos/:id", auth, productosController.eliminarProducto);
    router.get("/pizza/:id", productosController.obtenerDetallePizza);

    // Rutas de Categorías
    router.get("/categorias", categoriasController.obtenerCategorias);

    // Rutas de Órdenes
    router.post("/order_items", auth, ordersController.crearOrdenConProductos);
    router.post("/formulario_compra/:order_id", auth, ordersController.guardarFormularioCompra);
    router.get("/orders/:user_id", auth, ordersController.obtenerOrdenesPorUsuario);

    // Rutas de Favoritos
    router.post("/favoritos/toggle", auth, favoritosController.toggleFavorito);
    router.get("/favoritos", auth, favoritosController.obtenerFavoritos);

    return router;
};
//index.js