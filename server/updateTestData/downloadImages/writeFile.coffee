fs = require('fs')
path = require('path')


module.exports = (targetDir, relPath, content) ->
	path = path.resolve(targetDir, '.' + relPath)
	fs.writeFileSync(relPath, content)
