// run-dev.js
const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

function startVite() {
  console.log('Starting Vite dev server...');
  const vite = spawn(path.join(__dirname, 'node_modules', '.bin', 'vite'), [], {
    stdio: 'inherit',
    shell: true
  });
  return vite;
}

function waitForServer(url, timeout = 20000, interval = 200) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    (function check() {
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => {
        if (Date.now() - start > timeout) {
          reject(new Error('Timed out waiting for dev server'));
        } else {
          setTimeout(check, interval);
        }
      });
      req.setTimeout(2000, () => {
        req.abort();
      });
    })();
  });
}

async function run() {
  const vite = startVite();

  try {
    await waitForServer('http://localhost:5173');
    console.log('Vite is ready.');
  } catch (err) {
    console.error('Vite did not start in time:', err);
    process.exit(1);
  }

  // start electron
  const electron = spawn('node', [path.join(__dirname, 'run-electron.js')], {
    stdio: 'inherit',
    shell: true
  });

  // forward termination to children
  process.on('SIGINT', () => {
    vite.kill('SIGINT');
    electron.kill('SIGINT');
    process.exit();
  });
}

run();
