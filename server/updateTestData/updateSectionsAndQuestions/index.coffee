path = require('path')
fs = require('fs')
chalk = require('chalk')

loadRawSections = require('./loadRawSections')
loadRawQuestions = require('./loadRawQuestions')
getProcessedSections = require('./getProcessedSections')
getProcessedQuestions = require('./getProcessedQuestions')
saveCollection = require('./../util/saveCollection')


module.exports = (sectionFilePath, questionFilePath) ->
	loadRawSections()
	.then (rawSections) ->
		return Promise.all([rawSections, loadRawQuestions()])
	.then ([rawSections, rawQuestions]) ->
		sections = getProcessedSections(rawQuestions, rawSections)
		questions = getProcessedQuestions(rawQuestions, rawSections)

		sectionsChanged = saveCollection(sectionFilePath, sections, 'sections')
		questionsChanged = saveCollection(questionFilePath, questions, 'remote image questions')

		console.log('')
		console.log(chalk.magenta 'UPDATE FINISHED:')
		console.log(chalk.magenta '	sections were updated: ' + sectionsChanged.toString().toUpperCase())
		console.log(chalk.magenta '	questions were updated: ' + questionsChanged.toString().toUpperCase())
		console.log('')