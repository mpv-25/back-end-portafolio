const { request, response } = require("express");

const Reunion = require("../models/reunion");

const { enviarEmailReunion, enviarConfirmacionReunion } = require("../helpers/emailer");

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

const getFechasOcupado = async (req = request, res = response) => {
	try {
		const fechaHoy = new Date().toLocaleString("es-PY", {
			timeZone: "America/Asuncion",
		});
		const arregloFechaHoy = fechaHoy.split("/");
		const dd =
			arregloFechaHoy[0] < 10 ? "0" + arregloFechaHoy[0] : arregloFechaHoy[0];
		const mm =
			arregloFechaHoy[1] < 10 ? "0" + arregloFechaHoy[1] : arregloFechaHoy[1];

		const yyyy = arregloFechaHoy[2].split(" ")[0];
		const resp = await Reunion.find({
			fecha: {
				$gte: new Date(yyyy, 0, 1),
				$lte: new Date(yyyy, 11, 31),
			},
		});

		let fechas = resp.map((reunion) => {
			return reunion.fecha;
		});

		let fechasOcupado = [[], [], [], [], [], [], [], [], [], [], [], []];
		for (let fecha of fechas) {
			let indice = fecha.getMonth();
			let dia = fecha.getDate();
			fechasOcupado[indice].push(dia);
		}

		res.json(fechasOcupado);
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ msg: "ERROR!!! no se pudo obtener las fechas de reunión" });
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

		await enviarEmailReunion(resp);
	        await enviarConfirmacionReunion(resp);

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

module.exports = { crearReunion, editReunion, getReunion, getFechasOcupado };
