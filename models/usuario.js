const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usuarioSchema = Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    require: [true, "El correo es obligatorio"],
  },
  password: {
    type: String,
    require: [true, "El password es obligatorio"],
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
