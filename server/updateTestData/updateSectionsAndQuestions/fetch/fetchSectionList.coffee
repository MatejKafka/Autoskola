urls = require('../../urls')
jsdom = require('jsdom')

module.exports = ->
	return new Promise (resolve, reject) ->
		jsdom.env urls.sectionList, (err, window) ->
			if err?
				reject(err)
				return

			sectionList = Array.from(window.document.getElementsByClassName('VerticalMenu')[0].children).map((el) ->
				href = el.children[0].href
				id = parseInt(href.substr(href.lastIndexOf('/') + 1))
				sectionName = el.children[0].innerHTML
				return {id, name: sectionName}
			)
			resolve(sectionList)