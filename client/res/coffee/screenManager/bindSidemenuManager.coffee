parseHash = require('./screenHash').parse
createElem = require('../util/createElem')

SCREENS =
	questionSelect:
		name: 'Procházení'
		subpages: ['', 'questionSelect', 'browsing', 'evaluateSession']
	prepareTest:
		name: 'Cvičný test'
		subpages: ['prepareTest', 'practiceTest', 'evaluateTest']


getHash = ->
	return window.location.hash.slice(1)

updateNavList = (elem) ->
	{page} = parseHash(getHash())

	elem.innerHTML = ''
	for key, pageObj of SCREENS
		if pageObj.subpages.indexOf(page) > -1
			highlightedPage = key
			elem.appendChild(createElem('li .selectedPage', [pageObj.name]))
		else
			elem.appendChild(createElem('li',[
				createElem("a href='##{key}'", [pageObj.name])
			]))

	if !highlightedPage?
		console.warn("Unknown page name (in sidemenuManager): `#{page}`")
	return


module.exports = (navlistElem) ->
	# TODO: update - ugly
	window.addEventListener 'hashchange', ->
		updateNavList(navlistElem)

	updateNavList(navlistElem)
	return