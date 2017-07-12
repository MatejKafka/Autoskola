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
	return store.find({
		$tag: db.STORE_TAGS.ANSWER
		questionId: questionId
		# TODO: make this work with multiple attempts
		# if this is changed, update template in storeConfig
		attemptNumber: 0
	})


module.exports = [
	{
		id: 0
		name: 'Neznámé otázky'
		filterFn: (questionId) ->
			if typeof questionId == 'object'
				questionId = questionId.id
			answers = getAnswers(questionId)
			return answers.length == 0
	}
	{
		id: 1
		name: 'Nesprávně zodpovězené otázky'
		filterFn: (questionId) ->
			if typeof questionId == 'object'
				questionId = questionId.id
			answers = getAnswers(questionId)
			if answers.length == 0
				return false
			ratio = getCorrectRatio(answers)
			return ratio < THRESHOLD
	}
	{
		id: 2
		name: 'Správně zodpovězené otázky'
		filterFn: (questionId) ->
			if typeof questionId == 'object'
				questionId = questionId.id
			answers = getAnswers(questionId)
			if answers.length == 0
				return false
			ratio = getCorrectRatio(answers)
			return ratio >= THRESHOLD
	}
]