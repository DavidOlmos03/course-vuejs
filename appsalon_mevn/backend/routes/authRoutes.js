import express from 'express'
import { register, verifyAccount, login, user } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const router = express.Router()

// Rutas de autenticación y registro de usuarios
router.post('/register',register)
router.get('/verify/:token', verifyAccount)
router.post('/login', login)
 
// Area Privada - Requiere un JWT
// Aqui es donde se utiliza el middleware para verificar que el usuario este autenticado
// Estas funciones se ejecutan en el orden que son agregadas entonces, primero se va a ejecutar el authMiddleware y luego el user, se pasa de
// una funcion (o middleware) a otra por medio del next dentro de la función 
router.get('/user',authMiddleware, user) 

export default router