getQuestionIds = (sectionIds) ->
	questions = []
	questionsBySection = []
	testData.sections.forEach (section) ->
		if !sectionIds? || sectionIds.indexOf(section.id) > -1
			sectionQuestions = []
			questionsBySection.push(sectionQuestions)
			for questionId in section.questions
				if questions.indexOf(questionId) < 0
					questions.push(questionId)
					sectionQuestions.push(questionId)

	out = []
	i = 0
	assignedThisRound = null
	while assignedThisRound != 0
		assignedThisRound = 0
		for questions in questionsBySection
			if questions[i]?
				out.push(questions[i])
				assignedThisRound++
		i++

	return out


cache = {}
module.exports = (sectionIds) ->
	if sectionIds?
		hash = sectionIds.join(',')
	else
		hash = 'all'
	if cache[hash]?
		return cache[hash]
	result = getQuestionIds(sectionIds)
	cache[hash] = result
	return result