const express = require("express");
const router = express.Router();
const Lista = require("../models/Lista")

//crear lista

router.post("/", async (req,res) => {
    
    try{
        const nuevaLista = new Lista({
            usuario : req.body.usuario,
            fecha: req.body.fecha,
            productos: req.body.productos
        })
        await nuevaLista.save();
        res.status(201).json(nuevaLista);
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
});

// obtener una lista por id
router.get("/lista/:id", async (req,res) => {

    try{
        const lista = await Lista.findById(req.params.id);

        if (!lista){
            return res.status(404).json({error: "Lista no encontrada"})
        }
        res.json(lista);
    }
    catch (error){
        res.status(500).json({error: error.message})
    }
});

//obtener todas las listas de un usuario
router.get("/usuario/:usuario", async(req,res) => {
    try{
        const listas = await Lista.find({
            usuario: req.params.usuario
        });
        res.json(listas);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
});

module.exports = router;