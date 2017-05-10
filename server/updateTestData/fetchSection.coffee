urls = require('./urls')
request = require('request')


QUESTION_VALUES =
	24: 2 # all 3 - pravidla provozu
	16: 2
	25: 2
	14: 1 # dopravni znacky
	17: 4 # dopravni situace
	19: 2 # bezpecna jizda
	21: 2 # souvisejici predpisy
	22: 1 # podminky provozu
	20: 1 # zdravotnicka priprava


module.exports = ({id, name}) ->
	return new Promise (resolve, reject) ->
		request.post urls.section, {form: {lectureID: id}, json: true}, (err, response, rawSection) ->
			if err?
				reject(err)
				return

			if response.statusCode != 200
				reject(new Error('Invalid status code returned while retrieving section: ' + response.statusCode))
				return

			questions = for rawQuestion in rawSection.Questions
				{id: rawQuestion.QuestionID, correctAnswers: rawQuestion.CorrectAnswers, value: QUESTION_VALUES[id] || 0}
			resolve({
				id, name,
				questions
			})