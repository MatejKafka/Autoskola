module.exports =
	dir: (qId) ->
		return "/#{qId}"

	structureJson: (qId) ->
		return "/#{qId}/structure.json"

	questionImg: (qId, extension) ->
		return "/#{qId}/question.#{extension}"

	answerImg: (qId, answerLetter, extension) ->
		return "/#{qId}/answers/#{answerLetter}.#{extension}"
