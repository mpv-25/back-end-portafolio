const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const proyectoSchema = Schema({
	titulo: {
		type: String,
		required: [true, "El titulo es obligatorio"],
	},
	desc: {
		type: String,
		required: [true, "La desc es obligatorio"],
	},
	tecnologias: [
		{
			type: Schema.Types.ObjectId,
			ref: "Skill",
		},
	],
	github: {
		type: String,
		required: [true, "El github es obligatorio"],
	},
	url: {
		type: String,
		required: false,
	},
	img: {
		type: Array,
		required: false,
		default: [],
	},
	orden: {
		type: Number,
		required: [true, "el orden es obligatorio"],
		default: 100,
	},
});

module.exports = mongoose.model("Proyecto", proyectoSchema);
