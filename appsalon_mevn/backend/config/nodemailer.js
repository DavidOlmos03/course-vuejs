import nodemailer from 'nodemailer'

export function createTransport(host,port,user,pass){
    // De esta forma los valores se inyectan en automatico
    return nodemailer.createTransport({
        host,
        port,
        auth: {
          user,
          pass
        }
      });
}