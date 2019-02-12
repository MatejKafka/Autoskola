// Generated by CoffeeScript 1.11.1
(function() {
  var cp;

  cp = require('child_process');

  module.exports = function(modulePath) {
    var errStr, result;
    result = cp.spawnSync('node', [modulePath]);
    if (result.status !== 0) {
      errStr = result.stderr.toString();
      if (errStr.slice(-1) === '\n') {
        errStr = errStr.slice(0, -1);
      }
      console.error('Error while running script: ' + modulePath);
      console.error(errStr);
      process.exit(result.status);
    }
  };

}).call(this);

//# sourceMappingURL=runScriptSync.js.map