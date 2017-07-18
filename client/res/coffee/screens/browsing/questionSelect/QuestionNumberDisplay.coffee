EventEmitter = require('events')
QuestionSelectList = require('./QuestionSelectList')


module.exports = class QuestionNumberDisplay extends EventEmitter
	constructor: (container, questionSource) ->
		@_source = questionSource
		@_container = container

		if questionSource instanceof QuestionSelectList
			@_questionIds = questionSource.getFilteredQuestionIds()
			questionSource.on 'change', =>
				@_questionIds = questionSource.getFilteredQuestionIds()
				@_render()
				@emit('change')
				return
		else
			@_questionIds = questionSource

		@_render()


	_render: ->
		@_container.innerHTML = @_questionIds.length


	getFilteredQuestionIds: ->
		for questionId in @_questionIds
			questionId