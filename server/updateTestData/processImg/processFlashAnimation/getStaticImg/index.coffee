fs = require('fs')
path = require('path')
jpexs = require('jpexs-flash-decompiler')
consoleLogBlocker = require('./consoleLogBlocker')
getIdGenerator = require('./getIdGenerator')
loadDecompiledFile = require('./loadDecompiledFile')
rimraf = require('rimraf')


TMP_DIR = path.resolve(__dirname, './flashTmp')

generateFileId = getIdGenerator()


module.exports = (swfBuffer) ->
	id = generateFileId()
	swfFilePath = path.resolve(TMP_DIR, id + '.swf')
	outDirPath = swfFilePath + '.decompiled'

	return new Promise (resolve, reject) ->
		try
			fs.lstatSync(TMP_DIR)
		catch
			# create dir if it doesn't exist
			fs.mkdirSync(TMP_DIR)

		fs.writeFileSync(swfFilePath, swfBuffer)

		consoleLogBlocker.block()
		jpexs.export({
			file: swfFilePath
			output: outDirPath
			items: [jpexs.ITEM.SPRITE, jpexs.ITEM.IMAGE, jpexs.ITEM.MORPHSHAPE]
			formats: [jpexs.FORMAT.SPRITE.SVG, jpexs.FORMAT.IMAGE.PNG, jpexs.FORMAT.MORPHSHAPE.SVG]
		}, (err) ->
			consoleLogBlocker.unblock()
			if err?
				return reject(new Error(err.message))
			resolve(outDirPath)
		)

	.then(loadDecompiledFile)

	.then (decompiledSwf) ->
		if decompiledSwf.spritesExist || decompiledSwf.morphshapesExist
			return null
		else if decompiledSwf.images.length == 0
			throw new Error('.swf does not contain any static images')
		else
			img = decompiledSwf.images[0]
			return {
				type: 'img'
				buffer: img.buffer
				extension: img.extension
			}

	.then (staticImg) ->
		fs.unlinkSync(swfFilePath)
		rimraf.sync(outDirPath)
		return staticImg