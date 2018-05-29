const fs = require('fs')
const path = require('path')

module.exports = {
  handler : async (inputs, outputs, backups) => {
    let allPath = await fs.readdirSync(inputs)
    let content = '',
        fileNow = ''

    for(pathItem of allPath) {
      let tempPath = path.join(inputs, pathItem)
      
      if(tempPath.endsWith('.html')){
        fileNow = fs.createReadStream(tempPath, 'utf-8')
        fileNow.on('data', (chunk) => {content += chunk})
        fileNow.on('close', () => {
          document.getElementById('watcher').innerHTML = content
        })
      }
    }
  },
}