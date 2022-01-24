const express = require("express");

const fileUpload = require("express-fileupload"); //Subir archivo

const cors = require("cors");

const connection = require("../database/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.visitante = "/api/visitante";
		this.usuario = "/api/usuario";
		this.skill = "/api/skill";
		this.proyecto = "/api/proyecto";
		this.reunion = "/api/reunion";
		this.email = "/api/email";
		this.conectarBD();
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

		//Fileupload - Carga de archivos
		// Note that this option available for versions 1.0.0 and newer.
		// createParentPath:true; si no existe la carpeta de destino crea la carpeta
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: "/tmp/",
				createParentPath: true,
			})
		);
	}

	router() {
		//ruta devisitantes
		this.app.use(this.visitante, require("../routes/visitantes"));

		//rutas de usuarios
		this.app.use(this.usuario, require("../routes/usuario"));

		//rutas de skill
		this.app.use(this.skill, require("../routes/skill"));

		//rutas de proyecto
		this.app.use(this.proyecto, require("../routes/proyecto"));

		//rutas de reunion
		this.app.use(this.reunion, require("../routes/reunion"));

		//ruta de emails
		this.app.use(this.email, require("../routes/email"));
	}

	conectarBD() {
		//conectar a mongoose
		connection();
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("App corriendo en el puerto: ", this.port);
		});
	}
}

module.exports = Server;
