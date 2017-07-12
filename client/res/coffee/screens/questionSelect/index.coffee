MESSAGES = require('../../MESSAGES').questionSelect
QuestionSelectList = require('./QuestionSelectList')
QuestionNumberDisplay = require('./QuestionNumberDisplay')
getQuestionIds = require('./getQuestionIds')


module.exports = (container, goto, params) ->
	session = store.findOne(db.STORE_TAGS.CURRENT_BROWSING_SESSION)

	if session?
		if session.finished
			if session.lastViewedIndex?
				return goto('browseEvaluatedSession', {q: session.lastViewedIndex + 1})
			else
				return goto('evaluateSession')
		else
			i = session.lastViewedIndex
			if !i?
				i = 0
			return goto('browsing', {q: i + 1})

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

	questionIds = db.questions.map (q) -> q.id

	sectionListElem = container.getElementsByClassName('sectionList')[0]
	sectionList = new QuestionSelectList(sectionListElem, db.sections, 'sections', questionIds)

	questionTypeListElem = container.getElementsByClassName('questionTypeList')[0]
	questionTypeList = new QuestionSelectList(questionTypeListElem, db.questionTypes, 'questionTypes', sectionList)

	questionNumberDisplayElem = container.getElementsByClassName('selectedQuestionCount')[0]
	questionNumberDisplay = new QuestionNumberDisplay(questionNumberDisplayElem, questionTypeList)


	form = container.getElementsByClassName('questionForm')[0]
	submitButton = document.getElementsByClassName('startBrowsingButton')[0]

	disableSubmitButtonIfUnselected = ->
		if questionNumberDisplay.getFilteredQuestionIds().length == 0
			submitButton.classList.add('disabled')
			submitButton.title = MESSAGES.noSectionChecked
		else
			submitButton.classList.remove('disabled')
			submitButton.title = ''

	questionNumberDisplay.on('change', disableSubmitButtonIfUnselected)
	disableSubmitButtonIfUnselected()

	form.addEventListener 'submit', ->
		questionIds = questionNumberDisplay.getFilteredQuestionIds()
		if questionIds.length == 0
			alert(MESSAGES.noSectionChecked)
			return

		selectedSections = sectionList.getSelectedFilterIds()
		selectedQuestionTypes = questionTypeList.getSelectedFilterIds()

		# TODO: change order of composition in QuestionSelectList and remove this
		questionIds = getQuestionIds(selectedSections, selectedQuestionTypes)

		store.add(db.STORE_TAGS.CURRENT_BROWSING_SESSION, {
			lastViewedIndex: null
			startTime: Date.now()
			sections: selectedSections
			questionTypes: selectedQuestionTypes
			questionIds: questionIds
			finished: false
			answers: Array(questionIds.length).fill(null)
		})

		goto('browsing')