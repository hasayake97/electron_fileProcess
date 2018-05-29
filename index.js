const fs = require('fs')
const path = require('path')

module.exports = {
  allInFile : async (paths) => {
    let allPath = await fs.readdirSync(paths)
    let tempArr = []
        content = '';
    for(pathItem of allPath) {
      tempArr.push(path.join(paths, pathItem))
    }
    console.log(tempArr)
    for(fileItem of tempArr) {
      if(!fs.statSync(fileItem).isDirectory()){
          content = fs.readFileSync(fileItem, 'utf-8')
      }
      console.log(content)
    }
  }
}