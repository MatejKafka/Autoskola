module.exports = (buttonElem, sidebarElem, contentElem) ->
	isHidden = true
	sidebarElem.classList.add('hiddenOnMobile')
	buttonElem.classList.add('aboveContent')

	toggleMenu = ->
		if isHidden
			sidebarElem.classList.remove('hiddenOnMobile')
			sidebarElem.classList.add('visibleOnMobile')
			buttonElem.classList.remove('aboveContent')
			buttonElem.classList.add('aboveMenu')
			isHidden = false
		else
			sidebarElem.classList.remove('visibleOnMobile')
			sidebarElem.classList.add('hiddenOnMobile')
			buttonElem.classList.remove('aboveMenu')
			buttonElem.classList.add('aboveContent')
			isHidden = true
		return

	buttonElem.addEventListener('click', toggleMenu)

	contentElem.addEventListener 'click', ->
		if !isHidden
			toggleMenu()
		return

	window.addEventListener 'hashchange', ->
		if !isHidden
			toggleMenu()
		return

	return