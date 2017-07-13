CONFIG = require('../../CONFIG')


getRandomQuestions = (sectionIds, count) ->
	questionIds = []
	for sectionId in sectionIds
		section = store.findOne({$tag: db.STORE_TAGS.SECTION, id: sectionId})
		if section?
			for questionId in section.questions
				questionIds.push(questionId)
		else
			throw new Error('Missing section: ' + sectionId)

	if questionIds.length < count
		throw new Error("Too few questions for sections: #{sectionIds.join(', ')}")

	selectedQuestions = []
	while selectedQuestions.length < count
		questionId = questionIds[Math.floor(Math.random() * questionIds.length)]
		if selectedQuestions.indexOf(questionId) < 0
			selectedQuestions.push(questionId)

	return selectedQuestions


getTestQuestionIds = ->
	questions = []
	for section in CONFIG.testComposition
		if typeof section[0] == 'number'
			sectionIds = [section[0]]
		else
			sectionIds = section[0]
		questions.push.apply(questions, getRandomQuestions(sectionIds, section[1]))

	return questions


module.exports = ->
	questionIds = getTestQuestionIds()

	return {
		startTime: Date.now()
		finished: false
		lastViewedIndex: null
		questionIds: questionIds
		answers: Array(25).fill(null)
		results: null
	}
