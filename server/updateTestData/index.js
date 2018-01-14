// Generated by CoffeeScript 1.11.1
(function() {
  var arg, cliArguments, cmdName, commandName, config, fn, getRemoteImgQuestions, params, path, paths;

  require('./util/showUnhandledPromises');

  config = require('../config');

  path = require('path');

  paths = config.testDataPaths;

  getRemoteImgQuestions = function(path) {
    try {
      return require(path);
    } catch (error) {
      throw new Error('REMOTE IMG QUESTIONS FILE MISSING: ' + path);
    }
  };

  cliArguments = {
    updateQuestionsAndSections: function() {
      return [paths.sections, paths.remoteImgQuestions];
    },
    downloadImages: function(startIndexStr, endIndexStr) {
      if (startIndexStr == null) {
        startIndexStr = 0;
      }
      if (endIndexStr == null) {
        endIndexStr = null;
      }
      return [getRemoteImgQuestions(paths.remoteImgQuestions), paths.imgDir, path.oldImgDir, parseInt(startIndexStr), endIndexStr == null ? null : parseInt(endIndexStr)];
    },
    updateStructureFile: function() {
      return [paths.imgDir];
    },
    consolidateReplacedImages: function() {
      return [paths.imgDir, paths.flashReplaceDir];
    },
    replaceAnimations: function(removeReplacedFilesStr) {
      if (removeReplacedFilesStr == null) {
        removeReplacedFilesStr = null;
      }
      return [paths.imgDir, paths.flashReplaceDir, removeReplacedFilesStr === 'removeReplacedFiles' ? true : false];
    },
    generateLocalImgQuestions: function() {
      return [paths.localImgQuestions, getRemoteImgQuestions(paths.remoteImgQuestions), paths.imgDir, paths.imgDirUrl];
    }
  };

  module.exports = {
    updateQuestionsAndSections: require('./updateSectionsAndQuestions'),
    downloadImages: require('./downloadImages'),
    updateStructureFile: require('./updateStructureFile'),
    consolidateReplacedImages: require('./consolidateReplacedImages'),
    replaceAnimations: require('./replaceAnimations'),
    generateLocalImgQuestions: require('./generateLocalImgQuestions'),
    "arguments": cliArguments
  };

  arg = process.argv.slice(2);

  commandName = arg[0];

  params = arg.slice(1);

  if (commandName == null) {
    console.log('AVAILABLE COMMANDS: ');
    for (cmdName in cliArguments) {
      fn = cliArguments[cmdName];
      console.log('\t' + cmdName + (" (" + fn.length + " " + (fn.length > 0 ? "optional " : "") + "arguments)"));
    }
    console.log('');
    return;
  }

  if (cliArguments[commandName] == null) {
    throw new Error('Unknown command: ' + commandName);
  }

  module.exports[commandName].apply(null, cliArguments[commandName].apply(null, params));

}).call(this);

//# sourceMappingURL=index.js.map
