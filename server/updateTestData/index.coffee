config = require('../config')
path = require('path')
fs = require('fs')
fetchSectionList = require('./fetchSectionList')
fetchSection = require('./fetchSection')
fetchQuestion = require('./fetchQuestion')


delayPromise = (fn, delay) ->
	return new Promise (resolve) ->
		setTimeout(->
			resolve(fn())
		, delay)


dataStoreDir = config.dataStoreDirPath

sectionFilePath = path.resolve(dataStoreDir, 'sections.json')
questionFilePath = path.resolve(dataStoreDir, 'questions.json')


fetchSectionList()
.catch (err) ->
	console.error('ERROR OCCURRED WHILE LOADING SECTION LIST')
	console.error(err.stack)
	process.exit(1)

.then (sectionList) ->
	sectionPromises = for section in sectionList
		fetchSection(section)
	return Promise.all(sectionPromises)

.catch (err) ->
	console.error('ERROR OCCURRED WHILE LOADING SECTIONS')
	console.error(err.stack)
	process.exit(1)

.then (sections) ->
	questionIds = {}
	questions = []
	for section in sections
		sectionQuestionIds = []
		for question, i in section.questions
			if !questionIds[question.id]?
				questionIds[question.id] = true
				questions.push(question)
			sectionQuestionIds.push(question.id)
		section.questions = sectionQuestionIds

	fs.writeFileSync(sectionFilePath, JSON.stringify(sections))
	console.log('SAVED UPDATED SECTIONS')

	questionPromises = for question, i in questions
		do (question, i) ->
			# delay between request to avoid overloading server
			delayPromise((-> fetchQuestion(question)), 25 * i)

	return Promise.all(questionPromises)

.catch (err) ->
	console.error('ERROR OCCURRED WHILE LOADING QUESTIONS')
	console.error(err.stack)
	process.exit(1)

.then (questions) ->
	fs.writeFileSync(questionFilePath, JSON.stringify(questions))
	console.log('SAVED UPDATED QUESTIONS')
	console.log('UPDATE FINISHED')