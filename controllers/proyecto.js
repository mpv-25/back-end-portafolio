const { request, response } = require("express");

const Proyecto = require("../models/proyecto");

const getProyectos = async (req = request, res = response) => {
	try {
		let { desde = 0, limite = 6 } = req.query;
		desde = parseInt(desde);
		limite = parseInt(limite);
		let totalPaginas = 3;
		let pagina = desde / limite + 1;

		let [proyectos, totalProyectos] = await Promise.all([
			Proyecto.find()
				.skip(desde)
				.limit(limite)
				.populate("tecnologias")
				.sort({ orden: 1 }),
			Proyecto.countDocuments(),
		]);
		totalPaginas = totalProyectos / limite;
		totalPaginas = Math.ceil(totalPaginas);

		res.json({ totalPaginas, pagina, proyectos });
	} catch (err) {
	  console.log(err);
		return res
			.status(500)
			.json({ msg: "ERROR!!! no se pudo obtener los proyectos", err });
	}
};

const crearProyecto = async (req = request, res = response) => {
	try {
		const { titulo, desc, tecnologias, github, url, img, orden } = req.body;

		const proyecto = new Proyecto({
			titulo,
			desc,
			tecnologias,
			github,
			url,
			img,
			orden,
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
		const { titulo, desc, tecnologias, github, url, img, orden } = req.body;

		const resp = await Proyecto.findByIdAndUpdate(
			id,
			{ titulo, desc, tecnologias, github, url, img, orden },
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
