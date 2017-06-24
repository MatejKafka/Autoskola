fs = require('fs-extra')
path = require('path')

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


module.exports = (targetDir, replaceDir) ->
	try
		replacedFiles = require(path.resolve(replaceDir, 'replacedFiles.json'))
	catch
		throw new Error('replacedFiles.json is missing / invalid in ' + replaceDir)

	files = fs.readdirSync(replaceDir).filter((fN) -> fN != 'replacedFiles.json')

	bunchedFiles = bunchByBasename(files)

	for file in replacedFiles
		{name, ext} = path.parse(file.replacePath)
		ext = ext.slice(1)

		if !bunchedFiles[name]?
			throw new Error('missing relevant files for ' + file.replacePath + ' (originally at ' + file.originalPath + ')')

		extensions = bunchedFiles[name].filter((e) -> e != ext)
		if extensions.length > 1
			throw new Error('multiple replacement images for ' + file.replacePath + ' (originally at ' + file.originalPath + ')')
		if extensions.length == 0
			throw new Error('missing replacement image for ' + file.replacePath + ' (originally at ' + file.originalPath + ')')


		replacementFileName = name + '.' + extensions[0]
		# TODO: NO! first use processImg to convert it, then write the processed img
		targetPath = file.originalPath.slice(0, -path.extname(file.originalPath).length) + '.' + extensions[0]

		# leave previous source file in place as alternative (don't delete .swf file)
		fs.copySync(path.resolve(replaceDir, replacementFileName), targetPath)

		# update structure.json
		try
			structure = require(path.resolve(file.originalQuestionDir, 'structure.json'))
		catch
			console.warn('missing structure.json for updated question - replacement will still be copied')
			continue

		{letter} = parseReplacedFileNameWithoutExt(name)