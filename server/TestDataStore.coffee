path = require('path')
fs = require('fs')
config = require('./config')
ReadOnlyCollection = require('./ReadOnlyCollection')

logger = global.logger.getChildLogger('testDataStore')


module.exports = class TestDataStore
	constructor: (paths) ->
		@_loadSections(paths.sections)
		@_watchResource(paths.sections, @_loadSections)

		@_loadLocalImgQuestions(paths.localImgQuestions)
		@_watchResource(paths.localImgQuestions, @_loadLocalImgQuestions)

		@_loadRemoteImgQuestions(paths.remoteImgQuestions)
		@_watchResource(paths.remoteImgQuestions, @_loadRemoteImgQuestions)

		logger.log('Test data loaded')


	_loadSections: (sectionFilePath, reload = false) =>
		@sections = @_loadTestDataPart(sectionFilePath)
		logger.log('Sections ' + (if reload then 're' else '') + 'loaded', @sections.length)

	_loadLocalImgQuestions: (questionFilePath, reload = false) =>
		@localImgQuestions = @_loadTestDataPart(questionFilePath)
		logger.log('Local img questions ' + (if reload then 're' else '') + 'loaded', @localImgQuestions.length)

	_loadRemoteImgQuestions: (questionFilePath, reload = false) =>
		@remoteImgQuestions = @_loadTestDataPart(questionFilePath)
		logger.log('Remote img questions ' + (if reload then 're' else '') + 'loaded', @remoteImgQuestions.length)


	_watchResource: (filePath, callback) ->
		fs.watch filePath, ->
			callback(filePath, true)


	_loadTestDataPart: (filePath) ->
		try
			testDataStr = fs.readFileSync(filePath)
			lastChangeStr = fs.readFileSync(filePath + config.collectionSuffix.lastChange)
			return new ReadOnlyCollection(JSON.parse(testDataStr), parseInt(lastChangeStr))
		catch
			logger.log('No valid file found at ' + filePath, {filePath: filePath})
			return new ReadOnlyCollection([], 0)