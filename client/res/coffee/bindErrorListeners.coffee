MESSAGES = require('./config/MESSAGES')
CONFIG = require('./config/CONFIG')


module.exports = ->
	window.handleError = handleUncaughtError = (err) ->
		message = MESSAGES.error.errorPopup.baseMessage
		if CONFIG.verboseErrorMessages
			message += '\n\n\n' + MESSAGES.error.errorPopup.errorMessageBelow + '\n\n'
			if err instanceof Error
				if navigator.userAgent.toLowerCase().indexOf('firefox') >= 0
					# firefox does not include error message in err.stack
					message += err.constructor.name + ': ' + err.message + '\n'
				if err.stack?
					message += err.stack
			else
				message += err

		console.error(err)
		alert(message)

		return false


	onErrorHandler = (msg, url, line, column, err) ->
		if !err?
			err = msg.message
		return handleUncaughtError(err)


	onUnhandledPromiseHandler = (event) ->
		return handleUncaughtError(event.reason)


	window.addEventListener('error', onErrorHandler)
	window.onerror = onErrorHandler

	window.addEventListener('unhandledrejection', onUnhandledPromiseHandler)
	window.onunhandledrejection = onUnhandledPromiseHandler