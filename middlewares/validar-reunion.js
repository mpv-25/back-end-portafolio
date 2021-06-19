const { request, response } = require("express");
const Reunion = require("../models/reunion");

const validarReunion = async (req = request, res = response, next) => {
  const { correo, fecha, hora } = req.body;

  const [existeReunion, ocupado] = await Promise.all([
    Reunion.findOne({ correo, terminado: false }),
    Reunion.findOne({ fecha, hora }),
  ]);

  if (existeReunion) {
    return res.status(400).json({
      msg: "Lo siento ya existe una reunión programada con este correo, solo se permite una reunión activa por correo.",
    });
  }

  if (ocupado) {
    return res
      .status(400)
      .json({ msg: "Lo siento ya existe una reunión programada en este día y en esta hora." });
  }

  next();
};

module.exports = { validarReunion };
