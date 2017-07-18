module.exports = (fillValue, start, end) ->
	if !Array.isArray(@)
		throw new Error('`this` is not an Array')

	if !start?
		start = 0
	if !end?
		end = @length

	for i in [start...end]
		@[i] = fillValue
	return @