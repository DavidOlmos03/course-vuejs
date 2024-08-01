// Se solia utlizar en versiones antiguas de node
// const express = require('express')
// Forma actual de trabajar con express y node, con modulos por esto en el package.json el "type": "module"
import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
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