module.exports = (coverElem, msgElem) ->
	coverElem.style.display = 'none'
	visible = false

	return {
		show: (msgStr) ->
			if visible
				console.log(msgStr)
				throw new Error('Tried to open popup window without closing the previous one')
			msgElem.innerHTML = msgStr
			coverElem.style.display = ''
			visible = true
			return

		hide: ->
			coverElem.style.display = 'none'
			visible = false
			return
	}