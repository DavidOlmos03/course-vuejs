import mongoose from'mongoose'
import { uniqueId } from '../utils/index.js'
import bcrypt from 'bcrypt'
// Se utiliza mongoose para crear la estructura y especificar algunas caracteristicas como el "trim" para eliminar espacios y el 
// "lowercase" para que convierta el string en minusculas, en dado caso que el usuario ingrese mayusculas, asi no se guarda en mayusculas en la base de datos
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    token:{
        type: String,
        default: () => uniqueId()

    },
    verified:{
        type: Boolean,
        default: false
    },
    admin:{
        type: Boolean,
        default: false
    }
})

// Hash password  
// Antes de hashear el password verifica si ya ha sido hasheado, de esta manera no se sobre escribe el hash del password
userSchema.pre('save', async function (next) {
    // En caso de ya haber sido modificado (hasheado) salta a la siguiente linea de iteración
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


// Definimos el modelo 
const User = mongoose.model('User', userSchema)

export default User