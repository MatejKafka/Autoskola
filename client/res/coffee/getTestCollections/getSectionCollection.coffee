serverApi = require('./serverApi')
getCollection = require('./getCollection')


module.exports = ->
	return getCollection('sections', serverApi.getSection)
	.then (sections) ->
		sections.forEach (section) ->
			section.filterFn = (question) ->
				return section.questions.indexOf(question.id) > -1
		return sections