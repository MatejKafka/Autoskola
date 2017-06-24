fs = require('fs')
path = require('path')
jpexs = require('jpexs-flash-decompiler')
consoleLogBlocker = require('./consoleLogBlocker')
getIdGenerator = require('./getIdGenerator')
loadDecompiledFile = require('./loadDecompiledFile')
rimraf = require('rimraf')
SWFReader = require('swf-reader')


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
			items: [jpexs.ITEM.SCRIPT, jpexs.ITEM.IMAGE, jpexs.ITEM.FRAME]
			formats: [jpexs.FORMAT.FRAME.BMP, jpexs.FORMAT.SCRIPT.AS, jpexs.FORMAT.IMAGE.BMP]
		}, (err) ->
			consoleLogBlocker.unblock()
			if err?
				return reject(new Error(err.message))
			resolve(outDirPath)
		)

	.then(loadDecompiledFile)

	.then (decompiledSwf) ->
		return new Promise (resolve, reject) ->
			SWFReader.read swfFilePath, (err, swf) ->
				if err
					return reject(err)
				decompiledSwf.frameRate = swf.frameRate
				decompiledSwf.frameSize = swf.frameSize
				resolve(decompiledSwf)

	.then (decompiledSwf) ->
		fs.unlinkSync(swfFilePath)
		rimraf.sync(outDirPath)
		return decompiledSwf