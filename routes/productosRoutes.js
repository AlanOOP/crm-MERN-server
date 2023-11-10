import express from 'express';
import multer from 'multer';
// Importamos el controlador

import {
    storage,
    addProducto,
    getProductos,
    getProducto,
    updateProducto,
    deleteProducto,
    searchProducto,
} from '../controllers/productosController.js';

const router = express.Router();

// Configuramos multer

const upload = multer({ storage: storage });

router.get('/productos', getProductos);
router.get('/productos/:id', getProducto);
router.post('/productos', upload.single('imagen'), addProducto);
router.put('/productos/:id', upload.single('imagen'), updateProducto);
router.delete('/productos/:id', deleteProducto);

router.post('/productos/buscar', searchProducto);

export default router;