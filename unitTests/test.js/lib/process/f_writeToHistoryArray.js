// Generated by CoffeeScript 1.8.0
(function() {
  module.exports = function(historyArray) {
    return function(fileName, testData) {
      var done, item, _i, _len;
      done = false;
      for (_i = 0, _len = historyArray.length; _i < _len; _i++) {
        item = historyArray[_i];
        if (item.file === fileName) {
          item.data.push(testData);
          done = true;
        }
      }
      if (!done) {
        return historyArray.push({
          file: fileName,
          data: [testData]
        });
      }
    };
  };

}).call(this);