const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwksClient= require("jwks-rsa")
import jwksClient from "jwks-rsa";

let usuarios = [];


app2.post('/usuario', (request, response) => {
    const {
     nome, email, senha
    } = request.body;
    const p = usuario.find((v) => v.identificador == identificador);
    const usuario = {
      id: uuid(),
      nome,
      email,
      senha,
    };
    usuarios.push(usuario);
    response.status(201).json(usuario);
  });

