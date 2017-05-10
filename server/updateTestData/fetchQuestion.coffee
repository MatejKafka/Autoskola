urls = require('./urls')
request = require('request')
jsdom = require('jsdom')
url = require('url')

module.exports = ({id, correctAnswers, value}) ->
	console.log 'fetching question ' + id
	return new Promise (resolve, reject) ->
		request.post urls.question, {form: {id: id}}, (err, response, body) ->
			if err?
				reject(err)
				return

			if response.statusCode != 200
				reject(new Error('Invalid status code returned while retrieving section: ' + response.statusCode))
				return

			jsdom.env body, (err, window) ->
				if err?
					reject(err)
					return

				questionText = window.document.getElementsByClassName('question-text')[0].innerHTML.trim()
				if questionText == ''
					questionText = window.document.getElementsByClassName('question-text')[1].innerHTML.trim()
					img = null
				else
					imgFrame = window.document.getElementsByClassName('image-frame')[0]
					if imgFrame.children.length == 1
						imgElem = imgFrame.children[0]
						if imgElem.src?
							img = {
								type: 'img'
								url: imgElem.src
							}
						else
							img = {
								type: 'flash'
								url: imgElem.data
							}
						img.url = url.resolve(urls.question, img.url)

					else if imgFrame.children.length == 3
						options = for imgWrapper, i in imgFrame.children
							imgUrl = imgWrapper.children[0].src
							imgUrl = url.resolve(urls.question, imgUrl)
							letter = String.fromCharCode(97 + i)
							{url: imgUrl, letter}
						img = {
							type: 'multiple'
							options: options
						}
					else
						throw new Error('Unknown image frame format (qId: ' + id + ')')



				answers = Array.from(window.document.getElementsByClassName('answer')).map (answerElem, i) ->
					answerId = parseInt(answerElem.getAttribute('data-answerid'))
					letter = String.fromCharCode(97 + i)
					answerText = answerElem.children[1].innerHTML.trim()
					isCorrectAnswer = correctAnswers.indexOf(answerId) > -1
					return {text: answerText, letter, correct: isCorrectAnswer}

				console.log('fetched question ' + id)
				resolve({
					id: id
					value: value
					question:
						text: questionText
						img: img
					answers: answers
				})