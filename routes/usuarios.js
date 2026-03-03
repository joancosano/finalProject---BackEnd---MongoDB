const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");

// Crear usuario
router.post("/register", async (req, res) => {
    try {
        const nuevoUsuario = new Usuario({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            direccion: req.body.direccion,
            poblacion: req.body.poblacion,
            codigoPostal: req.body.codigoPostal,
            telefono: req.body.telefono,
            correo: req.body.correo,
            usuario: req.body.usuario,
            password: req.body.password,
        })
        await nuevoUsuario.save();
        res.status(201).json({nuevoUsuario});
    }
    catch (error){
        res.status(500).json({error: error.message})
    }
});

// Obtener todos los usuarios

router.get("/", async (req,res) =>{
const usuario = await Usuario.find();
res.json(usuarios);
});

module.exports = router