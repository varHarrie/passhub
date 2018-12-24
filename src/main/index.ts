import * as path from 'path'
import * as url from 'url'
import { app, BrowserWindow } from 'electron'

const isProduction = process.env.NODE_ENV === 'production'

let win: BrowserWindow | null

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

function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600 })

  const rendererURL = isProduction
    ? url.format({ pathname: path.join(__dirname, 'index.html'), protocol: 'file:', slashes: true })
    : 'http://localhost:2333'

  win.loadURL(rendererURL)

  if (!isProduction) {
    win.webContents.openDevTools()
  }

  win.on('close', () => {
    win = null
  })
}
