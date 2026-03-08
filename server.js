require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const usuarioRoutes = require("./routes/usuarios");
const listaRoutes = require("./routes/listas");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/listas", listaRoutes);
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongo conectado"))
.catch(err => console.log(err));

app.listen(3000,()=>{
    console.log("Servidor funcionando en puerto 3000");
});