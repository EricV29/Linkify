import { app, shell, BrowserWindow, ipcMain, Notification } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/linki.ico?asset'
import './database'
import { getConnection } from './database'
import { sendEmail } from './mail'
const fs = require('fs')
const path = require('path')
import { insertData } from './petitionSQL'
import {
  viableBoxesLego,
  activeRequests,
  completedRequests,
  alumnsforRequest,
  finishidRequest,
  viableBoxesRasp,
  activeRequestsRasp,
  completedRequestsRasp,
  alumnsforRequestRasp
} from './dataConsult'
import { deleteDoc } from './deleteDocument'

let dataUser = ''
let newWindow
let legoWindow
let raspWindow
let ardWindow

//TODO: CREAR CARPETA LINKIFY EN /Documentos
app.on('ready', () => {
  const folderPath = path.join(app.getPath('documents'), 'Linkify')

  if (!fs.existsSync(folderPath)) {
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Error al crear la carpeta:', err)
      } else {
        console.log('Carpeta creada en:', folderPath)
      }
    })
  } else {
    console.log('La carpeta ya existe:', folderPath)
  }
})

//TODO: LOGEARSE Y CREAR NUEVA VENTANA MENU (SECOND) NOMBRE = newWindow
ipcMain.on('login', async (event, argumentos) => {
  //console.log(argumentos)
  const conn = await getConnection()
  conn.query(
    'SELECT * FROM users WHERE BINARY Nickname = ? AND BINARY PassUser = ?',
    [argumentos.user, argumentos.password],
    (err, rows, fields) => {
      if (err) throw err
      if (rows.length > 0) {
        event.returnValue = true
        //console.log(rows[0].Nameuser)
        //console.log(rows)

        const notification = {
          title: 'Linkify',
          body: 'Bienvenido ' + rows[0].Nameuser
        }
        new Notification(notification).show()

        dataUser = rows[0].Nameuser + ' ' + rows[0].ApepUser + ' ' + rows[0].ApemUser

        //event.reply('login-reply', true, rows[0].Nameuser)

        // Crea una nueva ventana
        newWindow = new BrowserWindow({
          width: 1400,
          height: 800,
          ...(process.platform === 'linux' ? { icon } : { icon }),
          webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
            nodeIntegration: true,
            contextIsolation: false
          }
        })

        // Carga la ruta deseada en la nueva ventana
        newWindow.loadURL(
          is.dev
            ? process.env['ELECTRON_RENDERER_URL'] + '#/menu/herramientas'
            : `file://${join(__dirname, '../renderer/index.html')}#/menu/herramientas`
        )

        // Cierra la ventana de inicio de sesión
        mainWindow?.close()
      } else {
        event.returnValue = false
        const notification = {
          title: 'Linkify',
          body: 'Tu usuario o contraseña son incorrectos'
        }
        new Notification(notification).show()
      }
    }
  )
})

// ENVIAR NOMBRE COMPLETO DE USUARIO A MENU (newWindow)
ipcMain.on('nameuser', (event, arg) => {
  event.reply('nameu', true, dataUser)
})

// CERRAR SESION
ipcMain.on('exitApp', (event, arg) => {
  newWindow.close()
  if (legoWindow) legoWindow.close()
  if (raspWindow) raspWindow.close()
  if (ardWindow) ardWindow.close()
  createWindow()
})

let mainWindow: BrowserWindow | null

//TODO: CREAR VENTANA DE LOGIN (MAIN) NOMBRE = mainWindow
function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minHeight: 670,
    minWidth: 900,
    show: false,
    //autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : { icon }),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

interface Request {
  numbox: string
  namedoc: string
  folio: string
  fechreg: string
  fechfinish: string
  state: boolean
}

