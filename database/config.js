const mongoose = require("mongoose");

const connection = () => {
  mongoose.connect(
    process.env.MONGODB_CNN,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err) => {
      if (err) throw new Error("ERROR!!! no se pudo conectar a la BD");

      console.log("Conectado a la BD online");
    }
  );
};

module.exports = connection;
