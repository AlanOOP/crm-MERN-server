import Pedidos from "../models/Pedidos.js";

// Agrega un nuevo pedido

const addPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();
        res.json({
            mensaje: "Pedido agregado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al agregar pedido",
        });
        next();
    }
}


//mostar todos los pedidos

const mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate("cliente").populate({
            path: "pedido.producto",
            model: "Productos"
        });
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al mostrar pedidos",
        });
        next();
    }
}

//mostrar pedido por id

const mostrarPedido = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.id).populate("cliente").populate({
        path: "pedido.producto",
        model: "Productos"
    });

    if (!pedido) {
        res.json({
            mensaje: "No existe el pedido",
        });
        return next();
    }
    res.json(pedido);
}

//actualizar pedidos

const actualizarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedidos.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        }).populate("cliente").populate({
            path: "pedido.producto",
            model: "Productos"
        });
        res.json(pedido);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al actualizar pedido",
        });
        next();
    }
}

const eliminarPedido = async (req, res, next) => {
    try {

        const pedido = await Pedidos.findById(req.params.id);

        if (!pedido) {
            res.json({
                mensaje: "No existe el pedido",
            });
            return next();
        }

        await Pedidos.findOneAndDelete({
            _id: req.params.id
        });
        res.json({
            mensaje: "El pedido ha sido eliminado"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al eliminar pedido",
        });
        next();
    }
}

export {
    addPedido,
    mostrarPedidos,
    mostrarPedido,
    actualizarPedido,
    eliminarPedido
};