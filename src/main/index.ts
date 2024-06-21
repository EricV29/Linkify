import { app, shell, BrowserWindow, ipcMain, Notification } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/linki.ico?asset'
import './database'
import { getConnection } from './database'
import { sendEmail } from './mail'
import { sendEmailLoan } from './mailLibraryLoan'
import { insertData } from './petitionSQL'
import {
  viableBoxes,
  viableLockers,
  activeRequests,
  completedRequests,
  alumnsforRequest,
  finishidRequest,
  allData,
  allBooks,
  searchBooks,
  selectBook,
  editBook,
  deleteBook,
  checkStockBook,
  addNewBook,
  newLoan,
  allLoans,
  finishLoan,
  viableEquip,
  loansEquip,
  verifyEmployee,
  finishLoanEquip
} from './dataConsult'

const fs = require('fs')
const path = require('path')
let dataUser = ''
let rolUser = ''
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

ipcMain.handle('get-documents-path', async (_event) => {
  return app.getPath('documents')
})

//TODO: LOGEARSE Y CREAR NUEVA VENTANA MENU (SECOND) NOMBRE = newWindow
ipcMain.on('login', async (event, argumentos) => {
  //console.log(argumentos)
  const conn = await getConnection()
  conn.query(
    'SELECT * FROM users WHERE BINARY Nickname = ? AND BINARY PassUser = ?',
    [argumentos.user, argumentos.password],
    (err, rows) => {
      if (err) {
        console.error(err)
        throw err
      }
      if (rows.length > 0) {
        event.returnValue = true
        dataUser = rows[0].Nameuser + ' ' + rows[0].ApepUser + ' ' + rows[0].ApemUser
        rolUser = rows[0].RolUser

        const notification = {
          title: 'Linkify',
          body: 'Bienvenido ' + dataUser
        }
        new Notification(notification).show()

        // Crea una nueva ventana
        newWindow = new BrowserWindow({
          width: 1400,
          height: 800,
          autoHideMenuBar: false,
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
            ? process.env['ELECTRON_RENDERER_URL'] + '#/menu'
            : `file://${join(__dirname, '../renderer/index.html')}#/menu`
        )

        //Close window login
        mainWindow?.close()
      } else {
        event.returnValue = false
        const notification = {
          title: 'Linkify',
          body: 'Usuario no encontrado, verifica tus datos.'
        }
        new Notification(notification).show()
      }
    }
  )
})

// ENVIAR NOMBRE COMPLETO DE USUARIO A MENU (newWindow)
ipcMain.on('nameuser', (event) => {
  event.reply('nameu', [dataUser, rolUser])
})

// CERRAR SESION
ipcMain.on('exitApp', () => {
  if (newWindow && !newWindow.isDestroyed()) {
    newWindow.close()
  }
  if (legoWindow && !legoWindow.isDestroyed()) {
    legoWindow.close()
  }
  if (raspWindow && !raspWindow.isDestroyed()) {
    raspWindow.close()
  }
  if (ardWindow && !ardWindow.isDestroyed()) {
    ardWindow.close()
  }
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
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : { icon }),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  if (mainWindow) {
    mainWindow.on('ready-to-show', () => {
      if (mainWindow) {
        mainWindow.show()
      }
    })
  }

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
ipcMain.on('windowSpike', async () => {
  //console.log('Ventana abierta de lego')
  // Crea una nueva ventana
  legoWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    autoHideMenuBar: true,
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
      ? process.env['ELECTRON_RENDERER_URL'] + '#/legospike/kitleg'
      : `file://${join(__dirname, '../renderer/index.html')}#/legospike/kitleg`
  )
})

//TODO: CREAR VENTANA RASPBERRY NOMBRE = raspWindow
ipcMain.on('windowRasp', async () => {
  //console.log('Ventana abierta de raspberry')
  // Crea una nueva ventana
  raspWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    autoHideMenuBar: true,
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
})

//TODO: CREAR VENTANA ARDUINO NOMBRE = ardWindow
ipcMain.on('windowArd', async () => {
  //console.log('Ventana abierta de arduino')
  // Crea una nueva ventana
  ardWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    autoHideMenuBar: true,
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
      ? process.env['ELECTRON_RENDERER_URL'] + '#/arduino/kitalumnard'
      : `file://${join(__dirname, '../renderer/index.html')}#/arduino/kitalumnard`
  )
})

//TODO: FUNCTIONS FOR TOOLS
//Message option
ipcMain.on('msgOption', (_event, arg) => {
  const notification = {
    title: 'Linkify',
    body: arg
  }
  new Notification(notification).show()
})

//Viable Boxes
ipcMain.on('viableBoxes', async (event, arg) => {
  try {
    const result = await viableBoxes(arg)
    //console.log(result)
    event.reply('viableBoxes-reply', result)
  } catch (error) {
    console.error(error)
  }
})

//Viable Llockers
ipcMain.on('viableLockers', async (event, arg) => {
  try {
    const result = await viableLockers(arg)
    event.reply('viableLockers-reply', result)
  } catch (error) {
    console.error(error)
  }
})

//Function save record to DB and send emails
ipcMain.on('saveDBsendEM', (event, arg) => {
  //console.log('Peticion de una caja para alumnos')
  //? arg[0] numero de caja
  //? arg[1] arreglo alumnos
  //? arg[2] ruta de archivo
  //? let nombreArchivo = path.basename(arg[2]) // nombre del archivo
  //? arg[3] fecha del registro
  //? arg[4] folio del registro
  //? arg[5] fecha para finalizar
  //? arg[6] herramienta
  //? arg[7] numero de locker
  //console.log(idUser)
  //send emails
  sendEmail(arg[2], arg[0], arg[6], arg[4], arg[1], arg[7])
    .then(() => {
      const notification = {
        title: 'Linkify',
        body: 'La petición y correo se enviaron correctamente.'
      }
      new Notification(notification).show()
      //save data to DB
      insertData(arg)
      event.reply('saveDBsendEM-reply', 1)
    })
    .catch((error) => {
      const notification = {
        title: 'Linkify',
        body: 'Error al enviar correo, verifica tu conexión de internet.'
      }
      new Notification(notification).show()
      //deleteDoc(arg[2])
      event.reply('saveDBsendEM-reply', 0)
      console.log(error)
    })
})

