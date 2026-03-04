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
})

router.get("/:usuario", async(req,res) => {
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