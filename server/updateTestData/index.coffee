require('./util/showUnhandledPromises')

config = require('../config')
path = require('path')

paths = config.testDataPaths

getRemoteImgQuestions = (path) ->
	try
		require(path)
	catch
		throw new Error('REMOTE IMG QUESTIONS FILE MISSING: ' + path)


cliArguments =
	updateQuestionsAndSections: -> [
		paths.sections
		paths.remoteImgQuestions
	]
	downloadImages: (startIndexStr = 0, endIndexStr = null) -> [
		getRemoteImgQuestions(paths.remoteImgQuestions)
		paths.imgDir
		paths.oldImgDir
		parseInt(startIndexStr)
		if !endIndexStr? then null else parseInt(endIndexStr)
	]
	updateStructureFile: -> [
		paths.imgDir
	]
	consolidateReplacedImages: -> [
		paths.imgDir
		paths.flashReplaceDir
	]
	replaceAnimations: (removeReplacedFilesStr = null) -> [
		paths.imgDir
		paths.flashReplaceDir
		if removeReplacedFilesStr == 'removeReplacedFiles' then true else false
	]
	generateLocalImgQuestions: -> [
		paths.localImgQuestions
		getRemoteImgQuestions(paths.remoteImgQuestions)
		paths.imgDir
		paths.imgDirUrl
	]


module.exports =
	updateQuestionsAndSections: require('./updateSectionsAndQuestions')
	downloadImages: require('./downloadImages')
	updateStructureFile: require('./updateStructureFile')
	consolidateReplacedImages: require('./consolidateReplacedImages')
	replaceAnimations: require('./replaceAnimations')
	generateLocalImgQuestions: require('./generateLocalImgQuestions')

	arguments: cliArguments



# CLI
arg = process.argv.slice(2)

commandName = arg[0]
params = arg.slice(1)

if !commandName?
	console.log('AVAILABLE COMMANDS: ')
	for cmdName, fn of cliArguments
		console.log('\t' + cmdName + " (#{fn.length} #{if fn.length > 0 then "optional " else ""}arguments)")
	console.log('')
	return

if !cliArguments[commandName]?
	throw new Error('Unknown command: ' + commandName)

module.exports[commandName].apply(null, cliArguments[commandName].apply(null, params))