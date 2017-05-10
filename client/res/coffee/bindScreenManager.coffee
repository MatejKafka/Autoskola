screenHash = require('./screenHash')


gotoPage = (pageName, params) ->
	window.location.hash = screenHash.generate(pageName, params)
	return


updateView = (container, screens, newHash) ->
	{page, params} = screenHash.parse(newHash)

	if !screens[page]?
		return null

	window.scrollTo(0, 0)
	container.innerHTML = ''
	screens[page](container, gotoPage, params)
	return true


getHash = ->
	return window.location.hash.slice(1)


module.exports = (container, screens, defaultScreen) ->
	window.onhashchange = ->
		if getHash() != ''
			result = updateView(container, screens, getHash())
		else
			result = updateView(container, screens, defaultScreen)
		if !result?
			throw new Error('Tried to go to invalid screen: ' + getHash())

	if getHash() != ''
		if updateView(container, screens, getHash())
			return

	updateView(container, screens, defaultScreen)
	return