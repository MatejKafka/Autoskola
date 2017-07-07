switchFn = (current, last) ->
	if last?
		return getDifference(current, last)
	else
		return formatCurrentTest(current)


formatCurrentTest = (current) ->
	return {
		success: current.success
		failure: current.failure
		added: current.success.concat(current.failure)
		removed: []
	}


getDifference = (current, last) ->
	changes = {
		success: []
		failure: []
		added: []
		removed: []
	}

	# TODO: make readable
	loopThroughTests(current.success, last, changes, 'failure', 'success', 'added')
	loopThroughTests(current.failure, last, changes, 'success', 'failure', 'added')


	addToRemovedIfMissing = (item) ->
		if current.success.indexOf(item) == -1 and current.failure.indexOf(item) == -1
			changes.removed.push(item)

	for success in last.success
		addToRemovedIfMissing(success)

	for failure in last.failure
		addToRemovedIfMissing(failure)

	return changes



loopThroughTests = (array, searchIn, changes, wantedLast, stateTarget, existenceTarget) ->
	for item in array
		was = {
			success: searchIn.success.indexOf(item) > -1
			failure: searchIn.failure.indexOf(item) > -1
		}

		if !was.success and !was.failure
			changes[existenceTarget].push(item)
			changes[stateTarget].push(item)
		else if was[wantedLast]
			changes[stateTarget].push(item)



module.exports = switchFn