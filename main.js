// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1000, height: 600})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// 监听 选择文件夹-input
ipc.on('open-file-input-dialog', (e) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, (files) => {
    // 发送给渲染进程
    if(files) {e.sender.send('back', files)}
  })
})

// 监听 选择文件夹-output
ipc.on('open-file-out-dialog', (e) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, (files) => {
    if(files) {e.sender.send('back-out', files)}
  })
})

// 监听 选择文件夹-backup
ipc.on('open-file-back-dialog', (e) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, (files) => {
    if(files) {e.sender.send('back-backup', files)}
  })
})

// 监听程序退出
ipc.on('window-close', () => {
  mainWindow.close()
})

// 监听错误提示
ipc.on('open-error-dialog', () => {
    dialog.showErrorBox('错误', '地址栏不能为空')
})

// 监听地址值是否符合规范
ipc.on('open-error-reg-dialog', () => {
  dialog.showErrorBox('错误', '地址不符合规范')
})


//grunt 生成快捷方式  
var path = require('path');  
var handleStartupEvent = function () {  
  if (process.platform !== 'win32') {  
    return false;  
  }  
  
  var squirrelCommand = process.argv[1];  
  
  switch (squirrelCommand) {  
    case '--squirrel-install':  
    case '--squirrel-updated':  
      install();  
      return true;  
    case '--squirrel-uninstall':  
      uninstall();  
      app.quit();  
      return true;  
    case '--squirrel-obsolete':  
      app.quit();  
      return true;  
  }  
    // 安装  
  function install() {  
    var cp = require('child_process');      
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');  
    var target = path.basename(process.execPath);  
    var child = cp.spawn(updateDotExe, ["--createShortcut", target], { detached: true });  
    child.on('close', function(code) {  
        app.quit();  
    });  
  }  
   // 卸载  
   function uninstall() {  
    var cp = require('child_process');      
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');  
    var target = path.basename(process.execPath);  
    var child = cp.spawn(updateDotExe, ["--removeShortcut", target], { detached: true });  
    child.on('close', function(code) {  
        app.quit();  
    });  
  }  
  
};  
  
if (handleStartupEvent()) {  
  return;  
}  