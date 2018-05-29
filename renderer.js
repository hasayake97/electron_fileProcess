// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const ipc = require('electron').ipcRenderer
const indexFunc = require('./index')
const fs = require('fs')



// 输入文件夹事件
const inputs = document.getElementById('input-btn')
const inputPath = document.getElementById('input-path')

inputs.addEventListener('click', (e) => {
  ipc.send('open-file-input-dialog')  // 发送给主进程
}, false)

ipc.on('back', (e, paths) => {
  inputPath.value = paths
})

// 输出文件夹事件
const outputs = document.getElementById('output-btn')
const outputPath = document.getElementById('output-path')
outputs.addEventListener('click', (e) => {
  ipc.send('open-file-out-dialog')
}, false)

ipc.on('back-out', (e, paths) => {
  outputPath.value = paths
})

// 备份文件夹事件
const backup = document.getElementById('backup-btn')
const backupPath = document.getElementById('backup-path')
backup.addEventListener('click', (e) => {
  ipc.send('open-file-back-dialog')
})

ipc.on('back-backup', (e, paths) => {
  backupPath.value = paths
})

// 退出程序
const exits = document.getElementById('exits')
exits.addEventListener('click', (e) => {
  ipc.send('window-close')
})

// **** run ****
const run = document.getElementById('run')
run.addEventListener('click', (e) => {

  let reg = /^[a-zA-Z]:\\/
  // 判断三个path是否为空
  let flag = inputPath.value !== '' && outputPath.value !== '' && backupPath.value !== '',
      regFlag = reg.test(inputPath.value) && reg.test(outputPath.value) && reg.test(backupPath.value)
  // 判断三个path是否真实存在，若不存在则创建
  if(flag){
    if(regFlag){
      let tempArr = [inputPath.value, outputPath.value, backupPath.value];
      (() => {
        for(item of tempArr){
          if(!fs.existsSync(item)){fs.mkdirSync(item)}
        }
      })();
      indexFunc.handler(inputs, outputs, backups)
    }else{
      ipc.send('open-error-reg-dialog')
    }
  }else{
    ipc.send('open-error-dialog')
  }
  
}, false)