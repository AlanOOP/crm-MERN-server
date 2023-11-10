import mongoose from "mongoose";

const clienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },
    empresa: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
}

);

const Clientes = mongoose.model("Clientes", clienteSchema);

export default Clientes;