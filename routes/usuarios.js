const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");

//hacer login

router.post("/login", async (req, res) => {
     console.log("BODY:", req.body);

    try {

        const { usuario, password } = req.body;
            console.log("BUSCANDO USUARIO:", usuario);


        const usuarioDB = await Usuario.findOne({ usuario: usuario });
        console.log(usuarioDB);

        if (!usuarioDB) {
            return res.status(401).json({
                error: "Usuario o contraseña incorrectos"
            });
        }

        if (usuarioDB.password !== password) {
            return res.status(401).json({
                error: "Usuario o contraseña incorrectos"
            });
        }

        res.json({
            mensaje: "Login correcto",
            usuario: usuarioDB.usuario,
            nombre: usuarioDB.nombre
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

}); 


/*
router.post("/login", async (req, res) => {

    console.log("BODY:", req.body);

    const { usuario, password } = req.body;

    console.log("BUSCANDO USUARIO:", usuario);

    const usuarioDB = await Usuario.findOne({ usuario });

    console.log("RESULTADO:", usuarioDB);

});
*/

// Crear usuario
router.post("/register", async (req, res) => {

    try {

        const usuarioExistente = await Usuario.findOne({
            usuario: req.body.usuario
        });

        if(usuarioExistente){
            return res.status(400).json({
                error: "El usuario ya existe"
            });
        }
        
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
        });

        await nuevoUsuario.save();
        res.status(201).json({mensaje: "usuario registrado correctamente"});
    }
    catch (error){
        res.status(500).json({error: error.message})
    }
});
// Obtener todos los usuarios

router.get("/", async (req,res) =>{
    try{
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error){
        res.status(500).json({error: error.message})
    }
});


module.exports = router