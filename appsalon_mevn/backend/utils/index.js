// utils tambien suele ser llamado helpers

import mongoose from "mongoose"
import jwt from 'jsonwebtoken'


const uniqueId = () => Date.now().toString(32) + Math.random().toString(32).substring(2)

// Generando el JWT 
const generateJWT = (id)=>{
    // con sign generamos un token nuevo
    // Tener cuidado con lo que se pasa como primer parametro pues este formara parte del JWT y se vera expuesto, por eso aquí no hay que utilizar contraseñas
    // o alguna otra información que pueda poner en riesgo la seguridad en el servidor o del usuario.
    const token = jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn:'30d'
    })

    return token
}

function validateObjectId(id,res){
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('El ID no es valido')
        return res.status(400).json({
            msg: error.message
        })
    }
}

function hundleNotFoundError(message, res){
    const error = new Error(message)
    return res.status(404).json({
        msg: error.message
    })
}


export {
    uniqueId,
    generateJWT,
    validateObjectId,
    hundleNotFoundError
}