getSectionCollection = require('./getSectionCollection')
getQuestionCollection = require('./getQuestionCollection')

module.exports = ->
	Promise.all([getQuestionCollection(), getSectionCollection()])
	.then ([questionCollection, sectionCollection]) ->
		return {
			sections: sectionCollection
			questions: questionCollection
		}