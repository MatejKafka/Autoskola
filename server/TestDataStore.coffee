path = require('path')
fs = require('fs')
ReadOnlyCollection = require('./ReadOnlyCollection')

logger = global.logger.getChildLogger('testDataStore')


module.exports = class TestDataStore
	constructor: (dataStoreDir) ->
		@_loadSections(path.resolve(dataStoreDir, 'sections.json'))
		@_loadQuestions(path.resolve(dataStoreDir, 'questions.json'))
		logger.log('Test data loaded')


	_loadSections: (sectionFilePath) ->
		@sections = @_loadTestDataPart(sectionFilePath)
		logger.log('Sections loaded', @sections.length)

	_loadQuestions: (questionFilePath) ->
		@questions = @_loadTestDataPart(questionFilePath)
		logger.log('Questions loaded', @questions.length)


	_loadTestDataPart: (filePath) ->
		try
			testDataStr = fs.readFileSync(filePath)
			return new ReadOnlyCollection(JSON.parse(testDataStr))
		catch
			logger.log('No valid file found at ' + filePath, {filePath: filePath})
			return new ReadOnlyCollection([])