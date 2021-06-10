const { request, response } = require("express");

const Reunion = require("../models/reunion");

const getReunion = async (req = request, res = response) => {
  try {
    const { desde = 0, limite = 30 } = req.query;
    const resp = await Reunion.find().skip(desde).limit(limite);

    res.json({ reuniones: resp });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo obtener las reuniones" });
  }
};

const crearReunion = async (req = request, res = response) => {
  try {
    const {
      empresa,
      correo,
      tipoReunion,
      urlOnline = "",
      ubicacion = { lat: 0, lng: 0 },
      mensaje,
      fecha,
      hora,
    } = req.body;
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

    const resp = await reunion.save();

    res.json(resp);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo crear la reunión" });
  }
};

const editReunion = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { terminado } = req.body;

    const resp = await Reunion.findByIdAndUpdate(
      id,
      { terminado },
      { new: true }
    );
    if (!resp) {
      return res.status(400).json({ msg: "El id es inválido" });
    }

    res.json(resp);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se puede modificar la reunión" });
  }
};

module.exports = { crearReunion, editReunion, getReunion };
