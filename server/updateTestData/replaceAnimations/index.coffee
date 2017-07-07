fs = require('fs-extra')
path = require('path')
processStaticImg = require('../processImg').static
{async, await} = require('asyncawait')
updateStructureFile = require('../updateStructureFile')


bunchByBasename = (fileNames) ->
	out = {}
	for fileName in fileNames
		{name, ext} = path.parse(fileName)
		if !out[name]?
			out[name] = []
		out[name].push(ext.slice(1))
	return out


parseReplacedFileNameWithoutExt = (fileName) ->
	[code, letter] = fileName.split('_')
	if !letter?
		letter = null

	return {code, letter}


module.exports = async (targetDir, replaceDir, removeReplacedFiles = false) ->
	console.log('REPLACING .swf ANIMATIONS')
	console.log('\t' + 'targetDir: ' + targetDir)
	console.log('\t' + 'replaceDir: ' + replaceDir)
	console.log('\t' + 'removeReplacedFiles: ' + removeReplacedFiles.toString().toUpperCase())
	console.log('')

	replacedFilesPath = path.resolve(replaceDir, 'replacedFiles.json')
	try
		replacedFiles = require(replacedFilesPath)
	catch
		throw new Error('replacedFiles.json is missing / invalid in ' + replaceDir)

	files = fs.readdirSync(replaceDir)

	bunchedFiles = bunchByBasename(files)
	remainingIndexArr = [0...replacedFiles.length]
	# TODO: update replacedFiles.json - remove processed files

	for file, i in replacedFiles
		console.log 'STARTED PROCESSING ' + file.replacePath + " (originalPath: #{file.originalPath})"

		{name, ext} = path.parse(file.replacePath)
		ext = ext.slice(1)

		if !bunchedFiles[name]?
			console.warn('SKIPPING REPLACEMENT: missing relevant files for ' + file.replacePath + ' (originally at ' + file.originalPath + ')')
			continue

		extensions = bunchedFiles[name].filter((e) -> e != ext)
		if extensions.length > 1
			console.warn('SKIPPING REPLACEMENT: multiple replacement images for ' + file.replacePath + ' (originally at ' + file.originalPath + ')')
			continue
		if extensions.length == 0
			console.warn('SKIPPING REPLACEMENT: missing replacement image for ' + file.replacePath + ' (originally at ' + file.originalPath + ')')
			continue


		replacementFileName = name + '.' + extensions[0]
		replacementFilePath = path.resolve(replaceDir, replacementFileName)

		imgBuffer = fs.readFileSync(replacementFilePath, null)
		processedImg = await processStaticImg(extensions[0], imgBuffer)

		targetRelPath = file.originalPath.slice(0, -path.extname(file.originalPath).length) + '.' + processedImg.extension
		targetAbsPath = path.resolve(targetDir, '.' + targetRelPath)
		# leave previous source file in place as alternative (don't delete .swf file)
		fs.writeFileSync(targetAbsPath, processedImg.buffer)

		# update structure.json
		structureFilePath = path.resolve(targetDir, '.' + file.originalQuestionDir, 'structure.json')
		try
			structure = require(structureFilePath)
		catch
			console.warn('missing structure.json for updated question - replacement will still be copied (structurePath: ' + structureFilePath + ')')
			continue

		{letter} = parseReplacedFileNameWithoutExt(name)
		imgObj = {type: processedImg.type, path: targetRelPath}
		if !letter?
			structure.question = imgObj
		else
			found = false
			for answer, i in structure.answers
				if answer? && answer.path == file.originalPath
					structure.answers[i] = imgObj
					found = true
					break

			if !found
				console.warn('Could not find matching answer to update in structure.json - replacement will still be copied')
				continue

		fs.writeFileSync(structureFilePath, JSON.stringify(structure))
		if removeReplacedFiles
			for ext in bunchedFiles[name]
				filePath = path.resolve(replaceDir, name + '.' + ext)
				fs.unlinkSync(filePath)
		remainingIndexArr[i] = null
		console.log('FINISHED PROCESSING ' + file.replacePath)

	unfinishedFileCount = remainingIndexArr.filter((i) -> i?).length

	console.log('REPLACED ' + (replacedFiles.length - unfinishedFileCount) + ' .swf ANIMATIONS')

	if removeReplacedFiles && unfinishedFileCount == 0
		console.log('REMOVING replacedFiles.json')
		fs.unlinkSync(path.resolve(replaceDir, 'replacedFiles.json'))
	else
		console.log('UPDATING replacedFiles.json')
		remainingFiles = replacedFiles.filter (file, i) ->
			return remainingIndexArr[i]?
		fs.writeFileSync(replacedFilesPath, JSON.stringify(remainingFiles))
		console.log(unfinishedFileCount + ' .swf ANIMATIONS REMAINING')

	console.log('')
	return updateStructureFile(targetDir)
	
	return