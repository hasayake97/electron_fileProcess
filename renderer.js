// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const ipc = require('electron').ipcRenderer
const indexFunc = require('./index')


// 输入文件夹事件
const inputs = document.getElementById('input-btn')
inputs.addEventListener('click', (e) => {
  ipc.send('open-file-input-dialog')  // 发送给主进程
}, false)

ipc.on('back', (e, path) => {
  indexFunc.inputHandler(path[0])
  document.getElementById('input-src').value = path
})

// 输出文件夹事件
const outputs = document.getElementById('output-btn')
outputs.addEventListener('click', (e) => {
  ipc.send('open-file-out-dialog')
}, false)

ipc.on('back-out', (e, path) => {
  document.getElementById('output-src').value = path
})

// 备份文件夹事件
const backup = document.getElementById('backup-btn')
backup.addEventListener('click', (e) => {
  ipc.send('open-file-back-dialog')
})

ipc.on('back-backup', (e, path) => {
  document.getElementById('backup-src').value = path
})