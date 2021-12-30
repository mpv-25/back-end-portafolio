const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usuarioSchema = Schema({
	nombre: {
		type: String,
		required: [true, "El nombre es obligatorio"],
	},
	email: {
		type: String,
		required: [true, "El correo es obligatorio"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "El password es obligatorio"],
	},
});

module.exports = mongoose.model("Usuario", usuarioSchema);
