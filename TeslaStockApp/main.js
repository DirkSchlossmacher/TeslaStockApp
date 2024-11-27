const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 300,
    height: 150,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile('index.html');
  // Optional: Entferne das Menü
  win.setMenu(null);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // macOS spezifische Verhalten
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  // macOS spezifische Verhalten
  if (process.platform !== 'darwin') app.quit();
});