const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const validarUsuario = (req = request, res = response, next) => {
  const token = req.header("token");
  // invalid token - synchronous
  try {
    let usuario = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.usuario = usuario;
  } catch (err) {
    return res.status(400).json({ msg: "ERROR!!! token inválido" });
  }
  next();
};

module.exports = validarUsuario;
