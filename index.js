const fs = require('fs')
const path = require('path')

module.exports = {
  inputHandler : async (paths) => {
    let allPath = await fs.readdirSync(paths)
    let content = '',
        fileNow = ''

    for(pathItem of allPath) {
      let tempPath = path.join(paths, pathItem),
          flag = !fs.statSync(tempPath).isDirectory() && tempPath.endsWith('.html')
          
      if(flag){
        fileNow = fs.createReadStream(tempPath, 'utf-8')
        fileNow.on('data', (chunk) => {content += chunk})
        fileNow.on('close', () => {
          document.getElementById('watcher').innerHTML = content
        })
      }
    }
  }
}