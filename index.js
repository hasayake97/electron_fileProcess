const fs = require('fs')
const path = require('path')
const csv = require('csvparser_aning')

module.exports = {
  handler : (inputs, outputs, backups) => {
    let res = csv(inputs)
    for(key of Object.keys(res)){
      // 备份
      let backName = 'back_'
      fs.writeFileSync(path.join(backups, backName+key), res[key])
      // 输出
      let outName = 'out_'
      fs.writeFileSync(path.join(outputs, outName+key), res[key])
    }
    
  },
}

