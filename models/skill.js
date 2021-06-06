const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const skillSchema = Schema({
  titulo:{
    type:String,
    require:[true, "El título es obligatorio"]
  },
  img:{
    type:String,
    require:[true, "El img es obligatorio"]
  }
});

module.exports = mongoose.model("Skill", skillSchema);
