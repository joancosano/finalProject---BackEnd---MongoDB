const mongoose = require("mongoose");

const listaSchema = new mongoose.Schema({
    usuario : String,
    fecha: String,
    productos: Array
    
});

module.exports = mongoose.model("Lista",listaSchema);