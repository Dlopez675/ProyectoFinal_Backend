const { agregarProducto, obtenerProductos, editarProducto, eliminarProducto, obtenerProductoPorId } = require("../models/productos");

exports.crearProducto = async (req, res) => {
  const { product_name, description, img, price, stock, category_id, ingredients } = req.body;
  const user_id = req.user.id;

  try {
    if (!product_name || !description || !img || !price || !stock || !category_id || !ingredients) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    if (isNaN(price) || price <= 0 || isNaN(stock) || stock < 0) {
      return res.status(400).json({ mensaje: "El precio y el stock deben ser números válidos" });
    }

    const nuevoProducto = await agregarProducto(
      product_name,
      description,
      img,
      category_id,
      user_id,
      price,
      stock,
      ingredients
    );

    res.status(201).json({ mensaje: "Producto creado exitosamente", producto: nuevoProducto });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ mensaje: "Error al crear el producto", error: error.message });
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await obtenerProductos();
    res.status(200).json({ productos });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ mensaje: "Error al obtener productos", error: error.message });
  }
};

exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { product_name, description, img, price, stock, category_id, ingredients } = req.body;
  const user_id = req.user.id;

  try {
    if (!product_name || !description || !img || !price || !stock || !category_id || !ingredients) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    if (isNaN(price) || price <= 0 || isNaN(stock) || stock < 0) {
      return res.status(400).json({ mensaje: "El precio y el stock deben ser números válidos" });
    }

    const productoActualizado = await editarProducto(
      id,
      product_name,
      description,
      img,
      category_id,
      user_id,
      price,
      stock,
      ingredients
    );

    res.status(200).json({ mensaje: "Producto actualizado exitosamente", producto: productoActualizado });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ mensaje: "Error al actualizar el producto", error: error.message });
  }
};

exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ mensaje: "El ID del producto es obligatorio" });
    }

    const productoEliminado = await eliminarProducto(id);

    res.status(200).json({ mensaje: "Producto eliminado exitosamente", producto: productoEliminado });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ mensaje: "Error al eliminar el producto", error: error.message });
  }
};

exports.obtenerDetallePizza = async (req, res) => {
  const { id } = req.params;

  try {
    const pizza = await obtenerProductoPorId(id);
    if (!pizza) {
      return res.status(404).json({ mensaje: "Pizza no encontrada" });
    }
    res.status(200).json({ pizza });
  } catch (error) {
    console.error("Error al obtener el detalle de la pizza:", error);
    res.status(500).json({ mensaje: "Error al obtener el detalle de la pizza", error: error.message });
  }
};
//productosController.js