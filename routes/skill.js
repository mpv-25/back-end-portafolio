const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const validarUsuario = require("../middlewares/validar-usuario");
const validarArchivos = require("../middlewares/validar-archivos");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  crearSkill,
  getSkills,
  editSkill,
  deleteSkill,
} = require("../controllers/skill");

router.post(
  "/",
  [
    validarUsuario,
    validarArchivos,
    check("titulo", "El título es obligatorio"),
    validarCampos,
  ],
  crearSkill
);

router.get("/", getSkills);

router.put(
  "/:id",
  [
    validarUsuario,
    validarArchivos,
    check("titulo", "El título es obligatorio"),
    validarCampos,
  ],
  editSkill
);

router.delete("/:id", [validarUsuario], deleteSkill);

module.exports = router;
