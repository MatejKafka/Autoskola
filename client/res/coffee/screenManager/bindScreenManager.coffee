screenHash = require('./screenHash')


gotoPage = (pageName, params) ->
	window.location.hash = screenHash.generate(pageName, params)
	return


updateView = (container, screens, newHash, initialClasses) ->
	{page, params} = screenHash.parse(newHash)

	if !screens[page]?
		return null

	window.scrollTo(0, 0)
	container.innerHTML = ''
	container.className = initialClasses
	container.classList.add(page)
	screens[page](container, gotoPage, params)
	return true


getHash = ->
	return window.location.hash.slice(1)


module.exports = (container, screens, defaultScreen) ->
	initialClasses = container.className

	window.onhashchange = ->
		if getHash() != ''
			result = updateView(container, screens, getHash(), initialClasses)
		else
			result = updateView(container, screens, defaultScreen, initialClasses)
		if !result?
			throw new Error('Tried to go to invalid screen: ' + getHash())

	if getHash() != ''
		if updateView(container, screens, getHash(), initialClasses)
			return

	updateView(container, screens, defaultScreen, initialClasses)
	return