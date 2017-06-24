config = require('../config')
path = require('path')
fs = require('fs')
chalk = require('chalk')
fetchSectionList = require('./fetch/fetchSectionList')
fetchSection = require('./fetch/fetchSection')
fetchQuestions = require('./fetch/fetchQuestions')


dataStoreDir = config.dataStoreDirPath

sectionFilePath = path.resolve(dataStoreDir, 'sections.test.json')
remoteImgQuestionFilePath = path.resolve(dataStoreDir, 'remoteImgQuestions.test.json')
localImgQuestionFilePath = path.resolve(dataStoreDir, 'localImgQuestions.test.json')



logActionStart = (description) ->
	console.info(chalk.green('\n' + description.toUpperCase()))

logActionEnd = (description) ->
	console.info(chalk.green('FINISHED ' + description.toUpperCase()))

throwErr = (err, descriptionOfAction) ->
	console.error('\n')
	console.error(chalk.red.bold('ERROR OCCURRED WHILE ' + descriptionOfAction.toUpperCase()))
	console.error(chalk.red.bold(err.stack))
	process.exit(1)


loadRawSections = ->
	actionName = 'loading section list'
	actionName2 = 'loading sections'

	logActionStart(actionName)
	fetchSectionList()
	.catch (err) ->
		throwErr(err, actionName)
	.then (sectionList) ->
		logActionEnd(actionName)
		return sectionList

	.then (sectionList) ->
		logActionStart(actionName2)
		sectionPromises = for section in sectionList
			fetchSection(section)
			.then (section) ->
				if section?
					console.info('loaded section: ' + section.id + ' (' + section.name + ')')
				return section
		return Promise.all(sectionPromises)

	.then (sections) ->
		sections = sections.filter((section) -> section?)
		logActionEnd(actionName2)
		return sections
	.catch (err) ->
		throwErr(err, actionName2)


loadRawQuestions = ->
	actionName = 'loading questions'

	logActionStart(actionName)
	fetchQuestions()
	.catch (err) ->
		throwErr(err, actionName)
	.then (questions) ->
		logActionEnd(actionName)
		return questions



getProcessedSections = (rawSections) ->
	actionName = 'processing sections'
	logActionStart(actionName)
	sections = for section in rawSections
		Object.assign({}, section, {
			questions: section.questions.map((question) -> question.id)
		})
	logActionEnd(actionName)
	return sections


getProcessedQuestions = (rawQuestions, rawSections) ->
	actionName = 'processing questions'
	logActionStart(actionName)

	questionMap = {}
	for q in rawQuestions
		questionMap[q.code] = q

	questions = []
	for section in rawSections
		for {id, code} in section.questions
			question = questionMap[code]
			if !question?
				console.warn(chalk.cyan.bold('missing question: ' + id + ' (' + code + ')'))
				continue
			questions.push Object.assign({}, question, {id: id, value: section.value})

	logActionEnd(actionName)
	return questions



saveFile = (path, data, dataType) ->
	actionName = 'saving ' + dataType
	logActionStart(actionName)

	newJson = JSON.stringify(data)
	try
		originalJson = fs.readFileSync(path, {encoding: 'utf8'})
	catch err
		originalJson = null

	if newJson == originalJson
		console.info('no changes in ' + dataType)
		changed = false
	else
		fs.writeFileSync(path, newJson)
		fs.writeFileSync(path + '.lastChange', Date.now().toString())
		if originalJson?
			fs.writeFileSync(path + '.old', originalJson)
		console.info('updated ' + dataType)
		changed = true

	logActionEnd(actionName)
	return changed


# TODO: add image download & replacement

loadRawSections()
.then (rawSections) ->
	return Promise.all([rawSections, loadRawQuestions()])
.then ([rawSections, rawQuestions]) ->
	sections = getProcessedSections(rawSections)
	questions = getProcessedQuestions(rawQuestions, rawSections)

	sectionsChanged = saveFile(sectionFilePath, sections, 'sections')
	questionsChanged = saveFile(remoteImgQuestionFilePath, questions, 'questions')

	console.log('')
	console.log(chalk.magenta 'UPDATE FINISHED:')
	console.log(chalk.magenta '	sections were updated: ' + sectionsChanged.toString().toUpperCase())
	console.log(chalk.magenta '	questions were updated: ' + questionsChanged.toString().toUpperCase())