import express from 'express';
import multer from 'multer';
// Importamos el controlador

import {

    addProducto,
    getProductos,
    getProducto,
    updateProducto,
    deleteProducto,
    searchProducto,
} from '../controllers/productosController.js';

const router = express.Router();

// Configuramos multer

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });

const upload = multer({ storage: storage });

router.get('/productos', getProductos);
router.get('/productos/:id', getProducto);
router.post('/productos', upload.single('imagen'), addProducto);
router.put('/productos/:id', upload.single('imagen'), updateProducto);
router.delete('/productos/:id', deleteProducto);

router.post('/productos/buscar', searchProducto);

export default router;