import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
const fs = require('fs')
const path = require('path')

function AlumnGenerate([numbox, userss]) {
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
  let fechlimt = fechdiaa + '/' + fechmess + '/' + año
  const folio = numbox + fechdiaa + fechmess + año

  return fetch('/LegoSpikeCajaAlumnos.docx')
    .then((response) => response.arrayBuffer())
    .then((templateBuffer) => {
      const zip = new PizZip(templateBuffer)
      const doc = new Docxtemplater()
      doc.loadZip(zip)

      const inputData = {
        fechdia: fechdiaa,
        fechmes: fechmesl,
        numcaja: numbox,
        fechlimite: fechlimt,
        tabla: tabla,
        folio: folio
      }

      doc.setData(inputData)
      try {
        doc.render()
      } catch (error) {
        console.error('Error during document generation:', error)
      }

      const documentBuffer = doc.getZip().generate({ type: 'nodebuffer' })

      // Define la ruta de descarga personalizada
      let homeDir = process.env.HOME || process.env.USERPROFILE
      homeDir = homeDir?.replace(/\\/g, '/')
      homeDir = homeDir + '/Documents/Linkify'
      const outputPath = path.join(homeDir, `LegoSpikeCajaAlumnos${folio}.docx`)

      // Escribe el archivo en la ruta especificada
      fs.writeFileSync(outputPath, documentBuffer)
      return [outputPath, folio]
    })
}

export default AlumnGenerate
