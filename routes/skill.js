const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const validarUsuario = require("../middlewares/validar-usuario");
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
    check("titulo", "El título es obligatorio"),
    check("img", "El link de la imagen es obligatorio"),
    validarCampos,
  ],
  crearSkill
);

router.get("/", getSkills);

router.put(
  "/:id",
  [
    validarUsuario,
    check("titulo", "El título es obligatorio"),
    check("img", "EL link de la imagen es obligatorio"),
    validarCampos,
  ],
  editSkill
);

router.delete("/:id", [validarUsuario], deleteSkill);

module.exports = router;
