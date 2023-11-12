import express from 'express';

import {
    addUsuario,
    loginIn
} from '../controllers/usuariosController.js';


const router = express.Router();

router.post('/register', addUsuario);
router.post('/login', loginIn);



export default router;