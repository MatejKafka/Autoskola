TAGS = require('./STORE_TAGS')
validateObjStructure = require('./util/validateObjStructure')


module.exports =
	cache: [
		{
			$tag: TAGS.QUESTION
			id: null
		}
		{
			$tag: TAGS.SECTION
			id: null
		}
		{
			$tag: TAGS.ANSWER
			questionId: null
			attemptNumber: 0
		}
	]

	validators: [
		{
			tag: TAGS.ANSWER
			validate: (answer) ->
				validateObjStructure(answer, {
					mode: 'string'
					time: 'number'
					correctlyAnswered: 'boolean|null'
					selectedAnswerIndex: 'number|null'
					questionId: 'number'
					sections: 'array|null|undefined'
					questionTypes: 'array|null|undefined'
					testId: 'number|null|undefined'
					questionIndex: 'number'
					attemptNumber: 'number'
				})
		}
		{
			tag: TAGS.PRACTICE_TEST
			validate: (test) ->
				validateObjStructure(test, {
					startTime: 'number'
					endTime: 'number'
					passed: 'boolean'
					passScore: 'number'
					score: 'number'
					maxScore: 'number'
				})
		}
		{
			tag: TAGS.CURRENT_TEST
			validate: (test) ->
				validateObjStructure(test, {
					startTime: 'number'
					finished: 'boolean'
					lastViewedIndex: 'number|null'
					questionIds: 'array'
					answers: 'array'
					results: 'object|null'
				})
		}
		{
			tag: TAGS.CURRENT_BROWSING_SESSION
			validate: (session) ->
				validateObjStructure(session, {
					startTime: 'number'
					lastViewedIndex: 'number|null'
					sections: 'array'
					questionTypes: 'array'
					questionIds: 'array'
					finished: 'boolean'
					answers: 'array'
				})
		}
	]

	decorators: [
		tag: TAGS.SECTION
		decorate: (sectionItem) ->
			sectionItem.filterFn = (questionId) ->
				if typeof questionId == 'object'
					questionId = questionId.id
				return sectionItem.questions.indexOf(questionId) > -1
			return sectionItem

		undecorate: (sectionItem) ->
			delete sectionItem.filterFn
			return sectionItem
	]