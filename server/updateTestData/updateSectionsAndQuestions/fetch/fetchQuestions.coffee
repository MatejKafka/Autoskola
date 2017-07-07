urls = require('../../urls')
request = require('request')
jsdom = require('jsdom')
async = require('asyncawait').async
await = require('asyncawait').await
url = require('url')


parseChangeDate = (dateStr) ->
	[day, month, year] = dateStr.split('.').map((s) -> parseInt(s.trim()))
	return Math.floor((new Date(year, month - 1, day)).getTime() / 1000)

parseQuestionText = (textContainer) ->
	return {
		code: textContainer.children[0].innerHTML.slice(1, -1)
		lastChange: parseChangeDate(textContainer.children[1].innerHTML.slice(1, -1))
		text: textContainer.children[1].nextSibling.textContent.trim()
		img: null
	}


parseQuestionImg = (imgContainer) ->
	if !imgContainer?
		return null
	childElem = imgContainer.children[0]

	switch childElem.tagName.toLowerCase()
		when 'img'
			return {type: 'img', url: url.resolve(urls.hostname, childElem.src)}
		when 'embed'
			return {type: 'animation', url: url.resolve(urls.hostname, childElem.src)}
		else
			options = []
			# multiple
			for imgWrapper in childElem.getElementsByClassName('QuestionImage')
				options.push({
					url: url.resolve(urls.hostname, imgWrapper.children[0].src)
					letter: imgWrapper.nextElementSibling.textContent.trim().toLowerCase()
				})
			return {type: 'multiple', options: options}


parseAnswer = (answerElem) ->
	return {
		correct: answerElem.getAttribute('data-correct') == 'True'
		letter: answerElem.children[0].textContent.trim().toLowerCase()
		text: answerElem.children[1].textContent.trim()
		img: null
	}

parseQuestionAnswers = (answerContainer) ->
	answers = for answerElem in answerContainer.getElementsByClassName('Answer')
		parseAnswer(answerElem)
	return answers


parseQuestion = (questionElem) ->
	questionText = parseQuestionText(questionElem.getElementsByClassName('QuestionText')[0])
	questionImg = parseQuestionImg(questionElem.getElementsByClassName('QuestionImagePanel')[0])
	answers = parseQuestionAnswers(questionElem.getElementsByClassName('AnswersPanel')[0])

	if questionImg? && questionImg.type == 'multiple'
		for answer, i in answers
			img = questionImg.options[i]
			if answer.letter != img.letter
				throw new Error('Letters not matching in multiple image question: ' + questionText.code)
			answer.img = {type: 'img', url: img.url}
			answer.text = null
		questionImg = null

	return {
		code: questionText.code
		lastChange: questionText.lastChange
		question:
			text: questionText.text
			img: questionImg
		answers: answers
	}


parseQuestionListPart = (containerElem) ->
	questionElems = containerElem.getElementsByClassName('QuestionPanel')
	questions = for questionElem in questionElems
		parseQuestion(questionElem)
	return questions


parseQuestionPage = (body) ->
	return new Promise (resolve) ->
		jsdom.env body, (err, window) ->
			if err?
				throw err

			questions = parseQuestionListPart(window.document)
			resolve(questions)


loadQuestionPage = (pageIndex) ->
	return new Promise (resolve) ->
		pageNumber = pageIndex + 1

		request.post urls.questionPage, {form: {page: pageNumber, order: 0}}, (err, response, body) ->
			if err?
				throw err

			if response.statusCode != 200
				throw new Error('Invalid status code returned while retrieving question page: ' + response.statusCode)

			if body == ''
				resolve(null)
				return
			resolve(parseQuestionPage(body))


module.exports = async ->
	questions = []
	i = 0
	loop
		pageQuestions = await loadQuestionPage(i)
		console.info('loaded question page: ' + i)
		if pageQuestions?
			for question in pageQuestions
				questions.push(question)
			i++
		else
			break
	return questions