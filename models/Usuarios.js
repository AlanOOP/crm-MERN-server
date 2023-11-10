import moongose from 'mongoose';

const usuariosSchema = moongose.Schema({
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
});

const Usuarios = moongose.model('Usuarios', usuariosSchema);
export default Usuarios;