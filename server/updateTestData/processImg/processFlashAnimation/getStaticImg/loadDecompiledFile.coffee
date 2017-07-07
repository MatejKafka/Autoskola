fs = require('fs')
path = require('path')


loadDir = (dir) ->
	imgs = []
	for name in fs.readdirSync(dir)
		[n, ext] = name.split('.')
		n = parseInt(n)
		imgs[n - 1] = {
			n: parseInt(n)
			extension: ext
			buffer: fs.readFileSync(path.resolve(dir, name), null)
		}
	return imgs

isEmptyDir = (dir) ->
	try
		return fs.readdirSync(dir).length == 0
	catch
		return true


module.exports = (dirPath) ->
	return {
		images: loadDir(path.resolve(dirPath, 'images'))
		spritesExist: !isEmptyDir(path.resolve(dirPath, 'sprites'))
		morphshapesExist: !isEmptyDir(path.resolve(dirPath, 'morphshapes'))
	}