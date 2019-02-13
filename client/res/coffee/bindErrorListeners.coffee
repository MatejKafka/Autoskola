MESSAGES = require('./config/MESSAGES')
CONFIG = require('./config/CONFIG')


module.exports = ->
	handleUncaughtError = (err) ->
		message = MESSAGES.error.errorPopup.baseMessage
		if CONFIG.verboseErrorMessages
			message += '\n\n\n' + MESSAGES.error.errorPopup.errorMessageBelow + '\n\n'
			if err instanceof Error
				if err.stack?
					message += err.stack
				else
					message += err.message
			else
				message += err
		alert(message)

		return false


	window.addEventListener 'error', (msg, url, line, column, err) ->
		if !err?
			err = msg.message
		return handleUncaughtError(err)

	window.addEventListener 'unhandledrejection', (event) ->
		return handleUncaughtError(event.reason)