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

loadScripts = (dir) ->
	for name in fs.readdirSync(dir)
		frameN = parseInt(name.slice(name.indexOf('_') + 1))
		code = fs.readFileSync(path.resolve(dir, name, 'DoAction.as'), 'utf8')
		{
			n: frameN
			code: code
		}


module.exports = (dirPath) ->
	return {
		frames: loadDir(path.resolve(dirPath, 'frames'))
		images: loadDir(path.resolve(dirPath, 'images'))
		scripts: loadScripts(path.resolve(dirPath, 'scripts'))
	}