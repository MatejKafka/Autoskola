action = require('./action')
fetchSectionList = require('./fetch/fetchSectionList')
fetchSection = require('./fetch/fetchSection')


module.exports = ->
	actionName = 'loading section list'
	actionName2 = 'loading sections'

	action.logStart(actionName)
	fetchSectionList()
	.catch (err) ->
		action.throwError(err, actionName)
	.then (sectionList) ->
		action.logEnd(actionName)
		return sectionList

	.then (sectionList) ->
		action.logStart(actionName2)
		sectionPromises = for section in sectionList
			fetchSection(section)
			.then (section) ->
				if section?
					console.info('loaded section: ' + section.id + ' (' + section.name + ')')
				return section
		return Promise.all(sectionPromises)

	.then (sections) ->
		sections = sections.filter((section) -> section?)
		action.logEnd(actionName2)
		return sections
	.catch (err) ->
		action.throwError(err, actionName2)
