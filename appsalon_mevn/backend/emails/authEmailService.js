import {createTransport} from '../config/nodemailer.js'

// Funcion para enviar el email
export async function sendEmailVerification({ name, email, token }){
    // console.log("desde sendEmailVerification")
    const transporter = createTransport(
      process.env.EMAIL_HOST,
      process.env.EMAIL_PORT,
      process.env.EMAIL_USER,
      process.env.EMAIL_PASS
    )

    // Enviar el email
    const info = await transporter.sendMail({
        from:'AppSalon <cuentas@appsalon.com>',
        to: email,
        subject: 'AppSalon - Confirma tu cuenta',
        text: 'AppSalon - Confirma tu cuenta',
        html: `<p>Hola: ${name}, confirma tu cuenta en AppSalon</p>
        <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    })

    console.log('Mensaje enviado', info.messageId)
}
