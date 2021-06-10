const { request, response } = require("express");

const { subirArchivo } = require("../helpers/index");
const Skill = require("../models/skill");

const crearSkill = async (req = request, res = response) => {
  try {
    const { titulo } = req.body;
    const img = await subirArchivo(req.files); //subir el archivo al servidor

    const skill = new Skill({ titulo, img });
    const resp = await skill.save();

    res.json({ skill: resp });
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "ERROR!!! no se pudo crear la skill", err });
  }
};

const getSkills = async (req = request, res = response) => {
  try {
    let { desde = 0, limite = 10 } = req.body;

    desde = parseInt(desde);
    limite = parseInt(limite);

    const resp = await Skill.find().skip(desde).limit(limite);
    res.json({ skills: resp });
  } catch (err) {
    return res.status(500).json({ msg: "ERROR!!! no obtener las skills", err });
  }
};

const editSkill = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { titulo } = req.body;
    const img = await subirArchivo(req.files); //subir el archivo al servidor

    const resp = await Skill.findByIdAndUpdate(
      id,
      { titulo, img },
      { new: true }
    );
    if (!resp) {
      return res.status(400).json({ msg: "ERROR!!! id inválido" });
    }

    res.json({ skill: resp });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo editar la skill", err });
  }
};

const deleteSkill = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await Skill.findByIdAndDelete(id);

    if (!resp) {
      return res.status(400).json({ msg: "ERROR!!! id inválido" });
    }

    res.json({ skill: resp });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo elminar la skill", err });
  }
};

module.exports = { crearSkill, getSkills, editSkill, deleteSkill };
