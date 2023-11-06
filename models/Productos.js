import mongoose from "mongoose";

const productosSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true
    },
    precio: {
        type: Number,
        trim: true
    },
    imagen: {
        type: String,
        trim: true
    }
},{
    timestamps: true
}

);

const Productos = mongoose.model("Productos", productosSchema);

export default Productos;