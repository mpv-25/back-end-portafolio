const nodemailer = require("nodemailer");
const fs = require("fs");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: process.env.EMAIL_USER, // generated ethereal user
		pass: process.env.PASSWORD_APPEMAILGOOGLE, // generated ethereal password
	},
});
const enviarEmailReunion = async (resp) => {
	try {
	  let htmlContent = {};
	  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	  if(resp.tipoReunion == 'presencial'){
	    htmlContent = `
                              <h2>Reunión Confirmada</h2>
			      <h3>Empresa: ${resp.empresa}</h3>
                              <h3>Correo de contacto: ${resp.correo}</h3>
                              <h3>Tipo reunión: ${resp.tipoReunion}</h3>
                              <h3>Fecha de reunión: ${resp.fecha.toLocaleDateString('es-PY', options)}</h3>
                              <h3>Hora de reunión: ${resp.hora} hs.</h3>
                              <h3>Ubicación de la reunión: lat: ${resp.ubicacion.lat} lng:${resp.ubicacion.lng}</h3>
                              <h3>Mensaje: ${resp.mensaje}</h3>`;
	  }else{
                htmlContent = `<h2>Reunión Confirmada</h2>
			      <h3>Empresa: ${resp.empresa}</h3>
                              <h3>Correo de contacto: ${resp.correo}</h3>
                              <h3>Tipo reunión: ${resp.tipoReunion}</h3>
                              <h3>Fecha de reunión: ${resp.fecha.toLocaleDateString('es-PY', options)}</h3>
                              <h3>Hora de reunión: ${resp.hora} hs.</h3>
                              <h3>Enlace de Google Meet: ${resp.urlOnline}</h3>
                              <h3>Mensaje: ${resp.mensaje}</h3>
			      `
	  }
		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"matias-pinto.com" <matias25pinto@gmail.com>', // sender address
			to: `matias25pinto@gmail.com`,
			subject: "Confirmación de Reunión", // Subject line,
			html: htmlContent,
		});
		console.log("Alerta de reunion: %s", info.messageId);
	} catch (err) {
		console.log("No se envio el correo: error - ", err);
	}
};

const enviarConfirmacionReunion = async (resp) => {
	try {
	  let htmlContent = {};
	  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	  if(resp.tipoReunion == 'presencial'){
	    htmlContent = `
                              <h3>Gracias por el interés en mi perfil profesional, nos vemos en la reunión.</h3>
                              <h3>Tipo reunión: ${resp.tipoReunion}</h3>
                              <h3>Fecha de reunión: ${resp.fecha.toLocaleDateString('es-PY', options)}</h3>
                              <h3>Hora de reunión: ${resp.hora} hs.</h3>
                              <h3>Ubicación de la reunión: lat: ${resp.ubicacion.lat} lng:${resp.ubicacion.lng}</h3>
                              <h4>En caso de querer cancelar la reunión enviar un correo a matias25pinto@gmail.com</h4>
	                      <p>Muchas gracias por su tiempo, no contestar este correo fue generado de forma automática.</p>`;
	  }else{
            htmlContent  =   `<h3>Gracias por el interés en mi perfil profesional, nos vemos en la reunión.</h3>
                              <h3>Tipo reunión: ${resp.tipoReunion}</h3>
                              <h3>Fecha de reunión: ${resp.fecha.toLocaleDateString('es-PY', options)}</h3>
                              <h3>Hora de reunión: ${resp.hora} hs.</h3>
                              <h3>Enlace de Google Meet: ${resp.urlOnline}</h3>
                              <h4>En caso de querer cancelar la reunión enviar un correo a matias25pinto@gmail.com</h4>
	                      <p>Muchas gracias por su tiempo, no contestar este correo fue generado de forma automática.</p>
			      `
	  }
		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"matias-pinto.com" <matias25pinto@gmail.com>', // sender address
			to: `${resp.correo}`,
			subject: "Confirmación de Reunión con Matias Pinto", // Subject line,
			html: htmlContent,

		});
		console.log("Confirmacion de la reunion: %s", info.messageId, "- correo: ", resp.correo);
	} catch (err) {
		console.log("No se envio el correo: error - ", err);
	}
};


const enviarCurriculum = async (correo) => {
	try {
		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"matias-pinto.com" <matias25pinto@gmail.com>', // sender address
			to: `${correo}`, // list of receivers
			subject: "Desarrollador Web", // Subject line
			attachments: [
				{
					filename: "tarjeta.png",
					path: __dirname + "/tarjeta.png", // path contains the filename, do not just give path of folder where images are reciding.
					cid: "tarjeta", // give any unique name to the image and make sure, you do not repeat the same string in given attachment array of object.
				},
				{
					filename: "curriculum_matias-pinto.pdf",
					path: __dirname + "/curriculum_matias-pinto.pdf", // path contains the filename, do not just give path of folder where images are reciding.
					cid: "curriculum_matias-pinto", // give any unique name to the image and make sure, you do not repeat the same string in given attachment array of object.
				},
			],
			html: `<img src="cid:tarjeta" alt="tarjeta-matias-pinto" />`,
		});
		console.log("Enviar Curriculum: %s", info.messageId, " - correo: ", correo);
	} catch (err) {
		console.log("No se envio el correo: error - ", err);
	}
};

module.exports = { enviarEmailReunion, enviarCurriculum, enviarConfirmacionReunion };
