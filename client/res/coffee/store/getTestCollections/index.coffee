getSectionCollection = require('./getSectionCollection')
getQuestionCollection = require('./getQuestionCollection')

# TODO: rewrite, use since parameter (check after every load, server will send null if nothing changed)
module.exports = ->
	Promise.all([getQuestionCollection(), getSectionCollection()])
	.then ([questionCollection, sectionCollection]) ->
		return {
			sections: sectionCollection
			questions: questionCollection
		}