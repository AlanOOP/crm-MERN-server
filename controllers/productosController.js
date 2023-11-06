import Productos from "../models/Productos.js";
import multer from "multer";
import fs from "fs";

//multer para subir imagenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});



// Agrega un nuevo producto

const addProducto = async (req, res) => {
    const producto = new Productos(req.body);

    const { nombre, precio} = req.body;
    const imagen = req.file.filename;


    if (!nombre || !precio) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios",
        });

    }

    else {
        try {

            if(req.file.filename){
                producto.imagen = imagen;
            }

            await producto.save();
            res.json({
                mensaje: "Producto agregado correctamente",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                mensaje: "Error al agregar producto",
            });
        }
    }
};


// get todos los productos 

const getProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find();

        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al obtener los productos",
        });
        next();
    }
}

//muestra un producto por su id

const getProducto = async (req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: "El producto no existe"
            });

        }
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al obtener el producto",
        });
        next();
    }
}

//actualiza un producto

const updateProducto = async (req, res, next) => {

    
    try {

        const { nombre, precio} = req.body;
    
        if (!nombre || !precio) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios",
            });
        }
        
        let productoOld = await Productos.findById(req.params.id);

        if(req.file){
            req.body.imagen =  req.file.filename;
            //eliminar la imagen anterior
            if(productoOld.imagen){
                fs.unlinkSync(`./public/uploads/${productoOld.imagen}`);
            }
        }else{
            req.body.imagen = productoOld.imagen;
        }

        const producto = await Productos.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al actualizar el producto",
        });
        next();
    }
}


//eliminar un producto y la imagen asociada

const deleteProducto = async (req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: "El producto no existe"
            });

        }

        if(producto.imagen){
            //eliminar la imagen asociada
            fs.unlinkSync(`./public/uploads/${producto.imagen}`);
        }

        await Productos.findOneAndDelete({ _id: req.params.id });
        res.json({
            mensaje: "Producto eliminado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al eliminar el producto",
        });
        next();
    }
}

export {
    storage,
    addProducto,
    getProductos,
    getProducto,
    updateProducto,
    deleteProducto
}