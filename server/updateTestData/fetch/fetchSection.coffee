urls = require('./../urls')
request = require('request')
SECTION_VALUES = require('./../SECTION_VALUES')
SKIPPED_SECTIONS = require('./../SKIPPED_SECTIONS')


module.exports = ({id, name}) ->
	if SKIPPED_SECTIONS.indexOf(id) >= 0
		console.info('skipping section based on block list: ' + id + ' (' + name + ')')
		return Promise.resolve(null)

	if !SECTION_VALUES[id]?
		console.warn('skipping section - it doesn\'t have any value assigned: ' + id + ' (' + name + ')')
		return Promise.resolve(null)

	return new Promise (resolve, reject) ->
		request.post urls.section, {form: {lectureID: id}, json: true}, (err, response, rawSection) ->
			if err?
				reject(err)
				return

			if response.statusCode != 200
				reject(new Error('Invalid status code returned while retrieving section: ' + response.statusCode))
				return

			questions = for rawQuestion in rawSection.Questions
				{id: rawQuestion.QuestionID, code: rawQuestion.Code}

			resolve({
				id, name,
				value: SECTION_VALUES[id]
				questions
			})