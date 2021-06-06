const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const visitanteSchema = Schema({
  correo: {
    type: String,
    require: [true, "El correo es obligatorio"],
  },
  nombre: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  img: {
    type: String,
    default: "no-image",
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
  visitas: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Visitante", visitanteSchema);
