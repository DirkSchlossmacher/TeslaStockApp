const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Hier können zukünftige APIs hinzugefügt werden
});