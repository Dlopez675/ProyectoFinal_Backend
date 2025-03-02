const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization"); // Obtener el header "Authorization"
  if (!authHeader) {
    return res.status(401).json({ mensaje: "No hay token" }); // Si no hay token, devolver error
  }

  const token = authHeader.split(" ")[1]; // Extraer el token (Bearer <token>)
  let checkedToken;
  try {
    checkedToken = jwt.verify(token, process.env.JWT_KEY); // Verificar el token
  } catch (error) {
    return res.status(401).json({ mensaje: "Token no válido" });
  }

  if (!checkedToken) {
    return res.status(401).json({ mensaje: "Token no válido" });
  }

  req.user = checkedToken; // Adjuntar los datos del usuario al request
  next(); // Continuar con la siguiente función (controlador)
};
//auth.js