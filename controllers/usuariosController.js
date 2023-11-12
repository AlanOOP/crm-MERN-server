import generarJWT from "../helpers/generarJWT.js";
import Usuarios from "../models/Usuarios.js";
import bcrypt from "bcrypt";

//funcion para crear un nuevo usuario

const addUsuario = async (req, res, next) => {

    try {
        const { nombre, apellido, email, password } = req.body;
    

        if (!nombre || !apellido || !email || !password) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        if (password.length < 6) {
            return res.status(400).json({ mensaje: "La contraseña debe tener al menos 6 caracteres" });
        }

        //comprobar que el usuario no exista
        const usuarioExiste = await Usuarios.findOne(
            {  email }
        );
        console.log(usuarioExiste);

        if (usuarioExiste) {
            return res.status(400).json({ mensaje: "El usuario ya existe" });
        }


        const usuario = new Usuarios(req.body);
        usuario.password = await bcrypt.hash(password, 10);
        await usuario.save();
        res.json({ mensaje: "Usuario creado correctamente" });


    } catch (error) {
        console.log(error);
        next();
    }
}

//comprobar inicio de sesión    

const loginIn = async (req, res, next) => {
    

    try {


        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        const usuario = await Usuarios.findOne({ email });
        if (!usuario) {

            return res.status(400).json({ mensaje: "El usuario no existe" });
        }

        //comprobar password
        if (!bcrypt.compareSync(password, usuario.password)) {
            return res.status(400).json({ mensaje: "Password incorrecto" });
        }

        //crear y firmar el JWT

        const  payload  =  {
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                token: generarJWT(usuario.id)
            }
        }

        //firmar el JWT
        await res.json (payload);

    } catch (error) {
        return 
    }
}


export {
    addUsuario,
    loginIn 
}