import express from "express";

import {
    addClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
} from "../controllers/clientesController.js";

const router = express.Router();

router.post("/", addClient);
router.get("/", getClients);
//mostrar un cliente por su ID
router.get("/:id", getClient);
//actualizar un cliente 
router.put("/:id", updateClient);
//eliminar un cliente
router.delete("/:id", deleteClient);


export default router;