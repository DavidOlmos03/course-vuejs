import mongoose from "mongoose";
import colors from 'colors'

export const db = async ()=>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        // console.log(db.connection)
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(colors.yellow(`MongoDB se conectó correctamente${url}`))
    } catch (error) {
        console.log(`Error: ${error.message}`)
        // Si falla la conexion a la base de datos
        process.exit(1)
    }
}