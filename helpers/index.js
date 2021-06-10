const correoUnico = require("./correo-unico");
const subirArchivo = require("./subir-archivo");

module.exports = { ...correoUnico, ...subirArchivo };
