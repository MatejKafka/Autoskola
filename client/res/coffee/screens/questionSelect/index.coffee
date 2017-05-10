MESSAGES = require('../../MESSAGES').questionSelect
QuestionSelectList = require('./QuestionSelectList')
QuestionNumberDisplay = require('./QuestionNumberDisplay')
getQuestions = require('../../getQuestions')


module.exports = (container, goto, params) ->
	# clear cache so questionType selectors update for next browsing session
	getQuestions.clearCache()

	container.innerHTML = '
		<div id="questionSelection">
			<h1>Procházení otázek</h1>
			<form class="questionForm" onsubmit="return false;">
				<h2 class="sectionTitle">Oblasti:</h2>
				<ul class="checkboxList sectionList"></ul>

				<hr>

				<h2 class="sectionTitle">Typ otázek:</h2>
				<ul class="checkboxList questionTypeList"></ul>

				<hr>
				<div class="questionCounter">Počet vybraných otázek: <span class="selectedQuestionCount">0</span></div>

				<input class="actionButton startBrowsingButton" type="submit" value="ZAHÁJIT PROCVIČOVÁNÍ">
			</form>
		</div>'

	sectionListElem = container.getElementsByClassName('sectionList')[0]
	sectionList = new QuestionSelectList(sectionListElem, db.sections, 'sections', db.questions)

	questionTypeListElem = container.getElementsByClassName('questionTypeList')[0]
	questionTypeList = new QuestionSelectList(questionTypeListElem, db.questionTypes, 'questionTypes', sectionList)

	questionNumberDisplayElem = container.getElementsByClassName('selectedQuestionCount')[0]
	questionNumberDisplay = new QuestionNumberDisplay(questionNumberDisplayElem, questionTypeList)


	form = container.getElementsByClassName('questionForm')[0]
	submitButton = document.getElementsByClassName('startBrowsingButton')[0]

	disableSubmitButtonIfUnselected = ->
		if questionNumberDisplay.getFilteredQuestions().length == 0
			submitButton.classList.add('disabled')
			submitButton.title = MESSAGES.noSectionChecked
		else
			submitButton.classList.remove('disabled')
			submitButton.title = ''

	questionNumberDisplay.on('change', disableSubmitButtonIfUnselected)
	disableSubmitButtonIfUnselected()

	form.addEventListener 'submit', ->
		if questionNumberDisplay.getFilteredQuestions().length == 0
			alert(MESSAGES.noSectionChecked)
			return

		selectedSections = sectionList.getSelectedFilterIds()
		selectedQuestionTypes = questionTypeList.getSelectedFilterIds()

		if selectedSections.length == db.sections.length
			selectedSections = '*'
		if selectedQuestionTypes.length == db.questionTypes.length
			selectedQuestionTypes = '*'
		goto('browsing', {
			sections: selectedSections
			questionTypes: selectedQuestionTypes
		})