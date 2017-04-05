arrayStore = require('./arrayStore')

STORE_NAME = 'answerHistory'


module.exports = class QuestionHistoryCollection
	constructor: ->
		@_items = arrayStore.load(STORE_NAME)
		@_positionCache = {}
		for item, i in @_items
			if !@_positionCache[item.questionId]?
				@_positionCache[item.questionId] = [i]
			else
				@_positionCache[item.questionId].push(i)


	add: (answerData) ->
		time = Date.now()
		record = Object.assign({}, answerData)
		record.time = time
		questionId = answerData.questionId

		index = @_items.push(record) - 1

		if !@_positionCache[questionId]?
			@_positionCache[questionId] = [index]
		else
			@_positionCache[questionId].push(index)

		arrayStore.appendNew(STORE_NAME, @_items)


	getAnswersByQuestionId: (questionId) ->
		if !@_positionCache[questionId]?
			return []
		else
			return @_positionCache[questionId].map((i) => @_items[i])