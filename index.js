const fs = require('fs')
const path = require('path')

module.exports = {
  handler : async (inputs, outputs, backups) => {
    let fileNameArr = fs.readdirSync(inputs).filter(f => /^.csv$/i.test(path.extname(f)))
    let content = ''
    for(fileItem of fileNameArr){
      let absolutePath = path.join(inputs, fileItem)
      let read = fs.createReadStream(absolutePath, 'utf-8')
      read
          .on('data', (data) => {
            console.log(data)
          })
          .on('close', () => {
            // console.log('done')
            document.getElementById('watcher').innerHTML += 'done\n'
          })
    }
  },
}