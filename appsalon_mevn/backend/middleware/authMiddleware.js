import jwt from 'jsonwebtoken'
import User from '../models/User.js'
// Esta función es una previa para que el usuario pueda posteriormente tener acceso a los datos
const authMiddleware = async (req, res, next)=>{

    // El token de JWT se suele agregar en el headers pues estos se reciben primero que el body (Me refiero a la estructura de la solicitud como se puede apreciar en Postman)
    // console.log(req.headers.authorization)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       try {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Utilizo el select para descartar o quitar información en la consulta
            req.user = await User.findById(decoded.id).select(
                "-password -verified -token -__v"
            )
            next()
        } catch  {
            const error = new Error('Tu token no es valido')
            res.status(403).json({msg: error.message})
        }
    } else {
        const error = new Error('Token no valido o inexistente')
        res.status(403).json({msg: error.message})        
    }
}


export default authMiddleware