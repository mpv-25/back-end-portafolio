const { request, response } = require("express");

const Reunion = require("../models/reunion");

const crearReunion = async (req = request, res = response) => {
  const {
    empresa,
    correo,
    tipoReunion,
    urlOnline = "",
    ubicacion = "",
    mensaje,
    fecha,
    hora,
  } = req.body;
  let resp = {};
  const reunion = new Reunion({
    empresa,
    correo,
    tipoReunion,
    urlOnline,
    ubicacion,
    mensaje,
    fecha,
    hora,
  });

  try {
    resp = await reunion.save();
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo crear la reunión" });
  }
  res.json({ resp });
};

const editReunion = async (req = request, res = response) => {
  const { id } = req.params;
  const { terminado } = req.body;
  let resp = {};

  try {
    resp = await Reunion.findByIdAndUpdate(id, { terminado }, { new: true });
    if (!resp) {
      return res.status(400).json({ msg: "El id es inválido" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se puede modificar la reunión" });
  }

  res.json({ resp });
};

module.exports = { crearReunion, editReunion };
