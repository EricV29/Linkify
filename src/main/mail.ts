const nodemailer = require('nodemailer')
let path = require('path')

export function sendEmail(pathdoc, numbox, tool, ide) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: 'elinkify@gmail.com',
      pass: 'ymiy ttli lyla iahn'
    }
  })

  let mailOptions = {
    from: {
      name: 'Linkify (Solicitud ' + ide + ' )',
      address: 'elinkify@gmail.com'
    },
    to: 'ericjared29@gmail.com',
    subject: 'Solicitud de caja ' + numbox + ' de ' + tool,
    text: 'Documento',
    attachments: [
      {
        path: pathdoc,
        filename: path.basename(pathdoc)
      }
    ]
  }

  // Devolvemos una nueva promesa
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
        reject(error) // Si hay un error, rechazamos la promesa
      } else {
        //console.log('Correo enviado: ' + info.response)
        resolve(info.response) // Si todo va bien, resolvemos la promesa con la respuesta
      }
    })
  })
}
