THRESHOLD = 0.7
EXPONENT = 1.1


getCorrectRatio = (answers) ->
	# assumes answers are sorted from oldest
	correct = 0
	total = 0
	for answer, i in answers
		value = Math.pow(i + 1, EXPONENT)
		total += value
		if answer.correctlyAnswered
			correct += value
	return correct / total


getAnswers = (questionId) ->
	db.store.answers.getAnswersByQuestionId(questionId).filter (a) ->
		# TODO: work with later attempts
		return a.attemptNumber == 0


module.exports = [
	{
		id: 0
		name: 'Neznámé otázky'
		filterFn: (question) ->
			answers = getAnswers(question.id)
			return answers.length == 0
	}
	{
		id: 1
		name: 'Nesprávně zodpovězené otázky'
		filterFn: (question) ->
			answers = getAnswers(question.id)
			if answers.length == 0
				return false
			ratio = getCorrectRatio(answers)
			return ratio < THRESHOLD
	}
	{
		id: 2
		name: 'Správně zodpovězené otázky'
		filterFn: (question) ->
			answers = getAnswers(question.id)
			if answers.length == 0
				return false
			ratio = getCorrectRatio(answers)
			return ratio >= THRESHOLD
	}
]