const { request, response } = require("express");
const fs = require("fs");

const { subirArchivo } = require("../helpers/index");
const Skill = require("../models/skill");

const crearSkill = async (req = request, res = response) => {
	try {
		const { titulo, orden } = req.body;
		const img = await subirArchivo(req.files); //subir el archivo al servidor

		const skill = new Skill({ titulo, img, orden });
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
		let { desde = 0, limite = 200 } = req.body;

		desde = parseInt(desde);
		limite = parseInt(limite);

		const resp = await Skill.find()
			.skip(desde)
			.limit(limite)
			.sort({ orden: 1 });
		res.json({ skills: resp });
	} catch (err) {
		return res.status(500).json({ msg: "ERROR!!! no obtener las skills", err });
	}
};

const editSkill = async (req = request, res = response) => {
	try {
		const { id } = req.params;
		const { titulo, orden } = req.body;
		const img = await subirArchivo(req.files); //subir el archivo al servidor

		const resp = await Skill.findByIdAndUpdate(
			id,
			{ titulo, img, orden },
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
		const skill = await Skill.findById(id);
		//Limpiar imágenes previas.
		if (skill.img) {
			//hay que borrar la imagen del servidor
			const pathImg = path.join(
				__dirname,
				"../public/assets/img/iconos",
				coleccion,
				skill.img
			);
			if (fs.existsSync(pathImg)) {
				fs.unlinkSync(pathImg);
			}
		}
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
