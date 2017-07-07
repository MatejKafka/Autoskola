fs = require('fs-extra')
chalk = require('chalk')
downloadQuestionImages = require('./downloadQuestionImages')
updateStructureFile = require('../updateStructureFile')
{async, await} = require('asyncawait')

log = (message) ->
	console.log(chalk.green(message))

info = (message) ->
	console.log(chalk.magenta(message))


module.exports = async (remoteImgQuestions, targetDir, startIndex = 0, endIndex = null) ->
	log('DOWNLOADING REMOTE IMAGES TO ' + targetDir)

	if endIndex? && endIndex < startIndex
		throw new Error('endIndex cannot be higher than startIndex')

	if !endIndex?
		endIndex = Infinity

	slicedQ = remoteImgQuestions.slice(startIndex, endIndex)

	if startIndex == 0 && endIndex == Infinity
		# clears / creates target directory
		log('CLEARING TARGET DIRECTORY')
		fs.emptyDirSync(targetDir)

		log("#{slicedQ.length} QUESTIONS TO PROCESS")
	else
		log("CONTINUING FROM INDEX: #{startIndex} (#{slicedQ.length} questions remaining, #{remoteImgQuestions.length} total)")

	for question, i in slicedQ
		console.log("STARTING IMAGE DOWNLOAD FOR QUESTION ##{question.id} (i: #{startIndex + i}, code: #{question.code})")
		await downloadQuestionImages(question, targetDir)
		console.log("FINISHED DOWNLOADING IMAGES FOR QUESTION ##{question.id} (i: #{startIndex + i})")

	log('DOWNLOAD FINISHED')

	if endIndex != Infinity
		console.log('')
		info('endIndex IS SPECIFIED, SKIPPING STRUCTURE FILE UPDATE')
		info('either run "updateStructureFile" manually or run full download without endIndex specified')
	else
		console.log('')
		structure = updateStructureFile(targetDir)

	console.log('')
	log('FINISHED DOWNLOADING IMAGES')
	console.log('')
	info('it is recommended to now run "consolidateReplacedImages" to extract .swf animations for replacement')
	console.log('')

	return structure