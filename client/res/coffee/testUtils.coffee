window.util =
	getIncorrectQuestionIdList: (timestampFrom = 0) ->
		incorrectlyAnswered = answers._items.filter (answer) ->
			return (answer.time > timestampFrom) && !answer.correctlyAnswered

		return incorrectlyAnswered.map (answer) ->
			return answer.questionId


	clearLocalStorage: ->
		localStorage.clear()
		return

	getLocalStorageObj: ->
		return Object.assign({}, localStorage)

	setLocalStorage: (obj) ->
		for own key, value of obj
			localStorage[key] = value
		return obj