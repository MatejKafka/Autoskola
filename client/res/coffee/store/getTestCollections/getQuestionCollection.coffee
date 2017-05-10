serverApi = require('./serverApi')
getCollection = require('./getCollection')


module.exports = ->
	return getCollection('questions', serverApi.getQuestion)