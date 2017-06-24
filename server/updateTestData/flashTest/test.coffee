path = require('path')
fs = require('fs')

getStaticImg = require('../processFlashAnimation/getStaticImg')

fileNames = fs.readdirSync('./animations')

processSwf = (i = 0) ->
	next = ->
		if fileNames[i + 1]?
			setTimeout(->
				processSwf(i + 1)
			, 10)
		else
			console.log('\nFINISHED')

	name = fileNames[i]
	filePath = path.resolve(__dirname, 'animations', name)
	buffer = fs.readFileSync(filePath, null)

	getStaticImg(buffer)
	.then (staticImg) ->
		if staticImg?
			console.log('IS STATIC: ' + name)
			fs.writeFileSync(path.resolve(__dirname, 'staticImg', name + '.' + staticImg.extension), staticImg.buffer)
		else
			console.log('NOT STATIC: ' + name)
		next()

processSwf()

#processFlashAnimation = require('../processFlashAnimation')
#
#loadDecompiledFile = require('../processFlashAnimation/decompileSwf/loadDecompiledFile')
#extractRelevantFrames = require('../processFlashAnimation/extractRelevantFrames')
#createImgFromFrames = require('../processFlashAnimation/createImgFromFrames')
#
#SWFReader = require('swf-reader')
#
#fileName = '014_6327516897280.swf'
#swfFilePath = path.resolve(__dirname, 'animations', fileName)
#path = path.resolve(__dirname, 'parsed', fileName)
##buffer = fs.readFileSync(path, null)
##
##
#start = Date.now()
##processFlashAnimation('swf', buffer)
##.then (imgObj) ->
##	fs.writeFileSync('./test20.' + imgObj.extension, imgObj.buffer)
##	console.log imgObj
##	console.log(Date.now() - start)
##.catch (err) ->
##	console.error(err)
#
#
#Promise.resolve(loadDecompiledFile(path))
#.then (decompiledSwf) ->
#	return new Promise (resolve, reject) ->
#		SWFReader.read swfFilePath, (err, swf) ->
#			if err
#				return reject(err)
#			decompiledSwf.frameRate = swf.frameRate
#			decompiledSwf.frameSize = swf.frameSize
#			resolve(decompiledSwf)
#
#.then (decompiledSwf) ->
#	#fs.unlinkSync(swfFilePath)
#	#rimraf.sync(outDirPath)
#	return decompiledSwf
#
#.then(extractRelevantFrames)
#.then(createImgFromFrames)
#.then (imgObj) ->
#	fs.writeFileSync('./test20.' + imgObj.extension, imgObj.buffer)
#	console.log imgObj
#	console.log(Date.now() - start)
#.catch (err) ->
#	console.error(err)