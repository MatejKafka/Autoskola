createReadOnlyCollection = require('./util/createReadOnlyCollection')


module.exports = ->
	sections = createReadOnlyCollection(db.STORE_TAGS.SECTION)
	sections.forEach (section) ->
		section.filterFn = (questionId) ->
			if typeof questionId == 'object'
				questionId = questionId.id
			return section.questions.indexOf(questionId) > -1
	return sections