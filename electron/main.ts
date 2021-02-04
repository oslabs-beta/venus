import { app, BrowserWindow, Menu } from "electron";
import * as path from "path";
import * as url from "url";



let mainWindow: Electron.BrowserWindow | null;
const menu = Menu
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1372,
    height: 833,
    // maxWidth: 1439,
    // maxHeight:990,
    minWidth: 1800,
    minHeight: 800,
    //  // this will give us our icon shown in the task bar or dock. This will also give you a small icon in the top left of your Windows app.
    // icon: __dirname + '/app/assets/img/icon.png',
   webPreferences: {
      // Whether node integration is enabled
      nodeIntegration: true,
    // When false, it will disable the same-origin policy (usually using testing websites by people)
    // and set allowRunningInsecureContent to true if this options has not been set by user. Default is true.
      webSecurity: true,
      // stops console from opening upon load
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL(`http://localhost:4000`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
}

app.on("ready", createWindow);

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.allowRendererProcessReuse = true;
