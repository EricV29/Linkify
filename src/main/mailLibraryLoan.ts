import config from './config'

declare global {
  interface ImportMetaEnv {
    VITE_PORTEMAIL: number
    VITE_USEREMAIL: string
    VITE_TOKENEMAIL: string
    VITE_ADDRESSEMAILLIBRARY: string
  }
}

const nodemailer = require('nodemailer')

export function sendEmailLoan(data) {
  const completename =
    data.firstname + ' ' + data.secondname + ' ' + data.firstlastname + ' ' + data.secondlastname

  let titles: string[] = []
  for (let i = 0; i < data.books.length; i++) {
    titles.push(data.books[i].title + ' con autor ' + data.books[i].autor)
  }

  let result
  if (titles.length > 1) {
    let lastTitle = titles.pop()
    result = titles.join(', ') + ' y ' + lastTitle
  } else {
    result = titles[0]
  }

  //console.log(users)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    port: import.meta.env.VITE_PORTEMAIL || config.vitportemail,
    auth: {
      user: import.meta.env.VITE_USEREMAIL || config.vituseremail,
      pass: import.meta.env.VITE_TOKENEMAIL || config.vittokenemail
    }
  })

  let mailOptions = {
    from: {
      name: 'Linkify Biblioteca',
      address: import.meta.env.VITE_USEREMAIL || config.vituseremail
    },
    to: import.meta.env.VITE_ADDRESSEMAILLIBRARY || config.vitaddressemaillibrary,
    subject: 'Linkify (Prestamo de Biblioteca a ' + completename + ' )',
    text:
      'Realizaste un prestamo al usuario ' +
      completename +
      ' con número de cuenta ' +
      data.numaccount +
      ' de los libros: ' +
      result +
      ' el dia ' +
      data.fechloan +
      ' y con fecha de devolucion ' +
      data.fechdevloan
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

    mailOptions.to = data.email
    mailOptions.text =
      'Alumno(a) de la Escuela Preparatoria Número 6, se te informa que adquiriste los libros ' +
      result +
      ' en calidad de préstamo, precisando que el libro es propiedad de la Escuela Preparatoria Número 6. Alumno(a) asumes la responsabilidad del cuidado y seguridad del material, deberas reponer el libro conforme lo dispone la normativa universitaria. Recuerda que la fecha de entrega del libro es ' +
      data.fechdev +
      '. El equipo deberá ser devuelto en las mismas condiciones a Gregorio Guadalupe Diaz Moreno, responsable del Biblioteca de la Escuela Preparatoria Número 6, para su debido resguardo.'

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        //console.log('Correo enviado: ' + info.response)
        resolve(info.response)
      }
    })
  })
}
