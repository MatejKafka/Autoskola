downloadQuestionImages = require('./downloadQuestionImages')
consolidateFilesToReplace = require('./consolidateFilesToReplace')
updateStructureFile = require('./updateStructureFile')


module.exports = (remoteImgQuestions, targetDir, replaceDir, startIndex = 0) ->
	console.log('DOWNLOADING REMOTE IMAGES TO ' + targetDir)

	for question in remoteImgQuestions.slice(startIndex)
		console.log('STARTING IMAGE DOWNLOAD FOR QUESTION #' + question.id)
		downloadQuestionImages(question, targetDir)
		console.log('FINISHED DOWNLOADING IMAGES FOR QUESTION #' + question.id)

	console.log('')
	consolidateFilesToReplace(targetDir, replaceDir)

	console.log('')
	return updateStructureFile(targetDir)