import { app, shell, BrowserWindow, ipcMain, Notification } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/linki.ico?asset'
import './database'
import { getConnection } from './database'

let dataUser = ''
let newWindow
let legoWindow
let raspWindow
let ardWindow

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
        console.log(rows[0].Nameuser)
        console.log(rows)

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
        mainWindow.close()
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
      ? process.env['ELECTRON_RENDERER_URL'] + '#/legospike'
      : `file://${join(__dirname, '../renderer/index.html')}#/legospike`
  )
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
      ? process.env['ELECTRON_RENDERER_URL'] + '#/raspberry'
      : `file://${join(__dirname, '../renderer/index.html')}#/raspberry`
  )
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
