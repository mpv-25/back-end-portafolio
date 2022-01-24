const { Router } = require("express");

const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/", [check("email").isEmail(), validarCampos], (req, res) => {
	console.log("funciona la ruta de email");
	res.json({ msg: "funciona la ruta de email" });
});

module.exports = router;
