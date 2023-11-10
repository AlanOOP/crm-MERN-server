import Usuarios from "../models/Usuarios.js";

//funcion para crear un nuevo usuario

const addUsuario = async (req, res, next) => {

    try {
        const { nombre, apellido, email, password } = req.body;

        if (!nombre || !apellido || !email || !password) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        const usuario = new Usuarios(req.body);
        await usuario.save();
        res.json({ mensaje: "Usuario creado correctamente" });
    } catch (error) {
        console.log(error);
        next();
    }
}
