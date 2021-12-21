const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const skillSchema = Schema({
	titulo: {
		type: String,
		required: [true, "El título es obligatorio"],
	},
	img: {
		type: String,
		required: [true, "El img es obligatorio"],
	},
	orden: {
		type: Number,
		required: [true, "el orden es obligatorio"],
		default: 100,
	},
});

module.exports = mongoose.model("Skill", skillSchema);
