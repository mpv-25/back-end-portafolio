const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const crearUsuario = async (req = request, res = response) => {
  let { nombre, email, password } = req.body;

  let salt = bcryptjs.genSaltSync(10);
  let hash = bcryptjs.hashSync(password, salt);
  password = hash;

  const usuario = new Usuario({ nombre, email, password });
  let resp = {};
  try {
    resp = await usuario.save();
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo crear el usuario", err });
  }

  res.json({ resp });
};

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  let usuario = {};
  try {
    usuario = await Usuario.findOne({ email });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo consultar  el usuario" });
  }

  if (!usuario) {
    return res.status(400).json({ msg: "No existe usuario" });
  }

  const hash = usuario.password;

  const correctPassword = bcryptjs.compareSync(password, hash);

  if (!correctPassword) {
    return res.status(400).json({ msg: "Error de password" });
  }

  const token = jwt.sign(
    {
      usuario,
    },
    process.env.SECRETORPRIVATEKEY,
    { expiresIn: "1h" }
  );

  res.json({ token });
};

module.exports = { crearUsuario, login };
