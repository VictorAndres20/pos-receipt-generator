const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

const path = require('node:path');
const isDev = require('electron-is-dev');
const {
  readProductsExcel
} = require("./scripts/file-system");
const {
  getPrintPDF
} = require("./scripts/pdf-generator");

var mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //icon: path.join(__dirname, 'icon.png'),
    // Set the path of an additional "preload" script that can be used to
    // communicate between node-land and browser-land.
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false
    },
  });
  // Register some variables and functions to invoke in preloads.js
  //electron.ipcMain.handle('electronScreen', () => (electron.screen.getCursorScreenPoint()));
  // Maximize window
  mainWindow.maximize();
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  } else {
    // Remove menubar that appears by default
    mainWindow.removeMenu();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle('readProductsExcel', readProductsExcel);
ipcMain.handle('getPrintPDF', async (event, parameters) => getPrintPDF(parameters));
