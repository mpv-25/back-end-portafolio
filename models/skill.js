const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const skillSchema = Schema({
  titulo:{
    type:String,
    required:[true, "El título es obligatorio"]
  },
  img:{
    type:String,
    required:[true, "El img es obligatorio"]
  }
});

module.exports = mongoose.model("Skill", skillSchema);
