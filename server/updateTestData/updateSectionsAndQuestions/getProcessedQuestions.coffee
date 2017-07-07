chalk = require('chalk')
action = require('./action')


module.exports = (rawQuestions, rawSections) ->
	actionName = 'processing questions'
	action.logStart(actionName)

	questionMap = {}
	for q in rawQuestions
		questionMap[q.code] = q

	questions = []
	for section in rawSections
		for {id, code} in section.questions
			question = questionMap[code]
			if !question?
				console.warn(chalk.cyan.bold('missing question: #' + id + ' (code: "' + code + '")'))
				continue
			questions.push Object.assign({}, {id: id, value: section.value}, question)

	action.logEnd(actionName)
	return questions