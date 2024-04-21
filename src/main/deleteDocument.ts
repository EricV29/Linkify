const fs = require('fs')

export async function deleteDoc(ruta) {
  try {
    fs.unlinkSync(ruta)
    console.log('Archivo eliminado exitosamente')
  } catch (error) {
    console.error('Ocurrió un error al eliminar el archivo:', error)
  }
}
