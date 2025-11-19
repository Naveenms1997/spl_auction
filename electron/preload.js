console.log("🚀 Preload loaded!", window.location.href);

const { contextBridge, ipcRenderer } = require("electron");

console.log("🚀 Preload loaded!", window.location.href);

contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, func) =>
    ipcRenderer.on(channel, (_, ...args) => func(...args))
});
