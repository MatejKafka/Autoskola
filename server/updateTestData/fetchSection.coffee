urls = require('./urls')
request = require('request')


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
				{id: rawQuestion.QuestionID, correctAnswers: rawQuestion.CorrectAnswers}
			resolve({
				id, name,
				questions
			})