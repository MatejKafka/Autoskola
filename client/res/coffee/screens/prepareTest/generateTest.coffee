CONFIG = require('../../CONFIG')


getRandomQuestions = (sections, count) ->
	questionIds = []
	for section in db.store.sections
		if sections.indexOf(section.id) > -1
			for questionId in section.questions
				questionIds.push(questionId)

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
			sections = [section[0]]
		else
			sections = section[0]
		questions.push.apply(questions, getRandomQuestions(sections, section[1]))

	return questions


module.exports = ->
	questionIds = getTestQuestionIds()
	questions = questionIds.map(db.store.questions.get.bind(db.store.questions))

	return {
		#timer: timer
		startTime: Date.now()
		finished: false
		lastViewedIndex: 0
		questions: questions
		answers: Array(25).fill(null)
		results: null
	}
