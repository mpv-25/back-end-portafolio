const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearVisitante,
  getVisitantes,
  verificarToken,
} = require("../controllers/visitantes");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/",
  [
    check("correo", "El correo es obligatorio").notEmpty(),
    check("correo", "El formato debe ser correo").isEmail(),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("img", "El img es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearVisitante
);

router.get("/", getVisitantes);

router.get("/verificar-token", verificarToken);

module.exports = router;
