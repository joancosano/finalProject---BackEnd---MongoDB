const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(

    {
    nombre: String,
    apellidos: String,
    direccion: String,
    poblacion: String,
    codigoPostal: String,
    telefono: String,
    correo: String,
    usuario: String,
    password: String,
});

module.exports=mongoose.model("Usuario",usuarioSchema);