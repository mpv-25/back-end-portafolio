const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ubicacionShema = Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const reunionSchema = Schema({
  empresa: {
    type: String,
    required: [true, "Es obligatorio el parametro empresa"],
  },
  correo: {
    type: String,
    required: [true, "Es obligatorio el parametro correo"],
  },
  tipoReunion: {
    type: String,
    required: [true, "Es obligatorio el parametro tipoReunion"],
  },
  urlOnline: {
    type: String,
    required: false,
    default: "",
  },
  ubicacion: {
    type: ubicacionShema,
    required: false,
    default: "",
  },
  mensaje: {
    type: String,
    required: [true, "Es obligatorio el parametro mensaje"],
  },
  fecha: {
    type: String,
    required: [true, "Es obligatorio el parametro fecha"],
  },
  hora: {
    type: String,
    required: [true, "Es obligatorio el parametro hora"],
  },
  terminado: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("Reunion", reunionSchema);
