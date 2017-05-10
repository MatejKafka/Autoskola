generateTest = require('./generateTest')


module.exports = (container, goto) ->
	if db.currentTest?
		if db.currentTest.finished
			db.currentTest = null
		else
			goto('practiceTest', {q: db.currentTest.lastViewedIndex + 1})
			return

	container.innerHTML = '
		<h1>Cvičný test</h1>
		<form class="startForm" onsubmit="return false;">
			< show sucess chart in previous tests ><br>
			<br>
			<hr>
			<br>
			<input class="actionButton startTestButton" type="submit" value="ZAHÁJIT NOVÝ CVIČNÝ TEST">
		</form>
	'

	form = container.getElementsByClassName('startForm')[0]

	form.addEventListener 'submit', ->
		test = generateTest()
		db.currentTest = test
		goto('practiceTest')