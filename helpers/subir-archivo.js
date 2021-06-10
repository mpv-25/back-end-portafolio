const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif","svg"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];
    //validar la extension
    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extensión ${extension} no es permitida, extensiones  permitidas: ${extensionesValidas}`
      );
    }
    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(
      __dirname,
      "../public/assets/img/iconos/",
      carpeta,
      nombreTemp
    );

    archivo.mv(uploadPath, function (err) {
      if (err) {
        return reject(err);
      }
      //Si todo el proceso es exitoso
      resolve(nombreTemp);
    });
  });
};

module.exports = { subirArchivo };
