require("dotenv").config();
const express = require("express");
const mongose = require("mongoose");
const cors = require("cors");
const app = express();
const usuarioRoutes = require("./routes/usuarios");

app.use(cors());
app.use(express.json());
app.use("/api/usuarios", usuarioRoutes);

mongose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongo conectado"))
.catch(err => console.log(err));

app.listen(3000,()=>{
    console.log("Servidor funcionando en puerto 3000");
});