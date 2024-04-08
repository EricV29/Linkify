const nodemailer = require('nodemailer')
let path = require('path')

export function sendEmail(pathdoc) {
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
      name: 'Email de react',
      address: 'elinkify@gmail.com'
    },
    to: 'ericjared29@gmail.com',
    subject: 'Enviando correo desde React',
    text: '¡Hola mundo!',
    attachments: [
      {
        path: pathdoc,
        filename: path.basename(pathdoc)
      }
    ]
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Correo enviado: ' + info.response)
    }
  })
}
