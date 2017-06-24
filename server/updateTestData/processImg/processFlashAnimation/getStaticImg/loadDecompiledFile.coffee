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

dirExists = (dir) ->
	try
		fs.lstatSync(dir)
		return true
	catch
		return false


module.exports = (dirPath) ->
	return {
		images: loadDir(path.resolve(dirPath, 'images'))
		spritesExist: dirExists(path.resolve(dirPath, 'sprites'))
		morphshapesExist: dirExists(path.resolve(dirPath, 'morphshapes'))
	}