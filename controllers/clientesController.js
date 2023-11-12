import Clientes from '../models/Clientes.js';
//metodo para crear un cliente

const addClient = async (req, res) => {

    const { nombre, apellido, empresa, email, telefono } = req.body;

    //verificar si existe el correo

    const correoExiste = await Clientes.findOne({  email });

    if (!nombre || !apellido || !empresa || !email || !telefono) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios",
        });
    } else if (correoExiste) {
        return res.status(400).json({
            mensaje: "El correo ya esta registrado",
        });
    } else {
        try {
            const cliente = new Clientes(req.body);
            await cliente.save();
            res.json({
                mensaje: "Cliente agregado correctamente",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                mensaje: "Error al agregar cliente",
            });
        }
    }
};

//Muestra todos los clientes

const getClients = async (req, res, next) => {
    try {
        const clientes = await Clientes.find();
        res.json(clientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al obtener clientes",
        });
        next();
    }
}

//Muesrea un cliente por su ID

const getClient = async (req, res, next) => {
    try {
        const cliente = await Clientes.findById(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                mensaje: "El cliente no existe"
            });

        }
        res.json(cliente);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al obtener cliente",
        });
        next();
    }
}

//Actualiza un cliente 

const updateClient = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true
        });
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al actualizar cliente",
        });
        next();
    }
}

//eliminar un cliente

const deleteClient = async (req, res, next) => {
    try {
        await Clientes.findOneAndDelete({ _id: req.params.id });
        res.json({
            mensaje: "Cliente eliminado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al eliminar cliente",
        });
        next();
    }
}


export {
    addClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
};