//TODO: CREAR VENTANA LEGO SPIKE (LEGO) NOMBRE = legoWindow
ipcMain.on('windowSpike', async (event, argumentos) => {
  console.log('Ventana abierta de lego')
  // Crea una nueva ventana
  legoWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    ...(process.platform === 'linux' ? { icon } : { icon }),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // Carga la ruta deseada en la nueva ventana
  legoWindow.loadURL(
    is.dev
      ? process.env['ELECTRON_RENDERER_URL'] + '#/legospike/kittec'
      : `file://${join(__dirname, '../renderer/index.html')}#/legospike/kittec`
  )

  //Function see viable Boxes
  ipcMain.on('viableBoxes', async (event, arg) => {
    //console.log('Peticion de una caja disponible')
    try {
      const result = await viableBoxesLego(arg)
      //console.log(result)
      event.reply('viableBoxes-reply', result)
    } catch (error) {
      console.error(error)
    }
  })

  //Function petition alumns box LegoSpike alumno
  ipcMain.on('petitionA', (event, arg) => {
    //console.log('Peticion de una caja para alumnos')
    //console.log(arg[0]) //?numero de caja
    //console.log(arg[1]) //?arreglo alumnos
    //console.log(arg[2]) //?ruta de archivo
    //let nombreArchivo = path.basename(arg[2])
    //console.log(nombreArchivo) //?nombre del archivo
    //console.log(arg[3])//?fecha del registro
    //console.log(arg[4])//?folio del registro
    //console.log(arg[5])//?fecha para finalizar
    //console.log(arg)
    sendEmail(arg[2], arg[0], 'LegoSpike', arg[4], arg[1])
      .then((response) => {
        const notification = {
          title: 'Linkify',
          body: 'La petición y correo se enviaron correctamente'
        }
        new Notification(notification).show()
        insertData(arg, 'lego')
        event.reply('petitionA-reply', 1)
      })
      .catch((error) => {
        const notification = {
          title: 'Linkify',
          body: 'Error al enviar correo, verifica tu conexión de internet.'
        }
        new Notification(notification).show()
        deleteDoc(arg[2])
        event.reply('petitionA-reply', 'No enviado, intentalo de nuevo')
      })
  })

  //Message option
  ipcMain.on('msgOption', (event, arg) => {
    const notification = {
      title: 'Linkify',
      body: arg
    }
    new Notification(notification).show()
  })

  //All requests
  ipcMain.on('AllRequests', async (event, arg) => {
    try {
      const resultactiveRequests = (await activeRequests()) as Request[]
      resultactiveRequests.forEach((item) => {
        let fechar = new Date(item.fechreg)
        let fechaf = new Date(item.fechfinish)
        item.fechreg = fechar.toLocaleDateString('es-MX')
        item.fechfinish = fechaf.toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City' })
      })
      //console.log(resultactiveRequests)
      const resultcompletedRequests = (await completedRequests()) as Request[]
      resultcompletedRequests.forEach((item) => {
        let fechar = new Date(item.fechreg)
        let fechaf = new Date(item.fechfinish)
        item.fechreg = fechar.toLocaleDateString('es-MX')
        item.fechfinish = fechaf.toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City' })
      })
      //console.log(resultcompletedRequests)
      event.reply('AllRequests-reply', [resultactiveRequests, resultcompletedRequests])
    } catch (error) {
      console.error(error)
    }
  })

  //Alumns request
  ipcMain.on('AlumnsRequest', async (event, arg) => {
    //console.log(arg)
    try {
      const alumnsRe = await alumnsforRequest(arg)
      //console.log(alumnsRe)
      event.reply('AlumnsRequest-reply', alumnsRe)
    } catch (error) {
      console.error(error)
    }
  })

  //Finish request
  ipcMain.on('FinishRequest', async (event, arg) => {
    //console.log(arg)
    if (arg[0] === '5690') {
      try {
        finishidRequest(arg)
          .then((results) => {
            const notification = {
              title: 'Linkify',
              body: 'Prestamo finalizado.'
            }
            new Notification(notification).show()
            event.reply('FinishRequest-reply', 1)
          })
          .catch((error) => {
            const notification = {
              title: 'Linkify',
              body: 'Error, intentalo de nuevo.'
            }
            new Notification(notification).show()
          })
      } catch (error) {
        console.error(error)
      }
    } else {
      const notification = {
        title: 'Linkify',
        body: 'PIN incorrecto.'
      }
      new Notification(notification).show()
    }
  })
})

