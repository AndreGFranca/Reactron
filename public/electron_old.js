const { app, BrowserWindow, ipcMain } = require("electron");
const serve = require('electron-serve');
// const isDev = require("electron-is-dev");
const path = require("path");
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
}

  const startURL = process.env.ELECTRON_IS_DEV === 1 ? 'http://localhost:3000' : `${path.resolve(__dirname, '..', 'build')}`;
  const loadURL = serve({directory: startURL});

(async () => {
	console.log(startURL);
  await app.whenReady();
  console.log('passei1')
  mainWin = new BrowserWindow();
  mainWin.loadFile(startURL);
	await loadURL(mainWin);
  console.log('passei2')
	// The above is equivalent to this:
	await mainWin.loadURL('app://localhost');
	// The `-` is just the required hostname
})();


// (async () => {
// 	await app.whenReady();

// 	mainWin = new BrowserWindow();

// 	await loadURL(mainWin);

// 	// The above is equivalent to this:
// 	await mainWin.loadURL('app://-');
// 	// The `-` is just the required hostname
// })()
