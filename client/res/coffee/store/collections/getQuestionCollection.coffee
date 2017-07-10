createReadOnlyCollection = require('./util/createReadOnlyCollection')


module.exports = ->
	return createReadOnlyCollection(db.STORE_TAGS.QUESTION)