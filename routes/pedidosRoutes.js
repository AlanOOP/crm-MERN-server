import express from 'express';

import {
    addPedido,
    mostrarPedidos,
    mostrarPedido,
    actualizarPedido,
    eliminarPedido
} from '../controllers/pedidosController.js';

const router = express.Router();

router.get('/pedidos', mostrarPedidos);
router.get('/pedidos/:id', mostrarPedido);
router.post('/pedidos', addPedido);
router.put('/pedidos/:id', actualizarPedido);
router.delete('/pedidos/:id', eliminarPedido);





export default router;