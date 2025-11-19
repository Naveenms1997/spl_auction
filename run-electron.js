// run-electron.js
const { exec } = require('child_process');
const path = require('path');

const electronBin = path.join(__dirname, 'node_modules', '.bin', 'electron');

// spawn electron via exec so we get console output
const cmd = `"${electronBin}" electron/main.js`;

console.log('Starting Electron via:', cmd);

const p = exec(cmd, { env: { ...process.env, ELECTRON_DEV: 'true' } });

p.stdout && p.stdout.pipe(process.stdout);
p.stderr && p.stderr.pipe(process.stderr);

p.on('close', (code) => {
  console.log('Electron exited with code', code);
});
