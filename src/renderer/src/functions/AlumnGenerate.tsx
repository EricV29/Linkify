import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
const fs = require('fs')
const path = require('path')
const os = require('os')

function AlumnGenerate([numbox, userss, fechalimit, kit, locker]) {
  function mesANombre(mes) {
    let nombresDeMeses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ]
    return nombresDeMeses[mes - 1]
  }

  let tabla = userss.map((user) => ({
    celda1: user.namestudent,
    celda2: user.numaccount
  }))

  const fechact = new Date()
  let fechdia = fechact.getDate()
  let fechmes = fechact.getMonth() + 1
  const fechmesl = mesANombre(fechmes)
  let año = fechact.getFullYear()
  let fechdiaa = fechdia < 10 ? '0' + fechdia.toString() : fechdia.toString()
  let fechmess = fechmes < 10 ? '0' + fechmes.toString() : fechmes.toString()
  //let fechlimt = fechdiaa + '/' + fechmess + '/' + año
  const folio = numbox + fechdiaa + fechmess + año

  return new Promise((resolve, reject) => {
    try {
      const appPath =
        process.env.NODE_ENV === 'development'
          ? process.cwd()
          : path.join(process.resourcesPath, 'app.asar.unpacked')
      const docxPath = path.join(appPath, '/src/renderer/public', kit + '.docx')

      const templateBuffer = fs.readFileSync(docxPath)
      const zip = new PizZip(templateBuffer)
      const doc = new Docxtemplater()
      doc.loadZip(zip)

      const inputData = {
        fechdia: fechdiaa,
        fechmes: fechmesl,
        numcaja: numbox,
        fechlimite: fechalimit,
        tabla: tabla,
        folio: folio,
        locker: locker
      }

      doc.setData(inputData)
      try {
        doc.render()
      } catch (error) {
        console.error('Error during document generation:', error)
      }

      const documentBuffer = doc.getZip().generate({ type: 'nodebuffer' })

      // Define la ruta de descarga personalizada
      //let homeDir = process.env.HOME || process.env.USERPROFILE
      let homeDir = os.homedir()
      homeDir = homeDir?.replace(/\\/g, '/')
      homeDir = homeDir + '/Documents/Linkify'

      // Crea el directorio si no existe
      if (!fs.existsSync(homeDir)) {
        fs.mkdirSync(homeDir, { recursive: true })
      }

      const outputPath = path.join(homeDir, kit + `${folio}.docx`)

      // Escribe el archivo en la ruta especificada
      fs.writeFileSync(outputPath, documentBuffer)

      // Escribe el archivo en la ruta especificada
      fs.writeFileSync(outputPath, documentBuffer)
      resolve([outputPath, folio])
    } catch (error) {
      // Si hay un error, rechaza la promesa con el error
      reject(error)
    }
  })
}

export default AlumnGenerate
