action = require('./action')


module.exports = (rawSections) ->
	actionName = 'processing sections'
	action.logStart(actionName)
	sections = for section in rawSections
		Object.assign({}, section, {
			questions: section.questions.map((question) -> question.id)
		})
	action.logEnd(actionName)
	return sections
