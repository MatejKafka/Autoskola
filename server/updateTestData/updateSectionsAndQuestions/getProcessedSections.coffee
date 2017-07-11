action = require('./action')


module.exports = (rawQuestions, rawSections) ->
	actionName = 'processing sections'
	action.logStart(actionName)

	questionMap = {}
	for q in rawQuestions
		questionMap[q.code] = q

	sections = for section in rawSections
		Object.assign({}, section, {
			questions: section.questions.filter((q) -> questionMap[q.code]?).map((question) -> question.id)
		})

	action.logEnd(actionName)
	return sections
