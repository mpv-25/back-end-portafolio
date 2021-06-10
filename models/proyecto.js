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
  tecnologias: [{
    type: Schema.Types.ObjectId,
    ref: "Skill",
  }],
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
});

module.exports = mongoose.model("Proyecto", proyectoSchema);