//TODO: CREAR VENTANA RASPBERRY NOMBRE = raspWindow
ipcMain.on('windowRasp', async (event, argumentos) => {
  console.log('Ventana abierta de raspberry')
  // Crea una nueva ventana
  raspWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    ...(process.platform === 'linux' ? { icon } : { icon }),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // Carga la ruta deseada en la nueva ventana
  raspWindow.loadURL(
    is.dev
      ? process.env['ELECTRON_RENDERER_URL'] + '#/raspberry/kitalumnrasp'
      : `file://${join(__dirname, '../renderer/index.html')}#/raspberry/kitalumnrasp`
  )

  //Function see viable Boxes
  ipcMain.on('viableBoxesRasp', async (event, arg) => {
    //console.log('Peticion de una caja disponible')
    try {
      const result = await viableBoxesRasp(arg)
      //console.log(result)
      event.reply('viableBoxesRasp-reply', result)
    } catch (error) {
      console.error(error)
    }
  })

  //Function petition alumns box LegoSpike alumno
  ipcMain.on('petitionA', (event, arg) => {
    //console.log('Peticion de una caja para alumnos')
    //console.log(arg[0]) //?numero de caja
    //console.log(arg[1]) //?arreglo alumnos
    //console.log(arg[2]) //?ruta de archivo
    //let nombreArchivo = path.basename(arg[2])
    //console.log(nombreArchivo) //?nombre del archivo
    //console.log(arg[3])//?fecha del registro
    //console.log(arg[4])//?folio del registro
    //console.log(arg[5])//?fecha para finalizar
    //console.log(arg)
    sendEmail(arg[2], arg[0], 'RaspBerry', arg[4], arg[1])
      .then((response) => {
        const notification = {
          title: 'Linkify',
          body: 'La petición y correo se enviaron correctamente'
        }
        new Notification(notification).show()
        insertData(arg, 'raspberry')
        event.reply('petitionA-reply', 1)
      })
      .catch((error) => {
        const notification = {
          title: 'Linkify',
          body: 'Error al enviar correo, verifica tu conexión de internet.'
        }
        new Notification(notification).show()
        deleteDoc(arg[2])
        event.reply('petitionA-reply', 'No enviado, intentalo de nuevo')
      })
  })

  //Message option
  ipcMain.on('msgOption', (event, arg) => {
    const notification = {
      title: 'Linkify',
      body: arg
    }
    new Notification(notification).show()
  })

  //All requests
  ipcMain.on('AllRequests', async (event, arg) => {
    try {
      const resultactiveRequests = (await activeRequestsRasp()) as Request[]
      resultactiveRequests.forEach((item) => {
        let fechar = new Date(item.fechreg)
        let fechaf = new Date(item.fechfinish)
        item.fechreg = fechar.toLocaleDateString('es-MX')
        item.fechfinish = fechaf.toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City' })
      })
      //console.log(resultactiveRequests)
      const resultcompletedRequests = (await completedRequestsRasp()) as Request[]
      resultcompletedRequests.forEach((item) => {
        let fechar = new Date(item.fechreg)
        let fechaf = new Date(item.fechfinish)
        item.fechreg = fechar.toLocaleDateString('es-MX')
        item.fechfinish = fechaf.toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City' })
      })
      //console.log(resultcompletedRequests)
      event.reply('AllRequests-reply', [resultactiveRequests, resultcompletedRequests])
    } catch (error) {
      console.error(error)
    }
  })

  //Alumns request
  ipcMain.on('AlumnsRequest', async (event, arg) => {
    //console.log(arg)
    try {
      const alumnsRe = await alumnsforRequestRasp(arg)
      //console.log(alumnsRe)
      event.reply('AlumnsRequest-reply', alumnsRe)
    } catch (error) {
      console.error(error)
    }
  })

  //Finish request
  ipcMain.on('FinishRequest', async (event, arg) => {
    //console.log(arg)
    if (arg[0] === '5690') {
      try {
        finishidRequest(arg)
          .then((results) => {
            const notification = {
              title: 'Linkify',
              body: 'Prestamo finalizado.'
            }
            new Notification(notification).show()
            event.reply('FinishRequest-reply', 1)
          })
          .catch((error) => {
            const notification = {
              title: 'Linkify',
              body: 'Error, intentalo de nuevo.'
            }
            new Notification(notification).show()
          })
      } catch (error) {
        console.error(error)
      }
    } else {
      const notification = {
        title: 'Linkify',
        body: 'PIN incorrecto.'
      }
      new Notification(notification).show()
    }
  })
})

//TODO: CREAR VENTANA ARDUINO NOMBRE = ardWindow
ipcMain.on('windowArd', async (event, argumentos) => {
  console.log('Ventana abierta de raspberry')
  // Crea una nueva ventana
  ardWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    ...(process.platform === 'linux' ? { icon } : { icon }),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // Carga la ruta deseada en la nueva ventana
  ardWindow.loadURL(
    is.dev
      ? process.env['ELECTRON_RENDERER_URL'] + '#/arduino'
      : `file://${join(__dirname, '../renderer/index.html')}#/arduino`
  )
})
