const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { agregarUsuarios, getUserEmail, usuarios } = require("../models/usuarios");

exports.registrarUsuario = async (req, res) => {
    let { username, email, password } = req.body;
    try {
        // Hashear la contraseña
        password = await bcrypt.hash(password, 12);

        // Registrar el usuario en la base de datos
        const nuevoUsuario = await agregarUsuarios(username, email, password);

        // Responder con éxito
        res.status(201).json({ mensaje: "Usuario creado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(400).json({ mensaje: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validar que el email y la contraseña estén presentes
        if (!email || !password) {
            return res.status(400).json({ mensaje: "El email y la contraseña son obligatorios" });
        }

        // Buscar el usuario por email
        const usuario = await getUserEmail(email);
        if (!usuario) {
            return res.status(401).json({ mensaje: "El usuario no existe" });
        }

        // Verificar la contraseña
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, username: usuario.username },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );

        // Devolver el token y los datos del usuario
        res.status(200).json({
            token,
            user: {
                id: usuario.id,
                username: usuario.username,
                email: usuario.email,
            },
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ mensaje: "Error al iniciar sesión", error: error.message });
    }
};

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuariosObtenidos = await usuarios();
        res.status(200).json({ usuarios: usuariosObtenidos });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};
//usuarioController.js