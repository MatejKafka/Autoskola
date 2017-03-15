path = require('path')
fs = require('fs')
ReadOnlyCollection = require('./ReadOnlyCollection')

logger = global.logger.getChildLogger('testDataStore')


module.exports = class TestDataStore
	constructor: (dataStoreDir) ->
		sectionFile = path.resolve(dataStoreDir, 'sections.json')
		questionFile = path.resolve(dataStoreDir, 'questions.json')

		@_loadSections(sectionFile)
		@_loadQuestions(questionFile)
		@_watchResource(sectionFile, @_loadSections)
		@_watchResource(questionFile, @_loadQuestions)
		logger.log('Test data loaded')


	_loadSections: (sectionFilePath, reload = false) =>
		@sections = @_loadTestDataPart(sectionFilePath)
		logger.log('Sections ' + (if reload then 're' else '') + 'loaded', @sections.length)

	_loadQuestions: (questionFilePath, reload = false) =>
		@questions = @_loadTestDataPart(questionFilePath)
		logger.log('Questions ' + (if reload then 're' else '') + 'loaded', @questions.length)


	_watchResource: (filePath, callback) ->
		fs.watch filePath, ->
			callback(filePath, true)


	_loadTestDataPart: (filePath) ->
		try
			testDataStr = fs.readFileSync(filePath)
			return new ReadOnlyCollection(JSON.parse(testDataStr))
		catch
			logger.log('No valid file found at ' + filePath, {filePath: filePath})
			return new ReadOnlyCollection([])