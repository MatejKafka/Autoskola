oldLog = console.log

module.exports =
	block: ->
		console.log = ->
		return

	unblock: ->
		console.log = oldLog
		return