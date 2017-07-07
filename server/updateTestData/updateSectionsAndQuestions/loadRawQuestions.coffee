action = require('./action')
fetchQuestions = require('./fetch/fetchQuestions')


module.exports = ->
	actionName = 'loading questions'

	action.logStart(actionName)
	fetchQuestions()
	.catch (err) ->
		action.throwError(err, actionName)
	.then (questions) ->
		action.logEnd(actionName)
		return questions
