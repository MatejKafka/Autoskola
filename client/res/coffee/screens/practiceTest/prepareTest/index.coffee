generateTest = require('./generateTest')
Highcharts = require('highcharts')


getChartConfig = (maxScore, testScores, passScores) ->
	return {
		chart:
			spacing: [5, 5, 5, 5]
		title: null
		subtitle: null
		xAxis:
			minPadding: 0.05
			softMax: 8
			visible: false
		yAxis:
			min: 0
			max: maxScore
			title: null
			tickPositions: [
				0
				maxScore / 5
				maxScore * 2 / 5
				maxScore * 3 / 5
				maxScore * 4 / 5
				maxScore
			]
		legend:
			enabled: false
		tooltip:
			enabled: false
		credits:
			enabled: false
		plotOptions:
			line:
				animation:
					duration: 800
				enableMouseTracking: false
				marker:
					enabled: testScores.length < 2
		series: [
			{
				data: testScores
			}
			{
				data: passScores
				lineWidth: 1
				dashStyle: 'LongDash'
			}
		]
	}


renderFinishedTestChart = (container, testResults) ->
	maxScore = Math.max.apply(Math, testResults.map (test) -> test.maxScore)
	testScores = testResults.map (test) -> test.score
	passScores = testResults.map (test) -> test.passScore
	Highcharts.chart(container, getChartConfig(maxScore, testScores, passScores))
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