import * as path from 'path'
import * as url from 'url'
import { app, BrowserWindow, ipcMain } from 'electron'

const isProduction = process.env.NODE_ENV === 'production'

let win: BrowserWindow | null

function createWindow() {
  const options = {
    title: 'Passhub',
    icon: '',
    width: 800,
    height: 480,
    minWidth: 600,
    minHeight: 400,
    autoHideMenuBar: true,
    frame: false
  }

  win = new BrowserWindow(options)

  const rendererURL = isProduction
    ? url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
      })
    : 'http://localhost:2333'

  win.loadURL(rendererURL)

  if (!isProduction) {
    win.webContents.openDevTools()
  }

  win.on('close', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('minimize', () => {
  if (win) {
    win.minimize()
  }
})

ipcMain.on('maximize', () => {
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  }
})

ipcMain.on('close', () => {
  if (win) {
    win.close()
  }
})
