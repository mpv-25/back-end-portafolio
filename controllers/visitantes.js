const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Visitante = require("../models/visitantes");

const getVisitantes = async (req = request, res = response) => {
  let { desde = 0, limite = 10 } = req.query;
  desde = parseInt(desde);
  limite = parseInt(limite);
  let visitantes = {};
  try {
    visitantes = await Visitante.find().skip(desde).limit(limite);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "ERROR!!! no se pudo encotrar los visitantes" });
  }
  res.json({ visitantes, desde, hasta: limite });
};

const crearVisitante = async (req = request, res = response) => {
  try {
    let { correo, nombre, img } = req.body;
    let visitante = await Visitante.findOne({ correo });
    let resp;
    if (!visitante) {
      visitante = new Visitante({ correo, nombre, img });
      resp = await visitante.save();
    } else {
      let { bloqueado, visitas, _id } = visitante;
      if (bloqueado) {
        resp = { msg: "Visitante bloqueado" };
        return res.status(400).json({ resp });
      }
      visitas++;
      if (visitas === 5) {
        bloqueado = true;
      }
      visitante = await Visitante.findByIdAndUpdate(
        _id,
        { visitas, bloqueado },
        { new: true }
      );
      const payload = { nombre, visitas };
      const secretOrPrivateKey = process.env.SECRETORPRIVATEKEY;
      const token = jwt.sign(payload, secretOrPrivateKey, { expiresIn: "2h" });
      const msg = `visita número ${visitas}`;
      resp = { msg, token };
      res.json({ visitante:resp });
    }
  } catch (err) {
    return res.status(500).json({ msg: "ERROR!!! no se pudo crear visitante" });
  }
};
const verificarToken = async (req = request, res = response) => {
  const { token } = req.body;

  // invalid token - synchronous
  try {
    let decoded = jwt.verify(token, "electiva3");
    return res.json({ msg: "token válido", decoded });
  } catch (err) {
    return res.status(400).json({ msg: "Token no válido", err });
  }
};

module.exports = { crearVisitante, getVisitantes, verificarToken };
