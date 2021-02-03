/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./electron/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./electron/main.ts":
/*!**************************!*\
  !*** ./electron/main.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);



var mainWindow;
var menu = electron__WEBPACK_IMPORTED_MODULE_0__["Menu"];

function createWindow() {
  mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"]({
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
      webSecurity: false // stops console from opening upon load

    }
  });

  if (true) {
    mainWindow.loadURL("http://localhost:4000");
    mainWindow.webContents.openDevTools();
  } else {} // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.


  electron__WEBPACK_IMPORTED_MODULE_0__["app"].on('window-all-closed', function () {
    if (process.platform !== 'darwin') electron__WEBPACK_IMPORTED_MODULE_0__["app"].quit();
  });
}

electron__WEBPACK_IMPORTED_MODULE_0__["app"].on("ready", createWindow);
electron__WEBPACK_IMPORTED_MODULE_0__["app"].on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getAllWindows().length === 0) createWindow();
}); // this whole chunck is for commands like copy and paste to be available
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

electron__WEBPACK_IMPORTED_MODULE_0__["app"].allowRendererProcessReuse = true;

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map