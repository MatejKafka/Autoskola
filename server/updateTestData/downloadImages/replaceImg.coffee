fetchImg = require('./fetchImg')
processImg = require('../processImg')
getPath = require('../util/getPath')
writeFile = require('./writeFile')


module.exports = (imgObj, qId, answerLetter, targetDir) ->
	if !imgObj?
		return null

	fetchImg(imgObj.url)
	.then (imgBuffer) ->
		if imgObj.type == 'img'
			return processImg.static(imgObj.url, imgBuffer)
		else
			return processImg.flashAnimation(imgObj.url, imgBuffer)

	.then ({extension, type, buffer: processedImgBuffer}) ->
		if answerLetter?
			relPath = getPath.answerImg(qId, answerLetter, extension)
		else
			# if answerLetter == null then it's question image
			relPath = getPath.questionImg(qId, extension)
		writeFile(targetDir, relPath, processedImgBuffer)

		return {
			type: type
			path: relPath
		}