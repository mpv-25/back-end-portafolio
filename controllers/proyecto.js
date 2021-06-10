const { request, response } = require("express");

const Proyecto = require("../models/proyecto");

const getProyectos = async (req = request, res = response) => {
  try {
    let { desde = 0, limite = 10 } = req.query;
    desde = parseInt(desde);
    limite = parseInt(limite);

    const proyectos = await Proyecto.find()
      .skip(desde)
      .limit(limite)
      .populate("tecnologias");

    res.json({ proyectos });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo obtener los proyectos", err });
  }
};

const crearProyecto = async (req = request, res = response) => {
  try {
    const { titulo, desc, tecnologias, github, url, img } = req.body;

    const proyecto = new Proyecto({
      titulo,
      desc,
      tecnologias,
      github,
      url,
      img,
    });

    const resp = await proyecto.save();

    res.json({ proyecto: resp });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo crear el proyecto", err });
  }
};

const editProyecto = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { titulo, desc, tecnologias, github, url, img } = req.body;

    const resp = await Proyecto.findByIdAndUpdate(
      id,
      { titulo, desc, tecnologias, github, url, img },
      { new: true }
    );

    if (!resp) {
      return res.status(400).json({ msg: "El id es inválido" });
    }

    res.json({ proyecto: resp });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo editar el proyecto", err });
  }
};

const deleteProyecto = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const resp = await Proyecto.findByIdAndDelete(id);
    if (!resp) {
      return res.status(400).json({ msg: "El id es inválido" });
    }

    res.json({ proyecto: resp });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo eliminar el proyecto", err });
  }
};

module.exports = { crearProyecto, editProyecto, getProyectos, deleteProyecto };
