const nodemailer = require('nodemailer')
let path = require('path')

export function sendEmail(pathdoc, numbox, tool, ide, users, locker) {
  //console.log(users)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    port: '465',
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
    to: 'kevin_serrano@gmail.com',
    subject: 'Solicitud de caja ' + numbox + ' de ' + tool,
    text: 'Documento',
    attachments: [
      {
        path: pathdoc,
        filename: path.basename(pathdoc)
      }
    ]
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        //console.log('Correo enviado: ' + info.response)
        resolve(info.response)
      }
    })

    for (let i = 0; i < users.length; i++) {
      let user = users[i]
      mailOptions.to = user.email
      if (tool === 'LegoSpike') {
        mailOptions.text =
          'Alumno(a) de la Escuela Preparatoria Número 6, se te informa que se recbio la solicitud para adquirir caja de equipo “Lego Spike Prime Education” con un contenido de 528 piezas, con número de serie ' +
          numbox +
          ' en calidad de préstamo, precisando que el equipo es propiedad de la Escuela Preparatoria Número 6 y que se debe resguardar en el casillero número ' +
          locker +
          '. Alumno(a) asumes la responsabilidad del cuidado y seguridad del material deberas reponer el equipo conforme lo dispone la normativa universitaria. Una vez concluidas las actividades, el equipo deberá ser devuelto en las mismas condiciones y con la misma cantidad de piezas con las que cuenta cada caja al Ing. Kevin Serrano Bautista, responsable del Centro de Cómputo de la Escuela Preparatoria Número 6, para su debido resguardo.'
      } else if (tool === 'RaspBerry') {
        mailOptions.text =
          'Alumno(a) de la Escuela Preparatoria Número 6, se te informa que se recbio la solicitud para adquirir caja de equipo “RaspBerry” con un contenido de 83 piezas, con número de serie ' +
          numbox +
          ' en calidad de préstamo, precisando que el equipo es propiedad de la Escuela Preparatoria Número 6 y que se debe resguardar en el casillero número ' +
          locker +
          '. Alumno(a) asumes la responsabilidad del cuidado y seguridad del material deberas reponer el equipo conforme lo dispone la normativa universitaria. Una vez concluidas las actividades, el equipo deberá ser devuelto en las mismas condiciones y con la misma cantidad de piezas con las que cuenta cada caja al Ing. Kevin Serrano Bautista, responsable del Centro de Cómputo de la Escuela Preparatoria Número 6, para su debido resguardo.'
      } else if (tool === 'Arduino') {
        mailOptions.text =
          'Alumno(a) de la Escuela Preparatoria Número 6, se te informa que se recbio la solicitud para adquirir caja de equipo Arduino con un contenido de 136 piezas, con número de serie ' +
          numbox +
          ' en calidad de préstamo, precisando que el equipo es propiedad de la Escuela Preparatoria Número 6 y que se debe resguardar en el casillero número ' +
          locker +
          '. Alumno(a) asumes la responsabilidad del cuidado y seguridad del material deberas reponer el equipo conforme lo dispone la normativa universitaria. Una vez concluidas las actividades, el equipo deberá ser devuelto en las mismas condiciones y con la misma cantidad de piezas con las que cuenta cada caja al Ing. Kevin Serrano Bautista, responsable del Centro de Cómputo de la Escuela Preparatoria Número 6, para su debido resguardo.'
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          //console.log('Correo enviado: ' + info.response)
          resolve(info.response)
        }
      })
    }
  })
}
