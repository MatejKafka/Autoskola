generateTest = require('./generateTest')
Highcharts = require('highcharts')


getChartConfig = (maxScore, testScores, passScores) ->
	return {
		chart:
			spacing: [5, 5, 5, 5]
		title: null
		subtitle: null
		xAxis:
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
				enableMouseTracking: false
				marker:
					enabled: false
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
	return Highcharts.chart(container, getChartConfig(maxScore, testScores, passScores))



module.exports = (container, goto) ->
	if db.currentTest?
		if db.currentTest.finished
			db.currentTest = null
		else
			goto('practiceTest', {q: db.currentTest.lastViewedIndex + 1})
			return

	container.innerHTML = '
		<h1>Cvičný test</h1>
		Výsledky předchozích testů:
		<div class="finishedTestChart"></div>
		<button class="actionButton startTestButton">ZAHÁJIT NOVÝ CVIČNÝ TEST</button>
	'

	testChartContainer = container.getElementsByClassName('finishedTestChart')[0]
	renderFinishedTestChart(testChartContainer, db.finishedTests)

	startButton = container.getElementsByClassName('startTestButton')[0]
	startButton.addEventListener 'click', ->
		test = generateTest()
		db.currentTest = test
		goto('practiceTest')