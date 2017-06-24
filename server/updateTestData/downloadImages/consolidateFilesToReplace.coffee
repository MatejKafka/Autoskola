fs = require('fs-extra')
path = require('path')


createFileName = (code, swfPath, isAnswer) ->
	ext = path.extname(swfPath)
	nameWithoutExt = path.basename(swfPath, ext)

	if !isAnswer?
		return code + ext
	else
		return code + '_' + nameWithoutExt + ext


module.exports = (sourceDir, targetDir) ->
	console.log('CONSOLIDATING REMAINING FLASH ANIMATION FILES FROM ' + sourceDir)

	filesForReplacement = []
	for dirName in fs.readdirSync(sourceDir)
		dirPath = path.resolve(sourceDir, dirName)
		stat = fs.lstatSync(dirPath)
		if !stat.isDirectory()
			continue

		try
			flashStructure = require(path.resolve(dirPath, 'flashStructure.json'))
		catch
			# no flash animations here
			continue

		if flashStructure.question?
			filesForReplacement.push({
				originalQuestionDir: dirPath
				originalPath: flashStructure.question
				replacePath: createFileName(flashStructure.code, flashStructure.question, false)
			})

		if flashStructure.answers?
			for answer, i in flashStructure.answers
				if answer?
					filesForReplacement.push({
						originalQuestionDir: dirPath
						originalPath: answer
						replacePath: createFileName(flashStructure.code, answer, true)
					})

	console.log('WRITING CONSOLIDATED FILES TO ' + targetDir)
	fs.emptyDirSync(targetDir)
	for file in filesForReplacement
		fs.copySync(path.resolve(sourceDir, '.' + file.originalPath), path.resolve(targetDir, file.replacePath))
	fs.writeFileSync(path.resolve(targetDir, 'replacedFiles.json'), JSON.stringify(filesForReplacement))

	console.log('FINISHED CONSOLIDATION: ' + filesForReplacement.length + ' flash files were consolidated')
	return filesForReplacement