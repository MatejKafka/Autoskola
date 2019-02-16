generateTest = require('./generateTest')
renderLineChart = require('../../../util/render/renderLineChart.js')


renderFinishedTestChart = (container, testResults) ->
	maxScore = Math.max.apply(Math, testResults.map (test) -> test.maxScore)
	testScores = testResults.map (test) -> test.score
	passScores = testResults.map (test) -> test.passScore

	container.innerHTML = ''
	container.appendChild(renderLineChart(maxScore, 8, [
		{cssClass: 'chart-testScores', values: testScores},
		{cssClass: 'chart-passScores', values: passScores}
	]))
	return


module.exports = (container, goto) ->
	currentTest = store.findOne(db.STORE_TAGS.CURRENT_TEST)

	if currentTest?
		if currentTest.finished
			if currentTest.lastViewedIndex?
				return goto('browseEvaluatedTest', {q: currentTest.lastViewedIndex + 1})
			else
				return goto('evaluateTest')
		else
			i = currentTest.lastViewedIndex
			if !i?
				i = 0
			return goto('practiceTest', {q: i + 1})

	container.innerHTML = '
		<h1>Cvičný test</h1>
		<div class="finishedTestLabel">Výsledky předchozích testů:</div>
		<div class="finishedTestChart"></div>
		<button class="actionButton startTestButton">ZAHÁJIT NOVÝ CVIČNÝ TEST</button>
	'

	testChartContainer = container.getElementsByClassName('finishedTestChart')[0]

	items = store.find(db.STORE_TAGS.PRACTICE_TEST)
	if items.length > 0
		renderFinishedTestChart(testChartContainer, items)
	else
		testChartLabel = container.getElementsByClassName('finishedTestLabel')[0]
		testChartLabel.style.display = 'none'
		testChartContainer.style.display = 'none'

	startButton = container.getElementsByClassName('startTestButton')[0]
	startButton.addEventListener 'click', ->
		test = generateTest()
		store.add(db.STORE_TAGS.CURRENT_TEST, test)
		goto('practiceTest')