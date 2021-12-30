const { Router } = require("express");

const { check } = require("express-validator");

const router = Router();

const { crearUsuario, login } = require("../controllers/usuario");
const { validarCampos } = require("../middlewares/validar-campos");
const validarUsuario = require("../middlewares/validar-usuario");

router.post(
	"/",
	[
		validarUsuario,
		check("nombre", "El nombre es obligatorio").notEmpty(),
		check("email", "El email es obligatorio").notEmpty(),
		check("email", "El formato debe ser email").isEmail(),
		check("password").notEmpty(),
		validarCampos,
	],
	crearUsuario
);

router.post(
	"/login",
	[
		check("email", "El email es obligatorio").notEmpty(),
		check("email", "El formato debe ser email").isEmail(),
		check("password", "El password es obligatorio").notEmpty(),
		validarCampos,
	],
	login
);

module.exports = router;
