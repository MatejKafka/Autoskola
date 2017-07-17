CLASSES =
	MENU_HIDDEN: 'mobileMenuHidden'
	MENU_VISIBLE: 'mobileMenuOpen'


module.exports = (buttonElem, sidebarElem, coverElem) ->
	isHidden = true
	document.body.classList.add(CLASSES.MENU_HIDDEN)

	toggleMenu = ->
		if isHidden
			document.body.classList.remove(CLASSES.MENU_HIDDEN)
			document.body.classList.add(CLASSES.MENU_VISIBLE)
			isHidden = false
		else
			document.body.classList.remove(CLASSES.MENU_VISIBLE)
			document.body.classList.add(CLASSES.MENU_HIDDEN)
			isHidden = true
		return

	hideMenu = ->
		if !isHidden
			toggleMenu()
		return

	buttonElem.addEventListener('click', toggleMenu)
	coverElem.addEventListener('click', hideMenu)
	window.addEventListener('hashchange', hideMenu)
	return