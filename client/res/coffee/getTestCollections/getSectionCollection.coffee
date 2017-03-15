serverApi = require('./serverApi')
getCollection = require('./getCollection')


module.exports = ->
	return getCollection('sections', serverApi.getSection)