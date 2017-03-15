MESSAGES = require('../MESSAGES').questionSelect


createListItem = (id, name, listType) ->
	listElem = document.createElement('li')
	checkbox = document.createElement('input')
	checkbox.type = 'checkbox'
	checkbox.id = listType + '-' + id
	checkbox.name = id
	listElem.appendChild(checkbox)
	label = document.createElement('label')
	label.htmlFor = listType + '-' + id
	label.innerHTML = name
	listElem.appendChild(label)
	return listElem

createSelectAllItem = (containerList) ->
	setLabelText = ->
		selectAllElem.children[1].innerHTML = if checkbox.checked then MESSAGES.deselectAll else MESSAGES.selectAll

	selectAllElem = createListItem('selectAll', MESSAGES.selectAll, 'section')
	checkbox = selectAllElem.children[0]
	checkbox.addEventListener 'change', ->
		setLabelText()
		for listItem in containerList.children
			if listItem != selectAllElem
				listItem.children[0].checked = checkbox.checked

	containerList.addEventListener 'change', (e) ->
		if e.target == checkbox
			return
		for listItem in containerList.children
			if listItem == selectAllElem
				continue
			if !listItem.children[0].checked
				checkbox.checked = false
				setLabelText()
				return
		checkbox.checked = true
		setLabelText()
		return

	return selectAllElem


getSelectedIds = (list) ->
	selectedSections = []
	for item in list.children
		checkbox = item.children[0]
		id = parseInt(checkbox.name)
		if isNaN(id)
			continue
		if checkbox.checked
			selectedSections.push(id)
	return selectedSections


module.exports = (container, goto, params) ->
	container.innerHTML = '
		<div id="questionSelection">
			<h1>Procházení otázek</h1>
			<form class="questionForm" onsubmit="return false;">
				<h2 class="sectionTitle">Oblasti:</h2>
				<ul class="checkboxList sectionList"></ul>
				<!--
				<hr>
				<h2 class="sectionTitle">Typ otázek:</h2>
				<ul class="checkboxList questionTypeList"></ul>
				-->
				<input class="startBrowsingButton" type="submit" value="ZAHÁJIT PROCVIČOVÁNÍ">
			</form>
		</div>'

	sectionList = container.getElementsByClassName('sectionList')[0]
	#questionTypeList = container.getElementsByClassName('questionTypeList')[0]

	testData.sections.forEach (section) ->
		sectionList.appendChild(createListItem(section.id, section.name, 'section'))
	sectionList.appendChild(createSelectAllItem(sectionList))


	form = container.getElementsByClassName('questionForm')[0]
	submitButton = document.getElementsByClassName('startBrowsingButton')[0]

	disableSubmitButtonIfUnselected = ->
		if getSelectedIds(sectionList).length == 0
			submitButton.classList.add('disabled')
			submitButton.title = MESSAGES.noSectionChecked
		else
			submitButton.classList.remove('disabled')
			submitButton.title = ''

	disableSubmitButtonIfUnselected()
	form.addEventListener('change', disableSubmitButtonIfUnselected)

	form.addEventListener 'submit', ->
		selectedSections = getSelectedIds(sectionList)
		if selectedSections.length == 0
			alert(MESSAGES.noSectionChecked)
			return
		if selectedSections.length == sectionList.children.length - 1
			selectedSections = '*'
		goto('browsing', sections: selectedSections)