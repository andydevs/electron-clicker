/// <reference types="./types/main.d.ts"/>
import { app, BrowserWindow } from 'electron'
import { installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'
import path from 'node:path'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (process.platform === 'win32') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const started = require('electron-squirrel-startup')
    if (started) app.quit()
}

const installExtensions = () => {
    return installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
        .then(([redux, react]) => console.log(`Added Extensions:  ${redux.name}, ${react.name}`))
        .catch((err) => console.log('An error occurred: ', err))
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 800,
        minWidth: 450,
        minHeight: 710,
        fullscreenable: false,
        maximizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
    }

    // Open the DevTools.
    if (__OPEN_DEVTOOLS__) {
        mainWindow.webContents.openDevTools({
            mode: 'undocked'
        })
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => installExtensions().then(createWindow))

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
