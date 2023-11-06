import  express from "express";
import dotenv from "dotenv";
import conectDB from "./config/db.js";
import cors from "cors";

//Routes

import clientesRoutes from "./routes/clientesRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";
import pedidosRoutes from "./routes/pedidosRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//cors lista blanca
// const whitelist = ["http://localhost:3000"];
// const corsOptions = {
//     origin: (origin, callback) => {
//         const existe = whitelist.some(dominio => dominio === origin);
//         if(existe){
//             callback(null, true);
//         }else{
//             callback(new Error("No permitido por CORS"));
//         }
//     }
// }
//Habilitar cors
app.use(cors());



dotenv.config();
//metodo conexion base de datos
conectDB();


//Routing
app.use("/api/clientes", clientesRoutes); 
app.use("/api", productosRoutes);
app.use("/api", pedidosRoutes);

app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
});