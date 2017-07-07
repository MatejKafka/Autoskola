path = require('path')
fs = require('fs-extra')
getLocalImgQuestions = require('./getLocalImgQuestions')
saveCollection = require('../util/saveCollection')


module.exports = (targetFilePath, remoteImgQuestions, localImgDir, imgDirWebPath) ->
	try
		structure = require(path.resolve(localImgDir, 'structure.json'))
	catch
		throw new Error('missing structure.json file in localImgDir')

	localImgQuestions = getLocalImgQuestions(remoteImgQuestions, structure, imgDirWebPath)

	saveCollection(targetFilePath, localImgQuestions, 'local image questions')
	fs.writeFileSync(targetFilePath, JSON.stringify(localImgQuestions))

	console.log('LOCAL IMG QUESTIONS CREATED IN ' + targetFilePath)
	console.log('')