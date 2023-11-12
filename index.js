import express from "express";
import dotenv from "dotenv";
import conectDB from "./config/db.js";
import cors from "cors";

//Routes

import clientesRoutes from "./routes/clientesRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";
import pedidosRoutes from "./routes/pedidosRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js"

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//imagenes

app.use(express.static("public"));


// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

console.log(process.env.FRONTEND_URL);

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));



//metodo conexion base de datos
conectDB();


//Routing
app.use("/api/clientes", clientesRoutes);
app.use("/api", productosRoutes);
app.use("/api", pedidosRoutes);
app.use("/api", usuariosRoutes);

const PORT = process.env.PORT || 3000;

const servidor = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });

app.get("/", (req, res) => {
    res.send("Hola mundo");
});