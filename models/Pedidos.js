import mongoose from "mongoose";

const pedidosSchema = mongoose.Schema({
    cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clientes'
    },
    pedido: [{
        producto:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Productos'
        },
        cantidad: Number
    }],
    total: {
        type: Number
    }
}, { timestamps: true });

const Pedidos = mongoose.model('Pedidos', pedidosSchema);

export default Pedidos;