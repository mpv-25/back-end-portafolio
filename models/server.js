const express = require("express");

const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = 80;
    this.middleware();
    this.router();
  }

  middleware() {
    //CORS, es un middleware para gestionar el acceso a la api los navegadores lo piden de manera obligatoria
    this.app.use(cors());

    //JSON, es un middleware que lee y luego parsea lo enviado en el body a un objeto json
    this.app.use(express.json());

    //Es un middleware que permite hacer publica una carpeta
    this.app.use(express.static("public"));
  }

  router() {}

  listen() {
    this.app.listen(this.port, () => {
      console.log("App corriendo en el puerto: ", this.port);
    });
  }
}

module.exports = Server;
