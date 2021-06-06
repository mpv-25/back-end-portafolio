const { Router } = require("express");

const { check } = require("express-validator");

const router = Router();

const { validarCampos } = require("../middlewares/validar-campos");

const { crearReunion, editReunion } = require("../controllers/reunion");

router.post(
  "/",
  [
    check("empresa", "El campo empresa es obligatorio").notEmpty(),
    check("correo", "El campo correo es obligatorio").notEmpty(),
    check("correo", "El campo correo tiene que ser tipo correo").isEmail(),
    check("tipoReunion", "El campo tipoReunion es obligatorio").notEmpty(),
    check("mensaje", "El campo mensaje es obligatorio").notEmpty(),
    check("fecha", "El campo fecha es obligatorio").notEmpty(),
    check("hora", "El campo hora  es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearReunion
);

router.put(
  "/:id",
  [
    check("terminado", "El campo terminado es obligatorio").notEmpty(),
    validarCampos,
  ],
  editReunion
);

module.exports = router;
