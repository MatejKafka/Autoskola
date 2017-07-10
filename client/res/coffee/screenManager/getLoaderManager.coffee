module.exports = (coverElem) ->
	timeoutId = null

	return out = {
		show: (timeout) ->
			if timeout
				if timeoutId?
					clearTimeout(timeoutId)
				timeoutId = setTimeout((-> out.show()), timeout)
			else
				timeoutId = null
				coverElem.style.display = ''
			return

		hide: ->
			if timeoutId?
				clearTimeout(timeoutId)
				timeoutId = null
			coverElem.style.display = 'none'

	}