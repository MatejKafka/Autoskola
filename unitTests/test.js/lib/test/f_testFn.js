// Generated by CoffeeScript 1.8.0
(function() {
  var test;

  test = function(boolValue) {
    if (typeof boolValue !== 'boolean') {
      throw new TypeError('Tested value must be boolean, not ' + typeof boolValue);
    }
    return boolValue;
  };

  module.exports = function() {
    var testFn, testResult;
    testResult = {
      success: [],
      failure: []
    };
    testFn = function(value, message) {
      var item, successful, target, _i, _len;
      if (typeof value === 'boolean') {
        successful = test(value);
      } else if (Array.isArray(value)) {
        successful = true;
        for (_i = 0, _len = value.length; _i < _len; _i++) {
          item = value[_i];
          if (!test(item)) {
            successful = false;
            break;
          }
        }
      } else {
        throw new TypeError('input must be boolean or array');
      }
      if (successful) {
        target = 'success';
      } else {
        target = 'failure';
      }
      return testResult[target].push(message);
    };
    testFn.result = testResult;
    return testFn;
  };

}).call(this);