//All requests
ipcMain.on('AllRequests', async (event, arg) => {
  try {
    const resultactiveRequests = (await activeRequests(arg)) as Request[]
    resultactiveRequests.forEach((item) => {
      let fechar = new Date(item.fechreg)
      let fechaf = new Date(item.fechfinish)
      item.fechreg = fechar.toLocaleDateString('es-MX')
      item.fechfinish = fechaf.toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City' })
    })
    //console.log(resultactiveRequests)
    const resultcompletedRequests = (await completedRequests(arg)) as Request[]
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
        .then(() => {
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
          event.reply('FinishRequest-reply', 0)
          console.log(error)
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

//TODO: FUNCTIONS FOR LIBRARY
//All data
ipcMain.on('allData', async (event) => {
  try {
    const result = await allData()
    //console.log(result)
    event.reply('allData-reply', result)
  } catch (error) {
    console.error(error)
  }
})

//All books
ipcMain.on('allBooks', async (event, { limit, offset }) => {
  try {
    const results = await allBooks(limit, offset)
    event.reply('allBooks-reply', results)
  } catch (error) {
    event.reply('allBooks-reply', { error })
  }
})

// Search books
ipcMain.on('searchBooks', async (event, query, category) => {
  try {
    const results = await searchBooks(query, category)
    event.reply('searchBooks-reply', results)
  } catch (error) {
    event.reply('searchBooks-reply', { error })
  }
})

// Select book
ipcMain.on('selectBook', async (event, arg) => {
  try {
    const result = await selectBook(arg)
    //console.log(result)
    event.reply('selectBook-reply', result)
  } catch (error) {
    console.error(error)
  }
})

// Edit book
ipcMain.on('editBook', async (event, arg) => {
  try {
    const result = await editBook(arg)
    //console.log(result)
    event.reply('editBook-reply', result)
  } catch (error) {
    console.error(error)
  }
})

// Delete book
ipcMain.on('deleteBook', async (event, arg) => {
  try {
    const result = await deleteBook(arg)
    //console.log(result)
    event.reply('deleteBook-reply', result)
  } catch (error) {
    console.error(error)
  }
})

// Check stock book
ipcMain.on('checkStockBook', async (event, arg) => {
  try {
    const result = await checkStockBook(arg)
    //console.log(result)
    event.reply('checkStockBook-reply', result)
  } catch (error) {
    console.error(error)
  }
})

// Add new book
ipcMain.on('addNewBook', async (event, arg) => {
  try {
    const result = await addNewBook(arg)
    //console.log(result)
    event.reply('addNewBook-reply', result)
  } catch (error) {
    console.error(error)
  }
})

// New loan
ipcMain.on('newLoan', async (event, arg) => {
  try {
    const result = await newLoan(arg)
    sendEmailLoan(arg)
      .then(() => {
        const notification = {
          title: 'Linkify',
          body: 'Prestamo realizado y correo enviado correctamente.'
        }
        new Notification(notification).show()
      })
      .catch((error) => {
        const notification = {
          title: 'Linkify',
          body: 'Error al enviar correo, verifica tu conexión de internet.'
        }
        new Notification(notification).show()
        console.log(error)
      })
    //console.log(result)
    event.reply('newLoan-reply', result)
  } catch (error) {
    console.error(error)
  }
})

// All loans
ipcMain.on('allLoans', async (event) => {
  try {
    const result = await allLoans()

    if (Array.isArray(result) && result.every((item) => typeof item === 'object')) {
      let options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }

      ;(result as Array<any>).forEach((item) => {
        let fechloan = new Date(item.fechloan)
        let fechdevloan = new Date(item.fechdevloan)
        item.fechloan = fechloan.toLocaleString('es-ES', options)
        item.fechdevloan = fechdevloan.toLocaleString('es-ES', options)
      })
      event.reply('allLoans-reply', result)
    }
  } catch (error) {
    console.error(error)
  }
})

// Finish loan
ipcMain.on('finishLoan', async (event, arg) => {
  try {
    const result = await finishLoan(arg)
    //console.log(result)
    event.reply('finishLoan-reply', result)
  } catch (error) {
    console.error(error)
  }
})

//Viable laptops
ipcMain.on('viableEquip', async (event, arg) => {
  try {
    const result = await viableEquip(arg)
    //console.log(result)
    event.reply('viableEquip-reply', result)
  } catch (error) {
    console.error(error)
  }
})

//All loans equip
ipcMain.on('loansEquip', async (event, arg) => {
  try {
    const result = await loansEquip(arg)
    //console.log(result)
    event.reply('loansEquip-reply', result)
  } catch (error) {
    console.error(error)
  }
})

//Exist employee number and new loan
ipcMain.on('verifyEmployee', async (event, arg) => {
  try {
    const result = await verifyEmployee(arg)
    //console.log(result)
    event.reply('verifyEmployee-reply', result)
  } catch (error) {
    console.error(error)
  }
})

//Finish
ipcMain.on('finishLoanEquip', async (event, arg) => {
  try {
    const result = await finishLoanEquip(arg)
    //console.log(result)
    event.reply('finishLoanEquip-reply', result)
  } catch (error) {
    console.error(error)
  }
})
