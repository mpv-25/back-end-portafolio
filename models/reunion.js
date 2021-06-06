const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reunionSchema = Schema({
  empresa: {
    type: String,
    require: [true, "Es obligatorio el parametro empresa"],
  },
  correo: {
    type: String,
    require: [true, "Es obligatorio el parametro correo"],
  },
  tipoReunion: {
    type: String,
    require: [true, "Es obligatorio el parametro tipoReunion"],
  },
  urlOnline: {
    type: String,
    require: false,
    default: "",
  },
  ubicacion: {
    type: String,
    require: false,
    default: "",
  },
  mensaje: {
    type: String,
    require: [true, "Es obligatorio el parametro mensaje"],
  },
  fecha: {
    type: String,
    require: [true, "Es obligatorio el parametro fecha"],
  },
  hora: {
    type: String,
    require: [true, "Es obligatorio el parametro hora"],
  },
  terminado:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("Reunion", reunionSchema);
