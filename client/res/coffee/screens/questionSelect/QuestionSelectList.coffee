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
	constructor: (containerList, filterArr, listName, questionSource) ->
		@_containerList = containerList
		@_filters = filterArr
		@_listName = listName
		@_source = questionSource

		if questionSource instanceof QuestionSelectList
			@_questions = questionSource.getFilteredQuestions()
			questionSource.on 'change', =>
				@_questions = questionSource.getFilteredQuestions()
				@_updateHtml()
				@emit('change')
				return
		else
			@_questions = questionSource

		@_render()


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
			length = 0
			if idStr == SELECT_ALL_ID
				questionCountElem.innerHTML = @_questions.length
				length = @_questions.length
			else if !idStr? || isNaN(index)
				continue
			else
				length = @_questions.filter(@_filters[index].filterFn).length
				questionCountElem.innerHTML = length
			if length == 0
				item.classList.add('emptyFilter')
			else
				item.classList.remove('emptyFilter')
		return


	getFilteredQuestions: ->
		questionOut = []
		for item in @_containerList.children
			index = parseInt(item.dataset.index)
			if !item.children[0].checked || isNaN(index)
				continue
			filter = @_filters[index]
			for question in @_questions
				if filter.filterFn(question)
					questionOut.push(question)
		return questionOut


	getSelectedFilterIds: ->
		ids = []
		for item in @_containerList.children
			id = parseInt(item.dataset.filterId)
			if !item.children[0].checked || isNaN(id)
				continue
			ids.push(id)
		return ids