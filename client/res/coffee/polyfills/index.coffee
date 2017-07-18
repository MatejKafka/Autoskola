
# 2017-07-18 currently enough to work in IE 11

if !window.Promise?
	window.Promise = require('promise-polyfill')

if !window.Symbol?
	window.Symbol = (name) ->
		return '@@_' + name.split(' ').join('-') + '_@@'

if !Object.assign?
	Object.assign = require('./objectAssign')

if !Array::fill?
	Object.defineProperty(Array::, 'fill', {
		value: require('./arrayFill')
	})