const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const visitanteSchema = Schema({
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
  },
  bloqueado: {
    type: Boolean,
    default: false,
    required: false,
  },
  visitas: {
    type: Number,
    default: 1,
    required: false,
  },
});

module.exports = mongoose.model("Visitante", visitanteSchema);
