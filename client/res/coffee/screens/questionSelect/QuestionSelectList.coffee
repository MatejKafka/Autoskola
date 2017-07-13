SELECT_ALL_ID = 'selectAll'


EventEmitter = require('events')
MESSAGES = require('../../MESSAGES').questionSelect

getListItemHtml = (filter, i, listName) ->
	return "<li data-filter-id='#{filter.id}' #{if i? then "data-index='#{i}'" else ''}>" +
			"<input type='checkbox' checked id='#{listName + '-' + filter.id}'>" +
			"<label for='#{listName + '-' + filter.id}'>" +
				"<span class='filterName'>#{filter.name}</span> " +
				"<span class='questionCountWrapper'>[<span class='questionCount'></span>]</span>" +
			"</label>" +
		"</li>"



module.exports = class QuestionSelectList extends EventEmitter
	# filterArr: array of filters - each must have id, name, filterFn
	# source: either static array or another instance of QuestionSelectList
	# shuffleOutput - if true, `getFilteredQuestionIds` method shuffles the questions - one from each section, then again,... until it uses up all questions
	constructor: (containerList, filterArr, listName, questionIdSource, shuffleOutput) ->
		@_containerList = containerList
		@_filters = filterArr
		@_listName = listName
		@_source = questionIdSource
		@_shuffleOutput = shuffleOutput

		if questionIdSource instanceof QuestionSelectList
			@_questionIds = questionIdSource.getFilteredQuestionIds()
			questionIdSource.on 'change', =>
				@_questionIds = questionIdSource.getFilteredQuestionIds()
				@_updateCurrentQuestionIdsByFilter()
				@_updateHtml()
				@emit('change')
				return
		else
			@_questionIds = questionIdSource

		# relies on all filters in previous QuestionSelectList instances being selected
		@_questionIdsByFilter = []
		for filter, i in @_filters
			matchingQuestionIds = []
			for questionId in @_questionIds
				if filter.filterFn(questionId)
					matchingQuestionIds.push(questionId)
			@_questionIdsByFilter[i] = matchingQuestionIds
		@_currentQuestionIdsByFilter = @_questionIdsByFilter

		@_render()


	_updateCurrentQuestionIdsByFilter: ->
		@_currentQuestionIdsByFilter = []
		for filterQuestionIds, i in @_questionIdsByFilter
			currentFilterQuestionIds = []
			for qId in @_questionIds
				if filterQuestionIds.indexOf(qId) >= 0
					currentFilterQuestionIds.push(qId)
			@_currentQuestionIdsByFilter[i] = currentFilterQuestionIds
		return


	_render: ->
		@_containerList.innerHTML = ''
		newHtml = ''
		for filter, i in @_filters
			newHtml += getListItemHtml(filter, i, @_listName)

		selectAllFilter = {id: SELECT_ALL_ID, name: MESSAGES.deselectAll}
		newHtml += getListItemHtml(selectAllFilter, null, @_listName)

		@_containerList.innerHTML = newHtml

		@_updateHtml()
		@_bindSelectAllButton(@_containerList.children[@_containerList.children.length - 1])
		return


	_bindSelectAllButton: (selectAllListItem) ->
		selectAllCheckbox = selectAllListItem.children[0]
		selectAllNameElem = selectAllListItem.getElementsByClassName('filterName')[0]

		setLabelText = ->
			if selectAllCheckbox.checked
				selectAllNameElem.innerHTML = MESSAGES.deselectAll
			else
				selectAllNameElem.innerHTML = MESSAGES.selectAll

		selectAllCheckbox.addEventListener 'change', =>
			isChecked = selectAllCheckbox.checked
			for item in @_containerList.children
				item.children[0].checked = isChecked
			setLabelText()
			@emit('change')
			return

		@_containerList.addEventListener 'change', (e) =>
			if e.target == selectAllCheckbox
				return
			shouldCheck = true
			for item in @_containerList.children
				if item == selectAllListItem
					continue
				if !item.children[0].checked
					shouldCheck = false
					break
			selectAllCheckbox.checked = shouldCheck
			setLabelText()
			@emit('change')
			return


	_updateHtml: ->
		for item in @_containerList.children
			questionCountElem = item.getElementsByClassName('questionCount')[0]
			idStr = item.dataset.filterId
			index = parseInt(item.dataset.index)
			if idStr == SELECT_ALL_ID
				questionCountElem.innerHTML = @_questionIds.length
				count = @_questionIds.length
			else if !idStr? || isNaN(index)
				continue
			else
				count = @_currentQuestionIdsByFilter[index].length
				questionCountElem.innerHTML = count
			if count == 0
				item.classList.add('emptyFilter')
			else
				item.classList.remove('emptyFilter')
		return


	_getSelectedFilterIndexes: ->
		selectedFilterIndexes = []
		for item in @_containerList.children
			index = parseInt(item.dataset.index)
			if !item.children[0].checked || isNaN(index)
				continue
			selectedFilterIndexes.push(index)
		return selectedFilterIndexes


	getFilteredQuestionIds: ->
		selectedFilterIndexes = @_getSelectedFilterIndexes()
		questionIdOut = []
		if @_shuffleOutput
			i = 0
			loop
				copiedCount = 0
				for index in selectedFilterIndexes
					if @_currentQuestionIdsByFilter[index][i]?
						questionIdOut.push(@_currentQuestionIdsByFilter[index][i])
						copiedCount++
				i++
				if copiedCount == 0
					break
		else
			for index in selectedFilterIndexes
				for qId in @_currentQuestionIdsByFilter[index]
					questionIdOut.push(qId)
		return questionIdOut


	getSelectedFilterIds: ->
		return @_getSelectedFilterIndexes().map (i) => return @_filters[i].id