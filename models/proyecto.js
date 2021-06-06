const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const proyectoSchema = Schema({
  titulo: {
    type: String,
    require: [true, "El titulo es obligatorio"],
  },
  desc: {
    type: String,
    require: [true, "La desc es obligatorio"],
  },
  tecnologias:{
    type:Array,
    require:[true, "Las técnologias son obligatorias"]
  },
  github: {
    type: String,
    require: [true, "El github es obligatorio"],
  },
  url: {
    type: String,
    require: false,
  },
  img: {
    type: Array,
    require: false,
    default: [],
  },
});

module.exports = mongoose.model("Proyecto", proyectoSchema);
