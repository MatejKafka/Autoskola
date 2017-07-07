// Generated by CoffeeScript 1.8.0
(function() {
  var formatCurrentTest, getDifference, loopThroughTests, switchFn;

  switchFn = function(current, last) {
    if (last != null) {
      return getDifference(current, last);
    } else {
      return formatCurrentTest(current);
    }
  };

  formatCurrentTest = function(current) {
    return {
      success: current.success,
      failure: current.failure,
      added: current.success.concat(current.failure),
      removed: []
    };
  };

  getDifference = function(current, last) {
    var addToRemovedIfMissing, changes, failure, success, _i, _j, _len, _len1, _ref, _ref1;
    changes = {
      success: [],
      failure: [],
      added: [],
      removed: []
    };
    loopThroughTests(current.success, last, changes, 'failure', 'success', 'added');
    loopThroughTests(current.failure, last, changes, 'success', 'failure', 'added');
    addToRemovedIfMissing = function(item) {
      if (current.success.indexOf(item) === -1 && current.failure.indexOf(item) === -1) {
        return changes.removed.push(item);
      }
    };
    _ref = last.success;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      success = _ref[_i];
      addToRemovedIfMissing(success);
    }
    _ref1 = last.failure;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      failure = _ref1[_j];
      addToRemovedIfMissing(failure);
    }
    return changes;
  };

  loopThroughTests = function(array, searchIn, changes, wantedLast, stateTarget, existenceTarget) {
    var item, was, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      item = array[_i];
      was = {
        success: searchIn.success.indexOf(item) > -1,
        failure: searchIn.failure.indexOf(item) > -1
      };
      if (!was.success && !was.failure) {
        changes[existenceTarget].push(item);
        _results.push(changes[stateTarget].push(item));
      } else if (was[wantedLast]) {
        _results.push(changes[stateTarget].push(item));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  module.exports = switchFn;

}).call(this);
