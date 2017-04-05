module.exports = [
	{
		id: 0
		name: 'Neznámé otázky'
		filterFn: (question) ->
			answers = db.answers.getAnswersByQuestionId(question.id)
			return answers.length == 0
	}
	{
		id: 1
		name: 'Známé otázky'
		filterFn: (question) ->
			answers = db.answers.getAnswersByQuestionId(question.id)
			return answers.length > 0
	}
]