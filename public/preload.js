// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge } = require("electron");
const {
    readProductsExcel,
    readProductsJson, 
    writeProductsJson
} = require("./scripts/file-system");

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
// Other example is that you can build main electron functions that need special NodeJS actions that React doesnt have
// and use it in React context with window.something
// For example you can register: 
//                   contextBridge.exposeInMainWorld("myfunc", () => console.log('Hi'));
// and call it with "window.myfunc".
//
// You can invoke functions in electron.js (main.js) if you need some electron or node modules that here are undefined
//                   contextBridge.exposeInMainWorld("electronScreen", async () => await ipcRenderer.invoke('electronScreen'));
// In electron.js (main.js) you need to regiter in ipcMain that handler after webPreferences
// 
process.once("loaded", () => {
  contextBridge.exposeInMainWorld("versions", process.versions);
  contextBridge.exposeInMainWorld("readExcel", readProductsExcel);
  contextBridge.exposeInMainWorld("readJson", readProductsJson);
  contextBridge.exposeInMainWorld("writeJson", writeProductsJson);
});
