const { request, response } = require("express");

const Proyecto = require("../models/proyecto");

const getProyectos = async (req = request, res = response) => {
  let { desde = 0, limite = 10 } = req.query;
  desde = parseInt(desde);
  limite = parseInt(limite);
  let proyectos = {};
  try {
    proyectos = await Proyecto.find().skip(desde).limit(limite);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo obtener los proyectos", err });
  }

  res.json({ proyectos });
};

const crearProyecto = async (req = request, res = response) => {
  const { titulo, desc, tecnologias, github, url, img } = req.body;

  const proyecto = new Proyecto({
    titulo,
    desc,
    tecnologias,
    github,
    url,
    img,
  });

  let resp = {};

  try {
    resp = await proyecto.save();
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo crear el proyecto", err });
  }

  res.json({ resp });
};

const editProyecto = async (req = request, res = response) => {
  const { id } = req.params;
  const { titulo, desc, tecnologias, github, url, img } = req.body;

  let resp = {};
  try {
    resp = await Proyecto.findByIdAndUpdate(
      id,
      { titulo, desc, tecnologias, github, url, img },
      { new: true }
    );

    if (!resp) {
      return res.status(400).json({ msg: "El id es inválido" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo editar el proyecto", err });
  }

  res.json({ resp });
};

const deleteProyecto = async (req = request, res = response) => {
  const { id } = req.params;
  let resp = {};

  try {
    resp = await Proyecto.findByIdAndDelete(id);
    if (!resp) {
      return res.status(400).json({ msg: "El id es inválido" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo eliminar el proyecto", err });
  }

  res.json({ msg: "EXITO!!! se elimino el proyecto", resp });
};

module.exports = { crearProyecto, editProyecto, getProyectos, deleteProyecto };
