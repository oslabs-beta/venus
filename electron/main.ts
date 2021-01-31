import { app, BrowserWindow, Menu } from "electron";
import * as path from "path";
import * as url from "url";

let mainWindow: Electron.BrowserWindow | null;
const menu = Menu
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    // maxWidth:1450,
    // maxHeight:850,
    //  // this will give us our icon shown in the task bar or dock. This will also give you a small icon in the top left of your Windows app.
    // icon: __dirname + '/app/assets/img/icon.png',
    // darkTheme - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Default is false.
    darkTheme: true,
  // if application has a non-white background color
    backgroundColor: 'black', 
   webPreferences: {
      // Whether node integration is enabled
      nodeIntegration: true,
    // When false, it will disable the same-origin policy (usually using testing websites by people)
    // and set allowRunningInsecureContent to true if this options has not been set by user. Default is true.
      webSecurity: false,
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


// this whole chunck is for commands like copy and paste to be available
//
// if (process.platform === 'darwin') { 
//   var template = [{ 
//     label: 'FromScratch', 
//     submenu: [{ 
//       label: 'Quit', 
//       accelerator: 'CmdOrCtrl+Q', 
//       click: function() { 
//         app.quit(); 
//       } 
//     }] 
//   }, { 
//     label: 'Edit', 
//     submenu: [{ 
//       label: 'Undo', 
//       accelerator: 'CmdOrCtrl+Z', 
//       selector: 'undo:' 
//     }, { 
//       label: 'Redo', 
//       accelerator: 'Shift+CmdOrCtrl+Z', 
//       selector: 'redo:' 
//     }, { 
//       type: 'separator'
//     }, { 
//       label: 'Cut', 
//       accelerator: 'CmdOrCtrl+X', 
//       selector: 'cut:' 
//     }, { 
//       label: 'Copy', 
//       accelerator: 'CmdOrCtrl+C', 
//       selector: 'copy:'
//     }, { 
//       label: 'Paste', 
//       accelerator: 'CmdOrCtrl+V', 
//       selector: 'paste:' 
//     }, { 
//       label: 'Select All', 
//       accelerator: 'CmdOrCtrl+A', 
//       selector: 'selectAll:' 
//     }] 
//   }];
//   var osxMenu = menu.buildFromTemplate(template);
//   menu.setApplicationMenu(osxMenu);
// }

app.allowRendererProcessReuse = true;
