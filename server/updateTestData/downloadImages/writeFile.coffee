fs = require('fs-extra')
path = require('path')


module.exports = (targetDir, relPath, content) ->
	filePath = path.resolve(targetDir, '.' + relPath)
	fs.outputFileSync(filePath, content)
