EventEmitter = require('events')
QuestionSelectList = require('./QuestionSelectList')


module.exports = class QuestionNumberDisplay extends EventEmitter
	constructor: (container, questionSource) ->
		@_source = questionSource
		@_container = container

		if questionSource instanceof QuestionSelectList
			@_questions = questionSource.getFilteredQuestions()
			questionSource.on 'change', =>
				@_questions = questionSource.getFilteredQuestions()
				@_render()
				@emit('change')
				return
		else
			@_questions = questionSource

		@_render()


	_render: ->
		@_container.innerHTML = @_questions.length


	getFilteredQuestions: ->
		for question in @_questions
			question