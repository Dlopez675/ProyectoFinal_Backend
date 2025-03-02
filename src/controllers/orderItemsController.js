const { createOrder, addItemsToOrder, saveFormularioCompra, getOrdersByUser } = require("../models/orders");

// Crear una nueva orden con productos
exports.crearOrdenConProductos = async (req, res) => {
    const { user_id, items } = req.body;

    try {
        // Validar que los datos sean correctos
        if (!user_id || !items || items.length === 0) {
            return res.status(400).json({ message: 'Datos de la orden inválidos' });
        }

        // Crear la orden
        const orderId = await createOrder(user_id);

        // Agregar los ítems a la orden
        await addItemsToOrder(orderId, items);

        // Respuesta exitosa
        res.status(201).json({ message: 'Orden creada con éxito', order_id: orderId });
    } catch (error) {
        console.error("Error al crear la orden:", error);
        res.status(500).json({ message: 'Error al crear la orden', error: error.message });
    }
};

// Guardar los datos del formulario de compra
exports.guardarFormularioCompra = async (req, res) => {
    const { order_id } = req.params;
    const { nombre, apellido, direccion, numeroTarjeta, fechaVencimiento, cvv } = req.body;

    try {
        // Validar que los datos sean correctos
        if (!order_id || !nombre || !apellido || !direccion || !numeroTarjeta || !fechaVencimiento || !cvv) {
            return res.status(400).json({ message: 'Datos del formulario inválidos' });
        }

        // Obtener el ID del usuario desde el token
        const user = req.user;

        // Guardar los datos del formulario de compra
        await saveFormularioCompra(order_id, user.id, { nombre, apellido, direccion, numeroTarjeta, fechaVencimiento, cvv });

        // Respuesta exitosa
        res.status(200).json({ message: 'Formulario de compra guardado con éxito' });
    } catch (error) {
        console.error("Error al guardar el formulario de compra:", error);
        res.status(500).json({ message: 'Error al guardar el formulario de compra', error: error.message });
    }
};

// Obtener órdenes por usuario
exports.obtenerOrdenesPorUsuario = async (req, res) => {
    const { user_id } = req.params;

    try {
        // Validar que el user_id sea un número válido
        if (!user_id || isNaN(user_id)) {
            return res.status(400).json({ message: 'El ID de usuario no es válido' });
        }

        // Obtener las órdenes del usuario
        const orders = await getOrdersByUser(user_id);

        // Verificar si se encontraron órdenes
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No se encontraron órdenes para este usuario' });
        }

        // Devolver las órdenes
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error al obtener órdenes:", error);
        res.status(500).json({ message: 'Error al obtener órdenes', error: error.message });
    }
};
//orderItemsController.js