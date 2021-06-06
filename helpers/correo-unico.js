const Visitante = require("../models/visitantes");
const correoUnico = async (correo = "") => {
  const exiteCorreo = await Visitante.findOne({ correo });

  if(exiteCorreo){
    throw new Error(`El correo ${correo} ya existe`);
  }
};

module.exports = correoUnico;
