const { Router } = require("express");

const { check } = require("express-validator");

const router = Router();

const { validarCampos } = require("../middlewares/validar-campos");

const validarUsuario = require("../middlewares/validar-usuario");

const {
	crearProyecto,
	editProyecto,
	getProyectos,
	deleteProyecto,
} = require("../controllers/proyecto");

router.get("/", getProyectos);

router.post(
	"/",
	[
		validarUsuario,
		check("titulo", "El titulo es obligatorio").notEmpty(),
		check("desc", "La desc es obligatorio").notEmpty(),
		check("tecnologias", "Las técnologias usadas son obligatorias").notEmpty(),
		check("github", "El url de github es obligatorio").notEmpty(),
		check("orden", "El orden es obligatorio").notEmpty(),
		validarCampos,
	],
	crearProyecto
);

router.put(
	"/:id",
	[
		validarUsuario,
		check("titulo", "El titulo es obligatorio").notEmpty(),
		check("desc", "La desc es obligatorio").notEmpty(),
		check("tecnologias", "Las técnologias usadas son obligatorias").notEmpty(),
		check("github", "El url de github es obligatorio").notEmpty(),
		check("orden", "El orden es obligatorio").notEmpty(),
		validarCampos,
	],
	editProyecto
);

router.delete("/:id", [validarUsuario], deleteProyecto);

module.exports = router;
