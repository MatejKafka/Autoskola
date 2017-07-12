getSectionQuestionIds = (sectionIds) ->
	sections = store.find(db.STORE_TAGS.SECTION)
	questions = []
	questionsBySection = []
	sections.forEach (section) ->
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


getQuestionIds = (sectionIds, questionTypeIds) ->
	questionIds = getSectionQuestionIds(sectionIds)
	if !questionTypeIds?
		return questionIds
	out = []
	for filter in db.questionTypes
		if questionTypeIds.indexOf(filter.id) > -1
			filteredQuestions = questionIds.filter(filter.filterFn)
			for questionId in filteredQuestions
				out.push(questionId)
	return out


cache = {}
module.exports = (sectionIds, questionTypeIds) ->
	sectionHash = if sectionIds? then sectionIds.join(',') else 'all'
	typeHash = if questionTypeIds? then questionTypeIds.join(',') else 'all'
	hash = sectionHash + '&' + typeHash

	if cache[hash]?
		return cache[hash]
	result = getQuestionIds(sectionIds, questionTypeIds)
	cache[hash] = result
	return result

module.exports.clearCache = ->
	cache = {}