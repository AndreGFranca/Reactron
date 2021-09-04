const { app, BrowserWindow, ipcMain } = require("electron");
const serve = require('electron-serve');
const isDev = require("electron-is-dev");
const path = require("path");

const startURL = isDev ? 'http://localhost:3000' : `${path.resolve(__dirname, '..', 'build')}`;

let mainWin;
function createWindow() {
mainWin = new BrowserWindow({
   width: 800,
   height: 600,
  frame:false, //será necessário no futuro para retirar a borda da janela*/
   show: false,
   webPreferences: {
    nodeIntegration: true,
    enableRemoteModule: true,
    contextIsolation: false,
    nodeIntegrationInWorker: true,
    nodeIntegrationInSubFrames:true,

   },
  });

   mainWin.loadURL(startURL);
  mainWin.webContents.on("did-finish-load", () => {
   const { title, version } = require("../package.json");
   mainWin.setTitle(`${title} : ${version}`);
   
  });

  mainWin.webContents.on("did-finish-load", () => {
    const { title, version } = require("../package.json");
    
    mainWin.setTitle(`${title} : ${version}`);
  });

mainWin.once("ready-to-show", () => mainWin.show());
   mainWin.on("closed", () => {
   mainWin = null;
  });
}
const loadURL = serve({directory: startURL});
(async () => {
	console.log(startURL);
  await app.whenReady();
  console.log('passei1')
  createWindow();  
	await loadURL(mainWin);
  console.log('passei2')
	// The above is equivalent to this:
	await mainWin.loadURL('app://localhost');
	// The `-` is just the required hostname
})();




//  app.on("ready", ()=>{createWindow();mainWin.openDevTools();});
// app.on('ready', () => {
//   protocol.interceptFileProtocol('file', (request, callback) => {
//     const url = request.url.substr(7)    /* all urls start with 'file://' */
//     callback({ path: path.normalize(`${__dirname}/${url}`)})
//   }, (err) => {
//     if (err) console.error('Failed to register protocol')
//   })
//   createWindow()
// })


// ipcMain.('minimizou',async()=>{
//   console.log('alou');
// })
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
  app.on('activate', () => {
    if (mainWin === null) {
      createWindow();
      
    }
  });




//Methods to communic with front-end
  ipcMain.handle('minimize',async()=>{
    return mainWin.minimize();
  })

  ipcMain.handle('windowState',async()=>{
    return mainWin.isMaximized();
  })

  ipcMain.handle('unMaximize',async()=>{
    return mainWin.unmaximize();
  })
  ipcMain.handle('maximize',async()=>{
    return mainWin.maximize();
  })
  ipcMain.handle('close',async()=>{
    return mainWin.close();
  })