EventEmitter = require('events')


roundToFullSecond = (timestamp) ->
	return Math.round(timestamp / 1000) * 1000

ceilToFullSecond = (timestamp) ->
	return Math.ceil(timestamp / 1000) * 1000


formatTime = (timeInMs) ->
	timeInS = Math.round(timeInMs / 1000)
	minutes = Math.floor(timeInS / 60)
	minutes = if minutes < 10 then '0' + minutes else minutes.toString()
	seconds = timeInS % 60
	seconds = if seconds < 10 then '0' + seconds else seconds.toString()
	return minutes + ':' + seconds



module.exports = class Timer extends EventEmitter
	@drawTimer: (timer, container, showRemainingTime = true) ->
		render = ->
			if showRemainingTime
				container.innerHTML = formatTime(timer.getRemainingTime())
			else
				container.innerHTML = formatTime(timer.getCurrentTime())

		render()
		timer.on('update', render)

		return ->
			timer.removeListener('update', render)


	constructor: (duration) ->
		@_duration = duration
		@_elapsed = 0
		@_running = false
		@_expired = false
		@_startTime = null
		@_expireTimeoutId = null
		@_secondTimeoutId = null


	start: ->
		if @_expired
			return false

		@_running = true
		@_startTime = Date.now()

		timeUntilNextSecond = ceilToFullSecond(@_elapsed + 0.000000001) - @_elapsed
		@_secondTimeoutId = setTimeout =>
			@_triggerFullSecondEvent()
			@_scheduleNextSecond()
		, timeUntilNextSecond

		timeUntilExpire = @_duration - @_elapsed
		@_expireTimeoutId = setTimeout(=>
			@_triggerExpire()
		, timeUntilExpire)
		return true


	stop: ->
		if @_expired || !@_running
			return false

		@_elapsed = @getCurrentTime()

		clearTimeout(@_expireTimeoutId)
		clearTimeout(@_secondTimeoutId)

		@_running = false
		@_startTime = null
		return true


	getCurrentTime: ->
		if !@_running
			return @_elapsed
		else
			return (Date.now() - @_startTime) + @_elapsed


	getRemainingTime: ->
		return @_duration - @getCurrentTime()


	_scheduleNextSecond: ->
		elapsed = @getCurrentTime()
		timeUntilNextSecond = roundToFullSecond(elapsed) + 1000 - elapsed

		@_secondTimeoutId = setTimeout(=>
			@_triggerFullSecondEvent()
			@_scheduleNextSecond()
		, timeUntilNextSecond)


	_triggerExpire: ->
		@stop()
		@_expired = true
		@_elapsed = @_duration
		@emit('expire', @_elapsed)
		return

	_triggerFullSecondEvent: ->
		@emit('update', roundToFullSecond(@getCurrentTime()))