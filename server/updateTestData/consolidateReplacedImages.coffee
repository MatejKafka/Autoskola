fs = require('fs-extra')
path = require('path')
chalk = require('chalk')
getQuestionStructures = require('./util/getQuestionStructures')
getPath = require('./util/getPath')


log = (message) ->
	console.log(chalk.green(message))


createFileName = (code, swfPath, isAnswer) ->
	ext = path.extname(swfPath)
	nameWithoutExt = path.basename(swfPath, ext)

	if !isAnswer
		return code + ext
	else
		return code + '_' + nameWithoutExt + ext


getFlashAnim = (imgObj) ->
	if imgObj? && imgObj.type == 'animation'
		return imgObj.path
	else
		return null


getFlashImgStructure = (structure) ->
	if structure.answers?
		answers = structure.answers.map(getFlashAnim)
	else
		answers = null

	out =
		question: getFlashAnim(structure.question)
		answers: answers

	if !out.question? && !out.answers?
		return null
	else
		return Object.assign({}, structure, out)


# TODO: add caching - when replaced, save both animation and replacement image to cache folder
module.exports = (sourceDir, targetDir) ->
	log('CONSOLIDATING REMAINING FLASH ANIMATION FILES FROM ' + sourceDir)

	filesForReplacement = []
	for structure in getQuestionStructures(sourceDir)
		dirPath = getPath.dir(structure.id)
		flashStructure = getFlashImgStructure(structure)

		if !flashStructure?
			continue

		if flashStructure.question?
			filesForReplacement.push({
				originalQuestionDir: dirPath
				originalPath: flashStructure.question
				replacePath: createFileName(flashStructure.code, flashStructure.question, false)
			})

		# TODO: test if it works with answers (just in case...)
		if flashStructure.answers?
			for answer, i in flashStructure.answers
				if answer?
					filesForReplacement.push({
						originalQuestionDir: dirPath
						originalPath: answer
						replacePath: createFileName(flashStructure.code, answer, true)
					})

	log('WRITING CONSOLIDATED FILES TO ' + targetDir)
	fs.emptyDirSync(targetDir)
	for file in filesForReplacement
		fs.copySync(path.resolve(sourceDir, '.' + file.originalPath), path.resolve(targetDir, file.replacePath))
	fs.writeFileSync(path.resolve(targetDir, 'replacedFiles.json'), JSON.stringify(filesForReplacement))

	log('FINISHED CONSOLIDATION: ' + filesForReplacement.length + ' .swf files extracted')
	console.log('')
	console.log(chalk.magenta('save replacement files as images with same name as source .swf, then run "replaceAnimations" script'))
	console.log('')
	return filesForReplacement