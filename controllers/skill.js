const { request, response } = require("express");
const Skill = require("../models/skill");

const crearSkill = async (req = request, res = response) => {
  const { titulo, img } = req.body;
  const skill = new Skill({ titulo, img });
  let resp = {};

  try {
    resp = await skill.save();
  } catch (err) {
    resp = { msg: "ERROR!!! no se pudo crear la skill", err };
    return res.status(400).json({ resp });
  }

  res.json({ resp });
};

const getSkills = async (req = request, res = response) => {
  let { desde = 0, limite = 10 } = req.body;

  desde = parseInt(desde);
  limite = parseInt(limite);

  let resp = {};

  try {
    resp = await Skill.find().skip(desde).limit(limite);
  } catch (err) {
    resp = { msg: "ERROR!!! no obtener las skills", err };
    return res.status(500).json({ resp });
  }

  res.json({ resp });
};

const editSkill = async (req = request, res = response) => {
  const { id } = req.params;
  const { titulo, img } = req.body;
  let resp = {};

  try {
    resp = await Skill.findByIdAndUpdate(id, { titulo, img }, { new: true });
    if (!resp) {
      return res.status(400).json({ msg: "ERROR!!! id inválido" });
    }
  } catch (err) {
    resp = { msg: "ERROR!!! no se pudo editar la skill", err };
    return res.status(500).json({ resp });
  }

  res.json({ resp });
};

const deleteSkill = async (req = request, res = response) => {
  const { id } = req.params;
  let resp = {};
  try {
    resp = await Skill.findByIdAndDelete(id);
    if (!resp) {
      return res.status(400).json({ msg: "ERROR!!! id inválido" });
    }
  } catch (err) {
    resp = { msg: "ERROR!!! no se pudo elminar la skill", err };
    return res.status(500).json({ resp });
  }
  res.json({ resp });
};

module.exports = { crearSkill, getSkills, editSkill, deleteSkill };
