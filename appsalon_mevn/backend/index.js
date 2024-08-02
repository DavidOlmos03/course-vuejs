// Se solia utlizar en versiones antiguas de node
// const express = require('express')
// Forma actual de trabajar con express y node, con modulos por esto en el package.json el "type": "module"
import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import cors from 'cors'
import {db} from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'

// Variables de entorno
dotenv.config()

// Configurar la app
const app = express()

// Leer datos via  body
app.use(express.json())

// Conectar a base de datos
db()


// Configurar CORS
const whitelist = [process.env.FRONTEND_URL]
if(process.argv[2] === '--postman'){
    whitelist.push(undefined)
}
const corsOptions = {
    origin: function(origin, callback){
        if (whitelist.includes(origin)) {
            // Permite la conexión
            callback(null, true)
        }else{
            // No permite la conexión
            callback(new Error('ERROR de CORS'))
        }
    }
}
app.use(cors(corsOptions))

// Definir una ruta
// use se utiliza para hacer referencia a cualquier tipo de peticion (DELETE, POST, GET..)
app.use('/api/services',servicesRoutes)

//  Definir puerto
//  process.env.PORT  es para cuendo este en un hosting, mientras este en local el puerto sera 4000
const PORT = process.env.PORT || 4000


// Arrancar app
app.listen(PORT,()=>{
    console.log(colors.blue.bold("El servidor se esta ejecutando en el puerto:", PORT))
})