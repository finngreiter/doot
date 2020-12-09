const { app, BrowserWindow } = require('electron');

let w;

const win = () => {
  w = new BrowserWindow({
    width: 600,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  w.loadFile('src/index.html');
};

app.whenReady().then(() => {
  win();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) win();
  });
});

app.on('window-all-closed', () => app.quit());
