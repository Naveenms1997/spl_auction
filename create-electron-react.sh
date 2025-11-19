#!/bin/bash

# Project name
PROJECT_NAME="players-auction"

echo "🚀 Creating Vite + React + Electron project: $PROJECT_NAME"

# 1. Create Vite project
npm create vite@latest $PROJECT_NAME --template react

cd $PROJECT_NAME

# 2. Install dependencies
npm install
npm install electron concurrently wait-on --save-dev

# 3. Create electron folder
mkdir electron

# 4. Create main.js
cat <<EOF > electron/main.js
const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const mainWin = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  // Load Vite dev server OR dist build
  const isDev = !app.isPackaged;
  if (isDev) {
    mainWin.loadURL("http://localhost:5173/");
  } else {
    mainWin.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
EOF

# 5. Create preload.js
cat <<EOF > electron/preload.js
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  hello: () => "Hello from preload!"
});
EOF

# 6. Update package.json scripts
node - <<EOF
const fs = require("fs");
const pkg = JSON.parse(fs.readFileSync("package.json"));

pkg.main = "electron/main.js";
pkg.scripts = {
  ...pkg.scripts,
  "electron": "electron electron/main.js",
  "dev": "concurrently -k \"vite\" \"wait-on http://localhost:5173 && electron electron/main.js\"",
  "build": "vite build"
};

fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
EOF

echo "🎉 Project $PROJECT_NAME created successfully!"
echo "Run it with:"
echo "➡️  cd $PROJECT_NAME"
echo "➡️  npm run dev"
