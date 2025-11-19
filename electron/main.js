const { app, BrowserWindow, ipcMain, screen } = require("electron");
const path = require("path");

let mainWindow = null;
let secondWindow = null;

// Correct preload path for Vite
const preloadPath = path.join(__dirname, "preload.js")

function createMainWindow() {
  const primary = screen.getPrimaryDisplay();

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  if (process.env.ELECTRON_DEV) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "dist/index.html"));
  }
}

function openSecondWindow() {
  if (secondWindow) {
    secondWindow.focus();
    return;
  }

  const displays = screen.getAllDisplays();
  const display = displays[1] || displays[0];

  secondWindow = new BrowserWindow({
    x: display.bounds.x + 50,
    y: display.bounds.y + 50,
    width: 1000,
    height: 700,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  if (process.env.ELECTRON_DEV) {
    secondWindow.loadURL("http://localhost:5173#/second");
  } else {
    secondWindow.loadFile(path.join(app.getAppPath(), "dist/index.html"))
      .then(() => secondWindow.webContents.send("navigate-to", "/second"));
  }

  secondWindow.on("closed", () => {
    secondWindow = null;
  });
}

app.whenReady().then(() => {
  createMainWindow();
});

ipcMain.on("open-second-window", () => {
  openSecondWindow();
});

// ⭐⭐ CENTRAL STATE SYNC ⭐⭐
// React context sends updates → Electron → all windows

ipcMain.on("context-update", (event, newState) => {
  BrowserWindow.getAllWindows().forEach((win) => {
    if (win.webContents !== event.sender) {
      win.webContents.send("context-update", newState);
    }
  });
});
