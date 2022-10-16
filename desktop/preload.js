const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    send: ipcRenderer.send,
    on(event, fn) { ipcRenderer.on(event, fn) }
  }
)