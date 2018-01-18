/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var getArgumentValidator, isExternalItem, isInternalItem, validator;

getArgumentValidator = __webpack_require__(15).getScope;

isExternalItem = __webpack_require__(63);

isInternalItem = __webpack_require__(64);

validator = getArgumentValidator();

validator.addType('id', function(arg) {
  return this.int(arg) && arg >= 0;
});

validator.addType('externalItem', isExternalItem);

validator.addType('internalItem', isInternalItem);

validator.addType('query', function(arg) {
  return this.int(arg) || this.string(arg) || this.object(arg) || this["null"](arg);
});

validator.addType('item_tag', function(arg) {
  return this.string(arg) || this["null"](arg);
});

validator.addType('item_persistent', function(arg) {
  return this.boolean(arg);
});

module.exports = validator;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  tabTitle: 'Příprava k závěrečným testům autoškoly ' + (new Date()).getFullYear(),
  pageTitle: "<h1>Autoškola " + ((new Date()).getFullYear()) + "</h1><h2>pro skupinu B</h2>",
  questionSelect: {
    selectAll: 'Vybrat vše',
    deselectAll: 'Odvybrat vše',
    noSectionChecked: 'Není vybrána žádná otázka!'
  },
  questionView: {
    previousQuestion: '<',
    nextQuestion: '>',
    from: 'z',
    point: 'bod',
    points: 'body'
  },
  browsingQuestions: {
    evaluateSessionButton: 'Vyhodnotit otázky',
    backToEvaluating: 'Zpět k výsledkům',
    outOfBoundsQuestion: ['Ve vybraných oborech je jen ', ' otázek, zkuste nižší číslo otázky.'],
    finishedBrowsingConfirm: 'Dokončili jste procházení vybraných otázek. Chete vyhodnotit projité otázky?'
  },
  practiceTest: {
    evaluateTestButton: 'Ukončit a vyhodnotit test',
    evaluateTestPopup: 'Opravdu chcete ukončit a vyhodnotit test?',
    finishedPopup: 'Došli jste k poslední otázce. Chcete ukončit a vyhodnotit test?',
    backToResults: 'Zpět k výsledkům testu'
  },
  evaluateTest: {
    succeeded: 'Prospěl',
    didNotSucceed: 'Neprospěl',
    ofNPoints: 'bodů'
  },
  error: {
    errorPopup: {
      baseMessage: 'Omlouvám se, v aplikaci nastala neznámá chyba. Pro nápravu zkuste stránku znovu načíst, případně kontaktovat administrátora.',
      errorMessageBelow: 'Níže je uvedený důvod chyby:'
    },
    storageFull: 'Zaplnil se úložný prostor, do kterého se ukládaly vaše odpovědi. Nové odpovědi nebudou uloženy.',
    storageUnavailable: 'Váš prohlížeč nepodporuje ukládání informací na váš počítač, všechny odpovědi se po odchodu ze stránky smažou.'
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  verboseErrorMessages: true,
  storeLogging: {
    log: true,
    showLogData: false,
    showStackTraces: false
  },
  answerClickTimeout: 500,
  loaderScreenTimeout: 500,
  shuffleAnswers: {
    browsingMode: true,
    testMode: false
  },
  testSuccessThreshold: 43,
  testComposition: [[[24, 16, 25], 10], [14, 3], [17, 3], [19, 4], [21, 2], [22, 2], [20, 1]],
  storeNamespace: 'store'
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var parseIdentifierStr;

parseIdentifierStr = function(identifierStr) {
  var attributes, classes, endingChar, id, identifier, identifiers, index, key, nextPart, parts, tagName, value;
  tagName = null;
  id = null;
  classes = [];
  attributes = [];
  if (identifierStr != null) {
    identifiers = identifierStr.split(' ');
    if (identifiers.length === 0) {
      throw new Error('identifierStr must contain at least tagName');
    }
    tagName = identifiers.shift();
    while (identifiers.length > 0) {
      identifier = identifiers.shift();
      if (identifier === '') {
        continue;
      }
      if (identifier[0] === '#') {
        id = identifier.slice(1);
      } else if (identifier[0] === '.') {
        classes.push(identifier.slice(1));
      } else {
        parts = identifier.split('=');
        key = parts[0];
        value = parts.slice(1).join('=');
        if (value == null) {
          value = '';
        }
        if (value[0] === '"') {
          endingChar = '"';
        } else if (value[0] === "'") {
          endingChar = "'";
        }
        if (endingChar != null) {
          identifiers.unshift(value.slice(1));
          parts = [];
          while (true) {
            nextPart = identifiers.shift();
            if (nextPart == null) {
              break;
            }
            index = nextPart.indexOf(endingChar);
            if (index > -1) {
              parts.push(nextPart.slice(0, index));
              identifiers.unshift(nextPart.slice(index + 1));
              break;
            }
            parts.push(nextPart);
          }
          value = parts.join(' ');
        }
        attributes.push([key, value]);
      }
    }
  }
  return {
    tagName: tagName,
    id: id,
    classes: classes,
    attributes: attributes
  };
};

module.exports = function(identifierStr, children) {
  var attributes, child, className, classes, elem, i, id, j, k, key, len, len1, len2, ref, ref1, tagName, value;
  if (Array.isArray(identifierStr)) {
    children = identifierStr;
    identifierStr = null;
  }
  if ((identifierStr == null) && (children != null)) {
    elem = document.createDocumentFragment();
  } else {
    ref = parseIdentifierStr(identifierStr), tagName = ref.tagName, id = ref.id, classes = ref.classes, attributes = ref.attributes;
    elem = document.createElement(tagName);
    if (id != null) {
      elem.id = id;
    }
    for (i = 0, len = classes.length; i < len; i++) {
      className = classes[i];
      elem.classList.add(className);
    }
    for (j = 0, len1 = attributes.length; j < len1; j++) {
      ref1 = attributes[j], key = ref1[0], value = ref1[1];
      elem.setAttribute(key, value);
    }
  }
  if (Array.isArray(children)) {
    for (k = 0, len2 = children.length; k < len2; k++) {
      child = children[k];
      if (child instanceof Node) {
        elem.appendChild(child);
      } else {
        elem.appendChild(document.createTextNode(child));
      }
    }
  }
  return elem;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var findItems, getValueFromItem, isEmptyObj, matchesQuery, separateItemQuery, separateQuery, updateStructure;

findItems = __webpack_require__(11);

matchesQuery = __webpack_require__(25);

separateItemQuery = __webpack_require__(26);

isEmptyObj = __webpack_require__(10);

separateQuery = function(cacheQuery) {
  var cache, cachePropQuery, find, findQuery, key, ref, value;
  findQuery = {};
  cachePropQuery = {};
  for (key in cacheQuery) {
    value = cacheQuery[key];
    if ((value != null) && typeof value === 'object') {
      ref = separateQuery(value), find = ref.find, cache = ref.cache;
      if (!isEmptyObj(find)) {
        findQuery[key] = find;
      }
      if (!isEmptyObj(cache)) {
        cachePropQuery[key] = cache;
      }
    } else if (value != null) {
      findQuery[key] = value;
    } else {
      cachePropQuery[key] = null;
    }
  }
  return {
    find: findQuery,
    cache: cachePropQuery
  };
};

getValueFromItem = function(item, key, isMeta) {
  if (isMeta) {
    return item.meta[key];
  } else {
    return item.item[key];
  }
};

module.exports = updateStructure = {
  add: function(structure, item) {
    var i, key, len, query, ref;
    structure.location[item.meta.id] = item.meta.persistent ? structure.LOCATIONS.DB : structure.LOCATIONS.MEMORY_STORE;
    if (item.meta.tag != null) {
      if (structure.byTag[item.meta.tag] == null) {
        structure.byTag[item.meta.tag] = [];
      }
      structure.byTag[item.meta.tag].push(item.meta.id);
    }
    ref = structure.byQuery;
    for (i = 0, len = ref.length; i < len; i++) {
      query = ref[i];
      if (matchesQuery(item, query.findQuery.item, query.findQuery.meta)) {
        key = getValueFromItem(item, query.cachedKey, query.isMetaKey);
        if (query.values[key] == null) {
          query.values[key] = [];
        }
        query.values[key].push(item.meta.id);
      }
    }
    return structure;
  },
  remove: function(structure, item) {
    var i, index, key, len, query, ref, tagCache;
    if (structure.location[item.meta.id] == null) {
      return;
    }
    delete structure.location[item.meta.id];
    if (item.meta.tag != null) {
      tagCache = structure.byTag[item.meta.tag];
      tagCache.splice(tagCache.indexOf(item.meta.id), 1);
      if (tagCache.length === 0) {
        delete structure.byTag[item.meta.tag];
      }
    }
    ref = structure.byQuery;
    for (i = 0, len = ref.length; i < len; i++) {
      query = ref[i];
      key = getValueFromItem(item, query.cachedKey, query.isMetaKey);
      if (query.values[key] == null) {
        continue;
      }
      index = query.values[key].indexOf(item.meta.id);
      if (index >= 0) {
        query.values[key].splice(index, 1);
        if (query.values[key].length === 0) {
          delete query.values[key];
        }
      }
    }
    return structure;
  },
  change: function(structure, item) {
    updateStructure.remove(structure, item);
    return updateStructure.add(structure, item);
  },
  cacheQuery: function(structure, query, store) {
    var cacheQuery, findQuery, i, isMeta, item, items, keys, len, propKey, propMap, ref, value;
    ref = separateQuery(query), findQuery = ref.find, cacheQuery = ref.cache;
    keys = Object.keys(cacheQuery);
    if (keys.length !== 1 || cacheQuery[keys[0]] !== null) {
      throw new Error('current implementation of cached queries only supports single cached parameter (not nested)');
    }
    propKey = keys[0];
    isMeta = propKey[0] === '$';
    if (isMeta) {
      propKey = propKey.slice(1);
    }
    propMap = {};
    items = findItems(findQuery, (function() {}), store, structure, false);
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      value = getValueFromItem(item, propKey, isMeta);
      if (propMap[value] == null) {
        propMap[value] = [];
      }
      propMap[value].push(item.meta.id);
    }
    structure.byQuery.push({
      fullQuery: query,
      findQuery: separateItemQuery(findQuery),
      rawFindQuery: findQuery,
      cachedKey: propKey,
      isMetaKey: isMeta,
      values: propMap
    });
    return structure;
  }
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var MESSAGES, QuestionView, bindNavigationButtons, renderQuestionList, scrollToCenter, validate;

MESSAGES = __webpack_require__(1).questionView;

validate = __webpack_require__(15);

QuestionView = __webpack_require__(49);

bindNavigationButtons = function(container, questionCount, index, handlers) {
  var backButton, nextQuestionButton, previousQuestionButton;
  backButton = container.getElementsByClassName('backButton')[0];
  previousQuestionButton = container.getElementsByClassName('previousQuestionButton')[0];
  nextQuestionButton = container.getElementsByClassName('nextQuestionButton')[0];
  backButton.addEventListener('click', function() {
    return handlers.back();
  });
  previousQuestionButton.addEventListener('click', function() {
    return handlers.previousQuestion();
  });
  nextQuestionButton.addEventListener('click', function() {
    return handlers.nextQuestion();
  });
};

scrollToCenter = function(elem, container) {
  setTimeout(function() {
    return container.scrollLeft = elem.offsetLeft + (elem.clientWidth / 2) - (container.clientWidth / 2);
  }, 0);
};

renderQuestionList = function(questionCount, index, containerList, gotoQuestionFn) {
  var currentQuestionItem, fn, fragment, i, j, ref;
  fragment = document.createDocumentFragment();
  fn = function(i) {
    var li, link;
    li = document.createElement('li');
    link = document.createElement('a');
    link.appendChild(document.createTextNode(i + 1));
    link.addEventListener('click', function() {
      return gotoQuestionFn(i);
    });
    li.appendChild(link);
    return fragment.appendChild(li);
  };
  for (i = j = 0, ref = questionCount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    fn(i);
  }
  currentQuestionItem = fragment.children[index];
  currentQuestionItem.classList.add('currentQuestion');
  currentQuestionItem.innerHTML = index + 1;
  containerList.appendChild(fragment);
  scrollToCenter(currentQuestionItem, containerList);
  return function(index, highlightClass) {
    var className, k, len, ref1, targetItem;
    targetItem = containerList.children[index];
    if (targetItem == null) {
      throw new Error('Out of bounds highlight attempt at ' + index);
    }
    if ((highlightClass != null) && highlightClass !== '') {
      targetItem.classList.add('highlightedQuestion');
      targetItem.classList.add(highlightClass + 'Question');
      return highlightClass + 'Answer';
    } else {
      ref1 = targetItem.classList;
      for (k = 0, len = ref1.length; k < len; k++) {
        className = ref1[k];
        if (/.+Question/.test(className)) {
          targetItem.classList.remove(className);
        }
      }
      return null;
    }
  };
};

module.exports = function(options) {
  var boundHighlightAnswer, container, gotoNextQuestion, gotoPreviousQuestion, handlers, highlightQuestionInList, index, messages, question, questionCount, questionListElem, questionView, shuffleAnswers;
  questionCount = options.questionCount, question = options.question, index = options.questionIndex, container = options.container, shuffleAnswers = options.shuffleAnswers, handlers = options.handlers, messages = options.messages;
  validate([questionCount, question, index], ['int', 'object', 'int']);
  handlers = Object.assign({
    prepareView: null,
    gotoQuestion: function(newIndex) {
      throw new Error('handlers.gotoQuestion is not defined!');
    },
    answerClick: function(arg, highlightAnswerFn, highlightQuestionInListFn) {
      var answer, index;
      answer = arg.answer, index = arg.index;
      throw new Error('handlers.answerClick is not defined!');
    },
    lastQuestionAnswer: function() {
      throw new Error('handlers.lastQuestionAnswer is not defined!');
    },
    backButtonClick: function() {
      throw new Error('handlers.backButtonClick is not defined!');
    }
  }, handlers);
  if (typeof index !== 'number' || isNaN(index)) {
    throw new Error('Index must be a number, not ' + index);
  }
  gotoPreviousQuestion = function() {
    if (index > 0) {
      return handlers.gotoQuestion(index - 1);
    } else {
      return handlers.gotoQuestion(questionCount - 1);
    }
  };
  gotoNextQuestion = function(fromAnswerClick) {
    if (fromAnswerClick == null) {
      fromAnswerClick = false;
    }
    if (index < questionCount - 1) {
      return handlers.gotoQuestion(index + 1);
    } else if (fromAnswerClick) {
      return handlers.lastQuestionAnswer();
    } else {
      return handlers.gotoQuestion(0);
    }
  };
  if (index > questionCount - 1) {
    console.error('Question index is too high - you only have ' + questionCount + ' questions selected!');
    handlers.gotoQuestion(questionCount - 1);
    return;
  }
  if (index < 0) {
    console.error('Question index is below zero (' + index + ')!');
    handlers.gotoQuestion(0);
    return;
  }
  container.innerHTML = ("<div class='topbar'> <a href='javascript:void(0);' class='backButton'>" + messages.backButton + "</a> <span class='questionNavigation'> <a href='javascript:void(0);' class='previousQuestionButton'>" + MESSAGES.previousQuestion + "</a> <span class='questionNumber'> <span class='questionIndex'>" + (index + 1) + "</span> " + MESSAGES.from + " <span class='questionCollectionLength'>" + questionCount + "</span> </span> <a href='javascript:void(0);' class='nextQuestionButton'>") + MESSAGES.nextQuestion + "</a> </span> </div> <hr class='questionNavigationLine'> <ul class='questionList'></ul> <hr> <div class='testContainer'></div>";
  questionListElem = container.getElementsByClassName('questionList')[0];
  setTimeout(function() {
    return questionListElem.style.height = (2 * questionListElem.offsetHeight - questionListElem.clientHeight) + 'px';
  }, 0);
  highlightQuestionInList = renderQuestionList(questionCount, index, questionListElem, handlers.gotoQuestion);
  bindNavigationButtons(container, questionCount, index, {
    back: handlers.backButtonClick,
    previousQuestion: gotoPreviousQuestion,
    nextQuestion: gotoNextQuestion
  });
  questionView = new QuestionView(question);
  if (shuffleAnswers) {
    questionView.shuffleAnswers();
  }
  questionView.renderTo(container.getElementsByClassName('testContainer')[0]);
  boundHighlightAnswer = questionView.highlightAnswer.bind(questionView);
  questionView.on('answerClick', function(arg) {
    var answer, index;
    index = arg.index, answer = arg.answer;
    Promise.resolve(handlers.answerClick({
      index: index,
      answer: answer
    }, boundHighlightAnswer, highlightQuestionInList)).then(function(result) {
      if (result) {
        return gotoNextQuestion(true);
      }
    });
  });
  if (typeof handlers.prepareView === 'function') {
    handlers.prepareView(boundHighlightAnswer, highlightQuestionInList);
  }
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = Symbol('eveStore metadata');


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var decorateItem, getExternalItemTag, metaSymbol, parseExternalItem, runItemValidators, validateArguments;

metaSymbol = __webpack_require__(6);

validateArguments = __webpack_require__(0);

decorateItem = __webpack_require__(19);

runItemValidators = __webpack_require__(21);

parseExternalItem = __webpack_require__(65);

getExternalItemTag = function(externalItem) {
  return externalItem[metaSymbol].tag;
};

module.exports = function(externalItem, undecorators, validators) {
  var tag;
  if (undecorators == null) {
    undecorators = null;
  }
  if (validators == null) {
    validators = null;
  }
  validateArguments(arguments, ['externalItem']);
  tag = getExternalItemTag(externalItem);
  if (undecorators != null) {
    externalItem = decorateItem(externalItem, tag, undecorators);
  }
  if (validators != null) {
    runItemValidators(externalItem, tag, validators);
  }
  return parseExternalItem(externalItem);
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var cloneValue,
  hasProp = {}.hasOwnProperty;

cloneValue = function(value) {
  var item, key, out, propValue;
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (Array.isArray(value)) {
    out = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = value.length; i < len; i++) {
        item = value[i];
        results.push(cloneValue(item));
      }
      return results;
    })();
  } else {
    out = {};
    for (key in value) {
      if (!hasProp.call(value, key)) continue;
      propValue = value[key];
      out[key] = cloneValue(propValue);
    }
  }
  return out;
};

module.exports = cloneValue;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var hasProp = {}.hasOwnProperty;

module.exports = function(obj) {
  var key;
  for (key in obj) {
    if (!hasProp.call(obj, key)) continue;
    return false;
  }
  return true;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var EVENT_INFO_TYPES, findUnsortedItems, getItem, handleSingleMetaParamQuery, matchesQuery, separateItemQuery, validateArguments;

EVENT_INFO_TYPES = __webpack_require__(18);

getItem = __webpack_require__(24);

matchesQuery = __webpack_require__(25);

separateItemQuery = __webpack_require__(26);

validateArguments = __webpack_require__(0);

handleSingleMetaParamQuery = function(metaQuery, eventInfoCb, store, structure, singleRecord) {
  var itemIds, items, targetStore;
  if ((metaQuery.id != null) && typeof metaQuery.id === 'number') {
    return [getItem(metaQuery.id, store, structure)];
  } else if ((metaQuery.tag != null) && typeof metaQuery.tag === 'string') {
    itemIds = structure.byTag[metaQuery.tag];
    if (itemIds == null) {
      return [];
    }
    if (singleRecord) {
      itemIds = itemIds.slice(0, 1);
    }
    items = itemIds.map(function(id) {
      return getItem(id, eventInfoCb, store, structure);
    });
    return items;
  } else if ((metaQuery.persistent != null) && metaQuery.persistent === 'boolean') {
    targetStore = metaQuery.persistent ? store.db : store.memory;
    if (singleRecord) {
      return [targetStore.readFirstItem()];
    }
    return targetStore.readAllItems();
  }
  return null;
};

findUnsortedItems = function(query, eventInfoCb, store, structure, singleRecord) {
  var cachedQuery, cachedQueryStr, findQueryStr, i, item, itemIds, itemQuery, items, j, key, len, len1, matches, metaQuery, record, ref, ref1, result, value;
  if (singleRecord == null) {
    singleRecord = false;
  }
  if (query == null) {
    if (singleRecord) {
      record = store.db.readFirstItem();
      if (!record) {
        record = store.memory.readFirstItem();
      }
      if (record != null) {
        record = [record];
      }
      return record;
    } else {
      return store.db.readAllItems().concat(store.memory.readAllItems());
    }
  }
  if (typeof query === 'number') {
    query = {
      $id: query
    };
  } else if (typeof query === 'string') {
    query = {
      $tag: query
    };
  }
  findQueryStr = Object.keys(query).sort().join(',');
  ref = structure.byQuery;
  for (i = 0, len = ref.length; i < len; i++) {
    cachedQuery = ref[i];
    cachedQueryStr = Object.keys(cachedQuery.fullQuery).sort().join(',');
    if (findQueryStr === cachedQueryStr && matchesQuery.testObj(query, cachedQuery.rawFindQuery)) {
      eventInfoCb(EVENT_INFO_TYPES.cacheHit, {
        cacheHit: true
      });
      key = cachedQuery.cachedKey;
      if (cachedQuery.isMetaKey) {
        key = '$' + key;
      }
      value = query[key];
      itemIds = cachedQuery.values[value];
      if (Array.isArray(itemIds)) {
        return itemIds.map(function(id) {
          return getItem(id, eventInfoCb, store, structure);
        });
      }
      return [];
    }
  }
  eventInfoCb(EVENT_INFO_TYPES.cacheHit, {
    cacheHit: false
  });
  ref1 = separateItemQuery(query), itemQuery = ref1.item, metaQuery = ref1.meta;
  if (Object.keys(itemQuery).length === 0 && Object.keys(metaQuery).length === 1) {
    result = handleSingleMetaParamQuery(metaQuery, eventInfoCb, store, structure, singleRecord);
    if (result != null) {
      return result;
    }
  }
  if ((metaQuery.tag != null) && typeof metaQuery.tag === 'string') {
    if (structure.byTag[metaQuery.tag] == null) {
      return [];
    }
    items = structure.byTag[metaQuery.tag].map(function(id) {
      return getItem(id, eventInfoCb, store, structure);
    });
    if ((metaQuery.persistent != null) && typeof metaQuery.persistent === 'boolean') {
      items = items.filter(function(item) {
        return item.meta.persistent = metaQuery.persistent;
      });
    }
  } else if ((metaQuery.persistent != null) && typeof metaQuery.persistent === 'boolean') {
    if (metaQuery.persistent) {
      items = store.db.readAllItems();
    } else {
      items = store.memory.readAllItems();
    }
  } else {
    items = store.memory.readAllItems().concat(store.db.readAllItems());
  }
  matches = [];
  for (j = 0, len1 = items.length; j < len1; j++) {
    item = items[j];
    if (matchesQuery(item, itemQuery, metaQuery)) {
      if (singleRecord) {
        return [item];
      }
      matches.push(item);
    }
  }
  return matches;
};

module.exports = function(query, eventInfoCb, store, structure, singleRecord) {
  var unsortedResult;
  validateArguments([query, eventInfoCb], ['query', 'function']);
  unsortedResult = findUnsortedItems(query, eventInfoCb, store, structure, singleRecord);
  if (unsortedResult.length > 1) {
    unsortedResult.sort(function(a, b) {
      return a.meta.id - b.meta.id;
    });
  }
  return unsortedResult;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var findItemsInStore, validateArguments;

findItemsInStore = __webpack_require__(11);

validateArguments = __webpack_require__(0);

module.exports = function(state, eventInfoCb, query, shouldReturnSingleRecord) {
  var items;
  if (shouldReturnSingleRecord == null) {
    shouldReturnSingleRecord = false;
  }
  validateArguments([query, eventInfoCb, shouldReturnSingleRecord], ['query', 'function', 'boolean']);
  items = findItemsInStore(query, eventInfoCb, state.store, state.structure, shouldReturnSingleRecord).filter(function(i) {
    return i != null;
  });
  return items;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {
  QUESTION: 'question',
  SECTION: 'section',
  ANSWER: 'answer',
  PRACTICE_TEST: 'practiceTest',
  CURRENT_TEST: 'currentTest',
  CURRENT_BROWSING_SESSION: 'currentBrowsingSession',
  LAST_CHECK_TIME: 'lastUpdateCheckTime'
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var CONFIG;

CONFIG = __webpack_require__(2);

module.exports = function(testObj) {
  var answer, answerIndex, answerResults, i, j, len, maxScore, question, questionId, ref, score;
  maxScore = 0;
  score = 0;
  answerResults = [];
  ref = testObj.questionIds;
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    questionId = ref[i];
    question = store.findOne({
      $tag: db.STORE_TAGS.QUESTION,
      id: questionId
    });
    answerIndex = testObj.answers[i];
    maxScore += question.value;
    if (answerIndex == null) {
      answerResults[i] = null;
      continue;
    }
    answer = question.answers[answerIndex];
    if (answer == null) {
      throw new Error("Answer index is higher than the number of answers for given question (questionId=" + question.id + ", i=" + answerIndex + ")");
    }
    answerResults[i] = answer.correct;
    if (answer.correct) {
      score += question.value;
    }
  }
  return {
    passed: score >= CONFIG.testSuccessThreshold,
    score: score,
    maxScore: maxScore,
    answerResults: answerResults
  };
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var findType, getValidatorFn, matchSingleType, matchesType, parseSingleTypeStr, parseTypeStr, sliceStackTrace, types, validateArguments;

types = __webpack_require__(41);

sliceStackTrace = __webpack_require__(42);

parseSingleTypeStr = function(typeStr) {
  var separatorIndex;
  separatorIndex = typeStr.indexOf('>');
  if (separatorIndex >= 0) {
    return {
      type: typeStr.slice(0, separatorIndex),
      arg: typeStr.slice(separatorIndex + 1),
      str: typeStr
    };
  } else {
    return {
      type: typeStr,
      arg: null,
      str: typeStr
    };
  }
};

parseTypeStr = function(typeStr) {
  var block, j, len, possibleTypes, typeBlocks;
  typeBlocks = typeStr.split('|').map(function(type) {
    return type.trim();
  });
  possibleTypes = [];
  for (j = 0, len = typeBlocks.length; j < len; j++) {
    block = typeBlocks[j];
    possibleTypes.push(parseSingleTypeStr(block));
  }
  return possibleTypes;
};

matchSingleType = function(value, typeObj, types) {
  var callback;
  if (types[typeObj.type] == null) {
    throw new Error("Tried to check type against missing definition: " + typeObj.str);
  }
  callback = function(value, typeStr) {
    return matchesType(value, typeStr, types);
  };
  return types[typeObj.type](value, typeObj.arg, callback);
};

matchesType = function(value, typeStr, types) {
  var err, isOptional, j, len, matches, possibleTypes, typeObj;
  if (typeof typeStr !== 'string') {
    throw new Error('typeStr must be string, not ' + typeof typeStr);
  }
  if (typeStr[0] === '?' || typeStr[typeStr.length - 1] === '?') {
    isOptional = true;
    if (typeStr[0] === '?') {
      typeStr = typeStr.slice(1);
    } else {
      typeStr = typeStr.slice(0, -1);
    }
  } else {
    isOptional = false;
  }
  if (matchSingleType(value, parseTypeStr('null')[0], types) && isOptional) {
    return true;
  }
  possibleTypes = parseTypeStr(typeStr);
  for (j = 0, len = possibleTypes.length; j < len; j++) {
    typeObj = possibleTypes[j];
    matches = null;
    try {
      matches = matchSingleType(value, typeObj, types);
    } catch (error) {
      err = error;
      if (err instanceof TypeError) {
        matches = err;
      }
      throw err;
    }
    if (matches instanceof TypeError && possibleTypes.length === 1) {
      return matches;
    }
    if (matches === true) {
      return true;
    }
  }
  return false;
};

findType = function(value, types) {
  var typeName;
  for (typeName in types) {
    if (matchSingleType(value, parseTypeStr(typeName)[0], types)) {
      return typeName;
    }
  }
  console.warn('value does not match any defined type:', value);
  return null;
};

validateArguments = function(args, argTypes, types, returnErrors) {
  var err, i, j, len, matches, msg, realType, type;
  for (i = j = 0, len = argTypes.length; j < len; i = ++j) {
    type = argTypes[i];
    try {
      matches = matchesType(args[i], type, types);
    } catch (error) {
      err = error;
      throw sliceStackTrace(err, 2);
    }
    if (matches !== true) {
      if (returnErrors) {
        if (matches instanceof TypeError) {
          msg = matches.message;
        } else {
          realType = findType(args[i], types);
          msg = "it must be `" + type + "`, not `" + realType + "`";
        }
        throw sliceStackTrace(new TypeError("Invalid argument type at index " + i + ": " + msg), 2);
      } else {
        return false;
      }
    }
  }
  if (returnErrors) {
    return null;
  } else {
    return true;
  }
};

getValidatorFn = function(types) {
  var validateFn;
  validateFn = function(args, argTypes) {
    return validateArguments(args, argTypes, types, true);
  };
  validateFn.matches = function(args, argTypes) {
    return validateArguments(args, argTypes, types, false);
  };
  validateFn.addType = function(name, checkFn) {
    validateFn([name, checkFn], ['string', 'function']);
    types[name] = checkFn;
    return checkFn;
  };
  validateFn.getScope = function() {
    return getValidatorFn(Object.assign({}, types));
  };
  return validateFn;
};

module.exports = getValidatorFn(types);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var decodeValue, encodeValue, parseTypeQueryString;

encodeValue = function(value) {
  if (Array.isArray(value)) {
    return 'a:[' + value.map(encodeValue).join(',') + ']';
  } else if (typeof value === 'object') {
    return 'o:' + encodeURIComponent(JSON.stringify(value));
  } else if (typeof value === 'number') {
    return 'n:' + value;
  } else if (typeof value === 'boolean') {
    return 'b:' + (value ? 1 : 0);
  } else if (typeof value === 'string') {
    return 's:' + encodeURIComponent(value);
  } else {
    return 'g:' + encodeURIComponent(value);
  }
};

decodeValue = function(value) {
  var valueStr, valueType;
  valueType = value.slice(0, 1);
  valueStr = value.slice(2);
  switch (valueType) {
    case 'a':
      return valueStr.slice(1, -1).split(',').map(decodeValue);
    case 'o':
      return JSON.parse(decodeURIComponent(valueStr));
    case 'n':
      return parseFloat(valueStr);
    case 'b':
      return Boolean(parseInt(valueStr));
    case 's':
    case 'g':
      return decodeURIComponent(valueStr);
    default:
      console.warn('Incorrect format for value in hash: ' + value);
      return decodeURIComponent(value);
  }
};

parseTypeQueryString = function(queryStr) {
  var i, key, len, pair, pairs, params, ref, value;
  if (queryStr == null) {
    return {};
  }
  params = {};
  pairs = queryStr.split('&');
  for (i = 0, len = pairs.length; i < len; i++) {
    pair = pairs[i];
    ref = pair.split('='), key = ref[0], value = ref[1];
    params[decodeURIComponent(key)] = decodeValue(value);
  }
  return params;
};

module.exports = {
  parse: function(hashStr) {
    var pageName, paramStr, ref;
    ref = hashStr.split('?'), pageName = ref[0], paramStr = ref[1];
    return {
      page: pageName,
      params: parseTypeQueryString(paramStr)
    };
  },
  generate: function(pageName, params) {
    var key, queryPairs, value;
    if ((params == null) || Object.keys(params).length === 0) {
      return pageName;
    }
    queryPairs = (function() {
      var results;
      results = [];
      for (key in params) {
        value = params[key];
        results.push(encodeURIComponent(key) + '=' + encodeValue(value));
      }
      return results;
    })();
    return pageName + '?' + queryPairs.join('&');
  }
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter, MESSAGES, QuestionSelectList, SELECT_ALL_ID, getListItemHtml,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SELECT_ALL_ID = 'selectAll';

EventEmitter = __webpack_require__(8);

MESSAGES = __webpack_require__(1).questionSelect;

getListItemHtml = function(filter, i, listName) {
  return ("<li data-filter-id='" + filter.id + "' " + (i != null ? "data-index='" + i + "'" : '') + ">") + ("<input type='checkbox' checked id='" + (listName + '-' + filter.id) + "'>") + ("<label for='" + (listName + '-' + filter.id) + "'>") + ("<span class='filterName'>" + filter.name + "</span> ") + "<span class='questionCountWrapper'>[<span class='questionCount'></span>]</span>" + "</label>" + "</li>";
};

module.exports = QuestionSelectList = (function(superClass) {
  extend(QuestionSelectList, superClass);

  function QuestionSelectList(containerList, filterArr, listName, questionIdSource, shuffleOutput) {
    var filter, i, j, k, len, len1, matchingQuestionIds, questionId, ref, ref1;
    this._containerList = containerList;
    this._filters = filterArr;
    this._listName = listName;
    this._source = questionIdSource;
    this._shuffleOutput = shuffleOutput;
    if (questionIdSource instanceof QuestionSelectList) {
      this._questionIds = questionIdSource.getFilteredQuestionIds();
      questionIdSource.on('change', (function(_this) {
        return function() {
          _this._questionIds = questionIdSource.getFilteredQuestionIds();
          _this._updateCurrentQuestionIdsByFilter();
          _this._updateHtml();
          _this.emit('change');
        };
      })(this));
    } else {
      this._questionIds = questionIdSource;
    }
    this._questionIdsByFilter = [];
    ref = this._filters;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      filter = ref[i];
      matchingQuestionIds = [];
      ref1 = this._questionIds;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        questionId = ref1[k];
        if (filter.filterFn(questionId)) {
          matchingQuestionIds.push(questionId);
        }
      }
      this._questionIdsByFilter[i] = matchingQuestionIds;
    }
    this._currentQuestionIdsByFilter = this._questionIdsByFilter;
    this._render();
  }

  QuestionSelectList.prototype._updateCurrentQuestionIdsByFilter = function() {
    var currentFilterQuestionIds, filterQuestionIds, i, j, k, len, len1, qId, ref, ref1;
    this._currentQuestionIdsByFilter = [];
    ref = this._questionIdsByFilter;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      filterQuestionIds = ref[i];
      currentFilterQuestionIds = [];
      ref1 = this._questionIds;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        qId = ref1[k];
        if (filterQuestionIds.indexOf(qId) >= 0) {
          currentFilterQuestionIds.push(qId);
        }
      }
      this._currentQuestionIdsByFilter[i] = currentFilterQuestionIds;
    }
  };

  QuestionSelectList.prototype._render = function() {
    var filter, i, j, len, newHtml, ref, selectAllFilter;
    this._containerList.innerHTML = '';
    newHtml = '';
    ref = this._filters;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      filter = ref[i];
      newHtml += getListItemHtml(filter, i, this._listName);
    }
    selectAllFilter = {
      id: SELECT_ALL_ID,
      name: MESSAGES.deselectAll
    };
    newHtml += getListItemHtml(selectAllFilter, null, this._listName);
    this._containerList.innerHTML = newHtml;
    this._updateHtml();
    this._bindSelectAllButton(this._containerList.children[this._containerList.children.length - 1]);
  };

  QuestionSelectList.prototype._bindSelectAllButton = function(selectAllListItem) {
    var selectAllCheckbox, selectAllNameElem, setLabelText;
    selectAllCheckbox = selectAllListItem.children[0];
    selectAllNameElem = selectAllListItem.getElementsByClassName('filterName')[0];
    setLabelText = function() {
      if (selectAllCheckbox.checked) {
        return selectAllNameElem.innerHTML = MESSAGES.deselectAll;
      } else {
        return selectAllNameElem.innerHTML = MESSAGES.selectAll;
      }
    };
    selectAllCheckbox.addEventListener('change', (function(_this) {
      return function() {
        var isChecked, item, j, len, ref;
        isChecked = selectAllCheckbox.checked;
        ref = _this._containerList.children;
        for (j = 0, len = ref.length; j < len; j++) {
          item = ref[j];
          item.children[0].checked = isChecked;
        }
        setLabelText();
        _this.emit('change');
      };
    })(this));
    return this._containerList.addEventListener('change', (function(_this) {
      return function(e) {
        var item, j, len, ref, shouldCheck;
        if (e.target === selectAllCheckbox) {
          return;
        }
        shouldCheck = true;
        ref = _this._containerList.children;
        for (j = 0, len = ref.length; j < len; j++) {
          item = ref[j];
          if (item === selectAllListItem) {
            continue;
          }
          if (!item.children[0].checked) {
            shouldCheck = false;
            break;
          }
        }
        selectAllCheckbox.checked = shouldCheck;
        setLabelText();
        _this.emit('change');
      };
    })(this));
  };

  QuestionSelectList.prototype._updateHtml = function() {
    var count, idStr, index, item, j, len, questionCountElem, ref;
    ref = this._containerList.children;
    for (j = 0, len = ref.length; j < len; j++) {
      item = ref[j];
      questionCountElem = item.getElementsByClassName('questionCount')[0];
      idStr = item.dataset.filterId;
      index = parseInt(item.dataset.index);
      if (idStr === SELECT_ALL_ID) {
        questionCountElem.innerHTML = this._questionIds.length;
        count = this._questionIds.length;
      } else if ((idStr == null) || isNaN(index)) {
        continue;
      } else {
        count = this._currentQuestionIdsByFilter[index].length;
        questionCountElem.innerHTML = count;
      }
      if (count === 0) {
        item.classList.add('emptyFilter');
      } else {
        item.classList.remove('emptyFilter');
      }
    }
  };

  QuestionSelectList.prototype._getSelectedFilterIndexes = function() {
    var index, item, j, len, ref, selectedFilterIndexes;
    selectedFilterIndexes = [];
    ref = this._containerList.children;
    for (j = 0, len = ref.length; j < len; j++) {
      item = ref[j];
      index = parseInt(item.dataset.index);
      if (!item.children[0].checked || isNaN(index)) {
        continue;
      }
      selectedFilterIndexes.push(index);
    }
    return selectedFilterIndexes;
  };

  QuestionSelectList.prototype.getFilteredQuestionIds = function() {
    var copiedCount, i, index, j, k, l, len, len1, len2, qId, questionIdOut, ref, selectedFilterIndexes;
    selectedFilterIndexes = this._getSelectedFilterIndexes();
    questionIdOut = [];
    if (this._shuffleOutput) {
      i = 0;
      while (true) {
        copiedCount = 0;
        for (j = 0, len = selectedFilterIndexes.length; j < len; j++) {
          index = selectedFilterIndexes[j];
          if (this._currentQuestionIdsByFilter[index][i] != null) {
            questionIdOut.push(this._currentQuestionIdsByFilter[index][i]);
            copiedCount++;
          }
        }
        i++;
        if (copiedCount === 0) {
          break;
        }
      }
    } else {
      for (k = 0, len1 = selectedFilterIndexes.length; k < len1; k++) {
        index = selectedFilterIndexes[k];
        ref = this._currentQuestionIdsByFilter[index];
        for (l = 0, len2 = ref.length; l < len2; l++) {
          qId = ref[l];
          questionIdOut.push(qId);
        }
      }
    }
    return questionIdOut;
  };

  QuestionSelectList.prototype.getSelectedFilterIds = function() {
    return this._getSelectedFilterIndexes().map((function(_this) {
      return function(i) {
        return _this._filters[i].id;
      };
    })(this));
  };

  return QuestionSelectList;

})(EventEmitter);


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {
  cacheHit: 'cacheHit'
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var applyFnArray;

applyFnArray = __webpack_require__(20);

module.exports = function(externalItem, tag, decorators) {
  if (externalItem == null) {
    return null;
  }
  if (tag != null) {
    return applyFnArray(externalItem, decorators[tag], null, true);
  }
  return externalItem;
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function(item, fnArr, additionalParam, checkForReturnValue) {
  var fn, i, len, originalItem;
  if (fnArr == null) {
    return item;
  }
  originalItem = item;
  for (i = 0, len = fnArr.length; i < len; i++) {
    fn = fnArr[i];
    item = fn(item, additionalParam);
    if (checkForReturnValue && item !== originalItem) {
      throw new Error('processor function must return modified item, not new object');
    }
  }
  return item;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var applyFnArray;

applyFnArray = __webpack_require__(20);

module.exports = function(externalItem, tag, validators) {
  var err;
  if (tag != null) {
    try {
      applyFnArray(externalItem, validators[tag], true, false);
    } catch (error) {
      err = error;
      console.warn("validation failed - tag: " + tag, externalItem);
      throw err;
    }
  }
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var StorageFullError,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = StorageFullError = (function(superClass) {
  extend(StorageFullError, superClass);

  function StorageFullError() {
    StorageFullError.__super__.constructor.apply(this, arguments);
  }

  return StorageFullError;

})(Error);


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function() {
  var structure;
  structure = {
    location: {},
    byTag: {},
    byQuery: [],
    LOCATIONS: {
      DB: 'db',
      MEMORY_STORE: 'memoryStore'
    }
  };
  return structure;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var validate;

validate = __webpack_require__(0);

module.exports = function(id, eventInfoCb, store, structure) {
  validate([id, eventInfoCb], ['id', 'function']);
  switch (structure.location[id]) {
    case structure.LOCATIONS.DB:
      return store.db.readItem(id);
    case structure.LOCATIONS.MEMORY_STORE:
      return store.memory.readItem(id);
    default:
      return null;
  }
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var testObj;

testObj = function(obj, template) {
  var key, value;
  if (typeof obj !== 'object') {
    return false;
  }
  for (key in template) {
    value = template[key];
    if (typeof value === 'function') {
      if (!value(obj[key])) {
        return false;
      }
    } else if (typeof value === 'object') {
      if (!testObj(obj[key], value)) {
        return false;
      }
    } else {
      if (obj[key] !== value) {
        return false;
      }
    }
  }
  return true;
};

module.exports = function(item, itemQuery, metaQuery) {
  return testObj(item.item, itemQuery) && testObj(item.meta, metaQuery);
};

module.exports.testObj = testObj;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var hasProp = {}.hasOwnProperty;

module.exports = function(query) {
  var itemQuery, key, metaQuery, value;
  metaQuery = {};
  itemQuery = {};
  for (key in query) {
    if (!hasProp.call(query, key)) continue;
    value = query[key];
    if (key[0] === '$') {
      metaQuery[key.slice(1)] = value;
    } else {
      itemQuery[key] = value;
    }
  }
  return {
    item: itemQuery,
    meta: metaQuery
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var cloneValue, getNextId, validateArguments;

getNextId = __webpack_require__(75);

cloneValue = __webpack_require__(9);

validateArguments = __webpack_require__(0);

module.exports = function(arg, eventInfoCb, store) {
  var id, isExisting, item, meta, metaItem, newMeta, persistent;
  item = arg.item, meta = arg.meta, isExisting = arg.isExisting;
  validateArguments([item, meta, isExisting, eventInfoCb], ['object', 'object', 'boolean', 'function']);
  if (isExisting) {
    newMeta = meta;
  } else {
    id = getNextId(store);
    if (meta.persistent === true) {
      persistent = true;
    } else {
      persistent = false;
    }
    newMeta = {
      id: id,
      tag: meta.tag,
      persistent: persistent,
      writeTime: Date.now()
    };
  }
  metaItem = {
    item: cloneValue(item),
    meta: newMeta
  };
  if (newMeta.persistent) {
    store.db.writeItem(newMeta.id, metaItem);
  } else {
    store.memory.writeItem(newMeta.id, metaItem);
  }
  return metaItem;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var validateArguments;

validateArguments = __webpack_require__(0);

module.exports = function(itemId, eventInfoCb, store, structure) {
  validateArguments([itemId, eventInfoCb], ['id', 'function']);
  switch (structure.location[itemId]) {
    case structure.LOCATIONS.DB:
      return store.db.removeItem(itemId);
    case structure.LOCATIONS.MEMORY_STORE:
      return store.memory.removeItem(itemId);
    default:
      return null;
  }
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var getInternalItem, getItemId, removeItem, removeItemFromStore, updateStructure, validateArguments;

validateArguments = __webpack_require__(0);

removeItemFromStore = __webpack_require__(28);

updateStructure = __webpack_require__(4);

getInternalItem = __webpack_require__(7);

getItemId = function(item, expectInternalItem) {
  if (validateArguments.matches([item], ['id'])) {
    return item;
  }
  if (expectInternalItem) {
    validateArguments([item], ['internalItem']);
    return item.meta.id;
  }
  validateArguments([item], ['externalItem']);
  return getInternalItem(item).meta.id;
};

removeItem = module.exports = function(state, eventInfoCb, item, expectInternalItem) {
  var itemId, removedItem, removedItems;
  if (expectInternalItem == null) {
    expectInternalItem = false;
  }
  if (Array.isArray(item)) {
    removedItems = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = item.length; i < len; i++) {
        item = item[i];
        results.push(removeItem(state, item));
      }
      return results;
    })();
    return removedItems;
  }
  validateArguments([item, eventInfoCb], ['id|externalItem|internalItem', 'function']);
  itemId = getItemId(item, expectInternalItem);
  removedItem = removeItemFromStore(itemId, eventInfoCb, state.store, state.structure);
  if (removedItem != null) {
    state.structure = updateStructure.remove(state.structure, removedItem, state.store);
  }
  return removedItem;
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function(traceStr, sliceIndex) {
  var lines;
  lines = traceStr.split('\n');
  lines.splice(1, 1 + sliceIndex);
  return lines.join('\n');
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var CONFIG, MESSAGES, STORE_TAGS, bindErrorListeners, bindMobileMenuToggle, bindSidemenuManager, getLoaderManager, loaderManager, prepareStore, questionTypes, setupScreenManager, validateArguments;

__webpack_require__(32);

CONFIG = __webpack_require__(2);

MESSAGES = __webpack_require__(1);

STORE_TAGS = __webpack_require__(13);

window.util = __webpack_require__(40);

validateArguments = __webpack_require__(15);

bindErrorListeners = __webpack_require__(43);

setupScreenManager = __webpack_require__(44);

prepareStore = __webpack_require__(58);

bindSidemenuManager = __webpack_require__(96);

getLoaderManager = __webpack_require__(97);

bindMobileMenuToggle = __webpack_require__(98);

questionTypes = __webpack_require__(99);

bindErrorListeners();

window.validateArguments = validateArguments;

window.db = {
  questionTypes: questionTypes,
  STORE_TAGS: STORE_TAGS
};

document.title = MESSAGES.tabTitle;

document.getElementById('pageTitle').innerHTML = MESSAGES.pageTitle;

bindMobileMenuToggle(document.getElementById('mobileMenuToggle'), document.getElementById('sidebar'), document.getElementById('mobilePageCover'));

loaderManager = getLoaderManager(document.getElementById('loaderCover'));

loaderManager.show(CONFIG.loaderScreenTimeout);

prepareStore().then(function() {
  loaderManager.hide();
  setupScreenManager();
  return bindSidemenuManager(document.getElementById('navList'));
});


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

if (window.Promise == null) {
  window.Promise = __webpack_require__(33);
}

if (window.Symbol == null) {
  window.Symbol = function(name) {
    return '@@_' + name.split(' ').join('-') + '_@@';
  };
}

if (Object.assign == null) {
  Object.assign = __webpack_require__(38);
}

if (Array.prototype.fill == null) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: __webpack_require__(39)
  });
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}
  
  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function() {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new (this.constructor)(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    var args = Array.prototype.slice.call(arr);

    return new Promise(function (resolve, reject) {
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
    function (fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }

})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34).setImmediate))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(35);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36), __webpack_require__(37)))

/***/ }),
/* 36 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 38 */
/***/ (function(module, exports) {

var slice = [].slice,
  hasProp = {}.hasOwnProperty;

module.exports = function() {
  var i, key, len, obj, srcObjs, targetObj, value;
  targetObj = arguments[0], srcObjs = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  for (i = 0, len = srcObjs.length; i < len; i++) {
    obj = srcObjs[i];
    for (key in obj) {
      if (!hasProp.call(obj, key)) continue;
      value = obj[key];
      targetObj[key] = value;
    }
  }
  return targetObj;
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function(fillValue, start, end) {
  var i, j, ref, ref1;
  if (!Array.isArray(this)) {
    throw new Error('`this` is not an Array');
  }
  if (start == null) {
    start = 0;
  }
  if (end == null) {
    end = this.length;
  }
  for (i = j = ref = start, ref1 = end; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
    this[i] = fillValue;
  }
  return this;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var getTestResults,
  hasProp = {}.hasOwnProperty;

getTestResults = __webpack_require__(14);

module.exports = {
  evaluateCurrentTest: function() {
    var currentTest;
    currentTest = store.findOne(db.STORE_TAGS.CURRENT_TEST);
    if (currentTest == null) {
      throw new Error('No test active');
    }
    return getTestResults(currentTest);
  },
  storage: {
    getSize: function() {
      var i, key, keyValueSize, sizes, totalSize;
      totalSize = 0;
      sizes = {
        byKey: {}
      };
      i = 0;
      while (true) {
        key = localStorage.key(i);
        i++;
        if (key == null) {
          break;
        }
        keyValueSize = (localStorage[key].length + key.length) * 2;
        totalSize += keyValueSize;
        sizes.byKey[key] = keyValueSize;
      }
      sizes.total = totalSize;
      return sizes;
    },
    clear: function() {
      var backup;
      backup = localStorage.getItem('backup');
      localStorage.clear();
      if ((backup != null) && backup !== 'null') {
        localStorage.setItem('backup', backup);
      }
    },
    setObj: function(obj) {
      var key, value;
      for (key in obj) {
        if (!hasProp.call(obj, key)) continue;
        value = obj[key];
        localStorage[key] = value;
      }
      return obj;
    },
    getObj: function() {
      return Object.assign({}, localStorage);
    },
    backup: function() {
      var backupObj, backupStr;
      backupObj = this.getObj();
      backupStr = JSON.stringify(backupObj);
      localStorage.setItem('backup', backupStr);
      return backupObj;
    },
    restoreBackup: function() {
      var backupStr, obj;
      backupStr = localStorage.getItem('backup');
      if (backupStr == null) {
        throw new Error('Could not load backup!');
      }
      obj = JSON.parse(backupStr);
      this.setObj(obj);
      return obj;
    },
    clearBackup: function() {
      return localStorage.removeItem('backup');
    }
  }
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = {
  array: function(arg, arrItemType, matchTypeFn) {
    var i, item, len;
    if (arrItemType == null) {
      arrItemType = null;
    }
    if (!Array.isArray(arg)) {
      return false;
    }
    if (arrItemType != null) {
      for (i = 0, len = arg.length; i < len; i++) {
        item = arg[i];
        if (matchTypeFn(item, arrItemType) !== true) {
          return false;
        }
      }
    }
    return true;
  },
  "null": function(arg) {
    return arg == null;
  },
  "function": function(arg) {
    return typeof arg === 'function';
  },
  string: function(arg) {
    return typeof arg === 'string';
  },
  int: function(arg) {
    return this.number(arg) && (arg % 1) === 0;
  },
  number: function(arg) {
    return typeof arg === 'number';
  },
  boolean: function(arg) {
    return typeof arg === 'boolean';
  },
  object: function(arg) {
    return (arg != null) && typeof arg === 'object';
  },
  '*': function() {
    return true;
  }
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = function(error, sliceIndex) {
  var err, lines;
  try {
    throw new error.constructor(error.message);
  } catch (error1) {
    err = error1;
    lines = err.stack.split('\n');
    lines.splice(1, 1 + sliceIndex);
    err.stack = lines.join('\n');
    return err;
  }
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var CONFIG, MESSAGES;

MESSAGES = __webpack_require__(1);

CONFIG = __webpack_require__(2);

module.exports = function() {
  var handleUncaughtError;
  handleUncaughtError = function(err) {
    var message;
    message = MESSAGES.error.errorPopup.baseMessage;
    if (CONFIG.verboseErrorMessages) {
      message += '\n\n\n' + MESSAGES.error.errorPopup.errorMessageBelow + '\n\n';
      if (err instanceof Error) {
        if (err.stack != null) {
          message += err.stack;
        } else {
          message += err.message;
        }
      } else {
        message += err;
      }
    }
    alert(message);
    return false;
  };
  window.addEventListener('error', function(msg, url, line, column, err) {
    if (err == null) {
      err = msg.message;
    }
    return handleUncaughtError(err);
  });
  return window.addEventListener('unhandledrejection', function(event) {
    return handleUncaughtError(event.reason);
  });
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var bindScreenManager, screens;

bindScreenManager = __webpack_require__(45);

screens = {
  questionSelect: __webpack_require__(46),
  browsing: __webpack_require__(48),
  evaluateSession: __webpack_require__(50),
  browseEvaluatedSession: __webpack_require__(51),
  prepareTest: __webpack_require__(52),
  practiceTest: __webpack_require__(55),
  evaluateTest: __webpack_require__(56),
  browseEvaluatedTest: __webpack_require__(57)
};

module.exports = function() {
  var container, defaultScreenName;
  container = document.getElementById('container');
  defaultScreenName = 'questionSelect';
  return bindScreenManager(container, screens, defaultScreenName);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var getHash, gotoPage, screenHash, updateView;

screenHash = __webpack_require__(16);

gotoPage = function(pageName, params) {
  window.location.hash = screenHash.generate(pageName, params);
};

updateView = function(container, screens, newHash, initialClasses) {
  var page, params, ref;
  ref = screenHash.parse(newHash), page = ref.page, params = ref.params;
  if (screens[page] == null) {
    return null;
  }
  window.scrollTo(0, 0);
  container.innerHTML = '';
  container.className = initialClasses;
  container.classList.add(page);
  screens[page](container, gotoPage, params);
  return true;
};

getHash = function() {
  return window.location.hash.slice(1);
};

module.exports = function(container, screens, defaultScreen) {
  var initialClasses;
  initialClasses = container.className;
  window.addEventListener('hashchange', function() {
    var result;
    if (getHash() !== '') {
      result = updateView(container, screens, getHash(), initialClasses);
    } else {
      result = updateView(container, screens, defaultScreen, initialClasses);
    }
    if (result == null) {
      throw new Error('Tried to go to invalid screen: ' + getHash());
    }
  });
  if (getHash() !== '') {
    if (updateView(container, screens, getHash(), initialClasses)) {
      return;
    }
  }
  updateView(container, screens, defaultScreen, initialClasses);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var MESSAGES, QuestionNumberDisplay, QuestionSelectList;

MESSAGES = __webpack_require__(1).questionSelect;

QuestionSelectList = __webpack_require__(17);

QuestionNumberDisplay = __webpack_require__(47);

module.exports = function(container, goto, params) {
  var disableSubmitButtonIfUnselected, form, i, questionIds, questionNumberDisplay, questionNumberDisplayElem, questionTypeList, questionTypeListElem, sectionList, sectionListElem, session, submitButton;
  session = store.findOne(db.STORE_TAGS.CURRENT_BROWSING_SESSION);
  if (session != null) {
    if (session.finished) {
      if (session.lastViewedIndex != null) {
        return goto('browseEvaluatedSession', {
          q: session.lastViewedIndex + 1
        });
      } else {
        return goto('evaluateSession');
      }
    } else {
      i = session.lastViewedIndex;
      if (i == null) {
        i = 0;
      }
      return goto('browsing', {
        q: i + 1
      });
    }
  }
  container.innerHTML = '<div id="questionSelection"> <h1>Procházení otázek</h1> <form class="questionForm" onsubmit="return false;"> <h2 class="sectionTitle">Oblasti:</h2> <ul class="checkboxList sectionList"></ul> <hr> <h2 class="sectionTitle">Typ otázek:</h2> <ul class="checkboxList questionTypeList"></ul> <hr> <div class="questionCounter">Počet vybraných otázek: <span class="selectedQuestionCount">0</span></div> <input class="actionButton startBrowsingButton" type="submit" value="ZAHÁJIT PROCVIČOVÁNÍ"> </form> </div>';
  questionIds = store.find(db.STORE_TAGS.QUESTION).map(function(q) {
    return q.id;
  });
  sectionListElem = container.getElementsByClassName('sectionList')[0];
  sectionList = new QuestionSelectList(sectionListElem, store.find(db.STORE_TAGS.SECTION), 'sections', questionIds, true);
  questionTypeListElem = container.getElementsByClassName('questionTypeList')[0];
  questionTypeList = new QuestionSelectList(questionTypeListElem, db.questionTypes, 'questionTypes', sectionList, false);
  questionNumberDisplayElem = container.getElementsByClassName('selectedQuestionCount')[0];
  questionNumberDisplay = new QuestionNumberDisplay(questionNumberDisplayElem, questionTypeList);
  form = container.getElementsByClassName('questionForm')[0];
  submitButton = document.getElementsByClassName('startBrowsingButton')[0];
  disableSubmitButtonIfUnselected = function() {
    if (questionNumberDisplay.getFilteredQuestionIds().length === 0) {
      submitButton.classList.add('disabled');
      return submitButton.title = MESSAGES.noSectionChecked;
    } else {
      submitButton.classList.remove('disabled');
      return submitButton.title = '';
    }
  };
  questionNumberDisplay.on('change', disableSubmitButtonIfUnselected);
  disableSubmitButtonIfUnselected();
  return form.addEventListener('submit', function() {
    var selectedQuestionTypes, selectedSections;
    questionIds = questionNumberDisplay.getFilteredQuestionIds();
    if (questionIds.length === 0) {
      alert(MESSAGES.noSectionChecked);
      return;
    }
    selectedSections = sectionList.getSelectedFilterIds();
    selectedQuestionTypes = questionTypeList.getSelectedFilterIds();
    store.add(db.STORE_TAGS.CURRENT_BROWSING_SESSION, {
      lastViewedIndex: null,
      startTime: Date.now(),
      sections: selectedSections,
      questionTypes: selectedQuestionTypes,
      questionIds: questionIds,
      finished: false,
      answers: Array(questionIds.length).fill(null)
    });
    return goto('browsing');
  });
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter, QuestionNumberDisplay, QuestionSelectList,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EventEmitter = __webpack_require__(8);

QuestionSelectList = __webpack_require__(17);

module.exports = QuestionNumberDisplay = (function(superClass) {
  extend(QuestionNumberDisplay, superClass);

  function QuestionNumberDisplay(container, questionSource) {
    this._source = questionSource;
    this._container = container;
    if (questionSource instanceof QuestionSelectList) {
      this._questionIds = questionSource.getFilteredQuestionIds();
      questionSource.on('change', (function(_this) {
        return function() {
          _this._questionIds = questionSource.getFilteredQuestionIds();
          _this._render();
          _this.emit('change');
        };
      })(this));
    } else {
      this._questionIds = questionSource;
    }
    this._render();
  }

  QuestionNumberDisplay.prototype._render = function() {
    return this._container.innerHTML = this._questionIds.length;
  };

  QuestionNumberDisplay.prototype.getFilteredQuestionIds = function() {
    var i, len, questionId, ref, results;
    ref = this._questionIds;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      questionId = ref[i];
      results.push(questionId);
    }
    return results;
  };

  return QuestionNumberDisplay;

})(EventEmitter);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var CONFIG, MESSAGES, createElem, qIndexFromParams, renderQuestion;

MESSAGES = __webpack_require__(1).browsingQuestions;

CONFIG = __webpack_require__(2);

renderQuestion = __webpack_require__(5);

createElem = __webpack_require__(3);

qIndexFromParams = function(params) {
  var index;
  if (params.q == null) {
    index = 0;
  } else {
    index = params.q - 1;
  }
  if (isNaN(index)) {
    throw new Error('Invalid params');
  }
  return index;
};

module.exports = function(container, goto, params) {
  var alreadyCorrectlyAnswered, answerSubmitCount, clickedAnswerIndexes, correctAnswerClicked, gotoQuestion, qAnswers, qIndex, question, questionContainer, sessionItem;
  sessionItem = store.findOne(db.STORE_TAGS.CURRENT_BROWSING_SESSION);
  if (sessionItem == null) {
    return goto('questionSelect');
  }
  if (sessionItem.finished) {
    return goto('browseEvaluatedSession', params);
  }
  if (sessionItem.questionIds.length === 0) {
    store.removeByQuery(db.STORE_TAGS.CURRENT_BROWSING_SESSION);
    return goto('questionSelect');
  }
  qIndex = qIndexFromParams(params);
  sessionItem.lastViewedIndex = qIndex;
  store.update(sessionItem);
  gotoQuestion = function(i) {
    return goto('browsing', Object.assign({}, params, {
      q: i + 1
    }));
  };
  question = store.findOne({
    $tag: db.STORE_TAGS.QUESTION,
    id: sessionItem.questionIds[qIndex]
  });
  qAnswers = sessionItem.answers[qIndex];
  alreadyCorrectlyAnswered = (qAnswers != null) && qAnswers.filter(function(a) {
    return a.correctlyAnswered;
  }).length === 1;
  questionContainer = createElem('div .questionView .browsingMode');
  container.appendChild(questionContainer);
  answerSubmitCount = -1;
  correctAnswerClicked = false;
  clickedAnswerIndexes = [];
  renderQuestion({
    question: question,
    questionCount: sessionItem.questionIds.length,
    questionIndex: qIndex,
    container: questionContainer,
    shuffleAnswers: CONFIG.shuffleAnswers.browsingMode,
    messages: {
      backButton: MESSAGES.evaluateSessionButton
    },
    handlers: {
      gotoQuestion: gotoQuestion,
      lastQuestionAnswer: function() {
        return goto('evaluateSession');
      },
      backButtonClick: function() {
        return goto('evaluateSession');
      },
      prepareView: function(highlightAnswer, highlightQuestion) {
        var answer, i, j, k, l, len, len1, len2, questionAnswers, ref, ref1;
        ref = sessionItem.answers;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          questionAnswers = ref[i];
          if ((questionAnswers == null) || questionAnswers.length === 0) {
            continue;
          }
          if (questionAnswers.length === 1 && questionAnswers[0].correctlyAnswered) {
            highlightQuestion(i, 'correct');
          } else {
            highlightQuestion(i, 'incorrect');
          }
        }
        if (qAnswers != null) {
          for (k = 0, len1 = qAnswers.length; k < len1; k++) {
            answer = qAnswers[k];
            highlightAnswer(answer.selectedAnswerIndex, answer.correctlyAnswered ? 'correct' : 'incorrectWithoutAnimation');
          }
        }
        if (alreadyCorrectlyAnswered) {
          ref1 = question.answers;
          for (i = l = 0, len2 = ref1.length; l < len2; i = ++l) {
            answer = ref1[i];
            highlightAnswer(i, '_');
          }
        }
      },
      answerClick: function(arg, highlightAnswer) {
        var answer, highlightType, index, saveAnswer;
        answer = arg.answer, index = arg.index;
        if (alreadyCorrectlyAnswered) {
          return true;
        }
        if (correctAnswerClicked) {
          return;
        }
        if (clickedAnswerIndexes.indexOf(index) > -1) {
          return;
        }
        clickedAnswerIndexes.push(index);
        answerSubmitCount++;
        saveAnswer = function(attempt) {
          var answerObj;
          answerObj = {
            mode: 'browsing',
            time: Date.now(),
            correctlyAnswered: answer.correct,
            selectedAnswerIndex: index,
            questionId: question.id,
            sections: params.sections,
            questionTypes: params.questionTypes,
            questionIndex: qIndex,
            attemptNumber: attempt
          };
          store.add(db.STORE_TAGS.ANSWER, answerObj);
          if (sessionItem.answers[qIndex] == null) {
            sessionItem.answers[qIndex] = [];
          }
          sessionItem.answers[qIndex].push(answerObj);
          return store.update(sessionItem);
        };
        highlightType = answer.correct ? 'correct' : 'incorrect';
        highlightAnswer(index, highlightType);
        saveAnswer(answerSubmitCount);
        if (answer.correct) {
          correctAnswerClicked = true;
          return new Promise(function(resolve) {
            return setTimeout((function() {
              return resolve(true);
            }), CONFIG.answerClickTimeout);
          });
        }
      }
    }
  });
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter, MESSAGES, QuestionView, createElem, generateAnswerList, generateQuestionElem, renderQuestionImage,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EventEmitter = __webpack_require__(8);

MESSAGES = __webpack_require__(1).questionView;

createElem = __webpack_require__(3);

renderQuestionImage = function(img, container) {
  container.classList.add('singleImg');
  return container.innerHTML = '<img src="' + img.url + '">';
};

generateQuestionElem = function(question, value) {
  var img, questionContainer, questionImage, questionText, questionValue;
  questionContainer = document.createElement('div');
  questionContainer.className = 'questionContainer';
  questionValue = document.createElement('div');
  questionValue.classList.add('questionValue');
  if (value === 1) {
    questionValue.innerHTML = value + ' ' + MESSAGES.point;
  } else {
    questionValue.innerHTML = value + ' ' + MESSAGES.points;
  }
  questionContainer.appendChild(questionValue);
  questionText = document.createElement('div');
  questionText.classList.add('questionText');
  questionText.innerHTML = question.text;
  questionContainer.appendChild(questionText);
  if (question.img != null) {
    questionImage = document.createElement('div');
    questionImage.className = 'questionImage';
    img = question.img;
    renderQuestionImage(img, questionImage);
    questionContainer.appendChild(questionImage);
  }
  return questionContainer;
};

generateAnswerList = function(answers) {
  var answer, answersContainImg, content, i, item, j, len, list;
  answersContainImg = answers[0].img != null;
  list = document.createElement('ul');
  list.classList.add('answerList');
  if (answersContainImg) {
    list.classList.add('imgAnswerList');
  } else {
    list.classList.add('textAnswerList');
  }
  for (i = j = 0, len = answers.length; j < len; i = ++j) {
    answer = answers[i];
    if (answersContainImg) {
      content = [createElem("img src='" + answer.img.url + "'"), createElem('div .answerImageCover')];
    } else {
      content = [answer.text];
    }
    item = createElem("li data-index='" + i + "'", [createElem('a href="javascript:void(0);"', content)]);
    list.appendChild(item);
  }
  return list;
};

module.exports = QuestionView = (function(superClass) {
  extend(QuestionView, superClass);

  function QuestionView(question) {
    this._question = question;
    this._elems = {
      questionElem: generateQuestionElem(question.question, question.value),
      answerList: generateAnswerList(question.answers)
    };
    this._bindEvents();
  }

  QuestionView.prototype.shuffleAnswers = function() {
    var i, j, list, ref;
    list = this._elems.answerList;
    for (i = j = 1, ref = list.children.length; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      list.appendChild(list.children[Math.floor(Math.random() * i)]);
    }
  };

  QuestionView.prototype.renderTo = function(container) {
    container.innerHTML = '';
    container.appendChild(this._elems.questionElem);
    container.appendChild(this._elems.answerList);
  };

  QuestionView.prototype.highlightAnswer = function(index, highlightClass) {
    var answerElem, i, j, len, ref;
    ref = this._elems.answerList.children;
    for (j = 0, len = ref.length; j < len; j++) {
      answerElem = ref[j];
      i = parseInt(answerElem.dataset.index);
      if (i === index) {
        this._highlightElem(answerElem, highlightClass);
        return true;
      }
    }
    return false;
  };

  QuestionView.prototype._highlightElem = function(elem, highlightClass) {
    var pointer;
    if ((highlightClass != null) && highlightClass !== '') {
      elem.classList.add('clickedAnswer');
      elem.classList.add(highlightClass + 'Answer');
      return highlightClass + 'Answer';
    } else {
      pointer = 0;
      while (pointer < elem.classList.length) {
        if (/.+Answer/.test(elem.classList[pointer])) {
          elem.classList.remove(elem.classList[pointer]);
        } else {
          pointer++;
        }
      }
      return null;
    }
  };

  QuestionView.prototype._bindEvents = function() {
    var answerList;
    answerList = this._elems.answerList;
    answerList.addEventListener('click', (function(_this) {
      return function(e) {
        var answer, index, target;
        target = e.target;
        while (!(target instanceof HTMLLIElement)) {
          if (target === answerList) {
            return;
          }
          target = target.parentNode;
        }
        index = parseInt(target.dataset.index);
        answer = _this._question.answers[index];
        _this.emit('answerClick', {
          answer: answer,
          index: index
        });
      };
    })(this));
  };

  return QuestionView;

})(EventEmitter);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var CONFIG, MESSAGES, e, getResults, renderQuestionList, renderSuccessBar;

CONFIG = __webpack_require__(2);

MESSAGES = __webpack_require__(1).evaluateTest;

e = __webpack_require__(3);

getResults = function(sessionObj) {
  var existingAnswers;
  existingAnswers = sessionObj.answers.filter(function(answerArr) {
    return (answerArr != null) && answerArr.length > 0;
  });
  return {
    score: existingAnswers.filter(function(answerArr) {
      return answerArr.length === 1;
    }).length,
    maxScore: existingAnswers.length
  };
};

renderSuccessBar = function(score, maxScore) {
  var container, percentage, percentageStr, scoreLine;
  percentage = Math.round(score / maxScore * 100);
  if (isNaN(percentage)) {
    percentage = 0;
    percentageStr = '-';
  } else {
    percentageStr = percentage;
  }
  container = e('div .scoreBarContainer .succeeded', [e('div .scoreBarLabels', [e('div .scoreBarPoints', [score + ' / ' + maxScore + ' ' + MESSAGES.ofNPoints]), e('div .scoreBarPercentage', [percentageStr + ' %'])]), e('div .scoreBar', [scoreLine = e('div .scoreBarLine')])]);
  scoreLine.style.width = percentage + '%';
  return container;
};

renderQuestionList = function(session, goto) {
  var i, itemClass, items, qAnswers, question, questionAnswerList, questionId;
  items = (function() {
    var j, len, ref, results;
    ref = session.questionIds;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      questionId = ref[i];
      qAnswers = session.answers[i];
      if ((qAnswers == null) || qAnswers.length === 0) {
        continue;
      }
      question = store.findOne({
        $tag: db.STORE_TAGS.QUESTION,
        id: questionId
      });
      if (question == null) {
        continue;
      }
      itemClass = '';
      if (qAnswers.length === 1) {
        itemClass = '.correct';
      } else {
        itemClass = '.incorrect';
      }
      results.push((function(i) {
        var item, link;
        item = e('li ' + itemClass, [link = e('a .linkToQuestion', [e('div .questionIndex', [i + 1]), e('div .questionText', [question.question.text])])]);
        link.title = question.question.text;
        link.href = 'javascript:void(0);';
        link.addEventListener('click', function() {
          return goto('browseEvaluatedSession', {
            q: i + 1
          });
        });
        return item;
      })(i));
    }
    return results;
  })();
  questionAnswerList = e('ul .questionAnswerList', items);
  return questionAnswerList;
};

module.exports = function(container, goto) {
  var backButton, currentSession, resultContainer, sessionResults;
  currentSession = store.findOne(db.STORE_TAGS.CURRENT_BROWSING_SESSION);
  if (currentSession == null) {
    return goto('questionSelect');
  }
  currentSession.lastViewedIndex = null;
  store.update(currentSession);
  if (!currentSession.finished) {
    sessionResults = getResults(currentSession);
    currentSession.results = sessionResults;
    currentSession.finished = true;
    store.update(currentSession);
  } else {
    sessionResults = currentSession.results;
  }
  resultContainer = e('div .testResults');
  container.appendChild(resultContainer);
  resultContainer.appendChild(e(null, [e('h1', ['Vyhodnocení projitých otázek']), backButton = e('a .backToTest href="javascript:void(0);"', ['Zpět k výběru otázek']), e('br'), renderSuccessBar(sessionResults.score, sessionResults.maxScore), renderQuestionList(currentSession, goto)]));
  return backButton.addEventListener('click', function() {
    store.removeByQuery(db.STORE_TAGS.CURRENT_BROWSING_SESSION);
    goto('questionSelect');
  });
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var CONFIG, MESSAGES, createElem, qIndexFromParams, renderQuestion;

MESSAGES = __webpack_require__(1).browsingQuestions;

CONFIG = __webpack_require__(2);

renderQuestion = __webpack_require__(5);

createElem = __webpack_require__(3);

qIndexFromParams = function(params) {
  var index;
  if (params.q == null) {
    index = 0;
  } else {
    index = params.q - 1;
  }
  if (isNaN(index)) {
    throw new Error('Invalid params');
  }
  return index;
};

module.exports = function(container, goto, params) {
  var gotoQuestion, qIndex, question, questionContainer, session;
  session = store.findOne(db.STORE_TAGS.CURRENT_BROWSING_SESSION);
  if (session == null) {
    return goto('questionSelect');
  }
  if (!session.finished) {
    return goto('browsing', params);
  }
  qIndex = qIndexFromParams(params);
  gotoQuestion = function(i) {
    return goto('browseEvaluatedSession', Object.assign({}, params, {
      q: i + 1
    }));
  };
  session.lastViewedIndex = qIndex;
  store.update(session);
  question = store.findOne({
    $tag: db.STORE_TAGS.QUESTION,
    id: session.questionIds[qIndex]
  });
  questionContainer = createElem('div .questionView .browsingMode .showResults');
  container.appendChild(questionContainer);
  renderQuestion({
    question: question,
    questionCount: session.questionIds.length,
    questionIndex: qIndex,
    container: questionContainer,
    shuffleAnswers: CONFIG.shuffleAnswers.testMode,
    messages: {
      backButton: MESSAGES.backToEvaluating
    },
    handlers: {
      gotoQuestion: gotoQuestion,
      lastQuestionAnswer: function() {
        return gotoQuestion(0);
      },
      backButtonClick: function() {
        return goto('evaluateSession');
      },
      prepareView: function(highlightAnswer, highlightQuestion) {
        var answer, correctAnswerClicked, i, j, k, l, len, len1, len2, len3, m, qAnswers, questionAnswers, ref, ref1, ref2, results;
        ref = session.answers;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          questionAnswers = ref[i];
          if ((questionAnswers == null) || questionAnswers.length === 0) {
            highlightQuestion(i, 'unanswered');
          } else if (questionAnswers.length === 1 && questionAnswers[0].correctlyAnswered) {
            highlightQuestion(i, 'correct');
          } else {
            highlightQuestion(i, 'incorrect');
          }
        }
        qAnswers = session.answers[qIndex];
        if (qAnswers == null) {
          correctAnswerClicked = false;
        } else {
          correctAnswerClicked = qAnswers.filter(function(a) {
            return a.correctlyAnswered;
          }).length > 0;
        }
        if (qAnswers != null) {
          for (k = 0, len1 = qAnswers.length; k < len1; k++) {
            answer = qAnswers[k];
            highlightAnswer(answer.selectedAnswerIndex, answer.correctlyAnswered ? 'correct' : 'incorrectWithoutAnimation');
          }
          ref1 = question.answers;
          for (i = l = 0, len2 = ref1.length; l < len2; i = ++l) {
            answer = ref1[i];
            highlightAnswer(i, '_');
          }
        }
        if (!correctAnswerClicked) {
          ref2 = question.answers;
          results = [];
          for (i = m = 0, len3 = ref2.length; m < len3; i = ++m) {
            answer = ref2[i];
            if (answer.correct) {
              results.push(highlightAnswer(i, 'correctUnanswered'));
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      },
      answerClick: function() {
        return true;
      }
    }
  });
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var Highcharts, generateTest, getChartConfig, renderFinishedTestChart;

generateTest = __webpack_require__(53);

Highcharts = __webpack_require__(54);

getChartConfig = function(maxScore, testScores, passScores) {
  return {
    chart: {
      spacing: [5, 5, 5, 5]
    },
    title: null,
    subtitle: null,
    xAxis: {
      minPadding: 0.05,
      softMax: 8,
      visible: false
    },
    yAxis: {
      min: 0,
      max: maxScore,
      title: null,
      tickPositions: [0, maxScore / 5, maxScore * 2 / 5, maxScore * 3 / 5, maxScore * 4 / 5, maxScore]
    },
    legend: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      line: {
        animation: {
          duration: 800
        },
        enableMouseTracking: false,
        marker: {
          enabled: testScores.length < 2
        }
      }
    },
    series: [
      {
        data: testScores
      }, {
        data: passScores,
        lineWidth: 1,
        dashStyle: 'LongDash'
      }
    ]
  };
};

renderFinishedTestChart = function(container, testResults) {
  var maxScore, passScores, testScores;
  maxScore = Math.max.apply(Math, testResults.map(function(test) {
    return test.maxScore;
  }));
  testScores = testResults.map(function(test) {
    return test.score;
  });
  passScores = testResults.map(function(test) {
    return test.passScore;
  });
  Highcharts.chart(container, getChartConfig(maxScore, testScores, passScores));
};

module.exports = function(container, goto) {
  var currentTest, i, items, startButton, testChartContainer, testChartLabel;
  currentTest = store.findOne(db.STORE_TAGS.CURRENT_TEST);
  if (currentTest != null) {
    if (currentTest.finished) {
      if (currentTest.lastViewedIndex != null) {
        return goto('browseEvaluatedTest', {
          q: currentTest.lastViewedIndex + 1
        });
      } else {
        return goto('evaluateTest');
      }
    } else {
      i = currentTest.lastViewedIndex;
      if (i == null) {
        i = 0;
      }
      return goto('practiceTest', {
        q: i + 1
      });
    }
  }
  container.innerHTML = '<h1>Cvičný test</h1> <div class="finishedTestLabel">Výsledky předchozích testů:</div> <div class="finishedTestChart"></div> <button class="actionButton startTestButton">ZAHÁJIT NOVÝ CVIČNÝ TEST</button>';
  testChartContainer = container.getElementsByClassName('finishedTestChart')[0];
  items = store.find(db.STORE_TAGS.PRACTICE_TEST);
  if (items.length > 0) {
    renderFinishedTestChart(testChartContainer, items);
  } else {
    testChartLabel = container.getElementsByClassName('finishedTestLabel')[0];
    testChartLabel.style.display = 'none';
    testChartContainer.style.display = 'none';
  }
  startButton = container.getElementsByClassName('startTestButton')[0];
  return startButton.addEventListener('click', function() {
    var test;
    test = generateTest();
    store.add(db.STORE_TAGS.CURRENT_TEST, test);
    return goto('practiceTest');
  });
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var CONFIG, getRandomQuestions, getTestQuestionIds;

CONFIG = __webpack_require__(2);

getRandomQuestions = function(sectionIds, count) {
  var i, j, len, len1, questionId, questionIds, ref, section, sectionId, selectedQuestions;
  questionIds = [];
  for (i = 0, len = sectionIds.length; i < len; i++) {
    sectionId = sectionIds[i];
    section = store.findOne({
      $tag: db.STORE_TAGS.SECTION,
      id: sectionId
    });
    if (section != null) {
      ref = section.questions;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        questionId = ref[j];
        questionIds.push(questionId);
      }
    } else {
      throw new Error('Missing section: ' + sectionId);
    }
  }
  if (questionIds.length < count) {
    throw new Error("Too few questions for sections: " + (sectionIds.join(', ')));
  }
  selectedQuestions = [];
  while (selectedQuestions.length < count) {
    questionId = questionIds[Math.floor(Math.random() * questionIds.length)];
    if (selectedQuestions.indexOf(questionId) < 0) {
      selectedQuestions.push(questionId);
    }
  }
  return selectedQuestions;
};

getTestQuestionIds = function() {
  var i, len, questions, ref, section, sectionIds;
  questions = [];
  ref = CONFIG.testComposition;
  for (i = 0, len = ref.length; i < len; i++) {
    section = ref[i];
    if (typeof section[0] === 'number') {
      sectionIds = [section[0]];
    } else {
      sectionIds = section[0];
    }
    questions.push.apply(questions, getRandomQuestions(sectionIds, section[1]));
  }
  return questions;
};

module.exports = function() {
  var questionIds;
  questionIds = getTestQuestionIds();
  return {
    startTime: Date.now(),
    finished: false,
    lastViewedIndex: null,
    questionIds: questionIds,
    answers: Array(25).fill(null),
    results: null
  };
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

/*
 Highcharts JS v5.0.11 (2017-05-04)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(L,S){"object"===typeof module&&module.exports?module.exports=L.document?S(L):S:L.Highcharts=S(L)})("undefined"!==typeof window?window:this,function(L){L=function(){var a=window,D=a.document,A=a.navigator&&a.navigator.userAgent||"",G=D&&D.createElementNS&&!!D.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,F=/(edge|msie|trident)/i.test(A)&&!window.opera,n=!G,f=/Firefox/.test(A),h=f&&4>parseInt(A.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highcharts",
version:"5.0.11",deg2rad:2*Math.PI/360,doc:D,hasBidiBug:h,hasTouch:D&&void 0!==D.documentElement.ontouchstart,isMS:F,isWebKit:/AppleWebKit/.test(A),isFirefox:f,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(A),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:G,vml:n,win:a,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[]}}();(function(a){var D=[],A=a.charts,G=a.doc,F=a.win;a.error=function(n,f){n=a.isNumber(n)?"Highcharts error #"+
n+": www.highcharts.com/errors/"+n:n;if(f)throw Error(n);F.console&&console.log(n)};a.Fx=function(a,f,h){this.options=f;this.elem=a;this.prop=h};a.Fx.prototype={dSetter:function(){var a=this.paths[0],f=this.paths[1],h=[],l=this.now,w=a.length,t;if(1===l)h=this.toD;else if(w===f.length&&1>l)for(;w--;)t=parseFloat(a[w]),h[w]=isNaN(t)?a[w]:l*parseFloat(f[w]-t)+t;else h=f;this.elem.attr("d",h,null,!0)},update:function(){var a=this.elem,f=this.prop,h=this.now,l=this.options.step;if(this[f+"Setter"])this[f+
"Setter"]();else a.attr?a.element&&a.attr(f,h,null,!0):a.style[f]=h+this.unit;l&&l.call(a,h,this)},run:function(a,f,h){var n=this,w=function(a){return w.stopped?!1:n.step(a)},t;this.startTime=+new Date;this.start=a;this.end=f;this.unit=h;this.now=this.start;this.pos=0;w.elem=this.elem;w.prop=this.prop;w()&&1===D.push(w)&&(w.timerId=setInterval(function(){for(t=0;t<D.length;t++)D[t]()||D.splice(t--,1);D.length||clearInterval(w.timerId)},13))},step:function(n){var f=+new Date,h,l=this.options,w=this.elem,
t=l.complete,e=l.duration,d=l.curAnim;w.attr&&!w.element?n=!1:n||f>=e+this.startTime?(this.now=this.end,this.pos=1,this.update(),h=d[this.prop]=!0,a.objectEach(d,function(a){!0!==a&&(h=!1)}),h&&t&&t.call(w),n=!1):(this.pos=l.easing((f-this.startTime)/e),this.now=this.start+(this.end-this.start)*this.pos,this.update(),n=!0);return n},initPath:function(n,f,h){function l(a){var b,c;for(u=a.length;u--;)b="M"===a[u]||"L"===a[u],c=/[a-zA-Z]/.test(a[u+3]),b&&c&&a.splice(u+1,0,a[u+1],a[u+2],a[u+1],a[u+2])}
function w(a,c){for(;a.length<x;){a[0]=c[x-a.length];var k=a.slice(0,b);[].splice.apply(a,[0,0].concat(k));B&&(k=a.slice(a.length-b),[].splice.apply(a,[a.length,0].concat(k)),u--)}a[0]="M"}function t(a,k){for(var p=(x-a.length)/b;0<p&&p--;)c=a.slice().splice(a.length/I-b,b*I),c[0]=k[x-b-p*b],C&&(c[b-6]=c[b-2],c[b-5]=c[b-1]),[].splice.apply(a,[a.length/I,0].concat(c)),B&&p--}f=f||"";var e,d=n.startX,m=n.endX,C=-1<f.indexOf("C"),b=C?7:3,x,c,u;f=f.split(" ");h=h.slice();var B=n.isArea,I=B?2:1,k;C&&(l(f),
l(h));if(d&&m){for(u=0;u<d.length;u++)if(d[u]===m[0]){e=u;break}else if(d[0]===m[m.length-d.length+u]){e=u;k=!0;break}void 0===e&&(f=[])}f.length&&a.isNumber(e)&&(x=h.length+e*I*b,k?(w(f,h),t(h,f)):(w(h,f),t(f,h)));return[f,h]}};a.extend=function(a,f){var n;a||(a={});for(n in f)a[n]=f[n];return a};a.merge=function(){var n,f=arguments,h,l={},w=function(f,e){"object"!==typeof f&&(f={});a.objectEach(e,function(d,m){!a.isObject(d,!0)||a.isClass(d)||a.isDOMElement(d)?f[m]=e[m]:f[m]=w(f[m]||{},d)});return f};
!0===f[0]&&(l=f[1],f=Array.prototype.slice.call(f,2));h=f.length;for(n=0;n<h;n++)l=w(l,f[n]);return l};a.pInt=function(a,f){return parseInt(a,f||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(n,f){return!!n&&"object"===typeof n&&(!f||!a.isArray(n))};a.isDOMElement=function(n){return a.isObject(n)&&"number"===typeof n.nodeType};a.isClass=function(n){var f=
n&&n.constructor;return!(!a.isObject(n,!0)||a.isDOMElement(n)||!f||!f.name||"Object"===f.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=function(a,f){for(var n=a.length;n--;)if(a[n]===f){a.splice(n,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(n,f,h){var l;a.isString(f)?a.defined(h)?n.setAttribute(f,h):n&&n.getAttribute&&(l=n.getAttribute(f)):a.defined(f)&&a.isObject(f)&&a.objectEach(f,function(a,f){n.setAttribute(f,a)});return l};a.splat=
function(n){return a.isArray(n)?n:[n]};a.syncTimeout=function(a,f,h){if(f)return setTimeout(a,f,h);a.call(0,h)};a.pick=function(){var a=arguments,f,h,l=a.length;for(f=0;f<l;f++)if(h=a[f],void 0!==h&&null!==h)return h};a.css=function(n,f){a.isMS&&!a.svg&&f&&void 0!==f.opacity&&(f.filter="alpha(opacity\x3d"+100*f.opacity+")");a.extend(n.style,f)};a.createElement=function(n,f,h,l,w){n=G.createElement(n);var t=a.css;f&&a.extend(n,f);w&&t(n,{padding:0,border:"none",margin:0});h&&t(n,h);l&&l.appendChild(n);
return n};a.extendClass=function(n,f){var h=function(){};h.prototype=new n;a.extend(h.prototype,f);return h};a.pad=function(a,f,h){return Array((f||2)+1-String(a).length).join(h||0)+a};a.relativeLength=function(a,f){return/%$/.test(a)?f*parseFloat(a)/100:parseFloat(a)};a.wrap=function(a,f,h){var l=a[f];a[f]=function(){var a=Array.prototype.slice.call(arguments),f=arguments,e=this;e.proceed=function(){l.apply(e,arguments.length?arguments:f)};a.unshift(l);a=h.apply(this,a);e.proceed=null;return a}};
a.getTZOffset=function(n){var f=a.Date;return 6E4*(f.hcGetTimezoneOffset&&f.hcGetTimezoneOffset(n)||f.hcTimezoneOffset||0)};a.dateFormat=function(n,f,h){if(!a.defined(f)||isNaN(f))return a.defaultOptions.lang.invalidDate||"";n=a.pick(n,"%Y-%m-%d %H:%M:%S");var l=a.Date,w=new l(f-a.getTZOffset(f)),t=w[l.hcGetHours](),e=w[l.hcGetDay](),d=w[l.hcGetDate](),m=w[l.hcGetMonth](),C=w[l.hcGetFullYear](),b=a.defaultOptions.lang,x=b.weekdays,c=b.shortWeekdays,u=a.pad,l=a.extend({a:c?c[e]:x[e].substr(0,3),A:x[e],
d:u(d),e:u(d,2," "),w:e,b:b.shortMonths[m],B:b.months[m],m:u(m+1),y:C.toString().substr(2,2),Y:C,H:u(t),k:t,I:u(t%12||12),l:t%12||12,M:u(w[l.hcGetMinutes]()),p:12>t?"AM":"PM",P:12>t?"am":"pm",S:u(w.getSeconds()),L:u(Math.round(f%1E3),3)},a.dateFormats);a.objectEach(l,function(a,b){for(;-1!==n.indexOf("%"+b);)n=n.replace("%"+b,"function"===typeof a?a(f):a)});return h?n.substr(0,1).toUpperCase()+n.substr(1):n};a.formatSingle=function(n,f){var h=/\.([0-9])/,l=a.defaultOptions.lang;/f$/.test(n)?(h=(h=
n.match(h))?h[1]:-1,null!==f&&(f=a.numberFormat(f,h,l.decimalPoint,-1<n.indexOf(",")?l.thousandsSep:""))):f=a.dateFormat(n,f);return f};a.format=function(n,f){for(var h="{",l=!1,w,t,e,d,m=[],C;n;){h=n.indexOf(h);if(-1===h)break;w=n.slice(0,h);if(l){w=w.split(":");t=w.shift().split(".");d=t.length;C=f;for(e=0;e<d;e++)C=C[t[e]];w.length&&(C=a.formatSingle(w.join(":"),C));m.push(C)}else m.push(w);n=n.slice(h+1);h=(l=!l)?"}":"{"}m.push(n);return m.join("")};a.getMagnitude=function(a){return Math.pow(10,
Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(n,f,h,l,w){var t,e=n;h=a.pick(h,1);t=n/h;f||(f=w?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===l&&(1===h?f=a.grep(f,function(a){return 0===a%1}):.1>=h&&(f=[1/h])));for(l=0;l<f.length&&!(e=f[l],w&&e*h>=n||!w&&t<=(f[l]+(f[l+1]||f[l]))/2);l++);return e=a.correctFloat(e*h,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,f){var h=a.length,l,n;for(n=0;n<h;n++)a[n].safeI=n;a.sort(function(a,e){l=f(a,e);return 0===l?
a.safeI-e.safeI:l});for(n=0;n<h;n++)delete a[n].safeI};a.arrayMin=function(a){for(var f=a.length,h=a[0];f--;)a[f]<h&&(h=a[f]);return h};a.arrayMax=function(a){for(var f=a.length,h=a[0];f--;)a[f]>h&&(h=a[f]);return h};a.destroyObjectProperties=function(n,f){a.objectEach(n,function(a,l){a&&a!==f&&a.destroy&&a.destroy();delete n[l]})};a.discardElement=function(n){var f=a.garbageBin;f||(f=a.createElement("div"));n&&f.appendChild(n);f.innerHTML=""};a.correctFloat=function(a,f){return parseFloat(a.toPrecision(f||
14))};a.setAnimation=function(n,f){f.renderer.globalAnimation=a.pick(n,f.options.chart.animation,!0)};a.animObject=function(n){return a.isObject(n)?a.merge(n):{duration:n?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(n,f,h,l){n=+n||0;f=+f;var w=a.defaultOptions.lang,t=(n.toString().split(".")[1]||"").length,e,d;-1===f?f=Math.min(t,20):a.isNumber(f)||(f=2);d=(Math.abs(n)+Math.pow(10,-Math.max(f,t)-1)).toFixed(f);
t=String(a.pInt(d));e=3<t.length?t.length%3:0;h=a.pick(h,w.decimalPoint);l=a.pick(l,w.thousandsSep);n=(0>n?"-":"")+(e?t.substr(0,e)+l:"");n+=t.substr(e).replace(/(\d{3})(?=\d)/g,"$1"+l);f&&(n+=h+d.slice(-f));return n};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(n,f,h){if("width"===f)return Math.min(n.offsetWidth,n.scrollWidth)-a.getStyle(n,"padding-left")-a.getStyle(n,"padding-right");if("height"===f)return Math.min(n.offsetHeight,n.scrollHeight)-a.getStyle(n,
"padding-top")-a.getStyle(n,"padding-bottom");if(n=F.getComputedStyle(n,void 0))n=n.getPropertyValue(f),a.pick(h,!0)&&(n=a.pInt(n));return n};a.inArray=function(a,f){return f.indexOf?f.indexOf(a):[].indexOf.call(f,a)};a.grep=function(a,f){return[].filter.call(a,f)};a.find=function(a,f){return[].find.call(a,f)};a.map=function(a,f){for(var h=[],l=0,n=a.length;l<n;l++)h[l]=f.call(a[l],a[l],l,a);return h};a.offset=function(a){var f=G.documentElement;a=a.getBoundingClientRect();return{top:a.top+(F.pageYOffset||
f.scrollTop)-(f.clientTop||0),left:a.left+(F.pageXOffset||f.scrollLeft)-(f.clientLeft||0)}};a.stop=function(a,f){for(var h=D.length;h--;)D[h].elem!==a||f&&f!==D[h].prop||(D[h].stopped=!0)};a.each=function(a,f,h){return Array.prototype.forEach.call(a,f,h)};a.objectEach=function(a,f,h){for(var l in a)a.hasOwnProperty(l)&&f.call(h,a[l],l,a)};a.addEvent=function(n,f,h){function l(a){a.target=a.srcElement||F;h.call(n,a)}var w=n.hcEvents=n.hcEvents||{};n.addEventListener?n.addEventListener(f,h,!1):n.attachEvent&&
(n.hcEventsIE||(n.hcEventsIE={}),n.hcEventsIE[h.toString()]=l,n.attachEvent("on"+f,l));w[f]||(w[f]=[]);w[f].push(h);return function(){a.removeEvent(n,f,h)}};a.removeEvent=function(n,f,h){function l(a,d){n.removeEventListener?n.removeEventListener(a,d,!1):n.attachEvent&&(d=n.hcEventsIE[d.toString()],n.detachEvent("on"+a,d))}function w(){var d,C;n.nodeName&&(f?(d={},d[f]=!0):d=e,a.objectEach(d,function(a,d){if(e[d])for(C=e[d].length;C--;)l(d,e[d][C])}))}var t,e=n.hcEvents,d;e&&(f?(t=e[f]||[],h?(d=a.inArray(h,
t),-1<d&&(t.splice(d,1),e[f]=t),l(f,h)):(w(),e[f]=[])):(w(),n.hcEvents={}))};a.fireEvent=function(n,f,h,l){var w;w=n.hcEvents;var t,e;h=h||{};if(G.createEvent&&(n.dispatchEvent||n.fireEvent))w=G.createEvent("Events"),w.initEvent(f,!0,!0),a.extend(w,h),n.dispatchEvent?n.dispatchEvent(w):n.fireEvent(f,w);else if(w)for(w=w[f]||[],t=w.length,h.target||a.extend(h,{preventDefault:function(){h.defaultPrevented=!0},target:n,type:f}),f=0;f<t;f++)(e=w[f])&&!1===e.call(n,h)&&h.preventDefault();l&&!h.defaultPrevented&&
l(h)};a.animate=function(n,f,h){var l,w="",t,e,d;a.isObject(h)||(d=arguments,h={duration:d[2],easing:d[3],complete:d[4]});a.isNumber(h.duration)||(h.duration=400);h.easing="function"===typeof h.easing?h.easing:Math[h.easing]||Math.easeInOutSine;h.curAnim=a.merge(f);a.objectEach(f,function(d,C){a.stop(n,C);e=new a.Fx(n,h,C);t=null;"d"===C?(e.paths=e.initPath(n,n.d,f.d),e.toD=f.d,l=0,t=1):n.attr?l=n.attr(C):(l=parseFloat(a.getStyle(n,C))||0,"opacity"!==C&&(w="px"));t||(t=d);t&&t.match&&t.match("px")&&
(t=t.replace(/px/g,""));e.run(l,t,w)})};a.seriesType=function(n,f,h,l,w){var t=a.getOptions(),e=a.seriesTypes;t.plotOptions[n]=a.merge(t.plotOptions[f],h);e[n]=a.extendClass(e[f]||function(){},l);e[n].prototype.type=n;w&&(e[n].prototype.pointClass=a.extendClass(a.Point,w));return e[n]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),f=0;return function(){return"highcharts-"+a+"-"+f++}}();F.jQuery&&(F.jQuery.fn.highcharts=function(){var n=[].slice.call(arguments);if(this[0])return n[0]?
(new (a[a.isString(n[0])?n.shift():"Chart"])(this[0],n[0],n[1]),this):A[a.attr(this[0],"data-highcharts-chart")]});G&&!G.defaultView&&(a.getStyle=function(n,f){var h={width:"clientWidth",height:"clientHeight"}[f];if(n.style[f])return a.pInt(n.style[f]);"opacity"===f&&(f="filter");if(h)return n.style.zoom=1,Math.max(n[h]-2*a.getStyle(n,"padding"),0);n=n.currentStyle[f.replace(/\-(\w)/g,function(a,f){return f.toUpperCase()})];"filter"===f&&(n=n.replace(/alpha\(opacity=([0-9]+)\)/,function(a,f){return f/
100}));return""===n?1:a.pInt(n)});Array.prototype.forEach||(a.each=function(a,f,h){for(var l=0,n=a.length;l<n;l++)if(!1===f.call(h,a[l],l,a))return l});Array.prototype.indexOf||(a.inArray=function(a,f){var h,l=0;if(f)for(h=f.length;l<h;l++)if(f[l]===a)return l;return-1});Array.prototype.filter||(a.grep=function(a,f){for(var h=[],l=0,n=a.length;l<n;l++)f(a[l],l)&&h.push(a[l]);return h});Array.prototype.find||(a.find=function(a,f){var h,l=a.length;for(h=0;h<l;h++)if(f(a[h],h))return a[h]})})(L);(function(a){var D=
a.each,A=a.isNumber,G=a.map,F=a.merge,n=a.pInt;a.Color=function(f){if(!(this instanceof a.Color))return new a.Color(f);this.init(f)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[n(a[1]),n(a[2]),n(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[n(a[1]),n(a[2]),n(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},
init:function(f){var h,l,n,t;if((this.input=f=this.names[f&&f.toLowerCase?f.toLowerCase():""]||f)&&f.stops)this.stops=G(f.stops,function(e){return new a.Color(e[1])});else if(f&&"#"===f[0]&&(h=f.length,f=parseInt(f.substr(1),16),7===h?l=[(f&16711680)>>16,(f&65280)>>8,f&255,1]:4===h&&(l=[(f&3840)>>4|(f&3840)>>8,(f&240)>>4|f&240,(f&15)<<4|f&15,1])),!l)for(n=this.parsers.length;n--&&!l;)t=this.parsers[n],(h=t.regex.exec(f))&&(l=t.parse(h));this.rgba=l||[]},get:function(a){var f=this.input,l=this.rgba,
n;this.stops?(n=F(f),n.stops=[].concat(n.stops),D(this.stops,function(f,e){n.stops[e]=[n.stops[e][0],f.get(a)]})):n=l&&A(l[0])?"rgb"===a||!a&&1===l[3]?"rgb("+l[0]+","+l[1]+","+l[2]+")":"a"===a?l[3]:"rgba("+l.join(",")+")":f;return n},brighten:function(a){var f,l=this.rgba;if(this.stops)D(this.stops,function(f){f.brighten(a)});else if(A(a)&&0!==a)for(f=0;3>f;f++)l[f]+=n(255*a),0>l[f]&&(l[f]=0),255<l[f]&&(l[f]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this}};a.color=function(f){return new a.Color(f)}})(L);
(function(a){var D,A,G=a.addEvent,F=a.animate,n=a.attr,f=a.charts,h=a.color,l=a.css,w=a.createElement,t=a.defined,e=a.deg2rad,d=a.destroyObjectProperties,m=a.doc,C=a.each,b=a.extend,x=a.erase,c=a.grep,u=a.hasTouch,B=a.inArray,I=a.isArray,k=a.isFirefox,E=a.isMS,p=a.isObject,z=a.isString,M=a.isWebKit,q=a.merge,y=a.noop,H=a.objectEach,K=a.pick,g=a.pInt,r=a.removeEvent,R=a.stop,J=a.svg,N=a.SVG_NS,O=a.symbolSizes,P=a.win;D=a.SVGElement=function(){return this};D.prototype={opacity:1,SVG_NS:N,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
init:function(a,g){this.element="span"===g?w(g):m.createElementNS(this.SVG_NS,g);this.renderer=a},animate:function(v,g,b){g=a.animObject(K(g,this.renderer.globalAnimation,!0));0!==g.duration?(b&&(g.complete=b),F(this,v,g)):(this.attr(v,null,b),g.step&&g.step.call(this));return this},colorGradient:function(v,g,b){var r=this.renderer,c,k,p,d,Q,e,u,m,x,y,E=[],J;v.radialGradient?k="radialGradient":v.linearGradient&&(k="linearGradient");k&&(p=v[k],Q=r.gradients,u=v.stops,y=b.radialReference,I(p)&&(v[k]=
p={x1:p[0],y1:p[1],x2:p[2],y2:p[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===k&&y&&!t(p.gradientUnits)&&(d=p,p=q(p,r.getRadialAttr(y,d),{gradientUnits:"userSpaceOnUse"})),H(p,function(a,v){"id"!==v&&E.push(v,a)}),H(u,function(a){E.push(a)}),E=E.join(","),Q[E]?y=Q[E].attr("id"):(p.id=y=a.uniqueKey(),Q[E]=e=r.createElement(k).attr(p).add(r.defs),e.radAttr=d,e.stops=[],C(u,function(v){0===v[1].indexOf("rgba")?(c=a.color(v[1]),m=c.get("rgb"),x=c.get("a")):(m=v[1],x=1);v=r.createElement("stop").attr({offset:v[0],
"stop-color":m,"stop-opacity":x}).add(e);e.stops.push(v)})),J="url("+r.url+"#"+y+")",b.setAttribute(g,J),b.gradient=E,v.toString=function(){return J})},applyTextOutline:function(v){var g=this.element,b,r,c,k,q;-1!==v.indexOf("contrast")&&(v=v.replace(/contrast/g,this.renderer.getContrast(g.style.fill)));v=v.split(" ");r=v[v.length-1];if((c=v[0])&&"none"!==c&&a.svg){this.fakeTS=!0;v=[].slice.call(g.getElementsByTagName("tspan"));this.ySetter=this.xSetter;c=c.replace(/(^[\d\.]+)(.*?)$/g,function(a,
v,g){return 2*v+g});for(q=v.length;q--;)b=v[q],"highcharts-text-outline"===b.getAttribute("class")&&x(v,g.removeChild(b));k=g.firstChild;C(v,function(a,v){0===v&&(a.setAttribute("x",g.getAttribute("x")),v=g.getAttribute("y"),a.setAttribute("y",v||0),null===v&&g.setAttribute("y",0));a=a.cloneNode(1);n(a,{"class":"highcharts-text-outline",fill:r,stroke:r,"stroke-width":c,"stroke-linejoin":"round"});g.insertBefore(a,k)})}},attr:function(a,g,b,r){var v,c=this.element,k,q=this,p,d;"string"===typeof a&&
void 0!==g&&(v=a,a={},a[v]=g);"string"===typeof a?q=(this[a+"Getter"]||this._defaultGetter).call(this,a,c):(H(a,function(v,g){p=!1;r||R(this,g);this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(g)&&(k||(this.symbolAttr(a),k=!0),p=!0);!this.rotation||"x"!==g&&"y"!==g||(this.doTransform=!0);p||(d=this[g+"Setter"]||this._defaultSetter,d.call(this,v,g,c),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(g)&&this.updateShadows(g,v,d))},this),this.doTransform&&
(this.updateTransform(),this.doTransform=!1));b&&b();return q},updateShadows:function(a,g,b){for(var v=this.shadows,r=v.length;r--;)b.call(v[r],"height"===a?Math.max(g-(v[r].cutHeight||0),0):"d"===a?this.d:g,a,v[r])},addClass:function(a,g){var v=this.attr("class")||"";-1===v.indexOf(a)&&(g||(a=(v+(v?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==n(this.element,"class").indexOf(a)},removeClass:function(a){n(this.element,"class",(n(this.element,"class")||
"").replace(a,""));return this},symbolAttr:function(a){var v=this;C("x y r start end width height innerR anchorX anchorY".split(" "),function(g){v[g]=K(a[g],v[g])});v.attr({d:v.renderer.symbols[v.symbolName](v.x,v.y,v.width,v.height,v)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,g){var v=this,b={},r;g=g||a.strokeWidth||0;r=Math.round(g)%2/2;a.x=Math.floor(a.x||v.x||0)+r;a.y=Math.floor(a.y||v.y||0)+r;a.width=Math.floor((a.width||
v.width||0)-2*r);a.height=Math.floor((a.height||v.height||0)-2*r);t(a.strokeWidth)&&(a.strokeWidth=g);H(a,function(a,g){v[g]!==a&&(v[g]=b[g]=a)});return b},css:function(a){var v=this.styles,r={},c=this.element,k,q="",p,d=!v,e=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);v&&H(a,function(a,g){a!==v[g]&&(r[g]=a,d=!0)});d&&(v&&(a=b(v,r)),k=this.textWidth=a&&a.width&&"auto"!==a.width&&"text"===c.nodeName.toLowerCase()&&g(a.width),this.styles=a,k&&!J&&this.renderer.forExport&&delete a.width,
E&&!J?l(this.element,a):(p=function(a,v){return"-"+v.toLowerCase()},H(a,function(a,v){-1===B(v,e)&&(q+=v.replace(/([A-Z])/g,p)+":"+a+";")}),q&&n(c,"style",q)),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,g){var v=this,b=v.element;u&&"click"===a?(b.ontouchstart=function(a){v.touchEventFired=Date.now();a.preventDefault();g.call(b,a)},
b.onclick=function(a){(-1===P.navigator.userAgent.indexOf("Android")||1100<Date.now()-(v.touchEventFired||0))&&g.call(b,a)}):b["on"+a]=g;return this},setRadialReference:function(a){var v=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;v&&v.radAttr&&v.animate(this.renderer.getRadialAttr(a,v.radAttr));return this},translate:function(a,g){return this.attr({translateX:a,translateY:g})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=
this.translateX||0,g=this.translateY||0,b=this.scaleX,r=this.scaleY,c=this.inverted,k=this.rotation,q=this.element;c&&(a+=this.width,g+=this.height);a=["translate("+a+","+g+")"];c?a.push("rotate(90) scale(-1,1)"):k&&a.push("rotate("+k+" "+(q.getAttribute("x")||0)+" "+(q.getAttribute("y")||0)+")");(t(b)||t(r))&&a.push("scale("+K(b,1)+" "+K(r,1)+")");a.length&&q.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,g,b){var v,
r,c,k,q={};r=this.renderer;c=r.alignedObjects;var p,d;if(a){if(this.alignOptions=a,this.alignByTranslate=g,!b||z(b))this.alignTo=v=b||"renderer",x(c,this),c.push(this),b=null}else a=this.alignOptions,g=this.alignByTranslate,v=this.alignTo;b=K(b,r[v],r);v=a.align;r=a.verticalAlign;c=(b.x||0)+(a.x||0);k=(b.y||0)+(a.y||0);"right"===v?p=1:"center"===v&&(p=2);p&&(c+=(b.width-(a.width||0))/p);q[g?"translateX":"x"]=Math.round(c);"bottom"===r?d=1:"middle"===r&&(d=2);d&&(k+=(b.height-(a.height||0))/d);q[g?
"translateY":"y"]=Math.round(k);this[this.placed?"animate":"attr"](q);this.placed=!0;this.alignAttr=q;return this},getBBox:function(a,g){var v,r=this.renderer,c,k=this.element,q=this.styles,p,d=this.textStr,u,m=r.cache,Q=r.cacheKeys,y;g=K(g,this.rotation);c=g*e;p=q&&q.fontSize;void 0!==d&&(y=d.toString(),-1===y.indexOf("\x3c")&&(y=y.replace(/[0-9]/g,"0")),y+=["",g||0,p,q&&q.width,q&&q.textOverflow].join());y&&!a&&(v=m[y]);if(!v){if(k.namespaceURI===this.SVG_NS||r.forExport){try{(u=this.fakeTS&&function(a){C(k.querySelectorAll(".highcharts-text-outline"),
function(v){v.style.display=a})})&&u("none"),v=k.getBBox?b({},k.getBBox()):{width:k.offsetWidth,height:k.offsetHeight},u&&u("")}catch(W){}if(!v||0>v.width)v={width:0,height:0}}else v=this.htmlGetBBox();r.isSVG&&(a=v.width,r=v.height,q&&"11px"===q.fontSize&&17===Math.round(r)&&(v.height=r=14),g&&(v.width=Math.abs(r*Math.sin(c))+Math.abs(a*Math.cos(c)),v.height=Math.abs(r*Math.cos(c))+Math.abs(a*Math.sin(c))));if(y&&0<v.height){for(;250<Q.length;)delete m[Q.shift()];m[y]||Q.push(y);m[y]=v}}return v},
show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var v=this;v.animate({opacity:0},{duration:a||150,complete:function(){v.attr({y:-9999})}})},add:function(a){var v=this.renderer,g=this.element,b;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&v.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)b=this.zIndexSetter();b||(a?a.element:v.box).appendChild(g);if(this.onAdd)this.onAdd();
return this},safeRemoveChild:function(a){var v=a.parentNode;v&&v.removeChild(a)},destroy:function(){var a=this,g=a.element||{},b=a.renderer.isSVG&&"SPAN"===g.nodeName&&a.parentGroup,r=g.ownerSVGElement;g.onclick=g.onmouseout=g.onmouseover=g.onmousemove=g.point=null;R(a);a.clipPath&&r&&(C(r.querySelectorAll("[clip-path]"),function(v){-1<v.getAttribute("clip-path").indexOf(a.clipPath.element.id+")")&&v.removeAttribute("clip-path")}),a.clipPath=a.clipPath.destroy());if(a.stops){for(r=0;r<a.stops.length;r++)a.stops[r]=
a.stops[r].destroy();a.stops=null}a.safeRemoveChild(g);for(a.destroyShadows();b&&b.div&&0===b.div.childNodes.length;)g=b.parentGroup,a.safeRemoveChild(b.div),delete b.div,b=g;a.alignTo&&x(a.renderer.alignedObjects,a);H(a,function(v,g){delete a[g]});return null},shadow:function(a,g,b){var v=[],r,c,k=this.element,q,p,d,e;if(!a)this.destroyShadows();else if(!this.shadows){p=K(a.width,3);d=(a.opacity||.15)/p;e=this.parentInverted?"(-1,-1)":"("+K(a.offsetX,1)+", "+K(a.offsetY,1)+")";for(r=1;r<=p;r++)c=
k.cloneNode(0),q=2*p+1-2*r,n(c,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":d*r,"stroke-width":q,transform:"translate"+e,fill:"none"}),b&&(n(c,"height",Math.max(n(c,"height")-q,0)),c.cutHeight=q),g?g.element.appendChild(c):k.parentNode.insertBefore(c,k),v.push(c);this.shadows=v}return this},destroyShadows:function(){C(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));
return this._defaultGetter(a)},_defaultGetter:function(a){a=K(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,g,b){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");b.setAttribute(g,a);this[g]=a},dashstyleSetter:function(a){var v,b=this["stroke-width"];"inherit"===b&&(b=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash",
"3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(v=a.length;v--;)a[v]=g(a[v])*b;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,g,b){this[g]=a;b.setAttribute(g,a)},titleSetter:function(a){var g=this.element.getElementsByTagName("title")[0];g||(g=m.createElementNS(this.SVG_NS,
"title"),this.element.appendChild(g));g.firstChild&&g.removeChild(g.firstChild);g.appendChild(m.createTextNode(String(K(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,g,b){"string"===typeof a?b.setAttribute(g,a):a&&this.colorGradient(a,g,b)},visibilitySetter:function(a,g,b){"inherit"===a?b.removeAttribute(g):b.setAttribute(g,a)},zIndexSetter:function(a,b){var v=this.renderer,
r=this.parentGroup,c=(r||v).element||v.box,k,q=this.element,p;k=this.added;var d;t(a)&&(q.zIndex=a,a=+a,this[b]===a&&(k=!1),this[b]=a);if(k){(a=this.zIndex)&&r&&(r.handleZ=!0);b=c.childNodes;for(d=0;d<b.length&&!p;d++)r=b[d],k=r.zIndex,r!==q&&(g(k)>a||!t(a)&&t(k)||0>a&&!t(k)&&c!==v.box)&&(c.insertBefore(q,r),p=!0);p||c.appendChild(q)}return p},_defaultSetter:function(a,g,b){b.setAttribute(g,a)}};D.prototype.yGetter=D.prototype.xGetter;D.prototype.translateXSetter=D.prototype.translateYSetter=D.prototype.rotationSetter=
D.prototype.verticalAlignSetter=D.prototype.scaleXSetter=D.prototype.scaleYSetter=function(a,g){this[g]=a;this.doTransform=!0};D.prototype["stroke-widthSetter"]=D.prototype.strokeSetter=function(a,g,b){this[g]=a;this.stroke&&this["stroke-width"]?(D.prototype.fillSetter.call(this,this.stroke,"stroke",b),b.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===g&&0===a&&this.hasStroke&&(b.removeAttribute("stroke"),this.hasStroke=!1)};A=a.SVGRenderer=function(){this.init.apply(this,
arguments)};A.prototype={Element:D,SVG_NS:N,init:function(a,g,b,r,c,q){var v;r=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(r));v=r.element;a.appendChild(v);-1===a.innerHTML.indexOf("xmlns")&&n(v,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=v;this.boxWrapper=r;this.alignedObjects=[];this.url=(k||M)&&m.getElementsByTagName("base").length?P.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(m.createTextNode("Created with Highcharts 5.0.11"));
this.defs=this.createElement("defs").add();this.allowHTML=q;this.forExport=c;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(g,b,!1);var p;k&&a.getBoundingClientRect&&(g=function(){l(a,{left:0,top:0});p=a.getBoundingClientRect();l(a,{left:Math.ceil(p.left)-p.left+"px",top:Math.ceil(p.top)-p.top+"px"})},g(),this.unSubPixelFix=G(P,"resize",g))},getStyle:function(a){return this.style=b({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},
a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();d(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var g=new this.Element;g.init(this,a);return g},draw:y,getRadialAttr:function(a,g){return{cx:a[0]-a[2]/2+g.cx*a[2],cy:a[1]-
a[2]/2+g.cy*a[2],r:g.r*a[2]}},getSpanWidth:function(a,g){var b=a.getBBox(!0).width;!J&&this.forExport&&(b=this.measureSpanWidth(g.firstChild.data,a.styles));return b},applyEllipsis:function(a,g,b,r){var v=this.getSpanWidth(a,g),c=v>r,v=b,k,q=0,p=b.length,d=function(a){g.removeChild(g.firstChild);a&&g.appendChild(m.createTextNode(a))};if(c){for(;q<=p;)k=Math.ceil((q+p)/2),v=b.substring(0,k)+"\u2026",d(v),v=this.getSpanWidth(a,g),q===p?q=p+1:v>r?p=k-1:q=k;0===p&&d("")}return c},buildText:function(a){var b=
a.element,r=this,v=r.forExport,k=K(a.textStr,"").toString(),q=-1!==k.indexOf("\x3c"),p=b.childNodes,d,e,u,y,x=n(b,"x"),E=a.styles,z=a.textWidth,f=E&&E.lineHeight,H=E&&E.textOutline,B=E&&"ellipsis"===E.textOverflow,h=E&&"nowrap"===E.whiteSpace,t=E&&E.fontSize,R,w,M=p.length,E=z&&!a.added&&this.box,I=function(a){var v;v=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:t||r.style.fontSize||12;return f?g(f):r.fontMetrics(v,a.getAttribute("style")?a:b).h};R=[k,B,h,f,H,t,z].join();if(R!==a.textCache){for(a.textCache=
R;M--;)b.removeChild(p[M]);q||H||B||z||-1!==k.indexOf(" ")?(d=/<.*class="([^"]+)".*>/,e=/<.*style="([^"]+)".*>/,u=/<.*href="(http[^"]+)".*>/,E&&E.appendChild(b),k=q?k.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[k],k=c(k,function(a){return""!==a}),C(k,function(g,c){var k,q=0;g=g.replace(/^\s+|\s+$/g,"").replace(/<span/g,
"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");k=g.split("|||");C(k,function(g){if(""!==g||1===k.length){var p={},E=m.createElementNS(r.SVG_NS,"tspan"),f,H;d.test(g)&&(f=g.match(d)[1],n(E,"class",f));e.test(g)&&(H=g.match(e)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),n(E,"style",H));u.test(g)&&!v&&(n(E,"onclick",'location.href\x3d"'+g.match(u)[1]+'"'),l(E,{cursor:"pointer"}));g=(g.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e");if(" "!==g){E.appendChild(m.createTextNode(g));
q?p.dx=0:c&&null!==x&&(p.x=x);n(E,p);b.appendChild(E);!q&&w&&(!J&&v&&l(E,{display:"block"}),n(E,"dy",I(E)));if(z){p=g.replace(/([^\^])-/g,"$1- ").split(" ");f=1<k.length||c||1<p.length&&!h;var C=[],Q,t=I(E),R=a.rotation;for(B&&(y=r.applyEllipsis(a,E,g,z));!B&&f&&(p.length||C.length);)a.rotation=0,Q=r.getSpanWidth(a,E),g=Q>z,void 0===y&&(y=g),g&&1!==p.length?(E.removeChild(E.firstChild),C.unshift(p.pop())):(p=C,C=[],p.length&&!h&&(E=m.createElementNS(N,"tspan"),n(E,{dy:t,x:x}),H&&n(E,"style",H),b.appendChild(E)),
Q>z&&(z=Q)),p.length&&E.appendChild(m.createTextNode(p.join(" ").replace(/- /g,"-")));a.rotation=R}q++}}});w=w||b.childNodes.length}),y&&a.attr("title",a.textStr),E&&E.removeChild(b),H&&a.applyTextOutline&&a.applyTextOutline(H)):b.appendChild(m.createTextNode(k.replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))}},getContrast:function(a){a=h(a).rgba;return 510<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,g,r,c,k,p,d,e,u){var v=this.label(a,g,r,u,null,null,null,null,"button"),m=0;v.attr(q({padding:8,
r:2},k));var y,x,z,J;k=q({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},k);y=k.style;delete k.style;p=q(k,{fill:"#e6e6e6"},p);x=p.style;delete p.style;d=q(k,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},d);z=d.style;delete d.style;e=q(k,{style:{color:"#cccccc"}},e);J=e.style;delete e.style;G(v.element,E?"mouseover":"mouseenter",function(){3!==m&&v.setState(1)});G(v.element,E?"mouseout":"mouseleave",function(){3!==m&&v.setState(m)});
v.setState=function(a){1!==a&&(v.state=m=a);v.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);v.attr([k,p,d,e][a||0]).css([y,x,z,J][a||0])};v.attr(k).css(b({cursor:"default"},y));return v.on("click",function(a){3!==m&&c.call(v,a)})},crispLine:function(a,g){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-g%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+g%2/2);return a},path:function(a){var g={fill:"none"};I(a)?g.d=
a:p(a)&&b(g,a);return this.createElement("path").attr(g)},circle:function(a,g,b){a=p(a)?a:{x:a,y:g,r:b};g=this.createElement("circle");g.xSetter=g.ySetter=function(a,g,b){b.setAttribute("c"+g,a)};return g.attr(a)},arc:function(a,g,b,r,c,k){p(a)?(r=a,g=r.y,b=r.r,a=r.x):r={innerR:r,start:c,end:k};a=this.symbol("arc",a,g,b,b,r);a.r=b;return a},rect:function(a,g,b,r,c,k){c=p(a)?a.r:c;var v=this.createElement("rect");a=p(a)?a:void 0===a?{}:{x:a,y:g,width:Math.max(b,0),height:Math.max(r,0)};void 0!==k&&
(a.strokeWidth=k,a=v.crisp(a));a.fill="none";c&&(a.r=c);v.rSetter=function(a,g,b){n(b,{rx:a,ry:a})};return v.attr(a)},setSize:function(a,g,b){var r=this.alignedObjects,c=r.length;this.width=a;this.height=g;for(this.boxWrapper.animate({width:a,height:g},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:K(b,!0)?void 0:0});c--;)r[c].align()},g:function(a){var g=this.createElement("g");return a?g.attr({"class":"highcharts-"+a}):g},image:function(a,g,r,c,
k){var v={preserveAspectRatio:"none"};1<arguments.length&&b(v,{x:g,y:r,width:c,height:k});v=this.createElement("image").attr(v);v.element.setAttributeNS?v.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):v.element.setAttribute("hc-svg-href",a);return v},symbol:function(a,g,r,c,k,p){var v=this,q,d=/^url\((.*?)\)$/,e=d.test(a),E=!e&&(this.symbols[a]?a:"circle"),u=E&&this.symbols[E],y=t(g)&&u&&u.call(this.symbols,Math.round(g),Math.round(r),c,k,p),x,z;u?(q=this.path(y),q.attr("fill","none"),
b(q,{symbolName:E,x:g,y:r,width:c,height:k}),p&&b(q,p)):e&&(x=a.match(d)[1],q=this.image(x),q.imgwidth=K(O[x]&&O[x].width,p&&p.width),q.imgheight=K(O[x]&&O[x].height,p&&p.height),z=function(){q.attr({width:q.width,height:q.height})},C(["width","height"],function(a){q[a+"Setter"]=function(a,g){var b={},r=this["img"+g],c="width"===g?"translateX":"translateY";this[g]=a;t(r)&&(this.element&&this.element.setAttribute(g,r),this.alignByTranslate||(b[c]=((this[g]||0)-r)/2,this.attr(b)))}}),t(g)&&q.attr({x:g,
y:r}),q.isImg=!0,t(q.imgwidth)&&t(q.imgheight)?z():(q.attr({width:0,height:0}),w("img",{onload:function(){var a=f[v.chartIndex];0===this.width&&(l(this,{position:"absolute",top:"-999em"}),m.body.appendChild(this));O[x]={width:this.width,height:this.height};q.imgwidth=this.width;q.imgheight=this.height;q.element&&z();this.parentNode&&this.parentNode.removeChild(this);v.imgCount--;if(!v.imgCount&&a&&a.onload)a.onload()},src:x}),this.imgCount++));return q},symbols:{circle:function(a,g,b,r){return this.arc(a+
b/2,g+r/2,b/2,r/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,g,b,r){return["M",a,g,"L",a+b,g,a+b,g+r,a,g+r,"Z"]},triangle:function(a,g,b,r){return["M",a+b/2,g,"L",a+b,g+r,a,g+r,"Z"]},"triangle-down":function(a,g,b,r){return["M",a,g,"L",a+b,g,a+b/2,g+r,"Z"]},diamond:function(a,g,b,r){return["M",a+b/2,g,"L",a+b,g+r/2,a+b/2,g+r,a,g+r/2,"Z"]},arc:function(a,g,b,r,c){var k=c.start,q=c.r||b,p=c.r||r||b,v=c.end-.001;b=c.innerR;r=c.open;var d=Math.cos(k),e=Math.sin(k),E=Math.cos(v),v=Math.sin(v);
c=c.end-k<Math.PI?0:1;q=["M",a+q*d,g+p*e,"A",q,p,0,c,1,a+q*E,g+p*v];t(b)&&q.push(r?"M":"L",a+b*E,g+b*v,"A",b,b,0,c,0,a+b*d,g+b*e);q.push(r?"":"Z");return q},callout:function(a,g,b,r,c){var k=Math.min(c&&c.r||0,b,r),q=k+6,p=c&&c.anchorX;c=c&&c.anchorY;var v;v=["M",a+k,g,"L",a+b-k,g,"C",a+b,g,a+b,g,a+b,g+k,"L",a+b,g+r-k,"C",a+b,g+r,a+b,g+r,a+b-k,g+r,"L",a+k,g+r,"C",a,g+r,a,g+r,a,g+r-k,"L",a,g+k,"C",a,g,a,g,a+k,g];p&&p>b?c>g+q&&c<g+r-q?v.splice(13,3,"L",a+b,c-6,a+b+6,c,a+b,c+6,a+b,g+r-k):v.splice(13,
3,"L",a+b,r/2,p,c,a+b,r/2,a+b,g+r-k):p&&0>p?c>g+q&&c<g+r-q?v.splice(33,3,"L",a,c+6,a-6,c,a,c-6,a,g+k):v.splice(33,3,"L",a,r/2,p,c,a,r/2,a,g+k):c&&c>r&&p>a+q&&p<a+b-q?v.splice(23,3,"L",p+6,g+r,p,g+r+6,p-6,g+r,a+k,g+r):c&&0>c&&p>a+q&&p<a+b-q&&v.splice(3,3,"L",p-6,g,p,g-6,p+6,g,b-k,g);return v}},clipRect:function(g,b,r,c){var k=a.uniqueKey(),q=this.createElement("clipPath").attr({id:k}).add(this.defs);g=this.rect(g,b,r,c,0).add(q);g.id=k;g.clipPath=q;g.count=0;return g},text:function(a,g,b,r){var c=
!J&&this.forExport,k={};if(r&&(this.allowHTML||!this.forExport))return this.html(a,g,b);k.x=Math.round(g||0);b&&(k.y=Math.round(b));if(a||0===a)k.text=a;a=this.createElement("text").attr(k);c&&a.css({position:"absolute"});r||(a.xSetter=function(a,g,b){var r=b.getElementsByTagName("tspan"),c,k=b.getAttribute(g),q;for(q=0;q<r.length;q++)c=r[q],c.getAttribute(g)===k&&c.setAttribute(g,a);b.setAttribute(g,a)});return a},fontMetrics:function(a,b){a=a||b&&b.style&&b.style.fontSize||this.style&&this.style.fontSize;
a=/px/.test(a)?g(a):/em/.test(a)?parseFloat(a)*(b?this.fontMetrics(null,b.parentNode).f:16):12;b=24>a?a+3:Math.round(1.2*a);return{h:b,b:Math.round(.8*b),f:a}},rotCorr:function(a,g,b){var r=a;g&&b&&(r=Math.max(r*Math.cos(g*e),4));return{x:-a/3*Math.sin(g*e),y:r}},label:function(g,c,k,p,d,e,E,u,m){var v=this,y=v.g("button"!==m&&"label"),x=y.text=v.text("",0,0,E).attr({zIndex:1}),z,J,f=0,H=3,l=0,B,h,n,R,w,M={},I,N,K=/^url\((.*?)\)$/.test(p),Q=K,U,T,O,P;m&&y.addClass("highcharts-"+m);Q=K;U=function(){return(I||
0)%2/2};T=function(){var a=x.element.style,g={};J=(void 0===B||void 0===h||w)&&t(x.textStr)&&x.getBBox();y.width=(B||J.width||0)+2*H+l;y.height=(h||J.height||0)+2*H;N=H+v.fontMetrics(a&&a.fontSize,x).b;Q&&(z||(y.box=z=v.symbols[p]||K?v.symbol(p):v.rect(),z.addClass(("button"===m?"":"highcharts-label-box")+(m?" highcharts-"+m+"-box":"")),z.add(y),a=U(),g.x=a,g.y=(u?-N:0)+a),g.width=Math.round(y.width),g.height=Math.round(y.height),z.attr(b(g,M)),M={})};O=function(){var a=l+H,g;g=u?0:N;t(B)&&J&&("center"===
w||"right"===w)&&(a+={center:.5,right:1}[w]*(B-J.width));if(a!==x.x||g!==x.y)x.attr("x",a),void 0!==g&&x.attr("y",g);x.x=a;x.y=g};P=function(a,g){z?z.attr(a,g):M[a]=g};y.onAdd=function(){x.add(y);y.attr({text:g||0===g?g:"",x:c,y:k});z&&t(d)&&y.attr({anchorX:d,anchorY:e})};y.widthSetter=function(g){B=a.isNumber(g)?g:null};y.heightSetter=function(a){h=a};y["text-alignSetter"]=function(a){w=a};y.paddingSetter=function(a){t(a)&&a!==H&&(H=y.padding=a,O())};y.paddingLeftSetter=function(a){t(a)&&a!==l&&
(l=a,O())};y.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==f&&(f=a,J&&y.attr({x:n}))};y.textSetter=function(a){void 0!==a&&x.textSetter(a);T();O()};y["stroke-widthSetter"]=function(a,g){a&&(Q=!0);I=this["stroke-width"]=a;P(g,a)};y.strokeSetter=y.fillSetter=y.rSetter=function(a,g){"fill"===g&&a&&(Q=!0);P(g,a)};y.anchorXSetter=function(a,g){d=y.anchorX=a;P(g,Math.round(a)-U()-n)};y.anchorYSetter=function(a,g){e=y.anchorY=a;P(g,a-R)};y.xSetter=function(a){y.x=a;f&&(a-=f*((B||J.width)+2*
H));n=Math.round(a);y.attr("translateX",n)};y.ySetter=function(a){R=y.y=Math.round(a);y.attr("translateY",R)};var V=y.css;return b(y,{css:function(a){if(a){var g={};a=q(a);C(y.textProps,function(b){void 0!==a[b]&&(g[b]=a[b],delete a[b])});x.css(g)}return V.call(y,a)},getBBox:function(){return{width:J.width+2*H,height:J.height+2*H,x:J.x-H,y:J.y-H}},shadow:function(a){a&&(T(),z&&z.shadow(a));return y},destroy:function(){r(y.element,"mouseenter");r(y.element,"mouseleave");x&&(x=x.destroy());z&&(z=z.destroy());
D.prototype.destroy.call(y);y=v=T=O=P=null}})}};a.Renderer=A})(L);(function(a){var D=a.attr,A=a.createElement,G=a.css,F=a.defined,n=a.each,f=a.extend,h=a.isFirefox,l=a.isMS,w=a.isWebKit,t=a.pInt,e=a.SVGRenderer,d=a.win,m=a.wrap;f(a.SVGElement.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===b.tagName&&a.width)delete a.width,this.textWidth=b,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=f(this.styles,a);G(this.element,
a);return this},htmlGetBBox:function(){var a=this.element;"text"===a.nodeName&&(a.style.position="absolute");return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,d=this.translateX||0,c=this.translateY||0,e=this.x||0,m=this.y||0,f=this.textAlign||"left",k={left:0,center:.5,right:1}[f],E=this.styles;G(b,{marginLeft:d,marginTop:c});this.shadows&&n(this.shadows,function(a){G(a,{marginLeft:d+1,marginTop:c+
1})});this.inverted&&n(b.childNodes,function(c){a.invertChild(c,b)});if("SPAN"===b.tagName){var p=this.rotation,z=t(this.textWidth),l=E&&E.whiteSpace,q=[p,f,b.innerHTML,this.textWidth,this.textAlign].join();q!==this.cTT&&(E=a.fontMetrics(b.style.fontSize).b,F(p)&&this.setSpanRotation(p,k,E),G(b,{width:"",whiteSpace:l||"nowrap"}),b.offsetWidth>z&&/[ \-]/.test(b.textContent||b.innerText)&&G(b,{width:z+"px",display:"block",whiteSpace:l||"normal"}),this.getSpanCorrection(b.offsetWidth,E,k,p,f));G(b,{left:e+
(this.xCorr||0)+"px",top:m+(this.yCorr||0)+"px"});w&&(E=b.offsetHeight);this.cTT=q}}else this.alignOnAdd=!0},setSpanRotation:function(a,b,e){var c={},u=l?"-ms-transform":w?"-webkit-transform":h?"MozTransform":d.opera?"-o-transform":"";c[u]=c.transform="rotate("+a+"deg)";c[u+(h?"Origin":"-origin")]=c.transformOrigin=100*b+"% "+e+"px";G(this.element,c)},getSpanCorrection:function(a,b,d){this.xCorr=-a*d;this.yCorr=-b}});f(e.prototype,{html:function(a,b,d){var c=this.createElement("span"),e=c.element,
x=c.renderer,l=x.isSVG,k=function(a,b){n(["opacity","visibility"],function(c){m(a,c+"Setter",function(a,c,k,p){a.call(this,c,k,p);b[k]=c})})};c.textSetter=function(a){a!==e.innerHTML&&delete this.bBox;e.innerHTML=this.textStr=a;c.htmlUpdateTransform()};l&&k(c,c.element.style);c.xSetter=c.ySetter=c.alignSetter=c.rotationSetter=function(a,b){"align"===b&&(b="textAlign");c[b]=a;c.htmlUpdateTransform()};c.attr({text:a,x:Math.round(b),y:Math.round(d)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,
position:"absolute"});e.style.whiteSpace="nowrap";c.css=c.htmlCss;l&&(c.add=function(a){var b,d=x.box.parentNode,m=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)m.push(a),a=a.parentGroup;n(m.reverse(),function(a){var p,q=D(a.element,"class");q&&(q={className:q});b=a.div=a.div||A("div",q,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},b||d);p=b.style;f(a,{on:function(){c.on.apply({element:m[0].div},
arguments);return a},translateXSetter:function(b,g){p.left=b+"px";a[g]=b;a.doTransform=!0},translateYSetter:function(b,g){p.top=b+"px";a[g]=b;a.doTransform=!0}});k(a,p)})}}else b=d;b.appendChild(e);c.added=!0;c.alignOnAdd&&c.htmlUpdateTransform();return c});return c}})})(L);(function(a){var D,A,G=a.createElement,F=a.css,n=a.defined,f=a.deg2rad,h=a.discardElement,l=a.doc,w=a.each,t=a.erase,e=a.extend;D=a.extendClass;var d=a.isArray,m=a.isNumber,C=a.isObject,b=a.merge;A=a.noop;var x=a.pick,c=a.pInt,
u=a.SVGElement,B=a.SVGRenderer,I=a.win;a.svg||(A={docMode8:l&&8===l.documentMode,init:function(a,b){var c=["\x3c",b,' filled\x3d"f" stroked\x3d"f"'],k=["position: ","absolute",";"],d="div"===b;("shape"===b||d)&&k.push("left:0;top:0;width:1px;height:1px;");k.push("visibility: ",d?"hidden":"visible");c.push(' style\x3d"',k.join(""),'"/\x3e');b&&(c=d||"span"===b||"img"===b?c.join(""):a.prepVML(c),this.element=G(c));this.renderer=a},add:function(a){var b=this.renderer,c=this.element,k=b.box,d=a&&a.inverted,
k=a?a.element||a:k;a&&(this.parentGroup=a);d&&b.invertChild(c,k);k.appendChild(c);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:u.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,b=Math.cos(a*f),c=Math.sin(a*f);F(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11\x3d",b,", M12\x3d",-c,", M21\x3d",c,", M22\x3d",
b,", sizingMethod\x3d'auto expand')"].join(""):"none"})},getSpanCorrection:function(a,b,c,d,e){var k=d?Math.cos(d*f):1,p=d?Math.sin(d*f):0,m=x(this.elemHeight,this.element.offsetHeight),u;this.xCorr=0>k&&-a;this.yCorr=0>p&&-m;u=0>k*p;this.xCorr+=p*b*(u?1-c:c);this.yCorr-=k*b*(d?u?c:1-c:1);e&&"left"!==e&&(this.xCorr-=a*c*(0>k?-1:1),d&&(this.yCorr-=m*c*(0>p?-1:1)),F(this.element,{textAlign:e}))},pathToVML:function(a){for(var b=a.length,c=[];b--;)m(a[b])?c[b]=Math.round(10*a[b])-5:"Z"===a[b]?c[b]="x":
(c[b]=a[b],!a.isArc||"wa"!==a[b]&&"at"!==a[b]||(c[b+5]===c[b+7]&&(c[b+7]+=a[b+7]>a[b+5]?1:-1),c[b+6]===c[b+8]&&(c[b+8]+=a[b+8]>a[b+6]?1:-1)));return c.join(" ")||"x"},clip:function(a){var b=this,c;a?(c=a.members,t(c,b),c.push(b),b.destroyClip=function(){t(c,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:b.docMode8?"inherit":"rect(auto)"});return b.css(a)},css:u.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&h(a)},destroy:function(){this.destroyClip&&this.destroyClip();return u.prototype.destroy.apply(this)},
on:function(a,b){this.element["on"+a]=function(){var a=I.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){var k;a=a.split(/[ ,]/);k=a.length;if(9===k||11===k)a[k-4]=a[k-2]=c(a[k-2])-10*b;return a.join(" ")},shadow:function(a,b,d){var k=[],p,q=this.element,e=this.renderer,m,u=q.style,g,r=q.path,f,J,E,l;r&&"string"!==typeof r.value&&(r="x");J=r;if(a){E=x(a.width,3);l=(a.opacity||.15)/E;for(p=1;3>=p;p++)f=2*E+1-2*p,d&&(J=this.cutOffPath(r.value,f+.5)),g=['\x3cshape isShadow\x3d"true" strokeweight\x3d"',
f,'" filled\x3d"false" path\x3d"',J,'" coordsize\x3d"10 10" style\x3d"',q.style.cssText,'" /\x3e'],m=G(e.prepVML(g),null,{left:c(u.left)+x(a.offsetX,1),top:c(u.top)+x(a.offsetY,1)}),d&&(m.cutOff=f+1),g=['\x3cstroke color\x3d"',a.color||"#000000",'" opacity\x3d"',l*p,'"/\x3e'],G(e.prepVML(g),null,null,m),b?b.element.appendChild(m):q.parentNode.insertBefore(m,q),k.push(m);this.shadows=k}return this},updateShadows:A,setAttr:function(a,b){this.docMode8?this.element[a]=b:this.element.setAttribute(a,b)},
classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,b,c){(c.getElementsByTagName("stroke")[0]||G(this.renderer.prepVML(["\x3cstroke/\x3e"]),null,null,c))[b]=a||"solid";this[b]=a},dSetter:function(a,b,c){var k=this.shadows;a=a||[];this.d=a.join&&a.join(" ");c.path=a=this.pathToVML(a);if(k)for(c=k.length;c--;)k[c].path=k[c].cutOff?this.cutOffPath(a,k[c].cutOff):a;this.setAttr(b,a)},fillSetter:function(a,b,c){var k=c.nodeName;"SPAN"===k?c.style.color=a:"IMG"!==
k&&(c.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,c,b,this)))},"fill-opacitySetter":function(a,b,c){G(this.renderer.prepVML(["\x3c",b.split("-")[0],' opacity\x3d"',a,'"/\x3e']),null,null,c)},opacitySetter:A,rotationSetter:function(a,b,c){c=c.style;this[b]=c[b]=a;c.left=-Math.round(Math.sin(a*f)+1)+"px";c.top=Math.round(Math.cos(a*f))+"px"},strokeSetter:function(a,b,c){this.setAttr("strokecolor",this.renderer.color(a,c,b,this))},"stroke-widthSetter":function(a,b,c){c.stroked=!!a;
this[b]=a;m(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,c){"inherit"===a&&(a="visible");this.shadows&&w(this.shadows,function(c){c.style[b]=a});"DIV"===c.nodeName&&(a="hidden"===a?"-999em":0,this.docMode8||(c.style[b]=a?"visible":"hidden"),b="top");c.style[b]=a},xSetter:function(a,b,c){this[b]=a;"x"===b?b="left":"y"===b&&(b="top");this.updateClipping?(this[b]=a,this.updateClipping()):c.style[b]=a},zIndexSetter:function(a,
b,c){c.style[b]=a}},A["stroke-opacitySetter"]=A["fill-opacitySetter"],a.VMLElement=A=D(u,A),A.prototype.ySetter=A.prototype.widthSetter=A.prototype.heightSetter=A.prototype.xSetter,A={Element:A,isIE8:-1<I.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,b,c){var k,d;this.alignedObjects=[];k=this.createElement("div").css({position:"relative"});d=k.element;a.appendChild(k.element);this.isVML=!0;this.box=d;this.boxWrapper=k;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,
c,!1);if(!l.namespaces.hcv){l.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{l.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(q){l.styleSheets[0].cssText+="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,c,d){var k=this.createElement(),q=C(a);return e(k,{members:[],
count:0,left:(q?a.x:a)+1,top:(q?a.y:b)+1,width:(q?a.width:c)-1,height:(q?a.height:d)-1,getCSS:function(a){var b=a.element,c=b.nodeName,g=a.inverted,r=this.top-("shape"===c?b.offsetTop:0),q=this.left,b=q+this.width,k=r+this.height,r={clip:"rect("+Math.round(g?q:r)+"px,"+Math.round(g?k:b)+"px,"+Math.round(g?b:k)+"px,"+Math.round(g?r:q)+"px)"};!g&&a.docMode8&&"DIV"===c&&e(r,{width:b+"px",height:k+"px"});return r},updateClipping:function(){w(k.members,function(a){a.element&&a.css(k.getCSS(a))})}})},color:function(b,
c,d,e){var k=this,q,p=/^rgba/,m,u,g="none";b&&b.linearGradient?u="gradient":b&&b.radialGradient&&(u="pattern");if(u){var r,x,J=b.linearGradient||b.radialGradient,f,z,l,v,B,E="";b=b.stops;var C,h=[],t=function(){m=['\x3cfill colors\x3d"'+h.join(",")+'" opacity\x3d"',l,'" o:opacity2\x3d"',z,'" type\x3d"',u,'" ',E,'focus\x3d"100%" method\x3d"any" /\x3e'];G(k.prepVML(m),null,null,c)};f=b[0];C=b[b.length-1];0<f[0]&&b.unshift([0,f[1]]);1>C[0]&&b.push([1,C[1]]);w(b,function(g,b){p.test(g[1])?(q=a.color(g[1]),
r=q.get("rgb"),x=q.get("a")):(r=g[1],x=1);h.push(100*g[0]+"% "+r);b?(l=x,v=r):(z=x,B=r)});if("fill"===d)if("gradient"===u)d=J.x1||J[0]||0,b=J.y1||J[1]||0,f=J.x2||J[2]||0,J=J.y2||J[3]||0,E='angle\x3d"'+(90-180*Math.atan((J-b)/(f-d))/Math.PI)+'"',t();else{var g=J.r,n=2*g,I=2*g,A=J.cx,D=J.cy,F=c.radialReference,L,g=function(){F&&(L=e.getBBox(),A+=(F[0]-L.x)/L.width-.5,D+=(F[1]-L.y)/L.height-.5,n*=F[2]/L.width,I*=F[2]/L.height);E='src\x3d"'+a.getOptions().global.VMLRadialGradientURL+'" size\x3d"'+n+","+
I+'" origin\x3d"0.5,0.5" position\x3d"'+A+","+D+'" color2\x3d"'+B+'" ';t()};e.added?g():e.onAdd=g;g=v}else g=r}else p.test(b)&&"IMG"!==c.tagName?(q=a.color(b),e[d+"-opacitySetter"](q.get("a"),d,c),g=q.get("rgb")):(g=c.getElementsByTagName(d),g.length&&(g[0].opacity=1,g[0].type="solid"),g=b);return g},prepVML:function(a){var b=this.isIE8;a=a.join("");b?(a=a.replace("/\x3e",' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'),a=-1===a.indexOf('style\x3d"')?a.replace("/\x3e",' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e'):
a.replace('style\x3d"','style\x3d"display:inline-block;behavior:url(#default#VML);')):a=a.replace("\x3c","\x3chcv:");return a},text:B.prototype.html,path:function(a){var b={coordsize:"10 10"};d(a)?b.d=a:C(a)&&e(b,a);return this.createElement("shape").attr(b)},circle:function(a,b,c){var d=this.symbol("circle");C(a)&&(c=a.r,b=a.y,a=a.x);d.isCircle=!0;d.r=c;return d.attr({x:a,y:b})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(b)},
image:function(a,b,c,d,e){var q=this.createElement("img").attr({src:a});1<arguments.length&&q.attr({x:b,y:c,width:d,height:e});return q},createElement:function(a){return"rect"===a?this.symbol(a):B.prototype.createElement.call(this,a)},invertChild:function(a,b){var d=this;b=b.style;var k="IMG"===a.tagName&&a.style;F(a,{flip:"x",left:c(b.width)-(k?c(k.top):1),top:c(b.height)-(k?c(k.left):1),rotation:-90});w(a.childNodes,function(b){d.invertChild(b,a)})},symbols:{arc:function(a,b,c,d,e){var q=e.start,
k=e.end,p=e.r||c||d;c=e.innerR;d=Math.cos(q);var m=Math.sin(q),g=Math.cos(k),r=Math.sin(k);if(0===k-q)return["x"];q=["wa",a-p,b-p,a+p,b+p,a+p*d,b+p*m,a+p*g,b+p*r];e.open&&!c&&q.push("e","M",a,b);q.push("at",a-c,b-c,a+c,b+c,a+c*g,b+c*r,a+c*d,b+c*m,"x","e");q.isArc=!0;return q},circle:function(a,b,c,d,e){e&&n(e.r)&&(c=d=2*e.r);e&&e.isCircle&&(a-=c/2,b-=d/2);return["wa",a,b,a+c,b+d,a+c,b+d/2,a+c,b+d/2,"e"]},rect:function(a,b,c,d,e){return B.prototype.symbols[n(e)&&e.r?"callout":"square"].call(0,a,b,
c,d,e)}}},a.VMLRenderer=D=function(){this.init.apply(this,arguments)},D.prototype=b(B.prototype,A),a.Renderer=D);B.prototype.measureSpanWidth=function(a,b){var c=l.createElement("span");a=l.createTextNode(a);c.appendChild(a);F(c,b);this.box.appendChild(c);b=c.offsetWidth;h(c);return b}})(L);(function(a){function D(){var f=a.defaultOptions.global,h=l.moment;if(f.timezone){if(h)return function(a){return-h.tz(a,f.timezone).utcOffset()};a.error(25)}return f.useUTC&&f.getTimezoneOffset}function A(){var f=
a.defaultOptions.global,t,e=f.useUTC,d=e?"getUTC":"get",m=e?"setUTC":"set";a.Date=t=f.Date||l.Date;t.hcTimezoneOffset=e&&f.timezoneOffset;t.hcGetTimezoneOffset=D();t.hcMakeTime=function(a,b,d,c,m,f){var u;e?(u=t.UTC.apply(0,arguments),u+=n(u)):u=(new t(a,b,h(d,1),h(c,0),h(m,0),h(f,0))).getTime();return u};F("Minutes Hours Day Date Month FullYear".split(" "),function(a){t["hcGet"+a]=d+a});F("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),function(a){t["hcSet"+a]=m+a})}var G=a.color,
F=a.each,n=a.getTZOffset,f=a.merge,h=a.pick,l=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,VMLRadialGradientURL:"http://code.highcharts.com/5.0.11/gfx/vml-radial-gradient.png"},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",
align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",
width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",
month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:G("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",
position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(l){a.defaultOptions=f(!0,a.defaultOptions,l);A();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;A()})(L);(function(a){var D=a.correctFloat,A=a.defined,G=a.destroyObjectProperties,F=a.isNumber,n=a.merge,f=a.pick,h=a.deg2rad;a.Tick=function(a,f,h,e){this.axis=a;this.pos=
f;this.type=h||"";this.isNew=!0;h||e||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,h=a.options,t=a.chart,e=a.categories,d=a.names,m=this.pos,C=h.labels,b=a.tickPositions,x=m===b[0],c=m===b[b.length-1],d=e?f(e[m],d[m],m):m,e=this.label,b=b.info,u;a.isDatetimeAxis&&b&&(u=h.dateTimeLabelFormats[b.higherRanks[m]||b.unitName]);this.isFirst=x;this.isLast=c;h=a.labelFormatter.call({axis:a,chart:t,isFirst:x,isLast:c,dateTimeLabelFormat:u,value:a.isLog?D(a.lin2log(d)):d});A(e)?e&&
e.attr({text:h}):(this.labelLength=(this.label=e=A(h)&&C.enabled?t.renderer.text(h,0,0,C.useHTML).css(n(C.style)).add(a.labelGroup):null)&&e.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var l=this.axis,t=a.x,e=l.chart.chartWidth,d=l.chart.spacing,m=f(l.labelLeft,Math.min(l.pos,d[3])),d=f(l.labelRight,Math.max(l.pos+l.len,e-d[1])),C=this.label,b=this.rotation,x={left:0,center:.5,right:1}[l.labelAlign],
c=C.getBBox().width,u=l.getSlotWidth(),B=u,n=1,k,E={};if(b)0>b&&t-x*c<m?k=Math.round(t/Math.cos(b*h)-m):0<b&&t+x*c>d&&(k=Math.round((e-t)/Math.cos(b*h)));else if(e=t+(1-x)*c,t-x*c<m?B=a.x+B*(1-x)-m:e>d&&(B=d-a.x+B*x,n=-1),B=Math.min(u,B),B<u&&"center"===l.labelAlign&&(a.x+=n*(u-B-x*(u-Math.min(c,B)))),c>B||l.autoRotation&&(C.styles||{}).width)k=B;k&&(E.width=k,(l.options.labels.style||{}).textOverflow||(E.textOverflow="ellipsis"),C.css(E))},getPosition:function(a,f,h,e){var d=this.axis,m=d.chart,
l=e&&m.oldChartHeight||m.chartHeight;return{x:a?d.translate(f+h,null,null,e)+d.transB:d.left+d.offset+(d.opposite?(e&&m.oldChartWidth||m.chartWidth)-d.right-d.left:0),y:a?l-d.bottom+d.offset-(d.opposite?d.height:0):l-d.translate(f+h,null,null,e)-d.transB}},getLabelPosition:function(a,f,n,e,d,m,C,b){var x=this.axis,c=x.transA,u=x.reversed,l=x.staggerLines,t=x.tickRotCorr||{x:0,y:0},k=d.y;A(k)||(k=0===x.side?n.rotation?-8:-n.getBBox().height:2===x.side?t.y+8:Math.cos(n.rotation*h)*(t.y-n.getBBox(!1,
0).height/2));a=a+d.x+t.x-(m&&e?m*c*(u?-1:1):0);f=f+k-(m&&!e?m*c*(u?1:-1):0);l&&(n=C/(b||1)%l,x.opposite&&(n=l-n-1),f+=x.labelOffset/l*n);return{x:a,y:Math.round(f)}},getMarkPath:function(a,f,h,e,d,m){return m.crispLine(["M",a,f,"L",a+(d?0:-h),f+(d?h:0)],e)},renderGridLine:function(a,f,h){var e=this.axis,d=e.options,m=this.gridLine,l={},b=this.pos,x=this.type,c=e.tickmarkOffset,u=e.chart.renderer,B=x?x+"Grid":"grid",n=d[B+"LineWidth"],k=d[B+"LineColor"],d=d[B+"LineDashStyle"];m||(l.stroke=k,l["stroke-width"]=
n,d&&(l.dashstyle=d),x||(l.zIndex=1),a&&(l.opacity=0),this.gridLine=m=u.path().attr(l).addClass("highcharts-"+(x?x+"-":"")+"grid-line").add(e.gridGroup));if(!a&&m&&(a=e.getPlotLinePath(b+c,m.strokeWidth()*h,a,!0)))m[this.isNew?"attr":"animate"]({d:a,opacity:f})},renderMark:function(a,h,n){var e=this.axis,d=e.options,m=e.chart.renderer,l=this.type,b=l?l+"Tick":"tick",x=e.tickSize(b),c=this.mark,u=!c,B=a.x;a=a.y;var t=f(d[b+"Width"],!l&&e.isXAxis?1:0),d=d[b+"Color"];x&&(e.opposite&&(x[0]=-x[0]),u&&
(this.mark=c=m.path().addClass("highcharts-"+(l?l+"-":"")+"tick").add(e.axisGroup),c.attr({stroke:d,"stroke-width":t})),c[u?"attr":"animate"]({d:this.getMarkPath(B,a,x[0],c.strokeWidth()*n,e.horiz,m),opacity:h}))},renderLabel:function(a,h,n,e){var d=this.axis,m=d.horiz,l=d.options,b=this.label,x=l.labels,c=x.step,u=d.tickmarkOffset,B=!0,t=a.x;a=a.y;b&&F(t)&&(b.xy=a=this.getLabelPosition(t,a,b,m,x,u,e,c),this.isFirst&&!this.isLast&&!f(l.showFirstLabel,1)||this.isLast&&!this.isFirst&&!f(l.showLastLabel,
1)?B=!1:!m||d.isRadial||x.step||x.rotation||h||0===n||this.handleOverflow(a),c&&e%c&&(B=!1),B&&F(a.y)?(a.opacity=n,b[this.isNew?"attr":"animate"](a)):b.attr("y",-9999),this.isNew=!1)},render:function(a,h,n){var e=this.axis,d=e.horiz,m=this.getPosition(d,this.pos,e.tickmarkOffset,h),l=m.x,b=m.y,e=d&&l===e.pos+e.len||!d&&b===e.pos?-1:1;n=f(n,1);this.isActive=!0;this.renderGridLine(h,n,e);this.renderMark(m,n,e);this.renderLabel(m,h,n,a)},destroy:function(){G(this,this.axis)}}})(L);var S=function(a){var D=
a.addEvent,A=a.animObject,G=a.arrayMax,F=a.arrayMin,n=a.color,f=a.correctFloat,h=a.defaultOptions,l=a.defined,w=a.deg2rad,t=a.destroyObjectProperties,e=a.each,d=a.extend,m=a.fireEvent,C=a.format,b=a.getMagnitude,x=a.grep,c=a.inArray,u=a.isArray,B=a.isNumber,I=a.isString,k=a.merge,E=a.normalizeTickInterval,p=a.objectEach,z=a.pick,M=a.removeEvent,q=a.splat,y=a.syncTimeout,H=a.Tick,K=function(){this.init.apply(this,arguments)};a.extend(K.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",
second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",
lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},
defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,b){var g=b.isX,r=this;r.chart=a;r.horiz=a.inverted?!g:g;r.isXAxis=g;r.coll=r.coll||(g?"xAxis":"yAxis");r.opposite=b.opposite;r.side=b.side||(r.horiz?r.opposite?0:2:r.opposite?1:3);r.setOptions(b);var d=this.options,k=d.type;r.labelFormatter=d.labels.formatter||r.defaultLabelFormatter;
r.userOptions=b;r.minPixelPadding=0;r.reversed=d.reversed;r.visible=!1!==d.visible;r.zoomEnabled=!1!==d.zoomEnabled;r.hasNames="category"===k||!0===d.categories;r.categories=d.categories||r.hasNames;r.names=r.names||[];r.plotLinesAndBandsGroups={};r.isLog="logarithmic"===k;r.isDatetimeAxis="datetime"===k;r.positiveValuesOnly=r.isLog&&!r.allowNegativeLog;r.isLinked=l(d.linkedTo);r.ticks={};r.labelEdge=[];r.minorTicks={};r.plotLinesAndBands=[];r.alternateBands={};r.len=0;r.minRange=r.userMinRange=d.minRange||
d.maxZoom;r.range=d.range;r.offset=d.offset||0;r.stacks={};r.oldStacks={};r.stacksTouched=0;r.max=null;r.min=null;r.crosshair=z(d.crosshair,q(a.options.tooltip.crosshairs)[g?0:1],!1);b=r.options.events;-1===c(r,a.axes)&&(g?a.axes.splice(a.xAxis.length,0,r):a.axes.push(r),a[r.coll].push(r));r.series=r.series||[];a.inverted&&g&&void 0===r.reversed&&(r.reversed=!0);p(b,function(a,b){D(r,b,a)});r.lin2log=d.linearToLogConverter||r.lin2log;r.isLog&&(r.val2lin=r.log2lin,r.lin2val=r.lin2log)},setOptions:function(a){this.options=
k(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],k(h[this.coll],a))},defaultLabelFormatter:function(){var b=this.axis,c=this.value,d=b.categories,q=this.dateTimeLabelFormat,k=h.lang,e=k.numericSymbols,k=k.numericSymbolMagnitude||1E3,p=e&&e.length,v,m=b.options.labels.format,b=b.isLog?Math.abs(c):b.tickInterval;if(m)v=C(m,this);else if(d)v=c;else if(q)v=
a.dateFormat(q,c);else if(p&&1E3<=b)for(;p--&&void 0===v;)d=Math.pow(k,p+1),b>=d&&0===10*c%d&&null!==e[p]&&0!==c&&(v=a.numberFormat(c/d,-1)+e[p]);void 0===v&&(v=1E4<=Math.abs(c)?a.numberFormat(c,-1):a.numberFormat(c,-1,void 0,""));return v},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();e(a.series,function(g){if(g.visible||!b.options.chart.ignoreHiddenSeries){var c=g.options,r=c.threshold,
d;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=r&&(r=null);if(a.isXAxis)c=g.xData,c.length&&(g=F(c),B(g)||g instanceof Date||(c=x(c,function(a){return B(a)}),g=F(c)),a.dataMin=Math.min(z(a.dataMin,c[0]),g),a.dataMax=Math.max(z(a.dataMax,c[0]),G(c)));else if(g.getExtremes(),d=g.dataMax,g=g.dataMin,l(g)&&l(d)&&(a.dataMin=Math.min(z(a.dataMin,g),g),a.dataMax=Math.max(z(a.dataMax,d),d)),l(r)&&(a.threshold=r),!c.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})},translate:function(a,b,c,d,q,
k){var g=this.linkedParent||this,r=1,e=0,p=d?g.oldTransA:g.transA;d=d?g.oldMin:g.min;var m=g.minPixelPadding;q=(g.isOrdinal||g.isBroken||g.isLog&&q)&&g.lin2val;p||(p=g.transA);c&&(r*=-1,e=g.len);g.reversed&&(r*=-1,e-=r*(g.sector||g.len));b?(a=(a*r+e-m)/p+d,q&&(a=g.lin2val(a))):(q&&(a=g.val2lin(a)),a=r*(a-d)*p+e+r*m+(B(k)?p*k:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,
null,!0)},getPlotLinePath:function(a,b,c,d,q){var g=this.chart,r=this.left,k=this.top,e,p,m=c&&g.oldChartHeight||g.chartHeight,u=c&&g.oldChartWidth||g.chartWidth,y;e=this.transB;var x=function(a,b,g){if(a<b||a>g)d?a=Math.min(Math.max(b,a),g):y=!0;return a};q=z(q,this.translate(a,null,null,c));a=c=Math.round(q+e);e=p=Math.round(m-q-e);B(q)?this.horiz?(e=k,p=m-this.bottom,a=c=x(a,r,r+this.width)):(a=r,c=u-this.right,e=p=x(e,k,k+this.height)):y=!0;return y&&!d?null:g.renderer.crispLine(["M",a,e,"L",
c,p],b||1)},getLinearTickPositions:function(a,b,c){var g,r=f(Math.floor(b/a)*a);c=f(Math.ceil(c/a)*a);var d=[];if(this.single)return[b];for(b=r;b<=c;){d.push(b);b=f(b+a);if(b===g)break;g=b}return d},getMinorTickPositions:function(){var a=this,b=a.options,c=a.tickPositions,d=a.minorTickInterval,q=[],k=a.pointRangePadding||0,p=a.min-k,k=a.max+k,v=k-p;if(v&&v/d<a.len/3)if(a.isLog)e(this.paddedTicks,function(b,g,c){g&&q.push.apply(q,a.getLogTickPositions(d,c[g-1],c[g],!0))});else if(a.isDatetimeAxis&&
"auto"===b.minorTickInterval)q=q.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d),p,k,b.startOfWeek));else for(b=p+(c[0]-p)%d;b<=k&&b!==q[0];b+=d)q.push(b);0!==q.length&&a.trimTicks(q);return q},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,d,q=this.dataMax-this.dataMin>=this.minRange,k,p,v,m,u,y;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(l(a.min)||l(a.max)?this.minRange=null:(e(this.series,function(a){m=a.xData;for(p=u=a.xIncrement?1:m.length-1;0<p;p--)if(v=m[p]-
m[p-1],void 0===k||v<k)k=v}),this.minRange=Math.min(5*k,this.dataMax-this.dataMin)));c-b<this.minRange&&(y=this.minRange,d=(y-c+b)/2,d=[b-d,z(a.min,b-d)],q&&(d[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=G(d),c=[b+y,z(a.max,b+y)],q&&(c[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),c=F(c),c-b<y&&(d[0]=c-y,d[1]=z(a.min,c-y),b=G(d)));this.min=b;this.max=c},getClosest:function(){var a;this.categories?a=1:e(this.series,function(b){var g=b.closestPointRange,c=b.visible||!b.chart.options.chart.ignoreHiddenSeries;
!b.noSharedTooltip&&l(g)&&c&&(a=l(a)?Math.min(a,g):g)});return a},nameToX:function(a){var b=u(this.categories),g=b?this.categories:this.names,d=a.options.x,q;a.series.requireSorting=!1;l(d)||(d=!1===this.options.uniqueNames?a.series.autoIncrement():c(a.name,g));-1===d?b||(q=g.length):q=d;void 0!==q&&(this.names[q]=a.name);return q},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=void 0,e(this.series||[],function(b){b.xIncrement=null;if(!b.points||b.isDirtyData)b.processData(),
b.generatePoints();e(b.points,function(g,c){var r;g.options&&(r=a.nameToX(g),void 0!==r&&r!==g.x&&(g.x=r,b.xData[c]=r))})}))},setAxisTranslation:function(a){var b=this,g=b.max-b.min,c=b.axisPointRange||0,d,q=0,k=0,p=b.linkedParent,m=!!b.categories,u=b.transA,y=b.isXAxis;if(y||m||c)d=b.getClosest(),p?(q=p.minPointOffset,k=p.pointRangePadding):e(b.series,function(a){var g=m?1:y?z(a.options.pointRange,d,0):b.axisPointRange||0;a=a.options.pointPlacement;c=Math.max(c,g);b.single||(q=Math.max(q,I(a)?0:
g/2),k=Math.max(k,"on"===a?0:g))}),p=b.ordinalSlope&&d?b.ordinalSlope/d:1,b.minPointOffset=q*=p,b.pointRangePadding=k*=p,b.pointRange=Math.min(c,g),y&&(b.closestPointRange=d);a&&(b.oldTransA=u);b.translationSlope=b.transA=u=b.options.staticScale||b.len/(g+k||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=u*q},minFromRange:function(){return this.max-this.range},setTickInterval:function(g){var c=this,d=c.chart,q=c.options,k=c.isLog,p=c.log2lin,u=c.isDatetimeAxis,v=c.isXAxis,y=c.isLinked,x=q.maxPadding,
H=q.minPadding,h=q.tickInterval,n=q.tickPixelInterval,C=c.categories,t=c.threshold,I=c.softThreshold,K,w,M,A;u||C||y||this.getTickAmount();M=z(c.userMin,q.min);A=z(c.userMax,q.max);y?(c.linkedParent=d[c.coll][q.linkedTo],d=c.linkedParent.getExtremes(),c.min=z(d.min,d.dataMin),c.max=z(d.max,d.dataMax),q.type!==c.linkedParent.options.type&&a.error(11,1)):(!I&&l(t)&&(c.dataMin>=t?(K=t,H=0):c.dataMax<=t&&(w=t,x=0)),c.min=z(M,K,c.dataMin),c.max=z(A,w,c.dataMax));k&&(c.positiveValuesOnly&&!g&&0>=Math.min(c.min,
z(c.dataMin,c.min))&&a.error(10,1),c.min=f(p(c.min),15),c.max=f(p(c.max),15));c.range&&l(c.max)&&(c.userMin=c.min=M=Math.max(c.min,c.minFromRange()),c.userMax=A=c.max,c.range=null);m(c,"foundExtremes");c.beforePadding&&c.beforePadding();c.adjustForMinRange();!(C||c.axisPointRange||c.usePercentage||y)&&l(c.min)&&l(c.max)&&(p=c.max-c.min)&&(!l(M)&&H&&(c.min-=p*H),!l(A)&&x&&(c.max+=p*x));B(q.softMin)&&(c.min=Math.min(c.min,q.softMin));B(q.softMax)&&(c.max=Math.max(c.max,q.softMax));B(q.floor)&&(c.min=
Math.max(c.min,q.floor));B(q.ceiling)&&(c.max=Math.min(c.max,q.ceiling));I&&l(c.dataMin)&&(t=t||0,!l(M)&&c.min<t&&c.dataMin>=t?c.min=t:!l(A)&&c.max>t&&c.dataMax<=t&&(c.max=t));c.tickInterval=c.min===c.max||void 0===c.min||void 0===c.max?1:y&&!h&&n===c.linkedParent.options.tickPixelInterval?h=c.linkedParent.tickInterval:z(h,this.tickAmount?(c.max-c.min)/Math.max(this.tickAmount-1,1):void 0,C?1:(c.max-c.min)*n/Math.max(c.len,n));v&&!g&&e(c.series,function(a){a.processData(c.min!==c.oldMin||c.max!==
c.oldMax)});c.setAxisTranslation(!0);c.beforeSetTickPositions&&c.beforeSetTickPositions();c.postProcessTickInterval&&(c.tickInterval=c.postProcessTickInterval(c.tickInterval));c.pointRange&&!h&&(c.tickInterval=Math.max(c.pointRange,c.tickInterval));g=z(q.minTickInterval,c.isDatetimeAxis&&c.closestPointRange);!h&&c.tickInterval<g&&(c.tickInterval=g);u||k||h||(c.tickInterval=E(c.tickInterval,null,b(c.tickInterval),z(q.allowDecimals,!(.5<c.tickInterval&&5>c.tickInterval&&1E3<c.max&&9999>c.max)),!!this.tickAmount));
this.tickAmount||(c.tickInterval=c.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,b,c=a.tickPositions,d=a.tickPositioner,q=a.startOnTick,k=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===a.minorTickInterval&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.single=this.min===this.max&&l(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);
this.tickPositions=b=c&&c.slice();!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,d&&(d=d.apply(this,[this.min,this.max])))&&(this.tickPositions=b=d);this.paddedTicks=b.slice(0);
this.trimTicks(b,q,k);this.isLinked||(this.single&&(this.min-=.5,this.max+=.5),c||d||this.adjustTickAmount())},trimTicks:function(a,b,c){var g=a[0],d=a[a.length-1],q=this.minPointOffset||0;if(!this.isLinked){if(b&&-Infinity!==g)this.min=g;else for(;this.min-q>a[0];)a.shift();if(c)this.max=d;else for(;this.max+q<a[a.length-1];)a.pop();0===a.length&&l(g)&&a.push((d+g)/2)}},alignToOthers:function(){var a={},b,c=this.options;!1===this.chart.options.chart.alignTicks||!1===c.alignTicks||this.isLog||e(this.chart[this.coll],
function(c){var g=c.options,g=[c.horiz?g.left:g.top,g.width,g.height,g.pane].join();c.series.length&&(a[g]?b=!0:a[g]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,c=a.tickPixelInterval;!l(a.tickInterval)&&this.len<c&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/c)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,c=this.tickAmount,
d=this.finalTickAmt,q=b&&b.length;if(q<c){for(;b.length<c;)b.push(f(b[b.length-1]+a));this.transA*=(q-1)/(c-1);this.max=b[b.length-1]}else q>c&&(this.tickInterval*=2,this.setTickPositions());if(l(d)){for(a=c=b.length;a--;)(3===d&&1===a%2||2>=d&&0<a&&a<c-1)&&b.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;e(this.series,function(b){if(b.isDirtyData||b.isDirty||
b.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,c,q,k){var g=this,r=g.chart;c=z(c,!0);e(g.series,
function(a){delete a.kdTree});k=d(k,{min:a,max:b});m(g,"setExtremes",k,function(){g.userMin=a;g.userMax=b;g.eventArgs=k;c&&r.redraw(q)})},zoom:function(a,b){var c=this.dataMin,g=this.dataMax,d=this.options,q=Math.min(c,z(d.min,c)),d=Math.max(g,z(d.max,g));if(a!==this.min||b!==this.max)this.allowZoomOutside||(l(c)&&(a<q&&(a=q),a>d&&(a=d)),l(g)&&(b<q&&(b=q),b>d&&(b=d))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,
b=this.options,c=b.offsets||[0,0,0,0],d=this.horiz,q=z(b.width,a.plotWidth-c[3]+c[1]),k=z(b.height,a.plotHeight-c[0]+c[2]),p=z(b.top,a.plotTop+c[0]),b=z(b.left,a.plotLeft+c[3]),c=/%$/;c.test(k)&&(k=Math.round(parseFloat(k)/100*a.plotHeight));c.test(p)&&(p=Math.round(parseFloat(p)/100*a.plotHeight+a.plotTop));this.left=b;this.top=p;this.width=q;this.height=k;this.bottom=a.chartHeight-k-p;this.right=a.chartWidth-q-b;this.len=Math.max(d?q:k,0);this.pos=d?b:p},getExtremes:function(){var a=this.isLog,
b=this.lin2log;return{min:a?f(b(this.min)):this.min,max:a?f(b(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,c=this.lin2log,g=b?c(this.min):this.min,b=b?c(this.max):this.max;null===a?a=g:g>a?a=g:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(z(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var b=this.options,c=b[a+
"Length"],g=z(b[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(g&&c)return"inside"===b[a+"Position"]&&(c=-c),[c,g]},labelMetrics:function(){return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[0]&&this.ticks[0].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,c=this.tickInterval,d=c,q=this.len/(((this.categories?1:0)+this.max-this.min)/c),k,p=a.rotation,v=this.labelMetrics(),m,u=Number.MAX_VALUE,y,x=function(a){a/=q||1;a=1<
a?Math.ceil(a):1;return a*c};b?(y=!a.staggerLines&&!a.step&&(l(p)?[p]:q<z(a.autoRotationLimit,80)&&a.autoRotation))&&e(y,function(a){var b;if(a===p||a&&-90<=a&&90>=a)m=x(Math.abs(v.h/Math.sin(w*a))),b=m+Math.abs(a/360),b<u&&(u=b,k=a,d=m)}):a.step||(d=x(v.h));this.autoRotation=y;this.labelRotation=z(k,p);return d},getSlotWidth:function(){var a=this.chart,b=this.horiz,c=this.options.labels,d=Math.max(this.tickPositions.length-(this.categories?0:1),1),q=a.margin[3];return b&&2>(c.step||0)&&!c.rotation&&
(this.staggerLines||1)*this.len/d||!b&&(q&&q-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,c=this.tickPositions,d=this.ticks,q=this.options.labels,p=this.horiz,m=this.getSlotWidth(),v=Math.max(1,Math.round(m-2*(q.padding||5))),u={},y=this.labelMetrics(),x=q.style&&q.style.textOverflow,f,H=0,h,l;I(q.rotation)||(u.rotation=q.rotation||0);e(c,function(a){(a=d[a])&&a.labelLength>H&&(H=a.labelLength)});this.maxLabelLength=H;if(this.autoRotation)H>v&&H>y.h?u.rotation=
this.labelRotation:this.labelRotation=0;else if(m&&(f={width:v+"px"},!x))for(f.textOverflow="clip",h=c.length;!p&&h--;)if(l=c[h],v=d[l].label)v.styles&&"ellipsis"===v.styles.textOverflow?v.css({textOverflow:"clip"}):d[l].labelLength>m&&v.css({width:m+"px"}),v.getBBox().height>this.len/c.length-(y.h-y.f)&&(v.specCss={textOverflow:"ellipsis"});u.rotation&&(f={width:(H>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},x||(f.textOverflow="ellipsis"));if(this.labelAlign=q.align||this.autoLabelAlign(this.labelRotation))u.align=
this.labelAlign;e(c,function(a){var b=(a=d[a])&&a.label;b&&(b.attr(u),f&&b.css(k(f,b.specCss)),delete b.specCss,a.rotation=u.rotation)});this.tickRotCorr=b.rotCorr(y.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||l(this.min)&&l(this.max)&&!!this.tickPositions},addTitle:function(a){var b=this.chart.renderer,c=this.horiz,g=this.opposite,d=this.options.title,q;this.axisTitle||((q=d.textAlign)||(q=(c?{low:"left",middle:"center",high:"right"}:{low:g?"right":"left",
middle:"center",high:g?"left":"right"})[d.align]),this.axisTitle=b.text(d.text,0,0,d.useHTML).attr({zIndex:7,rotation:d.rotation||0,align:q}).addClass("highcharts-axis-title").css(d.style).add(this.axisGroup),this.axisTitle.isNew=!0);this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():b[a]=new H(this,a)},getOffset:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,q=a.tickPositions,k=a.ticks,m=a.horiz,v=a.side,u=b.inverted?[1,0,3,2][v]:v,y,x,f=
0,H,h=0,B=d.title,n=d.labels,E=0,C=b.axisOffset,b=b.clipOffset,t=[-1,1,1,-1][v],I=d.className,K=a.axisParent,w=this.tickSize("tick");y=a.hasData();a.showAxis=x=y||z(d.showEmpty,!0);a.staggerLines=a.horiz&&n.staggerLines;a.axisGroup||(a.gridGroup=c.g("grid").attr({zIndex:d.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(I||"")).add(K),a.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(I||"")).add(K),a.labelGroup=c.g("axis-labels").attr({zIndex:n.zIndex||
7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(I||"")).add(K));y||a.isLinked?(e(q,function(b,c){a.generateTick(b,c)}),a.renderUnsquish(),!1===n.reserveSpace||0!==v&&2!==v&&{1:"left",3:"right"}[v]!==a.labelAlign&&"center"!==a.labelAlign||e(q,function(a){E=Math.max(k[a].getLabelSize(),E)}),a.staggerLines&&(E*=a.staggerLines,a.labelOffset=E*(a.opposite?-1:1))):p(k,function(a,b){a.destroy();delete k[b]});B&&B.text&&!1!==B.enabled&&(a.addTitle(x),x&&!1!==B.reserveSpace&&(a.titleOffset=f=a.axisTitle.getBBox()[m?
"height":"width"],H=B.offset,h=l(H)?0:z(B.margin,m?5:10)));a.renderLine();a.offset=t*z(d.offset,C[v]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};c=0===v?-a.labelMetrics().h:2===v?a.tickRotCorr.y:0;h=Math.abs(E)+h;E&&(h=h-c+t*(m?z(n.y,a.tickRotCorr.y+8*t):n.x));a.axisTitleMargin=z(H,h);C[v]=Math.max(C[v],a.axisTitleMargin+f+t*a.offset,h,y&&q.length&&w?w[0]+t*a.offset:0);d=d.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);b[u]=Math.max(b[u],d)},getLinePath:function(a){var b=this.chart,c=this.opposite,
g=this.offset,d=this.horiz,q=this.left+(c?this.width:0)+g,g=b.chartHeight-this.bottom-(c?this.height:0)+g;c&&(a*=-1);return b.renderer.crispLine(["M",d?this.left:q,d?g:this.top,"L",d?b.chartWidth-this.right:q,d?g:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=
this.horiz,b=this.left,c=this.top,d=this.len,q=this.options.title,k=a?b:c,p=this.opposite,e=this.offset,m=q.x||0,u=q.y||0,y=this.chart.renderer.fontMetrics(q.style&&q.style.fontSize,this.axisTitle).f,d={low:k+(a?0:d),middle:k+d/2,high:k+(a?d:0)}[q.align],b=(a?c+this.height:b)+(a?1:-1)*(p?-1:1)*this.axisTitleMargin+(2===this.side?y:0);return{x:a?d+m:b+(p?this.width:0)+e+m,y:a?b+u-(p?this.height:0)+e:d+u}},renderMinorTick:function(a){var b=this.chart.hasRendered&&B(this.oldMin),c=this.minorTicks;c[a]||
(c[a]=new H(this,a,"minor"));b&&c[a].isNew&&c[a].render(null,!0);c[a].render(null,!1,1)},renderTick:function(a,b){var c=this.isLinked,g=this.ticks,d=this.chart.hasRendered&&B(this.oldMin);if(!c||a>=this.min&&a<=this.max)g[a]||(g[a]=new H(this,a)),d&&g[a].isNew&&g[a].render(b,!0,.1),g[a].render(b)},render:function(){var b=this,c=b.chart,d=b.options,q=b.isLog,k=b.lin2log,m=b.isLinked,u=b.tickPositions,v=b.axisTitle,x=b.ticks,f=b.minorTicks,h=b.alternateBands,l=d.stackLabels,B=d.alternateGridColor,z=
b.tickmarkOffset,n=b.axisLine,E=b.showAxis,C=A(c.renderer.globalAnimation),t,I;b.labelEdge.length=0;b.overlap=!1;e([x,f,h],function(a){p(a,function(a){a.isActive=!1})});if(b.hasData()||m)b.minorTickInterval&&!b.categories&&e(b.getMinorTickPositions(),function(a){b.renderMinorTick(a)}),u.length&&(e(u,function(a,c){b.renderTick(a,c)}),z&&(0===b.min||b.single)&&(x[-1]||(x[-1]=new H(b,-1,null,!0)),x[-1].render(-1))),B&&e(u,function(g,d){I=void 0!==u[d+1]?u[d+1]+z:b.max-z;0===d%2&&g<b.max&&I<=b.max+(c.polar?
-z:z)&&(h[g]||(h[g]=new a.PlotLineOrBand(b)),t=g+z,h[g].options={from:q?k(t):t,to:q?k(I):I,color:B},h[g].render(),h[g].isActive=!0)}),b._addedPlotLB||(e((d.plotLines||[]).concat(d.plotBands||[]),function(a){b.addPlotBandOrLine(a)}),b._addedPlotLB=!0);e([x,f,h],function(a){var b,g=[],d=C.duration;p(a,function(a,b){a.isActive||(a.render(b,!1,0),a.isActive=!1,g.push(b))});y(function(){for(b=g.length;b--;)a[g[b]]&&!a[g[b]].isActive&&(a[g[b]].destroy(),delete a[g[b]])},a!==h&&c.hasRendered&&d?d:0)});n&&
(n[n.isPlaced?"animate":"attr"]({d:this.getLinePath(n.strokeWidth())}),n.isPlaced=!0,n[E?"show":"hide"](!0));v&&E&&(v[v.isNew?"attr":"animate"](b.getTitlePosition()),v.isNew=!1);l&&l.enabled&&b.renderStackTotals();b.isDirty=!1},redraw:function(){this.visible&&(this.render(),e(this.plotLinesAndBands,function(a){a.render()}));e(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var b=this,g=b.stacks,d=b.plotLinesAndBands,q;
a||M(b);p(g,function(a,b){t(a);g[b]=null});e([b.ticks,b.minorTicks,b.alternateBands],function(a){t(a)});if(d)for(a=d.length;a--;)d[a].destroy();e("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){b[a]&&(b[a]=b[a].destroy())});for(q in b.plotLinesAndBandsGroups)b.plotLinesAndBandsGroups[q]=b.plotLinesAndBandsGroups[q].destroy();p(b,function(a,g){-1===c(g,b.keepProps)&&delete b[g]})},drawCrosshair:function(a,b){var c,d=this.crosshair,g=z(d.snap,!0),q,k=
this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(l(b)||!g)?(g?l(b)&&(q=this.isXAxis?b.plotX:this.len-b.plotY):q=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),l(q)&&(c=this.getPlotLinePath(b&&(this.isXAxis?b.x:z(b.stackY,b.y)),null,null,null,q)||null),l(c)?(b=this.categories&&!this.isRadial,k||(this.cross=k=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(b?"category ":"thin ")+d.className).attr({zIndex:z(d.zIndex,2)}).add(),k.attr({stroke:d.color||
(b?n("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":z(d.width,1)}),d.dashStyle&&k.attr({dashstyle:d.dashStyle})),k.show().attr({d:c}),b&&!d.width&&k.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&this.cross.hide()}});return a.Axis=K}(L);(function(a){var D=a.Axis,A=a.Date,G=a.dateFormat,F=a.defaultOptions,n=a.defined,f=a.each,h=a.extend,l=a.getMagnitude,w=a.getTZOffset,t=a.normalizeTickInterval,e=a.pick,
d=a.timeUnits;D.prototype.getTimeTicks=function(a,l,b,x){var c=[],m={},B=F.global.useUTC,t,k=new A(l-Math.max(w(l),w(b))),E=A.hcMakeTime,p=a.unitRange,z=a.count,C;if(n(l)){k[A.hcSetMilliseconds](p>=d.second?0:z*Math.floor(k.getMilliseconds()/z));if(p>=d.second)k[A.hcSetSeconds](p>=d.minute?0:z*Math.floor(k.getSeconds()/z));if(p>=d.minute)k[A.hcSetMinutes](p>=d.hour?0:z*Math.floor(k[A.hcGetMinutes]()/z));if(p>=d.hour)k[A.hcSetHours](p>=d.day?0:z*Math.floor(k[A.hcGetHours]()/z));if(p>=d.day)k[A.hcSetDate](p>=
d.month?1:z*Math.floor(k[A.hcGetDate]()/z));p>=d.month&&(k[A.hcSetMonth](p>=d.year?0:z*Math.floor(k[A.hcGetMonth]()/z)),t=k[A.hcGetFullYear]());if(p>=d.year)k[A.hcSetFullYear](t-t%z);if(p===d.week)k[A.hcSetDate](k[A.hcGetDate]()-k[A.hcGetDay]()+e(x,1));t=k[A.hcGetFullYear]();x=k[A.hcGetMonth]();var q=k[A.hcGetDate](),y=k[A.hcGetHours]();if(A.hcTimezoneOffset||A.hcGetTimezoneOffset)C=(!B||!!A.hcGetTimezoneOffset)&&(b-l>4*d.month||w(l)!==w(b)),k=k.getTime(),k=new A(k+w(k));B=k.getTime();for(l=1;B<b;)c.push(B),
B=p===d.year?E(t+l*z,0):p===d.month?E(t,x+l*z):!C||p!==d.day&&p!==d.week?C&&p===d.hour?E(t,x,q,y+l*z):B+p*z:E(t,x,q+l*z*(p===d.day?1:7)),l++;c.push(B);p<=d.hour&&1E4>c.length&&f(c,function(a){0===a%18E5&&"000000000"===G("%H%M%S%L",a)&&(m[a]="day")})}c.info=h(a,{higherRanks:m,totalRange:p*z});return c};D.prototype.normalizeTimeTickInterval=function(a,e){var b=e||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",
[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];e=b[b.length-1];var m=d[e[0]],c=e[1],u;for(u=0;u<b.length&&!(e=b[u],m=d[e[0]],c=e[1],b[u+1]&&a<=(m*c[c.length-1]+d[b[u+1][0]])/2);u++);m===d.year&&a<5*m&&(c=[1,2,5]);a=t(a/m,c,"year"===e[0]?Math.max(l(a/m),1):1);return{unitRange:m,count:a,unitName:e[0]}}})(L);(function(a){var D=a.Axis,A=a.getMagnitude,G=a.map,F=a.normalizeTickInterval,n=a.pick;D.prototype.getLogTickPositions=function(a,h,l,w){var f=this.options,e=this.len,d=this.lin2log,m=
this.log2lin,C=[];w||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),C=this.getLinearTickPositions(a,h,l);else if(.08<=a)for(var e=Math.floor(h),b,x,c,u,B,f=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];e<l+1&&!B;e++)for(x=f.length,b=0;b<x&&!B;b++)c=m(d(e)*f[b]),c>h&&(!w||u<=l)&&void 0!==u&&C.push(u),u>l&&(B=!0),u=c;else h=d(h),l=d(l),a=f[w?"minorTickInterval":"tickInterval"],a=n("auto"===a?null:a,this._minorAutoInterval,f.tickPixelInterval/(w?5:1)*(l-h)/((w?e/this.tickPositions.length:
e)||1)),a=F(a,null,A(a)),C=G(this.getLinearTickPositions(a,h,l),m),w||(this._minorAutoInterval=a/5);w||(this.tickInterval=a);return C};D.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};D.prototype.lin2log=function(a){return Math.pow(10,a)}})(L);(function(a,D){var A=a.arrayMax,G=a.arrayMin,F=a.defined,n=a.destroyObjectProperties,f=a.each,h=a.erase,l=a.merge,w=a.pick;a.PlotLineOrBand=function(a,e){this.axis=a;e&&(this.options=e,this.id=e.id)};a.PlotLineOrBand.prototype={render:function(){var f=
this,e=f.axis,d=e.horiz,m=f.options,h=m.label,b=f.label,x=m.to,c=m.from,u=m.value,B=F(c)&&F(x),n=F(u),k=f.svgElem,E=!k,p=[],z=m.color,M=w(m.zIndex,0),q=m.events,p={"class":"highcharts-plot-"+(B?"band ":"line ")+(m.className||"")},y={},H=e.chart.renderer,K=B?"bands":"lines",g=e.log2lin;e.isLog&&(c=g(c),x=g(x),u=g(u));n?(p={stroke:z,"stroke-width":m.width},m.dashStyle&&(p.dashstyle=m.dashStyle)):B&&(z&&(p.fill=z),m.borderWidth&&(p.stroke=m.borderColor,p["stroke-width"]=m.borderWidth));y.zIndex=M;K+=
"-"+M;(z=e.plotLinesAndBandsGroups[K])||(e.plotLinesAndBandsGroups[K]=z=H.g("plot-"+K).attr(y).add());E&&(f.svgElem=k=H.path().attr(p).add(z));if(n)p=e.getPlotLinePath(u,k.strokeWidth());else if(B)p=e.getPlotBandPath(c,x,m);else return;E&&p&&p.length?(k.attr({d:p}),q&&a.objectEach(q,function(a,b){k.on(b,function(a){q[b].apply(f,[a])})})):k&&(p?(k.show(),k.animate({d:p})):(k.hide(),b&&(f.label=b=b.destroy())));h&&F(h.text)&&p&&p.length&&0<e.width&&0<e.height&&!p.flat?(h=l({align:d&&B&&"center",x:d?
!B&&4:10,verticalAlign:!d&&B&&"middle",y:d?B?16:10:B?6:-4,rotation:d&&!B&&90},h),this.renderLabel(h,p,B,M)):b&&b.hide();return f},renderLabel:function(a,e,d,m){var f=this.label,b=this.axis.chart.renderer;f||(f={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(d?"band":"line")+"-label "+(a.className||"")},f.zIndex=m,this.label=f=b.text(a.text,0,0,a.useHTML).attr(f).add(),f.css(a.style));m=[e[1],e[4],d?e[6]:e[1]];e=[e[2],e[5],d?e[7]:e[2]];d=G(m);b=G(e);f.align(a,!1,{x:d,y:b,
width:A(m)-d,height:A(e)-b});f.show()},destroy:function(){h(this.axis.plotLinesAndBands,this);delete this.axis;n(this)}};a.extend(D.prototype,{getPlotBandPath:function(a,e){var d=this.getPlotLinePath(e,null,null,!0),m=this.getPlotLinePath(a,null,null,!0),f=this.horiz,b=1;a=a<this.min&&e<this.min||a>this.max&&e>this.max;m&&d?(a&&(m.flat=m.toString()===d.toString(),b=0),m.push(f&&d[4]===m[4]?d[4]+b:d[4],f||d[5]!==m[5]?d[5]:d[5]+b,f&&d[1]===m[1]?d[1]+b:d[1],f||d[2]!==m[2]?d[2]:d[2]+b)):m=null;return m},
addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(f,e){var d=(new a.PlotLineOrBand(this,f)).render(),m=this.userOptions;d&&(e&&(m[e]=m[e]||[],m[e].push(f)),this.plotLinesAndBands.push(d));return d},removePlotBandOrLine:function(a){for(var e=this.plotLinesAndBands,d=this.options,m=this.userOptions,l=e.length;l--;)e[l].id===a&&e[l].destroy();f([d.plotLines||[],m.plotLines||[],d.plotBands||
[],m.plotBands||[]],function(b){for(l=b.length;l--;)b[l].id===a&&h(b,b[l])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(L,S);(function(a){var D=a.dateFormat,A=a.each,G=a.extend,F=a.format,n=a.isNumber,f=a.map,h=a.merge,l=a.pick,w=a.splat,t=a.syncTimeout,e=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,e){this.chart=a;this.options=e;this.crosshairs=[];this.now={x:0,y:0};
this.isHidden=!0;this.split=e.split&&!a.inverted;this.shared=e.shared||this.split},cleanSplit:function(a){A(this.chart.series,function(d){var e=d&&d.tt;e&&(!e.isActive||a?d.tt=e.destroy():e.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,e=this.options;this.label||(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,e.shape||"callout",null,null,e.useHTML,null,"tooltip").attr({padding:e.padding,r:e.borderRadius}),this.label.attr({fill:e.backgroundColor,"stroke-width":e.borderWidth}).css(e.style).shadow(e.shadow)),
this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();h(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,h(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,e,f,b){var d=this,c=d.now,u=!1!==d.options.animation&&!d.isHidden&&(1<Math.abs(a-c.x)||1<Math.abs(e-
c.y)),m=d.followPointer||1<d.len;G(c,{x:u?(2*c.x+a)/3:a,y:u?(c.y+e)/2:e,anchorX:m?void 0:u?(2*c.anchorX+f)/3:f,anchorY:m?void 0:u?(c.anchorY+b)/2:b});d.getLabel().attr(c);u&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){d&&d.move(a,e,f,b)},32))},hide:function(a){var d=this;clearTimeout(this.hideTimer);a=l(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=t(function(){d.getLabel()[a?"fadeOut":"hide"]();d.isHidden=!0},a))},getAnchor:function(a,e){var d,b=this.chart,
m=b.inverted,c=b.plotTop,u=b.plotLeft,h=0,l=0,k,n;a=w(a);d=a[0].tooltipPos;this.followPointer&&e&&(void 0===e.chartX&&(e=b.pointer.normalize(e)),d=[e.chartX-b.plotLeft,e.chartY-c]);d||(A(a,function(a){k=a.series.yAxis;n=a.series.xAxis;h+=a.plotX+(!m&&n?n.left-u:0);l+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!m&&k?k.top-c:0)}),h/=a.length,l/=a.length,d=[m?b.plotWidth-l:h,this.shared&&!m&&1<a.length&&e?e.chartY-c:m?b.plotHeight-h:l]);return f(d,Math.round)},getPosition:function(a,e,f){var b=this.chart,
d=this.distance,c={},u=f.h||0,m,h=["y",b.chartHeight,e,f.plotY+b.plotTop,b.plotTop,b.plotTop+b.plotHeight],k=["x",b.chartWidth,a,f.plotX+b.plotLeft,b.plotLeft,b.plotLeft+b.plotWidth],n=!this.followPointer&&l(f.ttBelow,!b.inverted===!!f.negative),p=function(a,b,q,g,k,e){var p=q<g-d,m=g+d+q<b,y=g-d-q;g+=d;if(n&&m)c[a]=g;else if(!n&&p)c[a]=y;else if(p)c[a]=Math.min(e-q,0>y-u?y:y-u);else if(m)c[a]=Math.max(k,g+u+q>b?g:g+u);else return!1},z=function(a,b,q,g){var k;g<d||g>b-d?k=!1:c[a]=g<q/2?1:g>b-q/2?
b-q-2:g-q/2;return k},t=function(a){var b=h;h=k;k=b;m=a},q=function(){!1!==p.apply(0,h)?!1!==z.apply(0,k)||m||(t(!0),q()):m?c.x=c.y=0:(t(!0),q())};(b.inverted||1<this.len)&&t();q();return c},defaultFormatter:function(a){var d=this.points||w(this),e;e=[a.tooltipFooterHeaderFormatter(d[0])];e=e.concat(a.bodyFormatter(d));e.push(a.tooltipFooterHeaderFormatter(d[0],!0));return e},refresh:function(a,e){var d,b=this.options,m,c=a,u,f={},h=[];d=b.formatter||this.defaultFormatter;var f=this.shared,k;clearTimeout(this.hideTimer);
this.followPointer=w(c)[0].series.tooltipOptions.followPointer;u=this.getAnchor(c,e);e=u[0];m=u[1];!f||c.series&&c.series.noSharedTooltip?f=c.getLabelConfig():(A(c,function(a){a.setState("hover");h.push(a.getLabelConfig())}),f={x:c[0].category,y:c[0].y},f.points=h,c=c[0]);this.len=h.length;f=d.call(f,this);k=c.series;this.distance=l(k.tooltipOptions.distance,16);!1===f?this.hide():(d=this.getLabel(),this.isHidden&&d.attr({opacity:1}).show(),this.split?this.renderSplit(f,a):(d.attr({text:f&&f.join?
f.join(""):f}),d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+l(c.colorIndex,k.colorIndex)),d.attr({stroke:b.borderColor||c.color||k.color||"#666666"}),this.updatePosition({plotX:e,plotY:m,negative:c.negative,ttBelow:c.ttBelow,h:u[2]||0})),this.isHidden=!1)},renderSplit:function(d,e){var f=this,b=[],m=this.chart,c=m.renderer,u=!0,h=this.options,n,k=this.getLabel();A(d.slice(0,e.length+1),function(a,d){d=e[d-1]||{isHeader:!0,plotX:e[0].plotX};var p=d.series||f,x=p.tt,q=d.series||
{},y="highcharts-color-"+l(d.colorIndex,q.colorIndex,"none");x||(p.tt=x=c.label(null,null,null,"callout").addClass("highcharts-tooltip-box "+y).attr({padding:h.padding,r:h.borderRadius,fill:h.backgroundColor,stroke:d.color||q.color||"#333333","stroke-width":h.borderWidth}).add(k));x.isActive=!0;x.attr({text:a});x.css(h.style);a=x.getBBox();q=a.width+x.strokeWidth();d.isHeader?(n=a.height,q=Math.max(0,Math.min(d.plotX+m.plotLeft-q/2,m.chartWidth-q))):q=d.plotX+m.plotLeft-l(h.distance,16)-q;0>q&&(u=
!1);a=(d.series&&d.series.yAxis&&d.series.yAxis.pos)+(d.plotY||0);a-=m.plotTop;b.push({target:d.isHeader?m.plotHeight+n:a,rank:d.isHeader?1:0,size:p.tt.getBBox().height+1,point:d,x:q,tt:x})});this.cleanSplit();a.distribute(b,m.plotHeight+n);A(b,function(a){var b=a.point,c=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:u||b.isHeader?a.x:b.plotX+m.plotLeft+l(h.distance,16),y:a.pos+m.plotTop,anchorX:b.isHeader?b.plotX+m.plotLeft:b.plotX+c.xAxis.pos,anchorY:b.isHeader?a.pos+m.plotTop-
15:b.plotY+c.yAxis.pos})})},updatePosition:function(a){var d=this.chart,e=this.getLabel(),e=(this.options.positioner||this.getPosition).call(this,e.width,e.height,a);this.move(Math.round(e.x),Math.round(e.y||0),a.plotX+d.plotLeft,a.plotY+d.plotTop)},getDateFormat:function(a,f,h,b){var d=D("%m-%d %H:%M:%S.%L",f),c,u,m={millisecond:15,second:12,minute:9,hour:6,day:3},l="millisecond";for(u in e){if(a===e.week&&+D("%w",f)===h&&"00:00:00.000"===d.substr(6)){u="week";break}if(e[u]>a){u=l;break}if(m[u]&&
d.substr(m[u])!=="01-01 00:00:00.000".substr(m[u]))break;"week"!==u&&(l=u)}u&&(c=b[u]);return c},getXDateFormat:function(a,e,f){e=e.dateTimeLabelFormats;var b=f&&f.closestPointRange;return(b?this.getDateFormat(b,a.x,f.options.startOfWeek,e):e.day)||e.year},tooltipFooterHeaderFormatter:function(a,e){var d=e?"footer":"header";e=a.series;var b=e.tooltipOptions,f=b.xDateFormat,c=e.xAxis,u=c&&"datetime"===c.options.type&&n(a.key),d=b[d+"Format"];u&&!f&&(f=this.getXDateFormat(a,b,c));u&&f&&(d=d.replace("{point.key}",
"{point.key:"+f+"}"));return F(d,{point:a,series:e})},bodyFormatter:function(a){return f(a,function(a){var d=a.series.tooltipOptions;return(d.pointFormatter||a.point.tooltipFormatter).call(a.point,d.pointFormat)})}}})(L);(function(a){var D=a.addEvent,A=a.attr,G=a.charts,F=a.color,n=a.css,f=a.defined,h=a.doc,l=a.each,w=a.extend,t=a.fireEvent,e=a.offset,d=a.pick,m=a.removeEvent,C=a.splat,b=a.Tooltip,x=a.win;a.Pointer=function(a,b){this.init(a,b)};a.Pointer.prototype={init:function(a,e){this.options=
e;this.chart=a;this.runChartClick=e.chart.events&&!!e.chart.events.click;this.pinchDown=[];this.lastValidTouch={};b&&e.tooltip.enabled&&(a.tooltip=new b(a,e.tooltip),this.followTouchMove=d(e.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,c=b.options.chart,e=c.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(e=d(c.pinchType,e));this.zoomX=a=/x/.test(e);this.zoomY=e=/y/.test(e);this.zoomHor=a&&!b||e&&b;this.zoomVert=e&&!b||a&&b;this.hasZoom=a||e},normalize:function(a,
b){var c,d;a=a||x.event;a.target||(a.target=a.srcElement);d=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;b||(this.chartPosition=b=e(this.chart.container));void 0===d.pageX?(c=Math.max(a.x,a.clientX-b.left),b=a.y):(c=d.pageX-b.left,b=d.pageY-b.top);return w(a,{chartX:Math.round(c),chartY:Math.round(b)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};l(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});
return b},getKDPoints:function(a,b,e){var c=[],k,f,p;l(a,function(a){k=a.noSharedTooltip&&b;f=!b&&a.directTouch;a.visible&&!f&&d(a.options.enableMouseTracking,!0)&&(p=a.searchPoint(e,!k&&0>a.options.findNearestPointBy.indexOf("y")))&&p.series&&c.push(p)});c.sort(function(a,c){var d=a.distX-c.distX,e=a.dist-c.dist,k=(c.series.group&&c.series.group.zIndex)-(a.series.group&&a.series.group.zIndex);return 0!==d&&b?d:0!==e?e:0!==k?k:a.series.index>c.series.index?-1:1});if(b&&c[0]&&!c[0].series.noSharedTooltip)for(a=
c.length;a--;)(c[a].x!==c[0].x||c[a].series.noSharedTooltip)&&c.splice(a,1);return c},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getHoverData:function(b,e,f,m,k,x){var c=b,u=e,h;m?k?(h=[],l(f,function(a){var b=a.noSharedTooltip&&k,q=!k&&a.directTouch;a.visible&&!b&&!q&&d(a.options.enableMouseTracking,!0)&&(a=a.searchKDTree({clientX:c.clientX,plotY:c.plotY},!b&&1===a.kdDimensions))&&a.series&&h.push(a)}),0===h.length&&(h=[c])):h=[c]:u&&!u.stickyTracking?
(k||(f=[u]),h=this.getKDPoints(f,k,x),c=a.find(h,function(a){return a.series===u})):(b=a.grep(f,function(a){return a.stickyTracking}),h=this.getKDPoints(b,k,x),u=(c=h[0])&&c.series,k&&(h=this.getKDPoints(f,k,x)));h.sort(function(a,b){return a.series.index-b.series.index});return{hoverPoint:c,hoverSeries:u,hoverPoints:h}},runPointActions:function(b,e){var c=this.chart,f=c.tooltip,k=f?f.shared:!1,m=e||c.hoverPoint,p=m&&m.series||c.hoverSeries;e=this.getHoverData(m,p,c.series,!!e||p&&p.directTouch,k,
b);var u,x,m=e.hoverPoint;u=(p=e.hoverSeries)&&p.tooltipOptions.followPointer;x=(k=k&&m&&!m.series.noSharedTooltip)?e.hoverPoints:m?[m]:[];if(m&&(m!==c.hoverPoint||f&&f.isHidden)){l(c.hoverPoints||[],function(b){-1===a.inArray(b,x)&&b.setState()});l(x||[],function(a){a.setState("hover")});if(c.hoverSeries!==p)p.onMouseOver();p&&!p.directTouch&&(c.hoverPoint&&c.hoverPoint.firePointEvent("mouseOut"),m.firePointEvent("mouseOver"));c.hoverPoints=x;c.hoverPoint=m;f&&f.refresh(k?x:m,b)}else u&&f&&!f.isHidden&&
(p=f.getAnchor([{}],b),f.updatePosition({plotX:p[0],plotY:p[1]}));this.unDocMouseMove||(this.unDocMouseMove=D(h,"mousemove",function(b){var c=G[a.hoverChartIndex];if(c)c.pointer.onDocumentMouseMove(b)}));l(c.axes,function(c){d(c.crosshair.snap,!0)?a.find(x,function(a){return a.series[c.coll]===c})?c.drawCrosshair(b,m):c.hideCrosshair():c.drawCrosshair(b)})},reset:function(a,b){var c=this.chart,d=c.hoverSeries,e=c.hoverPoint,f=c.hoverPoints,p=c.tooltip,m=p&&p.shared?f:e;a&&m&&l(C(m),function(b){b.series.isCartesian&&
void 0===b.plotX&&(a=!1)});if(a)p&&m&&(p.refresh(m),e&&(e.setState(e.state,!0),l(c.axes,function(a){a.crosshair&&a.drawCrosshair(null,e)})));else{if(e)e.onMouseOut();f&&l(f,function(a){a.setState()});if(d)d.onMouseOut();p&&p.hide(b);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());l(c.axes,function(a){a.hideCrosshair()});this.hoverX=c.hoverPoints=c.hoverPoint=null}},scaleGroups:function(a,b){var c=this.chart,d;l(c.series,function(e){d=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&
e.group&&(e.group.attr(d),e.markerGroup&&(e.markerGroup.attr(d),e.markerGroup.clip(b?c.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(d))});c.clipRect.attr(b||c.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,d=a.chartX,e=a.chartY,f=this.zoomHor,p=this.zoomVert,m=b.plotLeft,x=b.plotTop,q=b.plotWidth,y=b.plotHeight,h,l=this.selectionMarker,
g=this.mouseDownX,r=this.mouseDownY,n=c.panKey&&a[c.panKey+"Key"];l&&l.touch||(d<m?d=m:d>m+q&&(d=m+q),e<x?e=x:e>x+y&&(e=x+y),this.hasDragged=Math.sqrt(Math.pow(g-d,2)+Math.pow(r-e,2)),10<this.hasDragged&&(h=b.isInsidePlot(g-m,r-x),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&h&&!n&&!l&&(this.selectionMarker=l=b.renderer.rect(m,x,f?1:q,p?1:y,0).attr({fill:c.selectionMarkerFill||F("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),l&&f&&(d-=g,l.attr({width:Math.abs(d),
x:(0<d?0:d)+g})),l&&p&&(d=e-r,l.attr({height:Math.abs(d),y:(0<d?0:d)+r})),h&&!l&&c.panning&&b.pan(a,c.panning)))},drop:function(a){var b=this,c=this.chart,d=this.hasPinched;if(this.selectionMarker){var e={originalEvent:a,xAxis:[],yAxis:[]},m=this.selectionMarker,p=m.attr?m.attr("x"):m.x,x=m.attr?m.attr("y"):m.y,h=m.attr?m.attr("width"):m.width,q=m.attr?m.attr("height"):m.height,y;if(this.hasDragged||d)l(c.axes,function(c){if(c.zoomEnabled&&f(c.min)&&(d||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var k=
c.horiz,g="touchend"===a.type?c.minPixelPadding:0,m=c.toValue((k?p:x)+g),k=c.toValue((k?p+h:x+q)-g);e[c.coll].push({axis:c,min:Math.min(m,k),max:Math.max(m,k)});y=!0}}),y&&t(c,"selection",e,function(a){c.zoom(w(a,d?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();d&&this.scaleGroups()}c&&(n(c.container,{cursor:c._cursor}),c.cancelClick=10<this.hasDragged,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);
this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(b){G[a.hoverChartIndex]&&G[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition;a=this.normalize(a,c);!c||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var c=G[a.hoverChartIndex];c&&(b.relatedTarget||b.toElement)&&(c.pointer.reset(),c.pointer.chartPosition=
null)},onContainerMouseMove:function(b){var c=this.chart;f(a.hoverChartIndex)&&G[a.hoverChartIndex]&&G[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=c.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===c.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!c.isInsidePlot(b.chartX-c.plotLeft,b.chartY-c.plotTop)||c.openMenu||this.runPointActions(b)},inClass:function(a,b){for(var c;a;){if(c=A(a,"class")){if(-1!==c.indexOf(b))return!0;if(-1!==c.indexOf("highcharts-container"))return!1}a=
a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;if(!(!b||!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,d=b.plotLeft,e=b.plotTop;a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(t(c.series,"click",w(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",
a)):(w(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-e)&&t(b,"click",a)))},setDOMEvents:function(){var b=this,d=b.chart.container;d.onmousedown=function(a){b.onContainerMouseDown(a)};d.onmousemove=function(a){b.onContainerMouseMove(a)};d.onclick=function(a){b.onContainerClick(a)};D(d,"mouseleave",b.onContainerMouseLeave);1===a.chartCount&&D(h,"mouseup",b.onDocumentMouseUp);a.hasTouch&&(d.ontouchstart=function(a){b.onContainerTouchStart(a)},d.ontouchmove=function(a){b.onContainerTouchMove(a)},
1===a.chartCount&&D(h,"touchend",b.onDocumentTouchEnd))},destroy:function(){var b=this;b.unDocMouseMove&&b.unDocMouseMove();m(b.chart.container,"mouseleave",b.onContainerMouseLeave);a.chartCount||(m(h,"mouseup",b.onDocumentMouseUp),m(h,"touchend",b.onDocumentTouchEnd));clearInterval(b.tooltipTimeout);a.objectEach(b,function(a,c){b[c]=null})}}})(L);(function(a){var D=a.charts,A=a.each,G=a.extend,F=a.map,n=a.noop,f=a.pick;G(a.Pointer.prototype,{pinchTranslate:function(a,f,n,t,e,d){this.zoomHor&&this.pinchTranslateDirection(!0,
a,f,n,t,e,d);this.zoomVert&&this.pinchTranslateDirection(!1,a,f,n,t,e,d)},pinchTranslateDirection:function(a,f,n,t,e,d,m,C){var b=this.chart,x=a?"x":"y",c=a?"X":"Y",h="chart"+c,l=a?"width":"height",w=b["plot"+(a?"Left":"Top")],k,E,p=C||1,z=b.inverted,M=b.bounds[a?"h":"v"],q=1===f.length,y=f[0][h],H=n[0][h],K=!q&&f[1][h],g=!q&&n[1][h],r;n=function(){!q&&20<Math.abs(y-K)&&(p=C||Math.abs(H-g)/Math.abs(y-K));E=(w-H)/p+y;k=b["plot"+(a?"Width":"Height")]/p};n();f=E;f<M.min?(f=M.min,r=!0):f+k>M.max&&(f=
M.max-k,r=!0);r?(H-=.8*(H-m[x][0]),q||(g-=.8*(g-m[x][1])),n()):m[x]=[H,g];z||(d[x]=E-w,d[l]=k);d=z?1/p:p;e[l]=k;e[x]=f;t[z?a?"scaleY":"scaleX":"scale"+c]=p;t["translate"+c]=d*w+(H-d*y)},pinch:function(a){var h=this,w=h.chart,t=h.pinchDown,e=a.touches,d=e.length,m=h.lastValidTouch,C=h.hasZoom,b=h.selectionMarker,x={},c=1===d&&(h.inClass(a.target,"highcharts-tracker")&&w.runTrackerClick||h.runChartClick),u={};1<d&&(h.initiated=!0);C&&h.initiated&&!c&&a.preventDefault();F(e,function(a){return h.normalize(a)});
"touchstart"===a.type?(A(e,function(a,b){t[b]={chartX:a.chartX,chartY:a.chartY}}),m.x=[t[0].chartX,t[1]&&t[1].chartX],m.y=[t[0].chartY,t[1]&&t[1].chartY],A(w.axes,function(a){if(a.zoomEnabled){var b=w.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,d=a.toPixels(f(a.options.min,a.dataMin)),e=a.toPixels(f(a.options.max,a.dataMax)),m=Math.max(d,e);b.min=Math.min(a.pos,Math.min(d,e)-c);b.max=Math.max(a.pos+a.len,m+c)}}),h.res=!0):h.followTouchMove&&1===d?this.runPointActions(h.normalize(a)):t.length&&(b||
(h.selectionMarker=b=G({destroy:n,touch:!0},w.plotBox)),h.pinchTranslate(t,e,x,b,u,m),h.hasPinched=C,h.scaleGroups(x,u),h.res&&(h.res=!1,this.reset(!1,0)))},touch:function(h,l){var n=this.chart,t,e;if(n.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=n.index;1===h.touches.length?(h=this.normalize(h),(e=n.isInsidePlot(h.chartX-n.plotLeft,h.chartY-n.plotTop))&&!n.openMenu?(l&&this.runPointActions(h),"touchmove"===h.type&&(l=this.pinchDown,t=l[0]?4<=Math.sqrt(Math.pow(l[0].chartX-
h.chartX,2)+Math.pow(l[0].chartY-h.chartY,2)):!1),f(t,!0)&&this.pinch(h)):l&&this.reset()):2===h.touches.length&&this.pinch(h)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(f){D[a.hoverChartIndex]&&D[a.hoverChartIndex].pointer.drop(f)}})})(L);(function(a){var D=a.addEvent,A=a.charts,G=a.css,F=a.doc,n=a.extend,f=a.noop,h=a.Pointer,l=a.removeEvent,w=a.win,t=a.wrap;if(!a.hasTouch&&(w.PointerEvent||w.MSPointerEvent)){var e=
{},d=!!w.PointerEvent,m=function(){var b=[];b.item=function(a){return this[a]};a.objectEach(e,function(a){b.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return b},C=function(b,d,c,e){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!A[a.hoverChartIndex]||(e(b),e=A[a.hoverChartIndex].pointer,e[d]({type:c,target:b.currentTarget,preventDefault:f,touches:m()}))};n(h.prototype,{onContainerPointerDown:function(a){C(a,"onContainerTouchStart","touchstart",function(a){e[a.pointerId]=
{pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){C(a,"onContainerTouchMove","touchmove",function(a){e[a.pointerId]={pageX:a.pageX,pageY:a.pageY};e[a.pointerId].target||(e[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){C(a,"onDocumentTouchEnd","touchend",function(a){delete e[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,d?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,d?"pointermove":
"MSPointerMove",this.onContainerPointerMove);a(F,d?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});t(h.prototype,"init",function(a,d,c){a.call(this,d,c);this.hasZoom&&G(d.container,{"-ms-touch-action":"none","touch-action":"none"})});t(h.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(D)});t(h.prototype,"destroy",function(a){this.batchMSEvents(l);a.call(this)})}})(L);(function(a){var D,A=a.addEvent,G=a.css,F=a.discardElement,n=a.defined,
f=a.each,h=a.isFirefox,l=a.marginNames,w=a.merge,t=a.pick,e=a.setAnimation,d=a.stableSort,m=a.win,C=a.wrap;D=a.Legend=function(a,d){this.init(a,d)};D.prototype={init:function(a,d){this.chart=a;this.setOptions(d);d.enabled&&(this.render(),A(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var b=t(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=w(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=
b;this.initialItemY=b-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=t(a.symbolWidth,16);this.pages=[]},update:function(a,d){var b=this.chart;this.setOptions(w(!0,this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;t(d,!0)&&b.redraw()},colorizeItem:function(b,d){b.legendGroup[d?"removeClass":"addClass"]("highcharts-legend-item-hidden");var c=this.options,e=b.legendItem,f=b.legendLine,m=b.legendSymbol,k=this.itemHiddenStyle.color,c=d?c.itemStyle.color:k,h=d?b.color||k:k,p=b.options&&
b.options.marker,x={fill:h};e&&e.css({fill:c,color:c});f&&f.attr({stroke:h});m&&(p&&m.isMarker&&(x=b.pointAttribs(),d||a.objectEach(x,function(a,b){x[b]=k})),m.attr(x))},positionItem:function(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,d=a._legendItemPos,e=d[0],d=d[1],f=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?e:this.legendWidth-e-2*c-4,d);f&&(f.x=e,f.y=d)},destroyItem:function(a){var b=a.checkbox;f(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=
a[b].destroy())});b&&F(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}f(this.getAllItems(),function(b){f(["legendItem","legendGroup"],a,b)});f("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(a){var b=this.group&&this.group.alignAttr,c,d=this.clipHeight||this.legendHeight,e=this.titleHeight;b&&(c=b.translateY,f(this.allItems,function(f){var k=f.checkbox,m;k&&(m=c+e+k.y+(a||0)+3,G(k,{left:b.translateX+
f.checkboxOffset+k.x-20+"px",top:m+"px",display:m>c-6&&m<c+d-6?"":"none"}))}))},renderTitle:function(){var a=this.options,d=this.padding,c=a.title,e=0;c.text&&(this.title||(this.title=this.chart.renderer.label(c.text,d-3,d-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).css(c.style).add(this.group)),a=this.title.getBBox(),e=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:e}));this.titleHeight=e},setText:function(b){var d=this.options;b.legendItem.attr({text:d.labelFormat?
a.format(d.labelFormat,b):d.labelFormatter.call(b)})},renderItem:function(a){var b=this.chart,c=b.renderer,d=this.options,e="horizontal"===d.layout,f=this.symbolWidth,k=d.symbolPadding,m=this.itemStyle,p=this.itemHiddenStyle,h=this.padding,n=e?t(d.itemDistance,20):0,q=!d.rtl,y=d.width,l=d.itemMarginBottom||0,K=this.itemMarginTop,g=a.legendItem,r=!a.series,C=!r&&a.series.drawLegendSymbol?a.series:a,J=C.options,J=this.createCheckboxForItem&&J&&J.showCheckbox,N=d.useHTML,A=a.options.className;g||(a.legendGroup=
c.g("legend-item").addClass("highcharts-"+C.type+"-series highcharts-color-"+a.colorIndex+(A?" "+A:"")+(r?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=g=c.text("",q?f+k:-k,this.baseline||0,N).css(w(a.visible?m:p)).attr({align:q?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(m=m.fontSize,this.fontMetrics=c.fontMetrics(m,g),this.baseline=this.fontMetrics.f+3+K,g.attr("y",this.baseline)),this.symbolHeight=d.symbolHeight||this.fontMetrics.f,C.drawLegendSymbol(this,
a),this.setItemEvents&&this.setItemEvents(a,g,N),J&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);this.setText(a);c=g.getBBox();f=a.checkboxOffset=d.itemWidth||a.legendItemWidth||f+k+c.width+n+(J?20:0);this.itemHeight=k=Math.round(a.legendItemHeight||c.height||this.symbolHeight);e&&this.itemX-h+f>(y||b.spacingBox.width-2*h-d.x)&&(this.itemX=h,this.itemY+=K+this.lastLineHeight+l,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,f);this.lastItemY=K+this.itemY+l;this.lastLineHeight=
Math.max(k,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];e?this.itemX+=f:(this.itemY+=K+k+l,this.lastLineHeight=k);this.offsetWidth=y||Math.max((e?this.itemX-h-n:f)+h,this.offsetWidth)},getAllItems:function(){var a=[];f(this.chart.series,function(b){var c=b&&b.options;b&&t(c.showInLegend,n(c.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===c.legendType?b.data:b)))});return a},adjustMargins:function(a,d){var b=this.chart,e=this.options,m=e.align.charAt(0)+e.verticalAlign.charAt(0)+
e.layout.charAt(0);e.floating||f([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(c,k){c.test(m)&&!n(a[k])&&(b[l[k]]=Math.max(b[l[k]],b.legend[(k+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][k]*e[k%2?"x":"y"]+t(e.margin,12)+d[k]))})},render:function(){var a=this,e=a.chart,c=e.renderer,m=a.group,h,n,k,l,p=a.box,z=a.options,t=a.padding;a.itemX=t;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;m||(a.group=m=c.g("legend").attr({zIndex:7}).add(),a.contentGroup=c.g().attr({zIndex:1}).add(m),
a.scrollGroup=c.g().add(a.contentGroup));a.renderTitle();h=a.getAllItems();d(h,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});z.reversed&&h.reverse();a.allItems=h;a.display=n=!!h.length;a.lastLineHeight=0;f(h,function(b){a.renderItem(b)});k=(z.width||a.offsetWidth)+t;l=a.lastItemY+a.lastLineHeight+a.titleHeight;l=a.handleOverflow(l);l+=t;p||(a.box=p=c.rect().addClass("highcharts-legend-box").attr({r:z.borderRadius}).add(m),p.isNew=!0);p.attr({stroke:z.borderColor,
"stroke-width":z.borderWidth||0,fill:z.backgroundColor||"none"}).shadow(z.shadow);0<k&&0<l&&(p[p.isNew?"attr":"animate"](p.crisp({x:0,y:0,width:k,height:l},p.strokeWidth())),p.isNew=!1);p[n?"show":"hide"]();a.legendWidth=k;a.legendHeight=l;f(h,function(b){a.positionItem(b)});n&&m.align(w(z,{width:k,height:l}),!0,"spacingBox");e.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,d=c.renderer,e=this.options,m=e.y,k=this.padding,c=c.spacingBox.height+("top"===e.verticalAlign?
-m:m)-k,m=e.maxHeight,h,p=this.clipRect,l=e.navigation,n=t(l.animation,!0),q=l.arrowSize||12,y=this.nav,H=this.pages,K,g=this.allItems,r=function(a){"number"===typeof a?p.attr({height:a}):p&&(b.clipRect=p.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+k+"px,9999px,"+(k+a)+"px,0)":"auto")};"horizontal"!==e.layout||"middle"===e.verticalAlign||e.floating||(c/=2);m&&(c=Math.min(c,m));H.length=0;a>c&&!1!==l.enabled?(this.clipHeight=h=Math.max(c-20-this.titleHeight-
k,0),this.currentPage=t(this.currentPage,1),this.fullHeight=a,f(g,function(a,b){var c=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var d=H.length;if(!d||c-H[d-1]>h&&(K||c)!==H[d-1])H.push(K||c),d++;b===g.length-1&&c+a-H[d-1]>h&&H.push(c);c!==K&&(K=c)}),p||(p=b.clipRect=d.clipRect(0,k,9999,0),b.contentGroup.clip(p)),r(h),y||(this.nav=y=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,q,q).on("click",function(){b.scroll(-1,n)}).add(y),this.pager=d.text("",15,
10).addClass("highcharts-legend-navigation").css(l.style).add(y),this.down=d.symbol("triangle-down",0,0,q,q).on("click",function(){b.scroll(1,n)}).add(y)),b.scroll(0),a=c):y&&(r(),this.nav=y.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,d){var b=this.pages,f=b.length;a=this.currentPage+a;var m=this.clipHeight,h=this.options.navigation,k=this.pager,l=this.padding;a>f&&(a=f);0<a&&(void 0!==d&&e(d,this.chart),this.nav.attr({translateX:l,translateY:m+this.padding+
7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),k.attr({text:a+"/"+f}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===f?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?h.inactiveColor:h.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===f?h.inactiveColor:h.activeColor}).css({cursor:a===f?"default":"pointer"}),d=-b[a-1]+this.initialItemY,
this.scrollGroup.animate({translateY:d}),this.currentPage=a,this.positionCheckboxes(d))}};a.LegendSymbolMixin={drawRectangle:function(a,d){var b=a.symbolHeight,e=a.options.squareSymbol;d.legendSymbol=this.chart.renderer.rect(e?(a.symbolWidth-b)/2:0,a.baseline-b+1,e?b:a.symbolWidth,b,t(a.options.symbolRadius,b/2)).addClass("highcharts-point").attr({zIndex:3}).add(d.legendGroup)},drawLineMarker:function(a){var b=this.options,c=b.marker,d=a.symbolWidth,e=a.symbolHeight,f=e/2,k=this.chart.renderer,m=
this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var p;p={"stroke-width":b.lineWidth||0};b.dashStyle&&(p.dashstyle=b.dashStyle);this.legendLine=k.path(["M",0,a,"L",d,a]).addClass("highcharts-graph").attr(p).add(m);c&&!1!==c.enabled&&(b=Math.min(t(c.radius,f),f),0===this.symbol.indexOf("url")&&(c=w(c,{width:e,height:e}),b=0),this.legendSymbol=c=k.symbol(this.symbol,d/2-b,a-b,2*b,2*b,c).addClass("highcharts-point").add(m),c.isMarker=!0)}};(/Trident\/7\.0/.test(m.navigator.userAgent)||h)&&
C(D.prototype,"positionItem",function(a,d){var b=this,e=function(){d._legendItemPos&&a.call(b,d)};e();setTimeout(e)})})(L);(function(a){var D=a.addEvent,A=a.animate,G=a.animObject,F=a.attr,n=a.doc,f=a.Axis,h=a.createElement,l=a.defaultOptions,w=a.discardElement,t=a.charts,e=a.css,d=a.defined,m=a.each,C=a.extend,b=a.find,x=a.fireEvent,c=a.getStyle,u=a.grep,B=a.isNumber,I=a.isObject,k=a.isString,E=a.Legend,p=a.marginNames,z=a.merge,M=a.objectEach,q=a.Pointer,y=a.pick,H=a.pInt,K=a.removeEvent,g=a.seriesTypes,
r=a.splat,R=a.svg,J=a.syncTimeout,N=a.win,O=a.Renderer,P=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new P(a,b,c)};C(P.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(k(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var d,g,e=b.series,q=b.plotOptions||{};b.series=null;d=z(l,b);for(g in d.plotOptions)d.plotOptions[g].tooltip=q[g]&&z(q[g].tooltip)||void 0;d.tooltip.userOptions=b.chart&&b.chart.forExport&&
b.tooltip.userOptions||b.tooltip;d.series=b.series=e;this.userOptions=b;b=d.chart;g=b.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.callback=c;this.isResizing=0;this.options=d;this.axes=[];this.series=[];this.hasCartesianSeries=b.showAxes;var f=this;f.index=t.length;t.push(f);a.chartCount++;g&&M(g,function(a,b){D(f,b,a)});f.xAxis=[];f.yAxis=[];f.pointCount=f.colorCounter=f.symbolCounter=0;f.firstRender()},initSeries:function(b){var c=this.options.chart;(c=g[b.type||c.type||c.defaultSeriesType])||
a.error(17,!0);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].name||"Series "+(b[a].index+1))},isInsidePlot:function(a,b,c){var d=c?b:a;a=c?a:b;return 0<=d&&d<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){var c=this.axes,d=this.series,g=this.pointer,e=this.legend,q=this.isDirtyLegend,f,k,p=this.hasCartesianSeries,y=this.isDirtyBox,r,h=this.renderer,v=h.isHidden(),l=[];this.setResponsive&&this.setResponsive(!1);
a.setAnimation(b,this);v&&this.temporaryDisplay();this.layOutTitles();for(b=d.length;b--;)if(r=d[b],r.options.stacking&&(f=!0,r.isDirty)){k=!0;break}if(k)for(b=d.length;b--;)r=d[b],r.options.stacking&&(r.isDirty=!0);m(d,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),q=!0);a.isDirtyData&&x(a,"updatedData")});q&&e.options.enabled&&(e.render(),this.isDirtyLegend=!1);f&&this.getStacks();p&&m(c,function(a){a.updateNames();a.setScale()});this.getMargins();p&&(m(c,
function(a){a.isDirty&&(y=!0)}),m(c,function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,l.push(function(){x(a,"afterSetExtremes",C(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(y||f)&&a.redraw()}));y&&this.drawChartBox();x(this,"predraw");m(d,function(a){(y||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});g&&g.reset(!0);h.draw();x(this,"redraw");x(this,"render");v&&this.temporaryDisplay(!0);m(l,function(a){a.call()})},get:function(a){function c(b){return b.id===a||b.options&&b.options.id===
a}var d,g=this.series,e;d=b(this.axes,c)||b(this.series,c);for(e=0;!d&&e<g.length;e++)d=b(g[e].points||[],c);return d},getAxes:function(){var a=this,b=this.options,c=b.xAxis=r(b.xAxis||{}),b=b.yAxis=r(b.yAxis||{});m(c,function(a,b){a.index=b;a.isX=!0});m(b,function(a,b){a.index=b});c=c.concat(b);m(c,function(b){new f(a,b)})},getSelectedPoints:function(){var a=[];m(this.series,function(b){a=a.concat(u(b.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return u(this.series,
function(a){return a.selected})},setTitle:function(a,b,c){var d=this,g=d.options,e;e=g.title=z({style:{color:"#333333",fontSize:g.isStock?"16px":"18px"}},g.title,a);g=g.subtitle=z({style:{color:"#666666"}},g.subtitle,b);m([["title",a,e],["subtitle",b,g]],function(a,b){var c=a[0],g=d[c],e=a[1];a=a[2];g&&e&&(d[c]=g=g.destroy());a&&a.text&&!g&&(d[c]=d.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),d[c].update=function(a){d.setTitle(!b&&a,b&&
a)},d[c].css(a.style))});d.layOutTitles(c)},layOutTitles:function(a){var b=0,c,d=this.renderer,g=this.spacingBox;m(["title","subtitle"],function(a){var c=this[a],e=this.options[a];a="title"===a?-3:e.verticalAlign?0:b+2;var q;c&&(q=e.style.fontSize,q=d.fontMetrics(q,c).b,c.css({width:(e.width||g.width+e.widthAdjust)+"px"}).align(C({y:a+q},e),!1,"spacingBox"),e.floating||e.verticalAlign||(b=Math.ceil(b+c.getBBox(e.useHTML).height)))},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&
c&&(this.isDirtyBox=c,this.hasRendered&&y(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var b=this.options.chart,g=b.width,b=b.height,e=this.renderTo;d(g)||(this.containerWidth=c(e,"width"));d(b)||(this.containerHeight=c(e,"height"));this.chartWidth=Math.max(0,g||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(b,this.chartWidth)||this.containerHeight||400)},temporaryDisplay:function(b){var d=this.renderTo;if(b)for(;d&&d.style;)d.hcOrigStyle&&(a.css(d,d.hcOrigStyle),
delete d.hcOrigStyle),d=d.parentNode;else for(;d&&d.style;)"none"===c(d,"display",!1)&&(d.hcOrigStyle={display:d.style.display,height:d.style.height,overflow:d.style.overflow},a.css(d,{display:"block",height:0,overflow:"hidden"}),d.style.setProperty&&d.style.setProperty("display","block","important")),d=d.parentNode},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,c=this.options,d=c.chart,g,e;b=this.renderTo;var q=a.uniqueKey(),f;b||
(this.renderTo=b=d.renderTo);k(b)&&(this.renderTo=b=n.getElementById(b));b||a.error(13,!0);g=H(F(b,"data-highcharts-chart"));B(g)&&t[g]&&t[g].hasRendered&&t[g].destroy();F(b,"data-highcharts-chart",this.index);b.innerHTML="";d.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();g=this.chartWidth;e=this.chartHeight;f=C({position:"relative",overflow:"hidden",width:g+"px",height:e+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},d.style);
this.container=b=h("div",{id:q},f,b);this._cursor=b.style.cursor;this.renderer=new (a[d.renderer]||O)(b,g,e,null,d.forExport,c.exporting&&c.exporting.allowHTML);this.setClassName(d.className);this.renderer.setStyle(d.style);this.renderer.chartIndex=this.index},getMargins:function(a){var b=this.spacing,c=this.margin,g=this.titleOffset;this.resetMargins();g&&!d(c[0])&&(this.plotTop=Math.max(this.plotTop,g+this.options.title.margin+b[0]));this.legend.display&&this.legend.adjustMargins(c,b);this.extraMargin&&
(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&m(a.axes,function(a){a.visible&&a.getOffset()});m(p,function(g,e){d(c[e])||(a[g]+=b[e])});a.setChartSize()},reflow:function(a){var b=this,g=b.options.chart,e=b.renderTo,q=d(g.width),f=g.width||c(e,"width"),g=g.height||c(e,"height"),e=a?a.target:
N;if(!q&&!b.isPrinting&&f&&g&&(e===N||e===n)){if(f!==b.containerWidth||g!==b.containerHeight)clearTimeout(b.reflowTimeout),b.reflowTimeout=J(function(){b.container&&b.setSize(void 0,void 0,!1)},a?100:0);b.containerWidth=f;b.containerHeight=g}},initReflow:function(){var a=this,b;b=D(N,"resize",function(b){a.reflow(b)});D(a,"destroy",b)},setSize:function(b,c,d){var g=this,q=g.renderer;g.isResizing+=1;a.setAnimation(d,g);g.oldChartHeight=g.chartHeight;g.oldChartWidth=g.chartWidth;void 0!==b&&(g.options.chart.width=
b);void 0!==c&&(g.options.chart.height=c);g.getChartSize();b=q.globalAnimation;(b?A:e)(g.container,{width:g.chartWidth+"px",height:g.chartHeight+"px"},b);g.setChartSize(!0);q.setSize(g.chartWidth,g.chartHeight,d);m(g.axes,function(a){a.isDirty=!0;a.setScale()});g.isDirtyLegend=!0;g.isDirtyBox=!0;g.layOutTitles();g.getMargins();g.redraw(d);g.oldChartHeight=null;x(g,"resize");J(function(){g&&x(g,"endResize",null,function(){--g.isResizing})},G(b).duration)},setChartSize:function(a){var b=this.inverted,
c=this.renderer,d=this.chartWidth,g=this.chartHeight,e=this.options.chart,q=this.spacing,f=this.clipOffset,k,p,y,r;this.plotLeft=k=Math.round(this.plotLeft);this.plotTop=p=Math.round(this.plotTop);this.plotWidth=y=Math.max(0,Math.round(d-k-this.marginRight));this.plotHeight=r=Math.max(0,Math.round(g-p-this.marginBottom));this.plotSizeX=b?r:y;this.plotSizeY=b?y:r;this.plotBorderWidth=e.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:q[3],y:q[0],width:d-q[3]-q[1],height:g-q[0]-q[2]};this.plotBox=
c.plotBox={x:k,y:p,width:y,height:r};d=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(d,f[3])/2);c=Math.ceil(Math.max(d,f[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(d,f[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(d,f[2])/2-c))};a||m(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;m(["margin","spacing"],function(c){var d=b[c],g=I(d)?d:[d,d,d,d];m(["Top","Right","Bottom","Left"],
function(d,e){a[c][e]=y(b[c+d],g[e])})});m(p,function(b,c){a[b]=y(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,g=this.chartBackground,e=this.plotBackground,q=this.plotBorder,f,k=this.plotBGImage,m=a.backgroundColor,p=a.plotBackgroundColor,y=a.plotBackgroundImage,r,h=this.plotLeft,l=this.plotTop,n=this.plotWidth,H=this.plotHeight,x=this.plotBox,u=this.clipRect,z=this.clipBox,
t="animate";g||(this.chartBackground=g=b.rect().addClass("highcharts-background").add(),t="attr");f=a.borderWidth||0;r=f+(a.shadow?8:0);m={fill:m||"none"};if(f||g["stroke-width"])m.stroke=a.borderColor,m["stroke-width"]=f;g.attr(m).shadow(a.shadow);g[t]({x:r/2,y:r/2,width:c-r-f%2,height:d-r-f%2,r:a.borderRadius});t="animate";e||(t="attr",this.plotBackground=e=b.rect().addClass("highcharts-plot-background").add());e[t](x);e.attr({fill:p||"none"}).shadow(a.plotShadow);y&&(k?k.animate(x):this.plotBGImage=
b.image(y,h,l,n,H).add());u?u.animate({width:z.width,height:z.height}):this.clipRect=b.clipRect(z);t="animate";q||(t="attr",this.plotBorder=q=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());q.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});q[t](q.crisp({x:h,y:l,width:n,height:H},-q.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,e,q;m(["inverted","angular","polar"],function(f){c=g[b.type||
b.defaultSeriesType];q=b[f]||c&&c.prototype[f];for(e=d&&d.length;!q&&e--;)(c=g[d[e].type])&&c.prototype[f]&&(q=!0);a[f]=q})},linkSeries:function(){var a=this,b=a.series;m(b,function(a){a.linkedSeries.length=0});m(b,function(b){var c=b.options.linkedTo;k(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=y(b.options.visible,c.options.visible,b.visible))})},renderSeries:function(){m(this.series,function(a){a.translate();a.render()})},
renderLabels:function(){var a=this,b=a.options.labels;b.items&&m(b.items,function(c){var d=C(b.style,c.style),g=H(d.left)+a.plotLeft,e=H(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(c.html,g,e).attr({zIndex:2}).css(d).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,d,g,e;this.setTitle();this.legend=new E(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;d=this.plotHeight-=21;m(a,function(a){a.setScale()});
this.getAxisMargins();g=1.1<c/this.plotWidth;e=1.05<d/this.plotHeight;if(g||e)m(a,function(a){(a.horiz&&g||!a.horiz&&e)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&m(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=z(!0,this.options.credits,
a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(N.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,d=b.series,g=b.container,e,q=g&&g.parentNode;x(b,"destroy");b.renderer.forExport?a.erase(t,b):t[b.index]=void 0;a.chartCount--;
b.renderTo.removeAttribute("data-highcharts-chart");K(b);for(e=c.length;e--;)c[e]=c[e].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(e=d.length;e--;)d[e]=d[e].destroy();m("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});g&&(g.innerHTML="",K(g),q&&w(g));M(b,function(a,c){delete b[c]})},isReadyToRender:function(){var a=
this;return R||N!=N.top||"complete"===n.readyState?!0:(n.attachEvent("onreadystatechange",function(){n.detachEvent("onreadystatechange",a.firstRender);"complete"===n.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();x(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();m(b.series||[],function(b){a.initSeries(b)});a.linkSeries();x(a,"beforeRender");q&&(a.pointer=new q(a,b));a.render();if(!a.renderer.imgCount&&
a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){m([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);x(this,"load");x(this,"render");d(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}})})(L);(function(a){var D,A=a.each,G=a.extend,F=a.erase,n=a.fireEvent,f=a.format,h=a.isArray,l=a.isNumber,w=a.pick,t=a.removeEvent;D=a.Point=function(){};D.prototype={init:function(a,d,f){this.series=a;this.color=a.color;
this.applyOptions(d,f);a.options.colorByPoint?(d=a.options.colors||a.chart.options.colors,this.color=this.color||d[a.colorCounter],d=d.length,f=a.colorCounter,a.colorCounter++,a.colorCounter===d&&(a.colorCounter=0)):f=a.colorIndex;this.colorIndex=w(this.colorIndex,f);a.chart.pointCount++;return this},applyOptions:function(a,d){var e=this.series,f=e.options.pointValKey||e.pointValKey;a=D.prototype.optionsToObject.call(this,a);G(this,a);this.options=this.options?G(this.options,a):a;a.group&&delete this.group;
f&&(this.y=this[f]);this.isNull=w(this.isValid&&!this.isValid(),null===this.x||!l(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===d&&e.xAxis&&e.xAxis.hasNames&&(this.x=e.xAxis.nameToX(this));void 0===this.x&&e&&(this.x=void 0===d?e.autoIncrement(this):d);return this},optionsToObject:function(a){var d={},e=this.series,f=e.options.keys,b=f||e.pointArrayMap||["y"],n=b.length,c=0,u=0;if(l(a)||null===a)d[b[0]]=a;else if(h(a))for(!f&&a.length>n&&(e=typeof a[0],"string"===e?d.name=
a[0]:"number"===e&&(d.x=a[0]),c++);u<n;)f&&void 0===a[c]||(d[b[u]]=a[c]),c++,u++;else"object"===typeof a&&(d=a,a.dataLabels&&(e._hasPointLabels=!0),a.marker&&(e._hasPointMarkers=!0));return d},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&
this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,d=a.zones,a=a.zoneAxis||"y",f=0,h;for(h=d[f];this[a]>=h.value;)h=d[++f];h&&h.color&&!this.options.color&&(this.color=h.color);return h},destroy:function(){var a=this.series.chart,d=a.hoverPoints,f;a.pointCount--;d&&(this.setState(),F(d,this),d.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)t(this),this.destroyElements();this.legendItem&&
a.legend.destroyItem(this);for(f in this)this[f]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],d,f=6;f--;)d=a[f],this[d]&&(this[d]=this[d].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var d=this.series,e=d.tooltipOptions,
h=w(e.valueDecimals,""),b=e.valuePrefix||"",l=e.valueSuffix||"";A(d.pointArrayMap||["y"],function(c){c="{point."+c;if(b||l)a=a.replace(c+"}",b+c+"}"+l);a=a.replace(c+"}",c+":,."+h+"f}")});return f(a,{point:this,series:this.series})},firePointEvent:function(a,d,f){var e=this,b=this.series.options;(b.point.events[a]||e.options&&e.options.events&&e.options.events[a])&&this.importEvents();"click"===a&&b.allowPointSelect&&(f=function(a){e.select&&e.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});n(this,
a,d,f)},visible:!0}})(L);(function(a){var D=a.addEvent,A=a.animObject,G=a.arrayMax,F=a.arrayMin,n=a.correctFloat,f=a.Date,h=a.defaultOptions,l=a.defaultPlotOptions,w=a.defined,t=a.each,e=a.erase,d=a.extend,m=a.fireEvent,C=a.grep,b=a.isArray,x=a.isNumber,c=a.isString,u=a.merge,B=a.objectEach,I=a.pick,k=a.removeEvent,E=a.splat,p=a.SVGElement,z=a.syncTimeout,M=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,
lineColor:"#ffffff",radius:4,states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{animation:{duration:50},
lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var c=this,e,g=a.series,q;c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();d(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});e=b.events;B(e,function(a,
b){D(c,b,a)});if(e&&e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();t(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);g.length&&(q=g[g.length-1]);c._i=I(q&&q._i,-1)+1;a.orderSeries(this.insert(g))},insert:function(a){var b=this.options.index,c;if(x(b)){for(c=a.length;c--;)if(b>=I(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);
return I(c,a.length-1)},bindAxes:function(){var b=this,c=b.options,d=b.chart,e;t(b.axisTypes||[],function(g){t(d[g],function(a){e=a.options;if(c[g]===e.index||void 0!==c[g]&&c[g]===e.id||void 0===c[g]&&0===e.index)b.insert(a.series),b[g]=a,a.isDirty=!0});b[g]||b.optionalAxis===g||a.error(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,d=arguments,g=x(b)?function(d){var g="y"===d&&c.toYData?c.toYData(a):a[d];c[d+"Data"][b]=g}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,
2))};t(c.parallelArrays,g)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,d=a.pointIntervalUnit,b=I(b,a.pointStart,0);this.pointInterval=c=I(this.pointInterval,a.pointInterval,1);d&&(a=new f(b),"day"===d?a=+a[f.hcSetDate](a[f.hcGetDate]()+c):"month"===d?a=+a[f.hcSetMonth](a[f.hcGetMonth]()+c):"year"===d&&(a=+a[f.hcSetFullYear](a[f.hcGetFullYear]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,c=b.options,d=c.plotOptions,g=(b.userOptions||{}).plotOptions||
{},e=d[this.type];this.userOptions=a;b=u(e,d.series,a);this.tooltipOptions=u(h.tooltip,h.plotOptions.series&&h.plotOptions.series.tooltip,h.plotOptions[this.type].tooltip,c.tooltip.userOptions,d.series&&d.series.tooltip,d[this.type].tooltip,a.tooltip);this.stickyTracking=I(a.stickyTracking,g[this.type]&&g[this.type].stickyTracking,g.series&&g.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:b.stickyTracking);null===e.marker&&delete b.marker;this.zoneAxis=b.zoneAxis;a=this.zones=
(b.zones||[]).slice();!b.negativeColor&&!b.negativeFillColor||b.zones||a.push({value:b[this.zoneAxis+"Threshold"]||b.threshold||0,className:"highcharts-negative",color:b.negativeColor,fillColor:b.negativeFillColor});a.length&&w(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return b},getCyclic:function(a,b,c){var d,g=this.chart,e=this.userOptions,q=a+"Index",f=a+"Counter",k=c?c.length:I(g.options.chart[a+"Count"],g[a+"Count"]);b||(d=I(e[q],e["_"+q]),w(d)||(g.series.length||
(g[f]=0),e["_"+q]=d=g[f]%k,g[f]+=1),c&&(b=c[d]));void 0!==d&&(this[q]=d);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||l[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(d,e,f,k){var g=this,q=g.points,m=q&&q.length||0,p,h=g.options,y=g.chart,l=null,n=g.xAxis,
u=h.turboThreshold,z=this.xData,H=this.yData,w=(p=g.pointArrayMap)&&p.length;d=d||[];p=d.length;e=I(e,!0);if(!1!==k&&p&&m===p&&!g.cropped&&!g.hasGroupedData&&g.visible)t(d,function(a,b){q[b].update&&a!==h.data[b]&&q[b].update(a,!1,null,!1)});else{g.xIncrement=null;g.colorCounter=0;t(this.parallelArrays,function(a){g[a+"Data"].length=0});if(u&&p>u){for(f=0;null===l&&f<p;)l=d[f],f++;if(x(l))for(f=0;f<p;f++)z[f]=this.autoIncrement(),H[f]=d[f];else if(b(l))if(w)for(f=0;f<p;f++)l=d[f],z[f]=l[0],H[f]=l.slice(1,
w+1);else for(f=0;f<p;f++)l=d[f],z[f]=l[0],H[f]=l[1];else a.error(12)}else for(f=0;f<p;f++)void 0!==d[f]&&(l={series:g},g.pointClass.prototype.applyOptions.apply(l,[d[f]]),g.updateParallelArrays(l,f));c(H[0])&&a.error(14,!0);g.data=[];g.options.data=g.userOptions.data=d;for(f=m;f--;)q[f]&&q[f].destroy&&q[f].destroy();n&&(n.minRange=n.userMinRange);g.isDirty=y.isDirtyBox=!0;g.isDirtyData=!!q;f=!1}"point"===h.legendType&&(this.processData(),this.generatePoints());e&&y.redraw(f)},processData:function(b){var c=
this.xData,d=this.yData,e=c.length,g;g=0;var f,q,k=this.xAxis,m,p=this.options;m=p.cropThreshold;var h=this.getExtremesFromAll||p.getExtremesFromAll,l=this.isCartesian,p=k&&k.val2lin,n=k&&k.isLog,u,x;if(l&&!this.isDirty&&!k.isDirty&&!this.yAxis.isDirty&&!b)return!1;k&&(b=k.getExtremes(),u=b.min,x=b.max);if(l&&this.sorted&&!h&&(!m||e>m||this.forceCrop))if(c[e-1]<u||c[0]>x)c=[],d=[];else if(c[0]<u||c[e-1]>x)g=this.cropData(this.xData,this.yData,u,x),c=g.xData,d=g.yData,g=g.start,f=!0;for(m=c.length||
1;--m;)e=n?p(c[m])-p(c[m-1]):c[m]-c[m-1],0<e&&(void 0===q||e<q)?q=e:0>e&&this.requireSorting&&a.error(15);this.cropped=f;this.cropStart=g;this.processedXData=c;this.processedYData=d;this.closestPointRange=q},cropData:function(a,b,c,d){var g=a.length,e=0,f=g,q=I(this.cropShoulder,1),k;for(k=0;k<g;k++)if(a[k]>=c){e=Math.max(0,k-q);break}for(c=k;c<g;c++)if(a[c]>d){f=c+q;break}return{xData:a.slice(e,f),yData:b.slice(e,f),start:e,end:f}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,
d,g=this.processedXData,e=this.processedYData,f=this.pointClass,k=g.length,m=this.cropStart||0,p,h=this.hasGroupedData,a=a.keys,l,n=[],u;c||h||(c=[],c.length=b.length,c=this.data=c);a&&h&&(this.options.keys=!1);for(u=0;u<k;u++)p=m+u,h?(l=(new f).init(this,[g[u]].concat(E(e[u]))),l.dataGroup=this.groupMap[u]):(l=c[p])||void 0===b[p]||(c[p]=l=(new f).init(this,b[p],g[u])),l&&(l.index=p,n[u]=l);this.options.keys=a;if(c&&(k!==(d=c.length)||h))for(u=0;u<d;u++)u!==m||h||(u+=k),c[u]&&(c[u].destroyElements(),
c[u].plotX=void 0);this.data=c;this.points=n},getExtremes:function(a){var c=this.yAxis,d=this.processedXData,e,g=[],f=0;e=this.xAxis.getExtremes();var q=e.min,k=e.max,m,p,h,l;a=a||this.stackedYData||this.processedYData||[];e=a.length;for(l=0;l<e;l++)if(p=d[l],h=a[l],m=(x(h,!0)||b(h))&&(!c.positiveValuesOnly||h.length||0<h),p=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(d[l]||p)>=q&&(d[l]||p)<=k,m&&p)if(m=h.length)for(;m--;)null!==h[m]&&(g[f++]=h[m]);else g[f++]=h;this.dataMin=
F(g);this.dataMax=G(g)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,g=this.yAxis,e=this.points,f=e.length,k=!!this.modifyValue,m=a.pointPlacement,p="between"===m||x(m),h=a.threshold,l=a.startFromThreshold?h:0,u,z,t,E,C=Number.MAX_VALUE;"between"===m&&(m=.5);x(m)&&(m*=I(a.pointRange||c.pointRange));for(a=0;a<f;a++){var B=e[a],M=B.x,A=B.y;z=B.low;var D=b&&g.stacks[(this.negStacks&&A<(l?0:h)?"-":"")+this.stackKey],
F;g.positiveValuesOnly&&null!==A&&0>=A&&(B.isNull=!0);B.plotX=u=n(Math.min(Math.max(-1E5,c.translate(M,0,0,0,1,m,"flags"===this.type)),1E5));b&&this.visible&&!B.isNull&&D&&D[M]&&(E=this.getStackIndicator(E,M,this.index),F=D[M],A=F.points[E.key],z=A[0],A=A[1],z===l&&E.key===D[M].base&&(z=I(h,g.min)),g.positiveValuesOnly&&0>=z&&(z=null),B.total=B.stackTotal=F.total,B.percentage=F.total&&B.y/F.total*100,B.stackY=A,F.setOffset(this.pointXOffset||0,this.barW||0));B.yBottom=w(z)?g.translate(z,0,1,0,1):
null;k&&(A=this.modifyValue(A,B));B.plotY=z="number"===typeof A&&Infinity!==A?Math.min(Math.max(-1E5,g.translate(A,0,1,0,1)),1E5):void 0;B.isInside=void 0!==z&&0<=z&&z<=g.len&&0<=u&&u<=c.len;B.clientX=p?n(c.translate(M,0,0,0,1,m)):u;B.negative=B.y<(h||0);B.category=d&&void 0!==d[B.x]?d[B.x]:B.x;B.isNull||(void 0!==t&&(C=Math.min(C,Math.abs(u-t))),t=u);B.zone=this.zones.length&&B.getZone()}this.closestPointRangePx=C},getValidPoints:function(a,b){var c=this.chart;return C(a||this.points||[],function(a){return b&&
!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,g=b.inverted,e=this.clipBox,f=e||b.clipBox,q=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,f.height,c.xAxis,c.yAxis].join(),k=b[q],m=b[q+"m"];k||(a&&(f.width=0,b[q+"m"]=m=d.clipRect(-99,g?-b.plotLeft:-b.plotTop,99,g?b.chartWidth:b.chartHeight)),b[q]=k=d.clipRect(f),k.count={length:0});a&&!k.count[this.index]&&(k.count[this.index]=!0,k.count.length+=1);!1!==c.clip&&
(this.group.clip(a||e?k:b.clipRect),this.markerGroup.clip(m),this.sharedClipKey=q);a||(k.count[this.index]&&(delete k.count[this.index],--k.count.length),0===k.count.length&&q&&b[q]&&(e||(b[q]=b[q].destroy()),b[q+"m"]&&(b[q+"m"]=b[q+"m"].destroy())))},animate:function(a){var b=this.chart,c=A(this.options.animation),d;a?this.setClip(c):(d=this.sharedClipKey,(a=b[d])&&a.animate({width:b.plotSizeX},c),b[d+"m"]&&b[d+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();
m(this,"afterAnimate")},drawPoints:function(){var a=this.points,b=this.chart,c,d,g,e,f=this.options.marker,k,m,p,h,l=this[this.specialGroup]||this.markerGroup,n=I(f.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=2*f.radius);if(!1!==f.enabled||this._hasPointMarkers)for(d=0;d<a.length;d++)g=a[d],c=g.plotY,e=g.graphic,k=g.marker||{},m=!!g.marker,p=n&&void 0===k.enabled||k.enabled,h=g.isInside,p&&x(c)&&null!==g.y?(c=I(k.symbol,this.symbol),g.hasImage=0===c.indexOf("url"),p=this.markerAttribs(g,
g.selected&&"select"),e?e[h?"show":"hide"](!0).animate(p):h&&(0<p.width||g.hasImage)&&(g.graphic=e=b.renderer.symbol(c,p.x,p.y,p.width,p.height,m?k:f).add(l)),e&&e.attr(this.pointAttribs(g,g.selected&&"select")),e&&e.addClass(g.getClassName(),!0)):e&&(g.graphic=e.destroy())},markerAttribs:function(a,b){var c=this.options.marker,d=a.marker||{},g=I(d.radius,c.radius);b&&(c=c.states[b],b=d.states&&d.states[b],g=I(b&&b.radius,c&&c.radius,g+(c&&c.radiusPlus||0)));a.hasImage&&(g=0);a={x:Math.floor(a.plotX)-
g,y:a.plotY-g};g&&(a.width=a.height=2*g);return a},pointAttribs:function(a,b){var c=this.options.marker,d=a&&a.options,g=d&&d.marker||{},e=this.color,f=d&&d.color,k=a&&a.color,d=I(g.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;e=f||a||k||e;a=g.fillColor||c.fillColor||e;e=g.lineColor||c.lineColor||e;b&&(c=c.states[b],b=g.states&&g.states[b]||{},d=I(b.lineWidth,c.lineWidth,d+I(b.lineWidthPlus,c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||a,e=b.lineColor||c.lineColor||e);return{stroke:e,"stroke-width":d,
fill:a}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(M.navigator.userAgent),d,g,f=a.data||[],h,l;m(a,"destroy");k(a);t(a.axisTypes||[],function(b){(l=a[b])&&l.series&&(e(l.series,a),l.isDirty=l.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(g=f.length;g--;)(h=f[g])&&h.destroy&&h.destroy();a.points=null;clearTimeout(a.animationTimeout);B(a,function(a,b){a instanceof p&&!a.survive&&(d=c&&"group"===b?"hide":"destroy",a[d]())});b.hoverSeries===a&&(b.hoverSeries=
null);e(b.series,a);b.orderSeries();B(a,function(b,c){delete a[c]})},getGraphPath:function(a,b,c){var d=this,g=d.options,e=g.step,f,k=[],q=[],m;a=a||d.points;(f=a.reversed)&&a.reverse();(e={right:1,center:2}[e]||e&&3)&&f&&(e=4-e);!g.connectNulls||b||c||(a=this.getValidPoints(a));t(a,function(f,p){var h=f.plotX,l=f.plotY,n=a[p-1];(f.leftCliff||n&&n.rightCliff)&&!c&&(m=!0);f.isNull&&!w(b)&&0<p?m=!g.connectNulls:f.isNull&&!b?m=!0:(0===p||m?p=["M",f.plotX,f.plotY]:d.getPointSpline?p=d.getPointSpline(a,
f,p):e?(p=1===e?["L",n.plotX,l]:2===e?["L",(n.plotX+h)/2,n.plotY,"L",(n.plotX+h)/2,l]:["L",h,n.plotY],p.push("L",h,l)):p=["L",h,l],q.push(f.x),e&&q.push(f.x),k.push.apply(k,p),m=!1)});k.xMap=q;return d.graphPath=k},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),d=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];t(this.zones,function(c,e){d.push(["zone-graph-"+e,"highcharts-graph highcharts-zone-graph-"+e+" "+(c.className||""),c.color||
a.color,c.dashStyle||b.dashStyle])});t(d,function(d,e){var g=d[0],f=a[g];f?(f.endX=c.xMap,f.animate({d:c})):c.length&&(a[g]=a.chart.renderer.path(c).addClass(d[1]).attr({zIndex:1}).add(a.group),f={stroke:d[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},d[3]?f.dashstyle=d[3]:"square"!==b.linecap&&(f["stroke-linecap"]=f["stroke-linejoin"]="round"),f=a[g].attr(f).shadow(2>e&&b.shadow));f&&(f.startX=c.xMap,f.isArea=c.isArea)})},applyZones:function(){var a=this,b=this.chart,c=b.renderer,
d=this.zones,g,e,f=this.clips||[],k,m=this.graph,p=this.area,h=Math.max(b.chartWidth,b.chartHeight),l=this[(this.zoneAxis||"y")+"Axis"],n,u,x=b.inverted,z,E,w,B,C=!1;d.length&&(m||p)&&l&&void 0!==l.min&&(u=l.reversed,z=l.horiz,m&&m.hide(),p&&p.hide(),n=l.getExtremes(),t(d,function(d,q){g=u?z?b.plotWidth:0:z?0:l.toPixels(n.min);g=Math.min(Math.max(I(e,g),0),h);e=Math.min(Math.max(Math.round(l.toPixels(I(d.value,n.max),!0)),0),h);C&&(g=e=l.toPixels(n.max));E=Math.abs(g-e);w=Math.min(g,e);B=Math.max(g,
e);l.isXAxis?(k={x:x?B:w,y:0,width:E,height:h},z||(k.x=b.plotHeight-k.x)):(k={x:0,y:x?B:w,width:h,height:E},z&&(k.y=b.plotWidth-k.y));x&&c.isVML&&(k=l.isXAxis?{x:0,y:u?w:B,height:k.width,width:b.chartWidth}:{x:k.y-b.plotLeft-b.spacingBox.x,y:0,width:k.height,height:b.chartHeight});f[q]?f[q].animate(k):(f[q]=c.clipRect(k),m&&a["zone-graph-"+q].clip(f[q]),p&&a["zone-area-"+q].clip(f[q]));C=d.value>n.max}),this.clips=f)},invertGroups:function(a){function b(){t(["group","markerGroup"],function(b){c[b]&&
(d.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,d=c.chart,g;c.xAxis&&(g=D(d,"resize",b),D(c,"destroy",g),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,d,g){var e=this[a],f=!e;f&&(this[a]=e=this.chart.renderer.g().attr({zIndex:d||.1}).add(g));e.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series highcharts-color-"+this.colorIndex+" "+(this.options.className||""),
!0);e.attr({visibility:c})[f?"attr":"animate"](this.getPlotBox());return e},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,d=a.options,g=!!a.animate&&b.renderer.isSVG&&A(d.animation).duration,e=a.visible?"inherit":"hidden",f=d.zIndex,k=a.hasRendered,m=b.seriesGroup,p=b.inverted;c=a.plotGroup("group","series",e,f,m);a.markerGroup=
a.plotGroup("markerGroup","markers",e,f,m);g&&a.animate(!0);c.inverted=a.isCartesian?p:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(p);!1===d.clip||a.sharedClipKey||k||c.clip(b.clipRect);g&&a.animate();k||(a.animationTimeout=z(function(){a.afterAnimate()},g));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,
c=this.group,d=this.xAxis,g=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:I(d&&d.left,a.plotLeft),translateY:I(g&&g.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,g=this.chart.inverted;return this.searchKDTree({clientX:g?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:g?d.len-a.chartX+d.pos:a.chartY-d.pos},b)},buildKDTree:function(){function a(c,
d,e){var g,f;if(f=c&&c.length)return g=b.kdAxisArray[d%e],c.sort(function(a,b){return a[g]-b[g]}),f=Math.floor(f/2),{point:c[f],left:a(c.slice(0,f),d+1,e),right:a(c.slice(f+1),d+1,e)}}this.buildingKdTree=!0;var b=this,c=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;z(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,g,m){var p=b.point,q=d.kdAxisArray[g%m],h,l,n=p;l=w(a[e])&&w(p[e])?
Math.pow(a[e]-p[e],2):null;h=w(a[f])&&w(p[f])?Math.pow(a[f]-p[f],2):null;h=(l||0)+(h||0);p.dist=w(h)?Math.sqrt(h):Number.MAX_VALUE;p.distX=w(l)?Math.sqrt(l):Number.MAX_VALUE;q=a[q]-p[q];h=0>q?"left":"right";l=0>q?"right":"left";b[h]&&(h=c(a,b[h],g+1,m),n=h[k]<n[k]?h:p);b[l]&&Math.sqrt(q*q)<n[k]&&(a=c(a,b[l],g+1,m),n=a[k]<n[k]?a:n);return n}var d=this,e=this.kdAxisArray[0],f=this.kdAxisArray[1],k=b?"distX":"dist";b=-1<d.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||
this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,b,b)}})})(L);(function(a){function D(a,d,f,h,b){var e=a.chart.inverted;this.axis=a;this.isNegative=f;this.options=d;this.x=h;this.total=null;this.points={};this.stack=b;this.rightCliff=this.leftCliff=0;this.alignOptions={align:d.align||(e?f?"left":"right":"center"),verticalAlign:d.verticalAlign||(e?"middle":f?"bottom":"top"),y:t(d.y,e?4:f?14:-6),x:t(d.x,e?f?-6:6:0)};this.textAlign=d.textAlign||(e?f?"right":"left":"center")}var A=a.Axis,G=a.Chart,
F=a.correctFloat,n=a.defined,f=a.destroyObjectProperties,h=a.each,l=a.format,w=a.objectEach,t=a.pick;a=a.Series;D.prototype={destroy:function(){f(this,this.axis)},render:function(a){var d=this.options,e=d.format,e=e?l(e,this):d.formatter.call(this);this.label?this.label.attr({text:e,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(e,null,null,d.useHTML).css(d.style).attr({align:this.textAlign,rotation:d.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,d){var e=this.axis,f=
e.chart,b=f.inverted,h=e.reversed,h=this.isNegative&&!h||!this.isNegative&&h,c=e.translate(e.usePercentage?100:this.total,0,0,0,1),e=e.translate(0),e=Math.abs(c-e);a=f.xAxis[0].translate(this.x)+a;var l=f.plotHeight,b={x:b?h?c:c-e:a,y:b?l-a-d:h?l-c-e:l-c,width:b?e:d,height:b?d:e};if(d=this.label)d.align(this.alignOptions,null,b),b=d.alignAttr,d[!1===this.options.crop||f.isInsidePlot(b.x,b.y)?"show":"hide"](!0)}};G.prototype.getStacks=function(){var a=this;h(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&
(a.oldStacks=a.stacks)});h(a.series,function(d){!d.options.stacking||!0!==d.visible&&!1!==a.options.chart.ignoreHiddenSeries||(d.stackKey=d.type+t(d.options.stack,""))})};A.prototype.buildStacks=function(){var a=this.series,d,f=t(this.options.reversedStacks,!0),h=a.length,b;if(!this.isXAxis){this.usePercentage=!1;for(b=h;b--;)a[f?b:h-b-1].setStackedPoints();for(b=h;b--;)d=a[f?b:h-b-1],d.setStackCliffs&&d.setStackCliffs();if(this.usePercentage)for(b=0;b<h;b++)a[b].setPercentStacks()}};A.prototype.renderStackTotals=
function(){var a=this.chart,d=a.renderer,f=this.stacks,h=this.stackTotalGroup;h||(this.stackTotalGroup=h=d.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());h.translate(a.plotLeft,a.plotTop);w(f,function(a){w(a,function(a){a.render(h)})})};A.prototype.resetStacks=function(){var a=this,d=a.stacks;a.isXAxis||w(d,function(d){w(d,function(e,b){e.touched<a.stacksTouched?(e.destroy(),delete d[b]):(e.total=null,e.cum=null)})})};A.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&
(a=this.stacks=this.oldStacks),w(a,function(a){w(a,function(a){a.cum=a.total})}))};a.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var a=this.processedXData,d=this.processedYData,f=[],h=d.length,b=this.options,l=b.threshold,c=b.startFromThreshold?l:0,u=b.stack,b=b.stacking,w=this.stackKey,A="-"+w,k=this.negStacks,E=this.yAxis,p=E.stacks,z=E.oldStacks,M,q,y,H,K,g,r;E.stacksTouched+=1;for(K=0;K<h;K++)g=a[K],r=d[K],
M=this.getStackIndicator(M,g,this.index),H=M.key,y=(q=k&&r<(c?0:l))?A:w,p[y]||(p[y]={}),p[y][g]||(z[y]&&z[y][g]?(p[y][g]=z[y][g],p[y][g].total=null):p[y][g]=new D(E,E.options.stackLabels,q,g,u)),y=p[y][g],null!==r&&(y.points[H]=y.points[this.index]=[t(y.cum,c)],n(y.cum)||(y.base=H),y.touched=E.stacksTouched,0<M.index&&!1===this.singleStacks&&(y.points[H][0]=y.points[this.index+","+g+",0"][0])),"percent"===b?(q=q?w:A,k&&p[q]&&p[q][g]?(q=p[q][g],y.total=q.total=Math.max(q.total,y.total)+Math.abs(r)||
0):y.total=F(y.total+(Math.abs(r)||0))):y.total=F(y.total+(r||0)),y.cum=t(y.cum,c)+(r||0),null!==r&&(y.points[H].push(y.cum),f[K]=y.cum);"percent"===b&&(E.usePercentage=!0);this.stackedYData=f;E.oldStacks={}}};a.prototype.setPercentStacks=function(){var a=this,d=a.stackKey,f=a.yAxis.stacks,l=a.processedXData,b;h([d,"-"+d],function(d){for(var c=l.length,e,h;c--;)if(e=l[c],b=a.getStackIndicator(b,e,a.index,d),e=(h=f[d]&&f[d][e])&&h.points[b.key])h=h.total?100/h.total:0,e[0]=F(e[0]*h),e[1]=F(e[1]*h),
a.stackedYData[c]=e[1]})};a.prototype.getStackIndicator=function(a,d,f,h){!n(a)||a.x!==d||h&&a.key!==h?a={x:d,index:0,key:h}:a.index++;a.key=[f,d,a.index].join();return a}})(L);(function(a){var D=a.addEvent,A=a.animate,G=a.Axis,F=a.createElement,n=a.css,f=a.defined,h=a.each,l=a.erase,w=a.extend,t=a.fireEvent,e=a.inArray,d=a.isNumber,m=a.isObject,C=a.isArray,b=a.merge,x=a.objectEach,c=a.pick,u=a.Point,B=a.Series,I=a.seriesTypes,k=a.setAnimation,E=a.splat;w(a.Chart.prototype,{addSeries:function(a,b,
d){var e,f=this;a&&(b=c(b,!0),t(f,"addSeries",{options:a},function(){e=f.initSeries(a);f.isDirtyLegend=!0;f.linkSeries();b&&f.redraw(d)}));return e},addAxis:function(a,d,e,f){var k=d?"xAxis":"yAxis",p=this.options;a=b(a,{index:this[k].length,isX:d});new G(this,a);p[k]=E(p[k]||{});p[k].push(a);c(e,!0)&&this.redraw(f)},showLoading:function(a){var b=this,c=b.options,d=b.loadingDiv,e=c.loading,f=function(){d&&n(d,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};
d||(b.loadingDiv=d=F("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=F("span",{className:"highcharts-loading-inner"},null,d),D(b,"redraw",f));d.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;n(d,w(e.style,{zIndex:10}));n(b.loadingSpan,e.labelStyle);b.loadingShown||(n(d,{opacity:0,display:""}),A(d,{opacity:e.style.opacity||.5},{duration:e.showDuration||0}));b.loadingShown=!0;f()},hideLoading:function(){var a=this.options,b=
this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",A(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){n(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
update:function(a,k){var p=this,m={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},l=a.chart,n,u;if(l){b(!0,p.options.chart,l);"className"in l&&p.setClassName(l.className);if("inverted"in l||"polar"in l)p.propFromSeries(),n=!0;"alignTicks"in l&&(n=!0);x(l,function(a,b){-1!==e("chart."+b,p.propsRequireUpdateSeries)&&(u=!0);-1!==e(b,p.propsRequireDirtyBox)&&(p.isDirtyBox=!0)});"style"in l&&p.renderer.setStyle(l.style)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&b(!0,this.options.plotOptions,
a.plotOptions);x(a,function(a,b){if(p[b]&&"function"===typeof p[b].update)p[b].update(a,!1);else if("function"===typeof p[m[b]])p[m[b]](a);"chart"!==b&&-1!==e(b,p.propsRequireUpdateSeries)&&(u=!0)});h("xAxis yAxis zAxis series colorAxis pane".split(" "),function(b){a[b]&&h(E(a[b]),function(a,c){(c=f(a.id)&&p.get(a.id)||p[b][c])&&c.coll===b&&c.update(a,!1)})});n&&h(p.axes,function(a){a.update({},!1)});u&&h(p.series,function(a){a.update({},!1)});a.loading&&b(!0,p.options.loading,a.loading);n=l&&l.width;
l=l&&l.height;d(n)&&n!==p.chartWidth||d(l)&&l!==p.chartHeight?p.setSize(n,l):c(k,!0)&&p.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});w(u.prototype,{update:function(a,b,d,e){function f(){k.applyOptions(a);null===k.y&&g&&(k.graphic=g.destroy());m(a,!0)&&(g&&g.element&&a&&a.marker&&a.marker.symbol&&(k.graphic=g.destroy()),a&&a.dataLabels&&k.dataLabel&&(k.dataLabel=k.dataLabel.destroy()));h=k.index;p.updateParallelArrays(k,h);l.data[h]=m(l.data[h],!0)||m(a,!0)?k.options:a;p.isDirty=p.isDirtyData=
!0;!p.fixedBox&&p.hasCartesianSeries&&(q.isDirtyBox=!0);"point"===l.legendType&&(q.isDirtyLegend=!0);b&&q.redraw(d)}var k=this,p=k.series,g=k.graphic,h,q=p.chart,l=p.options;b=c(b,!0);!1===e?f():k.firePointEvent("update",{options:a},f)},remove:function(a,b){this.series.removePoint(e(this,this.series.data),a,b)}});w(B.prototype,{addPoint:function(a,b,d,e){var f=this.options,k=this.data,p=this.chart,g=this.xAxis,g=g&&g.hasNames&&g.names,h=f.data,m,q,l=this.xData,n,u;b=c(b,!0);m={series:this};this.pointClass.prototype.applyOptions.apply(m,
[a]);u=m.x;n=l.length;if(this.requireSorting&&u<l[n-1])for(q=!0;n&&l[n-1]>u;)n--;this.updateParallelArrays(m,"splice",n,0,0);this.updateParallelArrays(m,n);g&&m.name&&(g[u]=m.name);h.splice(n,0,a);q&&(this.data.splice(n,0,null),this.processData());"point"===f.legendType&&this.generatePoints();d&&(k[0]&&k[0].remove?k[0].remove(!1):(k.shift(),this.updateParallelArrays(m,"shift"),h.shift()));this.isDirtyData=this.isDirty=!0;b&&p.redraw(e)},removePoint:function(a,b,d){var e=this,f=e.data,p=f[a],h=e.points,
g=e.chart,m=function(){h&&h.length===f.length&&h.splice(a,1);f.splice(a,1);e.options.data.splice(a,1);e.updateParallelArrays(p||{series:e},"splice",a,1);p&&p.destroy();e.isDirty=!0;e.isDirtyData=!0;b&&g.redraw()};k(d,g);b=c(b,!0);p?p.firePointEvent("remove",null,m):m()},remove:function(a,b,d){function e(){f.destroy();k.isDirtyLegend=k.isDirtyBox=!0;k.linkSeries();c(a,!0)&&k.redraw(b)}var f=this,k=f.chart;!1!==d?t(f,"remove",null,e):e()},update:function(a,d){var e=this,f=e.chart,k=e.userOptions,p=
e.oldType||e.type,m=a.type||k.type||f.options.chart.type,g=I[p].prototype,l=["group","markerGroup","dataLabelsGroup"],n;if(m&&m!==p||void 0!==a.zIndex)l.length=0;h(l,function(a){l[a]=e[a];delete e[a]});a=b(k,{animation:!1,index:e.index,pointStart:e.xData[0]},{data:e.options.data},a);e.remove(!1,null,!1);for(n in g)e[n]=void 0;w(e,I[m||p].prototype);h(l,function(a){e[a]=l[a]});e.init(f,a);e.oldType=p;f.linkSeries();c(d,!0)&&f.redraw(!1)}});w(G.prototype,{update:function(a,d){var e=this.chart;a=e.options[this.coll][this.options.index]=
b(this.userOptions,a);this.destroy(!0);this.init(e,w(a,{events:void 0}));e.isDirtyBox=!0;c(d,!0)&&e.redraw()},remove:function(a){for(var b=this.chart,d=this.coll,e=this.series,f=e.length;f--;)e[f]&&e[f].remove(!1);l(b.axes,this);l(b[d],this);C(b.options[d])?b.options[d].splice(this.options.index,1):delete b.options[d];h(b[d],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;c(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},
b)}})})(L);(function(a){var D=a.color,A=a.each,G=a.map,F=a.pick,n=a.Series,f=a.seriesType;f("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(){var f=[],l=[],n=this.xAxis,t=this.yAxis,e=t.stacks[this.stackKey],d={},m=this.points,C=this.index,b=t.series,x=b.length,c,u=F(t.options.reversedStacks,!0)?1:-1,B;if(this.options.stacking){for(B=0;B<m.length;B++)d[m[B].x]=m[B];a.objectEach(e,function(a,b){null!==a.total&&l.push(b)});l.sort(function(a,b){return a-b});c=G(b,
function(){return this.visible});A(l,function(a,b){var k=0,h,m;if(d[a]&&!d[a].isNull)f.push(d[a]),A([-1,1],function(f){var k=1===f?"rightNull":"leftNull",p=0,n=e[l[b+f]];if(n)for(B=C;0<=B&&B<x;)h=n.points[B],h||(B===C?d[a][k]=!0:c[B]&&(m=e[a].points[B])&&(p-=m[1]-m[0])),B+=u;d[a][1===f?"rightCliff":"leftCliff"]=p});else{for(B=C;0<=B&&B<x;){if(h=e[a].points[B]){k=h[1];break}B+=u}k=t.translate(k,0,1,0,1);f.push({isNull:!0,plotX:n.translate(a,0,0,0,1),x:a,plotY:k,yBottom:k})}})}return f},getGraphPath:function(a){var f=
n.prototype.getGraphPath,h=this.options,t=h.stacking,e=this.yAxis,d,m,C=[],b=[],x=this.index,c,u=e.stacks[this.stackKey],B=h.threshold,A=e.getThreshold(h.threshold),k,h=h.connectNulls||"percent"===t,E=function(d,f,k){var h=a[d];d=t&&u[h.x].points[x];var p=h[k+"Null"]||0;k=h[k+"Cliff"]||0;var m,l,h=!0;k||p?(m=(p?d[0]:d[1])+k,l=d[0]+k,h=!!p):!t&&a[f]&&a[f].isNull&&(m=l=B);void 0!==m&&(b.push({plotX:c,plotY:null===m?A:e.getThreshold(m),isNull:h,isCliff:!0}),C.push({plotX:c,plotY:null===l?A:e.getThreshold(l),
doCurve:!1}))};a=a||this.points;t&&(a=this.getStackPoints());for(d=0;d<a.length;d++)if(m=a[d].isNull,c=F(a[d].rectPlotX,a[d].plotX),k=F(a[d].yBottom,A),!m||h)h||E(d,d-1,"left"),m&&!t&&h||(b.push(a[d]),C.push({x:d,plotX:c,plotY:k})),h||E(d,d+1,"right");d=f.call(this,b,!0,!0);C.reversed=!0;m=f.call(this,C,!0,!0);m.length&&(m[0]="L");m=d.concat(m);f=f.call(this,b,!1,h);m.xMap=d.xMap;this.areaPath=m;return f},drawGraph:function(){this.areaPath=[];n.prototype.drawGraph.apply(this);var a=this,f=this.areaPath,
w=this.options,t=[["area","highcharts-area",this.color,w.fillColor]];A(this.zones,function(e,d){t.push(["zone-area-"+d,"highcharts-area highcharts-zone-area-"+d+" "+e.className,e.color||a.color,e.fillColor||w.fillColor])});A(t,function(e){var d=e[0],h=a[d];h?(h.endX=f.xMap,h.animate({d:f})):(h=a[d]=a.chart.renderer.path(f).addClass(e[1]).attr({fill:F(e[3],D(e[2]).setOpacity(F(w.fillOpacity,.75)).get()),zIndex:0}).add(a.group),h.isArea=!0);h.startX=f.xMap;h.shiftUnit=w.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(L);
(function(a){var D=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,G,F){var n=G.plotX,f=G.plotY,h=a[F-1];F=a[F+1];var l,w,t,e;if(h&&!h.isNull&&!1!==h.doCurve&&!G.isCliff&&F&&!F.isNull&&!1!==F.doCurve&&!G.isCliff){a=h.plotY;t=F.plotX;F=F.plotY;var d=0;l=(1.5*n+h.plotX)/2.5;w=(1.5*f+a)/2.5;t=(1.5*n+t)/2.5;e=(1.5*f+F)/2.5;t!==l&&(d=(e-w)*(t-n)/(t-l)+f-e);w+=d;e+=d;w>a&&w>f?(w=Math.max(a,f),e=2*f-w):w<a&&w<f&&(w=Math.min(a,f),e=2*f-w);e>F&&e>f?(e=Math.max(F,f),w=2*f-e):e<F&&e<f&&
(e=Math.min(F,f),w=2*f-e);G.rightContX=t;G.rightContY=e}G=["C",D(h.rightContX,h.plotX),D(h.rightContY,h.plotY),D(l,n),D(w,f),n,f];h.rightContX=h.rightContY=null;return G}})})(L);(function(a){var D=a.seriesTypes.area.prototype,A=a.seriesType;A("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:D.getStackPoints,getGraphPath:D.getGraphPath,setStackCliffs:D.setStackCliffs,drawGraph:D.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(L);(function(a){var D=a.animObject,A=a.color,
G=a.each,F=a.extend,n=a.isNumber,f=a.merge,h=a.pick,l=a.Series,w=a.seriesType,t=a.svg;w("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,
directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){l.prototype.init.apply(this,arguments);var a=this,d=a.chart;d.hasRendered&&G(d.series,function(d){d.type===a.type&&(d.isDirty=!0)})},getColumnMetrics:function(){var a=this,d=a.options,f=a.xAxis,l=a.yAxis,b=f.reversed,n,c={},u=0;!1===d.grouping?u=1:G(a.chart.series,function(b){var d=b.options,e=b.yAxis,f;b.type===a.type&&b.visible&&l.len===e.len&&l.pos===e.pos&&(d.stacking?(n=b.stackKey,void 0===c[n]&&(c[n]=u++),
f=c[n]):!1!==d.grouping&&(f=u++),b.columnIndex=f)});var t=Math.min(Math.abs(f.transA)*(f.ordinalSlope||d.pointRange||f.closestPointRange||f.tickInterval||1),f.len),w=t*d.groupPadding,k=(t-2*w)/(u||1),d=Math.min(d.maxPointWidth||f.len,h(d.pointWidth,k*(1-2*d.pointPadding)));a.columnMetrics={width:d,offset:(k-d)/2+(w+((a.columnIndex||0)+(b?1:0))*k-t/2)*(b?-1:1)};return a.columnMetrics},crispCol:function(a,d,f,h){var b=this.chart,e=this.borderWidth,c=-(e%2?.5:0),e=e%2?.5:1;b.inverted&&b.renderer.isVML&&
(e+=1);this.options.crisp&&(f=Math.round(a+f)+c,a=Math.round(a)+c,f-=a);h=Math.round(d+h)+e;c=.5>=Math.abs(d)&&.5<h;d=Math.round(d)+e;h-=d;c&&h&&(--d,h+=1);return{x:a,y:d,width:f,height:h}},translate:function(){var a=this,d=a.chart,f=a.options,n=a.dense=2>a.closestPointRange*a.xAxis.transA,n=a.borderWidth=h(f.borderWidth,n?0:1),b=a.yAxis,x=a.translatedThreshold=b.getThreshold(f.threshold),c=h(f.minPointLength,5),u=a.getColumnMetrics(),t=u.width,w=a.barW=Math.max(t,1+2*n),k=a.pointXOffset=u.offset;
d.inverted&&(x-=.5);f.pointPadding&&(w=Math.ceil(w));l.prototype.translate.apply(a);G(a.points,function(e){var f=h(e.yBottom,x),m=999+Math.abs(f),m=Math.min(Math.max(-m,e.plotY),b.len+m),l=e.plotX+k,q=w,n=Math.min(m,f),u,E=Math.max(m,f)-n;Math.abs(E)<c&&c&&(E=c,u=!b.reversed&&!e.negative||b.reversed&&e.negative,n=Math.abs(n-x)>c?f-c:x-(u?c:0));e.barX=l;e.pointWidth=t;e.tooltipPos=d.inverted?[b.len+b.pos-d.plotLeft-m,a.xAxis.len-l-q/2,E]:[l+q/2,m+b.pos-d.plotTop,E];e.shapeType="rect";e.shapeArgs=a.crispCol.apply(a,
e.isNull?[l,x,q,0]:[l,n,q,E])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,d){var e=this.options,h,b=this.pointAttrToOptions||{};h=b.stroke||"borderColor";var l=b["stroke-width"]||"borderWidth",c=a&&a.color||this.color,n=a[h]||e[h]||this.color||c,t=a[l]||e[l]||this[l]||0,b=e.dashStyle;a&&this.zones.length&&(c=a.getZone(),c=a.options.color||c&&c.color||this.color);
d&&(a=f(e.states[d],a.options.states&&a.options.states[d]||{}),d=a.brightness,c=a.color||void 0!==d&&A(c).brighten(a.brightness).get()||c,n=a[h]||n,t=a[l]||t,b=a.dashStyle||b);h={fill:c,stroke:n,"stroke-width":t};e.borderRadius&&(h.r=e.borderRadius);b&&(h.dashstyle=b);return h},drawPoints:function(){var a=this,d=this.chart,h=a.options,l=d.renderer,b=h.animationLimit||250,t;G(a.points,function(c){var e=c.graphic;if(n(c.plotY)&&null!==c.y){t=c.shapeArgs;if(e)e[d.pointCount<b?"animate":"attr"](f(t));
else c.graphic=e=l[c.shapeType](t).add(c.group||a.group);e.attr(a.pointAttribs(c,c.selected&&"select")).shadow(h.shadow,null,h.stacking&&!h.borderRadius);e.addClass(c.getClassName(),!0)}else e&&(c.graphic=e.destroy())})},animate:function(a){var d=this,e=this.yAxis,f=d.options,b=this.chart.inverted,h={};t&&(a?(h.scaleY=.001,a=Math.min(e.pos+e.len,Math.max(e.pos,e.toPixels(f.threshold))),b?h.translateX=a-e.len:h.translateY=a,d.group.attr(h)):(h[b?"translateX":"translateY"]=e.pos,d.group.animate(h,F(D(d.options.animation),
{step:function(a,b){d.group.attr({scaleY:Math.max(.001,b.pos)})}})),d.animate=null))},remove:function(){var a=this,d=a.chart;d.hasRendered&&G(d.series,function(d){d.type===a.type&&(d.isDirty=!0)});l.prototype.remove.apply(a,arguments)}})})(L);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(L);(function(a){var D=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&D.prototype.drawGraph.call(this)}})})(L);(function(a){var D=a.pick,A=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,F=this.chart,n=2*(a.slicedOffset||0),f=F.plotWidth-2*n,F=F.plotHeight-2*n,h=a.center,
h=[D(h[0],"50%"),D(h[1],"50%"),a.size||"100%",a.innerSize||0],l=Math.min(f,F),w,t;for(w=0;4>w;++w)t=h[w],a=2>w||2===w&&/%$/.test(t),h[w]=A(t,[f,F,l,h[2]][w])+(a?n:0);h[3]>h[2]&&(h[3]=h[2]);return h}}})(L);(function(a){var D=a.addEvent,A=a.defined,G=a.each,F=a.extend,n=a.inArray,f=a.noop,h=a.pick,l=a.Point,w=a.Series,t=a.seriesType,e=a.setAnimation;t("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},
x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var d=this,e=d.points,b=d.startAngleRad;a||(G(e,function(a){var c=a.graphic,e=a.shapeArgs;
c&&(c.attr({r:a.startR||d.center[3]/2,start:b,end:b}),c.animate({r:e.r,start:e.start,end:e.end},d.options.animation))}),d.animate=null)},updateTotals:function(){var a,e=0,f=this.points,b=f.length,h,c=this.options.ignoreHiddenPoint;for(a=0;a<b;a++)h=f[a],e+=c&&!h.visible?0:h.isNull?0:h.y;this.total=e;for(a=0;a<b;a++)h=f[a],h.percentage=0<e&&(h.visible||!c)?h.y/e*100:0,h.total=e},generatePoints:function(){w.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();
var d=0,e=this.options,b=e.slicedOffset,f=b+(e.borderWidth||0),c,l,n,t=e.startAngle||0,k=this.startAngleRad=Math.PI/180*(t-90),t=(this.endAngleRad=Math.PI/180*(h(e.endAngle,t+360)-90))-k,w=this.points,p,z=e.dataLabels.distance,e=e.ignoreHiddenPoint,A,q=w.length,y;a||(this.center=a=this.getCenter());this.getX=function(b,c,d){n=Math.asin(Math.min((b-a[1])/(a[2]/2+d.labelDistance),1));return a[0]+(c?-1:1)*Math.cos(n)*(a[2]/2+d.labelDistance)};for(A=0;A<q;A++){y=w[A];y.labelDistance=h(y.options.dataLabels&&
y.options.dataLabels.distance,z);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,y.labelDistance);c=k+d*t;if(!e||y.visible)d+=y.percentage/100;l=k+d*t;y.shapeType="arc";y.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*c)/1E3,end:Math.round(1E3*l)/1E3};n=(l+c)/2;n>1.5*Math.PI?n-=2*Math.PI:n<-Math.PI/2&&(n+=2*Math.PI);y.slicedTranslation={translateX:Math.round(Math.cos(n)*b),translateY:Math.round(Math.sin(n)*b)};l=Math.cos(n)*a[2]/2;p=Math.sin(n)*a[2]/2;y.tooltipPos=[a[0]+
.7*l,a[1]+.7*p];y.half=n<-Math.PI/2||n>Math.PI/2?1:0;y.angle=n;c=Math.min(f,y.labelDistance/5);y.labelPos=[a[0]+l+Math.cos(n)*y.labelDistance,a[1]+p+Math.sin(n)*y.labelDistance,a[0]+l+Math.cos(n)*c,a[1]+p+Math.sin(n)*c,a[0]+l,a[1]+p,0>y.labelDistance?"center":y.half?"right":"left",n]}},drawGraph:null,drawPoints:function(){var a=this,e=a.chart.renderer,f,b,h,c,l=a.options.shadow;l&&!a.shadowGroup&&(a.shadowGroup=e.g("shadow").add(a.group));G(a.points,function(d){if(!d.isNull){b=d.graphic;c=d.shapeArgs;
f=d.getTranslate();var m=d.shadowGroup;l&&!m&&(m=d.shadowGroup=e.g("shadow").add(a.shadowGroup));m&&m.attr(f);h=a.pointAttribs(d,d.selected&&"select");b?b.setRadialReference(a.center).attr(h).animate(F(c,f)):(d.graphic=b=e[d.shapeType](c).setRadialReference(a.center).attr(f).add(a.group),d.visible||b.attr({visibility:"hidden"}),b.attr(h).attr({"stroke-linejoin":"round"}).shadow(l,m));b.addClass(d.getClassName())}})},searchPoint:f,sortByAngle:function(a,e){a.sort(function(a,b){return void 0!==a.angle&&
(b.angle-a.angle)*e})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:a.CenteredSeriesMixin.getCenter,getSymbol:f},{init:function(){l.prototype.init.apply(this,arguments);var a=this,e;a.name=h(a.name,"Slice");e=function(d){a.slice("select"===d.type)};D(a,"select",e);D(a,"unselect",e);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,e){var d=this,b=d.series,f=b.chart,c=b.options.ignoreHiddenPoint;e=h(e,c);a!==d.visible&&(d.visible=d.options.visible=
a=void 0===a?!d.visible:a,b.options.data[n(d,b.data)]=d.options,G(["graphic","dataLabel","connector","shadowGroup"],function(b){if(d[b])d[b][a?"show":"hide"](!0)}),d.legendItem&&f.legend.colorizeItem(d,a),a||"hover"!==d.state||d.setState(""),c&&(b.isDirty=!0),e&&f.redraw())},slice:function(a,f,l){var b=this.series;e(l,b.chart);h(f,!0);this.sliced=this.options.sliced=A(a)?a:!this.sliced;b.options.data[n(this,b.data)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},
getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var d=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(d.x,d.y,d.r+a,d.r+a,{innerR:this.shapeArgs.r,start:d.start,end:d.end})}})})(L);(function(a){var D=a.addEvent,A=a.arrayMax,G=a.defined,F=a.each,n=a.extend,f=a.format,h=a.map,l=a.merge,w=a.noop,t=a.pick,e=a.relativeLength,d=a.Series,m=a.seriesTypes,C=a.stableSort;a.distribute=function(a,d){function b(a,
b){return a.target-b.target}var e,f=!0,l=a,k=[],n;n=0;for(e=a.length;e--;)n+=a[e].size;if(n>d){C(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(n=e=0;n<=d;)n+=a[e].size,e++;k=a.splice(e-1,a.length)}C(a,b);for(a=h(a,function(a){return{size:a.size,targets:[a.target]}});f;){for(e=a.length;e--;)f=a[e],n=(Math.min.apply(0,f.targets)+Math.max.apply(0,f.targets))/2,f.pos=Math.min(Math.max(0,n-f.size/2),d-f.size);e=a.length;for(f=!1;e--;)0<e&&a[e-1].pos+a[e-1].size>a[e].pos&&(a[e-1].size+=a[e].size,
a[e-1].targets=a[e-1].targets.concat(a[e].targets),a[e-1].pos+a[e-1].size>d&&(a[e-1].pos=d-a[e-1].size),a.splice(e,1),f=!0)}e=0;F(a,function(a){var b=0;F(a.targets,function(){l[e].pos=a.pos+b;b+=l[e].size;e++})});l.push.apply(l,k);C(l,b)};d.prototype.drawDataLabels=function(){var b=this,d=b.options,c=d.dataLabels,e=b.points,h,n,k=b.hasRendered||0,m,p,z=t(c.defer,!0),w=b.chart.renderer;if(c.enabled||b._hasPointLabels)b.dlProcessOptions&&b.dlProcessOptions(c),p=b.plotGroup("dataLabelsGroup","data-labels",
z&&!k?"hidden":"visible",c.zIndex||6),z&&(p.attr({opacity:+k}),k||D(b,"afterAnimate",function(){b.visible&&p.show(!0);p[d.animation?"animate":"attr"]({opacity:1},{duration:200})})),n=c,F(e,function(e){var k,q=e.dataLabel,u,g,r=e.connector,x=!q,z;h=e.dlOptions||e.options&&e.options.dataLabels;if(k=t(h&&h.enabled,n.enabled)&&null!==e.y)c=l(n,h),u=e.getLabelConfig(),m=c.format?f(c.format,u):c.formatter.call(u,c),z=c.style,u=c.rotation,z.color=t(c.color,z.color,b.color,"#000000"),"contrast"===z.color&&
(e.contrastColor=w.getContrast(e.color||b.color),z.color=c.inside||0>t(e.labelDistance,c.distance)||d.stacking?e.contrastColor:"#000000"),d.cursor&&(z.cursor=d.cursor),g={fill:c.backgroundColor,stroke:c.borderColor,"stroke-width":c.borderWidth,r:c.borderRadius||0,rotation:u,padding:c.padding,zIndex:1},a.objectEach(g,function(a,b){void 0===a&&delete g[b]});!q||k&&G(m)?k&&G(m)&&(q?g.text=m:(q=e.dataLabel=w[u?"text":"label"](m,0,-9999,c.shape,null,null,c.useHTML,null,"data-label"),q.addClass("highcharts-data-label-color-"+
e.colorIndex+" "+(c.className||"")+(c.useHTML?"highcharts-tracker":""))),q.attr(g),q.css(z).shadow(c.shadow),q.added||q.add(p),b.alignDataLabel(e,q,c,null,x)):(e.dataLabel=q=q.destroy(),r&&(e.connector=r.destroy()))})};d.prototype.alignDataLabel=function(a,d,c,e,f){var b=this.chart,k=b.inverted,h=t(a.plotX,-9999),p=t(a.plotY,-9999),l=d.getBBox(),m,q=c.rotation,u=c.align,x=this.visible&&(a.series.forceDL||b.isInsidePlot(h,Math.round(p),k)||e&&b.isInsidePlot(h,k?e.x+1:e.y+e.height-1,k)),w="justify"===
t(c.overflow,"justify");if(x&&(m=c.style.fontSize,m=b.renderer.fontMetrics(m,d).b,e=n({x:k?b.plotWidth-p:h,y:Math.round(k?b.plotHeight-h:p),width:0,height:0},e),n(c,{width:l.width,height:l.height}),q?(w=!1,h=b.renderer.rotCorr(m,q),h={x:e.x+c.x+e.width/2+h.x,y:e.y+c.y+{top:0,middle:.5,bottom:1}[c.verticalAlign]*e.height},d[f?"attr":"animate"](h).attr({align:u}),p=(q+720)%360,p=180<p&&360>p,"left"===u?h.y-=p?l.height:0:"center"===u?(h.x-=l.width/2,h.y-=l.height/2):"right"===u&&(h.x-=l.width,h.y-=p?
0:l.height)):(d.align(c,null,e),h=d.alignAttr),w?a.isLabelJustified=this.justifyDataLabel(d,c,h,l,e,f):t(c.crop,!0)&&(x=b.isInsidePlot(h.x,h.y)&&b.isInsidePlot(h.x+l.width,h.y+l.height)),c.shape&&!q))d[f?"attr":"animate"]({anchorX:k?b.plotWidth-a.plotY:a.plotX,anchorY:k?b.plotHeight-a.plotX:a.plotY});x||(d.attr({y:-9999}),d.placed=!1)};d.prototype.justifyDataLabel=function(a,d,c,e,f,h){var b=this.chart,l=d.align,p=d.verticalAlign,n,m,q=a.box?0:a.padding||0;n=c.x+q;0>n&&("right"===l?d.align="left":
d.x=-n,m=!0);n=c.x+e.width-q;n>b.plotWidth&&("left"===l?d.align="right":d.x=b.plotWidth-n,m=!0);n=c.y+q;0>n&&("bottom"===p?d.verticalAlign="top":d.y=-n,m=!0);n=c.y+e.height-q;n>b.plotHeight&&("top"===p?d.verticalAlign="bottom":d.y=b.plotHeight-n,m=!0);m&&(a.placed=!h,a.align(d,null,f));return m};m.pie&&(m.pie.prototype.drawDataLabels=function(){var b=this,e=b.data,c,f=b.chart,h=b.options.dataLabels,l=t(h.connectorPadding,10),k=t(h.connectorWidth,1),n=f.plotWidth,p=f.plotHeight,m,w=b.center,q=w[2]/
2,y=w[1],C,D,g,r,L=[[],[]],J,N,O,P,v=[0,0,0,0];b.visible&&(h.enabled||b._hasPointLabels)&&(F(e,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),d.prototype.drawDataLabels.apply(b),F(e,function(a){a.dataLabel&&a.visible&&(L[a.half].push(a),a.dataLabel._pos=null)}),F(L,function(d,e){var k,m,t=d.length,u=[],x;if(t)for(b.sortByAngle(d,e-.5),0<b.maxLabelDistance&&(k=Math.max(0,y-q-b.maxLabelDistance),
m=Math.min(y+q+b.maxLabelDistance,f.plotHeight),F(d,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,y-q-a.labelDistance),a.bottom=Math.min(y+q+a.labelDistance,f.plotHeight),x=a.dataLabel.getBBox().height||21,a.positionsIndex=u.push({target:a.labelPos[1]-a.top+x/2,size:x,rank:a.y})-1)}),a.distribute(u,m+x-k)),P=0;P<t;P++)c=d[P],m=c.positionsIndex,g=c.labelPos,C=c.dataLabel,O=!1===c.visible?"hidden":"inherit",k=g[1],u&&G(u[m])?void 0===u[m].pos?O="hidden":(r=u[m].size,N=c.top+u[m].pos):
N=k,delete c.positionIndex,J=h.justify?w[0]+(e?-1:1)*(q+c.labelDistance):b.getX(N<c.top+2||N>c.bottom-2?k:N,e,c),C._attr={visibility:O,align:g[6]},C._pos={x:J+h.x+({left:l,right:-l}[g[6]]||0),y:N+h.y-10},g.x=J,g.y=N,null===b.options.size&&(D=C.getBBox().width,k=null,J-D<l?(k=Math.round(D-J+l),v[3]=Math.max(k,v[3])):J+D>n-l&&(k=Math.round(J+D-n+l),v[1]=Math.max(k,v[1])),0>N-r/2?v[0]=Math.max(Math.round(-N+r/2),v[0]):N+r/2>p&&(v[2]=Math.max(Math.round(N+r/2-p),v[2])),C.sideOverflow=k)}),0===A(v)||this.verifyDataLabelOverflow(v))&&
(this.placeDataLabels(),k&&F(this.points,function(a){var c;m=a.connector;if((C=a.dataLabel)&&C._pos&&a.visible&&0<a.labelDistance){O=C._attr.visibility;if(c=!m)a.connector=m=f.renderer.path().addClass("highcharts-data-label-connector highcharts-color-"+a.colorIndex).add(b.dataLabelsGroup),m.attr({"stroke-width":k,stroke:h.connectorColor||a.color||"#666666"});m[c?"attr":"animate"]({d:b.connectorPath(a.labelPos)});m.attr("visibility",O)}else m&&(a.connector=m.destroy())}))},m.pie.prototype.connectorPath=
function(a){var b=a.x,c=a.y;return t(this.options.dataLabels.softConnector,!0)?["M",b+("left"===a[6]?5:-5),c,"C",b,c,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),c,"L",a[2],a[3],"L",a[4],a[5]]},m.pie.prototype.placeDataLabels=function(){F(this.points,function(a){var b=a.dataLabel;b&&a.visible&&((a=b._pos)?(b.sideOverflow&&(b._attr.width=b.getBBox().width-b.sideOverflow,b.css({width:b._attr.width+"px",textOverflow:"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?
"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))},this)},m.pie.prototype.alignDataLabel=w,m.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,c=this.options,d=c.center,f=c.minSize||80,h,k;null!==d[0]?h=Math.max(b[2]-Math.max(a[1],a[3]),f):(h=Math.max(b[2]-a[1]-a[3],f),b[0]+=(a[3]-a[1])/2);null!==d[1]?h=Math.max(Math.min(h,b[2]-Math.max(a[0],a[2])),f):(h=Math.max(Math.min(h,b[2]-a[0]-a[2]),f),b[1]+=(a[0]-a[2])/2);h<b[2]?(b[2]=h,b[3]=Math.min(e(c.innerSize||0,h),h),this.translate(b),
this.drawDataLabels&&this.drawDataLabels()):k=!0;return k});m.column&&(m.column.prototype.alignDataLabel=function(a,e,c,f,h){var b=this.chart.inverted,k=a.series,m=a.dlBox||a.shapeArgs,p=t(a.below,a.plotY>t(this.translatedThreshold,k.yAxis.len)),n=t(c.inside,!!this.options.stacking);m&&(f=l(m),0>f.y&&(f.height+=f.y,f.y=0),m=f.y+f.height-k.yAxis.len,0<m&&(f.height-=m),b&&(f={x:k.yAxis.len-f.y-f.height,y:k.xAxis.len-f.x-f.width,width:f.height,height:f.width}),n||(b?(f.x+=p?0:f.width,f.width=0):(f.y+=
p?f.height:0,f.height=0)));c.align=t(c.align,!b||n?"center":p?"right":"left");c.verticalAlign=t(c.verticalAlign,b||n?"middle":p?"top":"bottom");d.prototype.alignDataLabel.call(this,a,e,c,f,h);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(L);(function(a){var D=a.Chart,A=a.each,G=a.pick,F=a.addEvent;D.prototype.callbacks.push(function(a){function f(){var f=[];A(a.series||[],function(a){var h=a.options.dataLabels,l=a.dataLabelCollections||["dataLabel"];(h.enabled||
a._hasPointLabels)&&!h.allowOverlap&&a.visible&&A(l,function(e){A(a.points,function(a){a[e]&&(a[e].labelrank=G(a.labelrank,a.shapeArgs&&a.shapeArgs.height),f.push(a[e]))})})});a.hideOverlappingLabels(f)}f();F(a,"redraw",f)});D.prototype.hideOverlappingLabels=function(a){var f=a.length,h,l,n,t,e,d,m,C,b,x=function(a,b,d,e,f,h,l,m){return!(f>a+d||f+l<a||h>b+e||h+m<b)};for(l=0;l<f;l++)if(h=a[l])h.oldOpacity=h.opacity,h.newOpacity=1;a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(l=
0;l<f;l++)for(n=a[l],h=l+1;h<f;++h)if(t=a[h],n&&t&&n!==t&&n.placed&&t.placed&&0!==n.newOpacity&&0!==t.newOpacity&&(e=n.alignAttr,d=t.alignAttr,m=n.parentGroup,C=t.parentGroup,b=2*(n.box?0:n.padding),e=x(e.x+m.translateX,e.y+m.translateY,n.width-b,n.height-b,d.x+C.translateX,d.y+C.translateY,t.width-b,t.height-b)))(n.labelrank<t.labelrank?n:t).newOpacity=0;A(a,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":
"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(L);(function(a){var D=a.addEvent,A=a.Chart,G=a.createElement,F=a.css,n=a.defaultOptions,f=a.defaultPlotOptions,h=a.each,l=a.extend,w=a.fireEvent,t=a.hasTouch,e=a.inArray,d=a.isObject,m=a.Legend,C=a.merge,b=a.pick,x=a.Point,c=a.Series,u=a.seriesTypes,B=a.svg,I;I=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart.pointer,c=function(a){var c=b.getPointFromEvent(a);if(void 0!==c)c.onMouseOver(a)};h(a.points,function(a){a.graphic&&(a.graphic.element.point=
a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(h(a.trackerGroups,function(d){if(a[d]){a[d].addClass("highcharts-tracker").on("mouseover",c).on("mouseout",function(a){b.onTrackerMouseOut(a)});if(t)a[d].on("touchstart",c);a.options.cursor&&a[d].css(F).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,f=a.chart,l=f.pointer,m=
f.renderer,n=f.options.tooltip.snap,g=a.tracker,r,u=function(){if(f.hoverSeries!==a)a.onMouseOver()},w="rgba(192,192,192,"+(B?.0001:.002)+")";if(e&&!c)for(r=e+1;r--;)"M"===d[r]&&d.splice(r+1,0,d[r+1]-n,d[r+2],"L"),(r&&"M"===d[r]||r===e)&&d.splice(r,0,"L",d[r-2]+n,d[r-1]);g?g.attr({d:d}):a.graph&&(a.tracker=m.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:w,fill:c?w:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*n),zIndex:2}).add(a.group),h([a.tracker,a.markerGroup],
function(a){a.addClass("highcharts-tracker").on("mouseover",u).on("mouseout",function(a){l.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(t)a.on("touchstart",u)}))}};u.column&&(u.column.prototype.drawTracker=I.drawTrackerPoint);u.pie&&(u.pie.prototype.drawTracker=I.drawTrackerPoint);u.scatter&&(u.scatter.prototype.drawTracker=I.drawTrackerPoint);l(m.prototype,{setItemEvents:function(a,b,c){var d=this,e=d.chart.renderer.boxWrapper,f="highcharts-legend-"+(a.series?"point":"series")+"-active";
(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");e.addClass(f);b.css(d.options.itemHoverStyle)}).on("mouseout",function(){b.css(C(a.visible?d.itemStyle:d.itemHiddenStyle));e.removeClass(f);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):w(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=G("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},
this.options.itemCheckboxStyle,this.chart.container);D(a.checkbox,"click",function(b){w(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});n.legend.itemStyle.cursor="pointer";l(A.prototype,{showResetZoom:function(){var a=this,b=n.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,f="chart"===c.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(c.position,
!1,f)},zoomOut:function(){var a=this;w(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var c,e=this.pointer,f=!1,k;!a||a.resetSelection?h(this.axes,function(a){c=a.zoom()}):h(a.xAxis.concat(a.yAxis),function(a){var b=a.axis;e[b.isXAxis?"zoomX":"zoomY"]&&(c=b.zoom(a.min,a.max),b.displayBtn&&(f=!0))});k=this.resetZoomButton;f&&!k?this.showResetZoom():!f&&d(k)&&(this.resetZoomButton=k.destroy());c&&this.redraw(b(this.options.chart.animation,a&&a.animation,100>this.pointCount))},
pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&h(d,function(a){a.setState()});h("xy"===b?[1,0]:[1],function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,f=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",h=c[d],g=(b.pointRange||0)/2,k=b.getExtremes(),l=b.toValue(h-f,!0)+g,g=b.toValue(h+b.len-f,!0)-g,m=g<l,h=m?g:l,l=m?l:g,g=Math.min(k.dataMin,b.toValue(b.toPixels(k.min)-b.minPixelPadding)),m=Math.max(k.dataMax,b.toValue(b.toPixels(k.max)+b.minPixelPadding)),n;n=g-h;0<n&&(l+=n,h=g);n=l-m;0<n&&
(l=m,h-=n);b.series.length&&h!==k.min&&l!==k.max&&(b.setExtremes(h,l,!1,!1,{trigger:"pan"}),e=!0);c[d]=f});e&&c.redraw(!1);F(c.container,{cursor:"move"})}});l(x.prototype,{select:function(a,c){var d=this,f=d.series,k=f.chart;a=b(a,!d.selected);d.firePointEvent(a?"select":"unselect",{accumulate:c},function(){d.selected=d.options.selected=a;f.options.data[e(d,f.data)]=d.options;d.setState(a&&"select");c||h(k.getSelectedPoints(),function(a){a.selected&&a!==d&&(a.selected=a.options.selected=!1,f.options.data[e(a,
f.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series.chart.pointer;this.firePointEvent("mouseOver");b.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");h(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var b=this,c=C(b.series.options.point,b.options).events;b.events=c;a.objectEach(c,function(a,c){D(b,c,a)});
this.hasImportedEvents=!0}},setState:function(a,c){var d=Math.floor(this.plotX),e=this.plotY,h=this.series,k=h.options.states[a]||{},m=f[h.type].marker&&h.options.marker,n=m&&!1===m.enabled,t=m&&m.states&&m.states[a]||{},g=!1===t.enabled,r=h.stateMarkerGraphic,u=this.marker||{},w=h.chart,x=h.halo,A,E=m&&h.markerAttribs;a=a||"";if(!(a===this.state&&!c||this.selected&&"select"!==a||!1===k.enabled||a&&(g||n&&!1===t.enabled)||a&&u.states&&u.states[a]&&!1===u.states[a].enabled)){E&&(A=h.markerAttribs(this,
a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.attr(h.pointAttribs(this,a)),A&&this.graphic.animate(A,b(w.options.chart.animation,t.animation,m.animation)),r&&r.hide();else{if(a&&t){m=u.symbol||h.symbol;r&&r.currentSymbol!==m&&(r=r.destroy());if(r)r[c?"animate":"attr"]({x:A.x,y:A.y});else m&&(h.stateMarkerGraphic=r=w.renderer.symbol(m,A.x,A.y,A.width,A.height).add(h.markerGroup),r.currentSymbol=
m);r&&r.attr(h.pointAttribs(this,a))}r&&(r[a&&w.isInsidePlot(d,e,w.inverted)?"show":"hide"](),r.element.point=this)}(d=k.halo)&&d.size?(x||(h.halo=x=w.renderer.path().add(E?h.markerGroup:h.group)),x[c?"animate":"attr"]({d:this.haloPath(d.size)}),x.attr({"class":"highcharts-halo highcharts-color-"+b(this.colorIndex,h.colorIndex)}),x.point=this,x.attr(l({fill:this.color||h.color,"fill-opacity":d.opacity,zIndex:-1},d.attributes))):x&&x.point&&x.point.haloPath&&x.animate({d:x.point.haloPath(0)});this.state=
a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});l(c.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&w(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&w(this,"mouseOut");!c||this.stickyTracking||
c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var c=this,d=c.options,e=c.graph,f=d.states,k=d.lineWidth,d=0;a=a||"";if(c.state!==a&&(h([c.group,c.markerGroup,c.dataLabelsGroup],function(b){b&&(c.state&&b.removeClass("highcharts-series-"+c.state),a&&b.addClass("highcharts-series-"+a))}),c.state=a,!f[a]||!1!==f[a].enabled)&&(a&&(k=f[a].lineWidth||k+(f[a].lineWidthPlus||0)),e&&!e.dashstyle))for(k={"stroke-width":k},e.animate(k,b(c.chart.options.chart.animation,f[a]&&
f[a].animation));c["zone-graph-"+d];)c["zone-graph-"+d].attr(k),d+=1},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,k=d.options.chart.ignoreHiddenSeries,l=c.visible;f=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!l:a)?"show":"hide";h(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&h(d.series,
function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});h(c.linkedSeries,function(b){b.setVisible(a,!1)});k&&(d.isDirtyBox=!0);!1!==b&&d.redraw();w(c,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);w(this,a?"select":"unselect")},drawTracker:I.drawTrackerGraph})})(L);(function(a){var D=a.Chart,A=a.each,G=a.inArray,F=a.isArray,n=a.isObject,f=a.pick,h=a.splat;D.prototype.setResponsive=
function(f){var h=this.options.responsive,l=[],e=this.currentResponsive;h&&h.rules&&A(h.rules,function(d){void 0===d._id&&(d._id=a.uniqueKey());this.matchResponsiveRule(d,l,f)},this);var d=a.merge.apply(0,a.map(l,function(d){return a.find(h.rules,function(a){return a._id===d}).chartOptions})),l=l.toString()||void 0;l!==(e&&e.ruleIds)&&(e&&this.update(e.undoOptions,f),l?(this.currentResponsive={ruleIds:l,mergedOptions:d,undoOptions:this.currentOptions(d)},this.update(d,f)):this.currentResponsive=void 0)};
D.prototype.matchResponsiveRule=function(a,h){var l=a.condition;(l.callback||function(){return this.chartWidth<=f(l.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=f(l.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=f(l.minWidth,0)&&this.chartHeight>=f(l.minHeight,0)}).call(this)&&h.push(a._id)};D.prototype.currentOptions=function(f){function l(e,d,f,t){var b;a.objectEach(e,function(a,c){if(!t&&-1<G(c,["series","xAxis","yAxis"]))for(e[c]=h(e[c]),f[c]=[],b=0;b<e[c].length;b++)d[c][b]&&(f[c][b]={},l(a[b],
d[c][b],f[c][b],t+1));else n(a)?(f[c]=F(a)?[]:{},l(a,d[c]||{},f[c],t+1)):f[c]=d[c]||null})}var t={};l(f,this.options,t,0);return t}})(L);return L});


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var CONFIG, MESSAGES, createElem, qIndexFromParams, renderQuestion;

MESSAGES = __webpack_require__(1).practiceTest;

CONFIG = __webpack_require__(2);

renderQuestion = __webpack_require__(5);

createElem = __webpack_require__(3);

qIndexFromParams = function(params) {
  var index;
  if (params.q == null) {
    index = 0;
  } else {
    index = params.q - 1;
  }
  if (isNaN(index)) {
    throw new Error('Invalid params');
  }
  return index;
};

module.exports = function(container, goto, params) {
  var clicked, currentTest, gotoQuestion, qIndex, question, questionContainer, questionIds;
  currentTest = store.findOne(db.STORE_TAGS.CURRENT_TEST);
  if (currentTest == null) {
    return goto('prepareTest');
  }
  if (currentTest.finished) {
    return goto('browseEvaluatedTest', params);
  }
  qIndex = qIndexFromParams(params);
  gotoQuestion = function(i) {
    return goto('practiceTest', Object.assign({}, params, {
      q: i + 1
    }));
  };
  currentTest.lastViewedIndex = qIndex;
  store.update(currentTest);
  questionIds = currentTest.questionIds;
  question = store.findOne({
    $tag: db.STORE_TAGS.QUESTION,
    id: questionIds[qIndex]
  });
  questionContainer = createElem('div .questionView .testMode .showTest');
  container.appendChild(questionContainer);
  clicked = false;
  renderQuestion({
    question: question,
    questionCount: questionIds.length,
    questionIndex: qIndex,
    container: questionContainer,
    shuffleAnswers: CONFIG.shuffleAnswers.testMode,
    messages: {
      backButton: MESSAGES.evaluateTestButton
    },
    handlers: {
      gotoQuestion: gotoQuestion,
      lastQuestionAnswer: function() {
        if (confirm(MESSAGES.finishedPopup)) {
          goto('evaluateTest');
        } else {
          clicked = false;
        }
      },
      backButtonClick: function() {
        if (confirm(MESSAGES.evaluateTestPopup)) {
          goto('evaluateTest');
        }
      },
      prepareView: function(highlightAnswer, highlightQuestion) {
        var answer, answerIndex, i, j, len, ref;
        ref = currentTest.answers;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          answer = ref[i];
          if (answer != null) {
            highlightQuestion(i, 'marked');
          }
        }
        answerIndex = currentTest.answers[qIndex];
        if (answerIndex != null) {
          return highlightAnswer(answerIndex, 'marked');
        }
      },
      answerClick: function(arg, highlightAnswer, highlightQuestion) {
        var i, index, j, ref;
        index = arg.index;
        if (clicked) {
          return false;
        }
        for (i = j = 0, ref = question.answers.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          highlightAnswer(i, null);
        }
        highlightAnswer(index, 'marked');
        highlightQuestion(qIndex, 'marked');
        currentTest.answers[qIndex] = index;
        store.update(currentTest);
        clicked = true;
        return true;
      }
    }
  });
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var CONFIG, MESSAGES, PASS_SCORE, e, getTestResults, renderQuestionList, renderSuccessBar, saveTestResults;

CONFIG = __webpack_require__(2);

MESSAGES = __webpack_require__(1).evaluateTest;

PASS_SCORE = CONFIG.testSuccessThreshold;

e = __webpack_require__(3);

getTestResults = __webpack_require__(14);

saveTestResults = function(test, results) {
  var endTime, i, isCorrect, j, len, ref, testId, testItem;
  console.debug('Saving test results...');
  endTime = Date.now();
  testItem = store.add(db.STORE_TAGS.PRACTICE_TEST, {
    startTime: test.startTime,
    endTime: endTime,
    passScore: PASS_SCORE,
    passed: results.passed,
    score: results.score,
    maxScore: results.maxScore
  });
  testId = testItem.$id;
  console.debug('(testId = ' + testId + ')');
  ref = results.answerResults;
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    isCorrect = ref[i];
    store.add(db.STORE_TAGS.ANSWER, {
      mode: 'practiceTest',
      time: endTime,
      testId: testId,
      correctlyAnswered: isCorrect,
      selectedAnswerIndex: test.answers[i],
      questionId: test.questionIds[i],
      questionIndex: i,
      attemptNumber: 0
    });
  }
  return testId;
};

renderSuccessBar = function(score, maxScore) {
  var container, passed, percentage, scoreLine, thresholdElem, thresholdPercentage;
  passed = score >= PASS_SCORE;
  percentage = Math.round(score / maxScore * 100);
  thresholdPercentage = Math.round(PASS_SCORE / maxScore * 100);
  container = e('div .scoreBarContainer ' + (passed ? '.succeeded' : '.failed'), [e('h2 .successMessage', [(passed ? MESSAGES.succeeded : MESSAGES.didNotSucceed)]), e('div .scoreBarLabels', [e('div .scoreBarPoints', [score + ' / ' + maxScore + ' ' + MESSAGES.ofNPoints]), e('div .scoreBarPercentage', [percentage + ' %'])]), e('div .scoreBar', [scoreLine = e('div .scoreBarLine'), thresholdElem = e('div .scoreBarThreshold')])]);
  scoreLine.style.width = percentage + '%';
  thresholdElem.style.left = (thresholdPercentage - 0.25) + '%';
  return container;
};

renderQuestionList = function(test, testResults, goto) {
  var i, items, question, questionAnswerList, questionId;
  items = (function() {
    var j, len, ref, results1;
    ref = test.questionIds;
    results1 = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      questionId = ref[i];
      question = store.findOne({
        $tag: db.STORE_TAGS.QUESTION,
        id: questionId
      });
      results1.push((function(question, i) {
        var item, itemClass, link;
        itemClass = '';
        switch (testResults.answerResults[i]) {
          case true:
            itemClass = '.correct';
            break;
          case false:
            itemClass = '.incorrect';
            break;
          default:
            itemClass = '.unanswered';
        }
        item = e('li ' + itemClass, [link = e('a .linkToQuestion', [e('div .questionIndex', [i + 1]), e('div .questionText', [question.question.text])])]);
        link.title = question.question.text;
        link.href = 'javascript:void(0);';
        link.addEventListener('click', function() {
          return goto('browseEvaluatedTest', {
            q: i + 1
          });
        });
        return item;
      })(question, i));
    }
    return results1;
  })();
  questionAnswerList = e('ul .questionAnswerList', items);
  return questionAnswerList;
};

module.exports = function(container, goto) {
  var backToTestButton, currentTest, resultContainer, testResults;
  currentTest = store.findOne(db.STORE_TAGS.CURRENT_TEST);
  if (currentTest == null) {
    goto('prepareTest');
    return;
  }
  currentTest.lastViewedIndex = null;
  store.update(currentTest);
  if (!currentTest.finished) {
    testResults = getTestResults(currentTest);
    saveTestResults(currentTest, testResults);
    currentTest.results = testResults;
    currentTest.finished = true;
    store.update(currentTest);
  } else {
    testResults = currentTest.results;
  }
  resultContainer = e('div .testResults');
  container.appendChild(resultContainer);
  resultContainer.appendChild(e(null, [e('h1', ['Výsledky testu']), backToTestButton = e('a .backToTest href="javascript:void(0);"', ['Zpět k zahájení testu']), e('br'), renderSuccessBar(testResults.score, testResults.maxScore), renderQuestionList(currentTest, testResults, goto)]));
  return backToTestButton.addEventListener('click', function() {
    store.removeByQuery(db.STORE_TAGS.CURRENT_TEST);
    goto('prepareTest');
  });
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var CONFIG, MESSAGES, createElem, qIndexFromParams, renderQuestion;

MESSAGES = __webpack_require__(1).practiceTest;

CONFIG = __webpack_require__(2);

renderQuestion = __webpack_require__(5);

createElem = __webpack_require__(3);

qIndexFromParams = function(params) {
  var index;
  if (params.q == null) {
    index = 0;
  } else {
    index = params.q - 1;
  }
  if (isNaN(index)) {
    throw new Error('Invalid params');
  }
  return index;
};

module.exports = function(container, goto, params) {
  var currentTest, gotoQuestion, qIndex, question, questionContainer;
  currentTest = store.findOne(db.STORE_TAGS.CURRENT_TEST);
  if (currentTest == null) {
    return goto('prepareTest');
  }
  if (!currentTest.finished) {
    return goto('practiceTest', params);
  }
  qIndex = qIndexFromParams(params);
  gotoQuestion = function(i) {
    return goto('browseEvaluatedTest', Object.assign({}, params, {
      q: i + 1
    }));
  };
  currentTest.lastViewedIndex = qIndex;
  store.update(currentTest);
  question = store.findOne({
    $tag: db.STORE_TAGS.QUESTION,
    id: currentTest.questionIds[qIndex]
  });
  questionContainer = createElem('div .questionView .testMode .showResults');
  container.appendChild(questionContainer);
  renderQuestion({
    question: question,
    questionCount: currentTest.questionIds.length,
    questionIndex: qIndex,
    container: questionContainer,
    shuffleAnswers: CONFIG.shuffleAnswers.testMode,
    messages: {
      backButton: MESSAGES.backToResults
    },
    handlers: {
      gotoQuestion: gotoQuestion,
      lastQuestionAnswer: function() {
        return gotoQuestion(0);
      },
      backButtonClick: function() {
        return goto('evaluateTest');
      },
      prepareView: function(highlightAnswer, highlightQuestion) {
        var answer, answerIndex, correct, i, isCorrect, j, k, l, len, len1, len2, ref, ref1, ref2, results;
        ref = currentTest.results.answerResults;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          isCorrect = ref[i];
          switch (isCorrect) {
            case true:
              highlightQuestion(i, 'correct');
              break;
            case false:
              highlightQuestion(i, 'incorrect');
              break;
            default:
              highlightQuestion(i, 'unanswered');
          }
        }
        answerIndex = currentTest.answers[qIndex];
        if (answerIndex == null) {
          ref1 = question.answers;
          for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
            answer = ref1[i];
            if (answer.correct) {
              highlightAnswer(i, 'correctUnanswered');
            }
          }
          return;
        }
        correct = question.answers[answerIndex].correct;
        if (correct) {
          return highlightAnswer(answerIndex, 'correct');
        } else {
          highlightAnswer(answerIndex, 'incorrect');
          ref2 = question.answers;
          results = [];
          for (i = l = 0, len2 = ref2.length; l < len2; i = ++l) {
            answer = ref2[i];
            if (answer.correct) {
              results.push(highlightAnswer(i, 'correct'));
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      },
      answerClick: function() {
        return true;
      }
    }
  });
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var CONFIG, MESSAGES, createWrappedEveStore, storeConfig, updateTestData;

MESSAGES = __webpack_require__(1);

CONFIG = __webpack_require__(2);

createWrappedEveStore = __webpack_require__(59);

updateTestData = __webpack_require__(87);

storeConfig = __webpack_require__(94);

module.exports = function() {
  var decorator, i, j, k, len, len1, len2, query, ref, ref1, ref2, validator;
  window.store = createWrappedEveStore(CONFIG.storeNamespace);
  ref = storeConfig.cache;
  for (i = 0, len = ref.length; i < len; i++) {
    query = ref[i];
    store.setCacheFor(query);
  }
  ref1 = storeConfig.validators;
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    validator = ref1[j];
    store.setValidatorFor(validator.tag, validator.validate);
  }
  ref2 = storeConfig.decorators;
  for (k = 0, len2 = ref2.length; k < len2; k++) {
    decorator = ref2[k];
    store.setDecoratorFor(decorator.tag, {
      decorate: decorator.decorate,
      undecorate: decorator.undecorate
    });
  }
  if (!store.persistentStorageAvailable()) {
    alert(MESSAGES.error.storageUnavailable);
  }
  return updateTestData();
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var CONFIG, KEYS, MESSAGES, createEveStore, moveCollectionToMemory,
  hasProp = {}.hasOwnProperty;

KEYS = {
  storageFull: 'persistentStorageFull',
  placeholder: 'persistentStorageFullPlaceholder'
};

CONFIG = __webpack_require__(2);

MESSAGES = __webpack_require__(1);

createEveStore = __webpack_require__(60);

moveCollectionToMemory = function(tag, eve) {
  var collectionInDb, i, item, items, len;
  collectionInDb = eve.findOne(tag).$persistent;
  if (collectionInDb) {
    eve.removeByQuery({
      $tag: db.STORE_TAGS.LAST_CHECK_TIME,
      collection: tag
    });
    items = eve.removeByQuery(tag);
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      item.$persistent = false;
      eve.update(item);
    }
  }
  return collectionInDb;
};

module.exports = function() {
  var attemptedTestDataMove, eve, fn, key, oldAdd, out, persistentStorageAvailable;
  eve = createEveStore.apply(null, arguments);
  persistentStorageAvailable = eve.persistentStorageAvailable();
  attemptedTestDataMove = false;
  if (eve.count(KEYS.storageFull) > 0) {
    persistentStorageAvailable = false;
    alert(MESSAGES.error.storageFull);
  } else {
    try {
      if (eve.count(KEYS.placeholder) === 0) {
        eve.add(KEYS.placeholder, true, {
          time: 1000000000000000000000000
        });
      }
    } catch (error) {}
  }
  out = {};
  fn = function(key) {
    if (typeof eve[key] !== 'function') {
      out.__defineGetter__(key, function() {
        return eve[key];
      });
      return out.__defineSetter__(key, function(newValue) {
        return eve[key] = newValue;
      });
    } else {
      return out[key] = function() {
        return eve[key].apply(eve, arguments);
      };
    }
  };
  for (key in eve) {
    if (!hasProp.call(eve, key)) continue;
    fn(key);
  }
  out._add = oldAdd = out.add;
  out.add = function(tag, item) {
    var err, movedQuestions, movedSections, persist;
    if ((item == null) && typeof tag === 'object') {
      item = tag;
      tag = null;
    }
    persist = persistentStorageAvailable;
    try {
      return oldAdd(tag, persist, item);
    } catch (error) {
      err = error;
      if (!(err instanceof eve.StorageFullError)) {
        throw err;
      }
      if (!attemptedTestDataMove) {
        console.warn('localStorage full - moving test data (questions and sections) to memory store');
        attemptedTestDataMove = true;
        movedSections = moveCollectionToMemory(db.STORE_TAGS.SECTION, eve);
        movedQuestions = moveCollectionToMemory(db.STORE_TAGS.QUESTION, eve);
        if (movedSections || movedQuestions) {
          return out.add(tag, item);
        } else {
          console.warn('test data already moved');
        }
      }
      try {
        eve.removeByQuery(KEYS.placeholder);
        oldAdd(KEYS.storageFull, true, {
          time: Date.now()
        });
      } catch (error) {}
      alert(MESSAGES.error.storageFull);
      persistentStorageAvailable = false;
      return out.add(tag, item);
    }
  };
  out.StorageFullError = eve.StorageFullError;
  out.rawStore = eve;
  if (CONFIG.storeLogging.log) {
    __webpack_require__(85)(out);
  }
  return out;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var ALREADY_LOADED_NAMESPACES, EVENT_INFO_TYPES, StorageFullError, createStoreState, getExternalItem, getInternalItem, storeOperations, stringifyQuery, updateStructure, validateArguments;

EVENT_INFO_TYPES = __webpack_require__(18);

getExternalItem = __webpack_require__(61);

getInternalItem = __webpack_require__(7);

validateArguments = __webpack_require__(0);

StorageFullError = __webpack_require__(22);

createStoreState = __webpack_require__(66);

updateStructure = __webpack_require__(4);

stringifyQuery = __webpack_require__(72);

storeOperations = __webpack_require__(73);

ALREADY_LOADED_NAMESPACES = [];

module.exports = function(storeNamespace) {
  var emit, listeners, state;
  if (ALREADY_LOADED_NAMESPACES.indexOf(storeNamespace) > -1) {
    throw new Error('eveStore instance already loaded for this namespace - only one instance for each namespace is allowed');
  }
  ALREADY_LOADED_NAMESPACES.push(storeNamespace);
  state = createStoreState(storeNamespace);
  listeners = {};
  emit = function(opType, message, infoObj, data) {
    var cb, emitTime, i, j, len, len1, ref, ref1;
    if (infoObj == null) {
      infoObj = null;
    }
    if (data == null) {
      data = null;
    }
    validateArguments(arguments, ['string', 'string', 'object?', 'object?']);
    if (infoObj != null) {
      infoObj.namespace = state.store.namespace;
    }
    if (data != null) {
      data.namespace = state.store.namespace;
    }
    emitTime = Date.now();
    if (listeners[opType] != null) {
      ref = listeners[opType];
      for (i = 0, len = ref.length; i < len; i++) {
        cb = ref[i];
        cb(opType, message, infoObj, data, emitTime);
      }
    }
    if (listeners['*'] != null) {
      ref1 = listeners['*'];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        cb = ref1[j];
        cb(opType, message, infoObj, data, emitTime);
      }
    }
  };
  return {
    add: function(tag, persist, item) {
      var addedItem, internalItem;
      internalItem = storeOperations.add(state, (function() {}), tag, persist, item);
      addedItem = getExternalItem(internalItem, state.fnArrays.decorators);
      emit('add', "Added new item", {
        id: addedItem.$id,
        persist: addedItem.$persistent,
        tag: addedItem.$tag
      }, {
        item: addedItem
      });
      return addedItem;
    },
    update: function(item) {
      var internalItem, updatedItem;
      internalItem = storeOperations.update(state, (function() {}), item);
      updatedItem = getExternalItem(internalItem, state.fnArrays.decorators);
      emit('update', "Updated item", {
        id: updatedItem.$id
      }, {
        item: updatedItem
      });
      return updatedItem;
    },
    remove: function(itemToRemove) {
      var externalItem, externalItems, removedItem;
      removedItem = storeOperations.remove(state, (function() {}), itemToRemove);
      if (removedItem == null) {
        emit('remove', "Attempted to remove missing item", {
          id: (typeof itemToRemove === 'number' ? itemToRemove : itemToRemove.$id),
          itemCount: 0
        }, {
          item: itemToRemove,
          itemCount: 0
        });
        return null;
      }
      if (Array.isArray(removedItem)) {
        externalItems = removedItem.filter(function(item) {
          return item != null;
        }).map(function(item) {
          return getExternalItem(item, state.fnArrays.decorators);
        });
        emit('remove', "Removed multiple items", {
          itemCount: externalItems.length
        }, {
          item: externalItems,
          itemCount: externalItems.length
        });
        return externalItems;
      } else {
        externalItem = getExternalItem(removedItem, state.fnArrays.decorators);
        emit('remove', "Removed single item", {
          id: externalItem.$id,
          itemCount: 1,
          added: Math.floor((Date.now() - externalItem.$writeTime) / 1000) + " seconds ago"
        }, {
          item: externalItem,
          itemCount: 1
        });
        return externalItem;
      }
    },
    removeByQuery: function(query) {
      var cacheHit, eventInfoCb, externalItems, removedItems;
      cacheHit = null;
      eventInfoCb = function(type, data) {
        if (type === EVENT_INFO_TYPES.cacheHit) {
          return cacheHit = data.cacheHit;
        }
      };
      removedItems = storeOperations.removeByQuery(state, eventInfoCb, query);
      externalItems = removedItems.map(function(item) {
        return getExternalItem(item, state.fnArrays.decorators);
      });
      emit('removeByQuery', 'Removed items by query', {
        itemCount: externalItems.length,
        cacheHit: cacheHit
      }, {
        query: query,
        item: externalItems,
        cacheHit: cacheHit
      });
      return externalItems;
    },
    get: function(id) {
      var externalItem, returnedItem;
      returnedItem = storeOperations.get(state, (function() {}), id);
      externalItem = getExternalItem(returnedItem, state.fnArrays.decorators);
      emit('get', 'Looked up item by ID', {
        id: id
      }, {
        item: externalItem
      });
      return externalItem;
    },
    find: function(query) {
      var cacheHit, eventInfoCb, externalItems, foundItems;
      cacheHit = null;
      eventInfoCb = function(type, data) {
        if (type === EVENT_INFO_TYPES.cacheHit) {
          return cacheHit = data.cacheHit;
        }
      };
      foundItems = storeOperations.find(state, eventInfoCb, query, false);
      externalItems = foundItems.map(function(item) {
        return getExternalItem(item, state.fnArrays.decorators);
      });
      emit('find', 'Querying store to find items', {
        itemCount: externalItems.length,
        query: stringifyQuery(query),
        cacheHit: cacheHit
      }, {
        query: query,
        item: externalItems,
        cacheHit: cacheHit
      });
      return externalItems;
    },
    findOne: function(query) {
      var cacheHit, eventInfoCb, externalItem, foundItem, id;
      cacheHit = null;
      eventInfoCb = function(type, data) {
        if (type === EVENT_INFO_TYPES.cacheHit) {
          return cacheHit = data.cacheHit;
        }
      };
      foundItem = storeOperations.findOne(state, eventInfoCb, query);
      externalItem = getExternalItem(foundItem, state.fnArrays.decorators);
      if (externalItem != null) {
        id = externalItem.$id;
      } else {
        id = null;
      }
      emit('findOne', 'Querying store to find single item', {
        query: stringifyQuery(query),
        id: id,
        cacheHit: cacheHit
      }, {
        query: query,
        item: externalItem,
        cacheHit: cacheHit
      });
      return externalItem;
    },
    count: function(query) {
      var cacheHit, eventInfoCb, itemCount;
      cacheHit = null;
      eventInfoCb = function(type, data) {
        if (type === EVENT_INFO_TYPES.cacheHit) {
          return cacheHit = data.cacheHit;
        }
      };
      itemCount = storeOperations.count(state, eventInfoCb, query);
      emit('count', 'Counting items matching query', {
        count: itemCount,
        query: stringifyQuery(query),
        cacheHit: cacheHit
      }, {
        count: itemCount,
        query: query,
        cacheHit: cacheHit
      });
      return itemCount;
    },
    forEach: function(fn) {
      var cb;
      validateArguments([fn], ['function']);
      cb = function(item) {
        return fn(getExternalItem(item, state.fnArrays.decorators));
      };
      storeOperations.forEach(state, (function() {}), cb);
      emit('forEach', 'Ran a function for each item', null, {
        callback: cb
      });
    },
    isEmpty: function() {
      var isEmpty;
      isEmpty = storeOperations.isEmpty(state, (function() {}));
      emit('isEmpty', 'Checked if store is empty', {
        empty: isEmpty
      }, {
        empty: isEmpty
      });
      return isEmpty;
    },
    clear: function() {
      storeOperations.clear(state, (function() {}));
      emit('clear', 'Store cleared');
    },
    setCacheFor: function(query) {
      validateArguments([query], ['query']);
      state.structure = updateStructure.cacheQuery(state.structure, query, state.store);
    },
    setValidatorFor: function(tag, fn) {
      validateArguments(arguments, ['string', 'function']);
      if (state.fnArrays.validators[tag] == null) {
        state.fnArrays.validators[tag] = [];
      }
      state.fnArrays.validators[tag].push(fn);
      return state.fnArrays.validators[tag].length;
    },
    setDecoratorFor: function(tag, decoratorObj) {
      var decorate, undecorate;
      decorate = decoratorObj.decorate, undecorate = decoratorObj.undecorate;
      validateArguments(arguments, ['string', 'object']);
      if (typeof decorate !== 'function' || typeof undecorate !== 'function') {
        throw new Error('Invalid parameters');
      }
      if (state.fnArrays.decorators[tag] == null) {
        state.fnArrays.decorators[tag] = [];
        state.fnArrays.undecorators[tag] = [];
      }
      state.fnArrays.decorators[tag].push(decorate);
      state.fnArrays.undecorators[tag].unshift(undecorate);
      return state.fnArrays.decorators[tag].length;
    },
    StorageFullError: StorageFullError,
    persistentStorageAvailable: function() {
      return state.store.db.isAvailable();
    },
    getRawItem: function(item) {
      var internalItem;
      internalItem = getInternalItem(item, state.fnArrays.undecorators);
      return internalItem.item;
    },
    getMetadata: function(item) {
      var internalItem;
      internalItem = getInternalItem(item, state.fnArrays.undecorators);
      return internalItem.meta;
    },
    __on: function(operationType, cb) {
      validateArguments(arguments, ['string', 'function']);
      if (listeners[operationType] == null) {
        listeners[operationType] = [];
      }
      listeners[operationType].push(cb);
    },
    __getStructure: function() {
      return state.structure;
    },
    __dumpItem: function(item) {
      var internalItem, str;
      internalItem = getInternalItem(item, state.fnArrays.undecorators);
      str = '';
      if (internalItem.meta.tag != null) {
        str += "#" + internalItem.meta.tag + "\n";
      } else {
        str += 'NO_TAG';
      }
      str += "\tstore:" + (internalItem.meta.persistent ? 'persistent' : 'memory') + "\n \twriteTime: " + (Date(internalItem.meta.writeTime)) + " \n\t";
      return str;
    }
  };
};

module.exports.StorageFullError = StorageFullError;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var decorateItem, rewriteInternalItem;

rewriteInternalItem = __webpack_require__(62);

decorateItem = __webpack_require__(19);

module.exports = function(internalItem, decorators) {
  if (internalItem == null) {
    return null;
  }
  return decorateItem(rewriteInternalItem(internalItem), internalItem.meta.tag, decorators);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var metaSymbol, validateArguments;

metaSymbol = __webpack_require__(6);

validateArguments = __webpack_require__(0);

module.exports = function(internalItem) {
  var fn, item, key, meta;
  if (internalItem == null) {
    return null;
  }
  item = internalItem.item, meta = internalItem.meta;
  item[metaSymbol] = meta;
  fn = function(key) {
    item.__defineGetter__('$' + key, function() {
      return this[metaSymbol][key];
    });
    item.__defineSetter__('$tag', function(newValue) {
      validateArguments([newValue], ['item_tag']);
      return this[metaSymbol].tag = newValue;
    });
    return item.__defineSetter__('$persistent', function(newValue) {
      validateArguments([newValue], ['item_persistent']);
      return this[metaSymbol].persistent = newValue;
    });
  };
  for (key in meta) {
    fn(key);
  }
  return item;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var metaSymbol;

metaSymbol = __webpack_require__(6);

module.exports = function(item) {
  return (item != null) && typeof item === 'object' && (item[metaSymbol] != null);
};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = function(item) {
  return typeof item.item === 'object' && typeof item.meta === 'object';
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var metaSymbol;

metaSymbol = __webpack_require__(6);

module.exports = function(externalItem) {
  var item, key, meta, value;
  meta = externalItem[metaSymbol];
  if (meta == null) {
    meta = {};
  }
  item = {};
  for (key in externalItem) {
    value = externalItem[key];
    if (key[0] === '$' && meta.hasOwnProperty(key.slice(1))) {
      continue;
    }
    item[key] = value;
  }
  return {
    item: item,
    meta: meta
  };
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var generateStructure, getDb, getMemoryStore;

getDb = __webpack_require__(67);

getMemoryStore = __webpack_require__(70);

generateStructure = __webpack_require__(71);

module.exports = function(storeNamespace) {
  var store;
  store = {
    db: getDb(storeNamespace),
    memory: getMemoryStore(),
    namespace: storeNamespace
  };
  return {
    store: store,
    fnArrays: {
      validators: {},
      decorators: {},
      undecorators: {}
    },
    structure: generateStructure(store)
  };
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var StorageFullError, cloneValue, isEmptyObj, isQuotaExceededError, localStorageSupported,
  hasProp = {}.hasOwnProperty;

localStorageSupported = __webpack_require__(68);

isQuotaExceededError = __webpack_require__(69);

cloneValue = __webpack_require__(9);

StorageFullError = __webpack_require__(22);

isEmptyObj = __webpack_require__(10);

module.exports = function(storageNamespace) {
  var baseKey, getKey, i, isAvailable, isItemKey, j, key, recordCache, ref, validateLocalStorage;
  getKey = function(key, isItem) {
    var prefix;
    prefix = isItem === true ? 'items/' : isItem === false ? 'values/' : '';
    return storageNamespace + "/" + prefix + key;
  };
  isItemKey = function(key) {
    return key.indexOf(getKey('', true)) === 0;
  };
  isAvailable = localStorageSupported();
  validateLocalStorage = function() {
    if (!isAvailable) {
      throw new Error('Persistent storage is not supported by the browser');
    }
  };
  recordCache = {};
  if (!isAvailable) {
    console.warn('Persistent storage is not supported by the browser');
  } else {
    baseKey = getKey('', null);
    for (i = j = 0, ref = localStorage.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      key = localStorage.key(i);
      if (key.indexOf(baseKey) === 0) {
        recordCache[key] = JSON.parse(localStorage.getItem(key));
      }
    }
  }
  return {
    isAvailable: function() {
      return isAvailable;
    },
    isEmpty: function() {
      return isEmptyObj(recordCache);
    },
    clear: function() {
      validateLocalStorage();
      for (key in recordCache) {
        localStorage.removeItem(key);
      }
      recordCache = {};
    },
    write: function(key, value, isItem) {
      var err;
      if (isItem == null) {
        isItem = false;
      }
      validateLocalStorage();
      key = getKey(key, isItem);
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        err = error;
        if (isQuotaExceededError(err)) {
          throw new StorageFullError("Persistent storage is full, cannot write to " + key);
        }
        throw err;
      }
      recordCache[key] = cloneValue(value);
    },
    read: function(key, isItem) {
      var value;
      if (isItem == null) {
        isItem = false;
      }
      validateLocalStorage();
      key = getKey(key, isItem);
      value = recordCache[key];
      if (value == null) {
        return null;
      } else {
        return cloneValue(value);
      }
    },
    remove: function(key, isItem) {
      var record;
      if (isItem == null) {
        isItem = false;
      }
      validateLocalStorage();
      record = this.read(key, isItem);
      if (record != null) {
        key = getKey(key, isItem);
        localStorage.removeItem(key);
        delete recordCache[key];
      }
      return record;
    },
    writeItem: function(id, metaItem) {
      return this.write(id, metaItem, true);
    },
    readItem: function(id) {
      return this.read(id, true);
    },
    removeItem: function(id) {
      return this.remove(id, true);
    },
    readFirstItem: function() {
      var item, k, len;
      validateLocalStorage();
      for (item = k = 0, len = recordCache.length; k < len; item = ++k) {
        key = recordCache[item];
        if (key.indexOf(getKey('', true)) === 0) {
          return item;
        }
      }
      return null;
    },
    readAllItems: function() {
      var items, value;
      validateLocalStorage();
      items = [];
      for (key in recordCache) {
        if (!hasProp.call(recordCache, key)) continue;
        value = recordCache[key];
        if (isItemKey(key)) {
          items.push(value);
        }
      }
      return items;
    },
    forEachItem: function(fn) {
      var index, value;
      validateLocalStorage();
      index = 0;
      for (key in recordCache) {
        if (!hasProp.call(recordCache, key)) continue;
        value = recordCache[key];
        if (isItemKey(key)) {
          fn(cloneValue(value), index);
          index++;
        }
      }
    }
  };
};


/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = function() {
  var testValue;
  try {
    if (window.localStorage == null) {
      return false;
    }
    if (localStorage.key(0) != null) {
      if (localStorage.getItem(localStorage.key(0)) != null) {
        return true;
      }
    }
    testValue = '@@__testValue__@@';
    localStorage.setItem(testValue, testValue);
    if (localStorage.getItem(testValue) !== testValue) {
      return false;
    }
    localStorage.removeItem(testValue);
    return true;
  } catch (error) {
    return false;
  }
};


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = function(err) {
  if (err == null) {
    return false;
  }
  if (err.code != null) {
    switch (err.code) {
      case 22:
        return true;
      case 1014:
        if (err.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
          return true;
        }
    }
  } else if (err.number === -2147024882) {
    return true;
  }
  return false;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var cloneValue, isEmptyObj,
  hasProp = {}.hasOwnProperty;

cloneValue = __webpack_require__(9);

isEmptyObj = __webpack_require__(10);

module.exports = function() {
  var read, remove, store, write;
  store = {
    values: {},
    items: {}
  };
  write = function(key, value, substore) {
    substore[key] = cloneValue(value);
    return value;
  };
  read = function(key, substore) {
    var value;
    value = substore[key];
    if (value == null) {
      value = null;
    }
    return cloneValue(value);
  };
  remove = function(key, substore) {
    var result;
    result = read(key, substore);
    if (result != null) {
      delete substore[key];
    }
    return result;
  };
  return {
    isEmpty: function() {
      return isEmptyObj(store.values) && isEmptyObj(store.items);
    },
    clear: function() {
      store.values = {};
      return store.items = {};
    },
    write: function(key, value) {
      return write(key, value, store.values);
    },
    read: function(key) {
      return read(key, store.values);
    },
    remove: function(key) {
      return remove(key, store.values);
    },
    writeItem: function(id, metaItem) {
      return write(id, metaItem, store.items);
    },
    readItem: function(id) {
      return read(id, store.items);
    },
    removeItem: function(id) {
      return remove(id, store.items);
    },
    readFirstItem: function() {
      var item, j, key, len, ref;
      ref = store.items;
      for (item = j = 0, len = ref.length; j < len; item = ++j) {
        key = ref[item];
        return item;
      }
      return null;
    },
    readAllItems: function() {
      var items;
      items = [];
      this.forEachItem(function(item) {
        return items.push(item);
      });
      return items;
    },
    forEachItem: function(fn) {
      var i, key, ref;
      i = 0;
      ref = store.items;
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        fn(read(key, store.items), i);
        i++;
      }
    }
  };
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var forEachItem, getClearStructure, updateStructure;

getClearStructure = __webpack_require__(23);

updateStructure = __webpack_require__(4);

forEachItem = function(store, fn) {
  store.memory.forEachItem(fn);
  return store.db.forEachItem(fn);
};

module.exports = function(store) {
  var structure;
  structure = getClearStructure();
  forEachItem(store, function(item) {
    return updateStructure.add(structure, item, store);
  });
  return structure;
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = function(queryObj) {
  var queryStr;
  if (typeof queryObj === 'string') {
    queryStr = "($tag: " + queryObj + ")";
  } else if (typeof queryObj === 'number') {
    queryStr = '#' + queryObj;
  } else {
    queryStr = Object.entries(queryObj).map(function(arg) {
      var key, value;
      key = arg[0], value = arg[1];
      return key + ': ' + value;
    }).join(', ');
    queryStr = '(' + queryStr + ')';
  }
  return queryStr;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  add: __webpack_require__(74),
  update: __webpack_require__(76),
  remove: __webpack_require__(29),
  removeByQuery: __webpack_require__(77),
  get: __webpack_require__(78),
  find: __webpack_require__(12),
  findOne: __webpack_require__(79),
  count: __webpack_require__(80),
  forEach: __webpack_require__(82),
  isEmpty: __webpack_require__(83),
  clear: __webpack_require__(84)
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var addItemToStore, getInternalItem, runItemValidators, updateStructure, validateArguments;

validateArguments = __webpack_require__(0);

getInternalItem = __webpack_require__(7);

runItemValidators = __webpack_require__(21);

addItemToStore = __webpack_require__(27);

updateStructure = __webpack_require__(4);

module.exports = function(state, eventInfoCb, tag, persistent, item, expectInternalItem) {
  var internalItem, isInternalItem, returnedItem;
  if (expectInternalItem == null) {
    expectInternalItem = false;
  }
  if (arguments.length === 1) {
    item = tag;
    persistent = null;
    tag = null;
  } else if (arguments.length === 2) {
    item = persistent;
    if (typeof tag === 'boolean') {
      persistent = tag;
      tag = null;
    } else {
      persistent = null;
    }
  }
  validateArguments([tag, persistent, item, eventInfoCb], ['string?', 'boolean?', 'object', 'function']);
  internalItem = null;
  isInternalItem = false;
  if (!expectInternalItem) {
    if (validateArguments.matches([item], ['externalItem'])) {
      internalItem = getInternalItem(item, state.fnArrays.undecorators);
      isInternalItem = true;
    }
  } else if (validateArguments.matches([item], ['internalItem'])) {
    isInternalItem = true;
  }
  if (isInternalItem) {
    if (tag == null) {
      tag = internalItem.meta.tag;
    }
    if (persistent == null) {
      persistent = internalItem.meta.persistent;
    }
    item = internalItem.item;
  }
  runItemValidators(item, tag, state.fnArrays.validators);
  returnedItem = addItemToStore({
    item: item,
    meta: {
      tag: tag,
      persistent: persistent
    },
    isExisting: false
  }, eventInfoCb, state.store);
  state.structure = updateStructure.add(state.structure, returnedItem, state.store);
  return returnedItem;
};


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function(store) {
  var id, lastId;
  lastId = store.memory.read('lastAssignedId');
  if (lastId == null) {
    lastId = store.db.read('lastAssignedId');
  }
  if (lastId != null) {
    id = lastId + 1;
  } else {
    id = 0;
  }
  store.memory.write('lastAssignedId', id);
  store.db.write('lastAssignedId', id);
  return id;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var addItemToStore, getInternalItem, removeItemFromStore, updateStructure, validateArguments;

getInternalItem = __webpack_require__(7);

validateArguments = __webpack_require__(0);

addItemToStore = __webpack_require__(27);

removeItemFromStore = __webpack_require__(28);

updateStructure = __webpack_require__(4);

module.exports = function(state, eventInfoCb, item, expectInternalItem) {
  var itemType, parsedItem, returnedItem;
  if (expectInternalItem == null) {
    expectInternalItem = false;
  }
  itemType = expectInternalItem ? 'internalItem' : 'externalItem';
  validateArguments([item, eventInfoCb], [itemType, 'function']);
  if (expectInternalItem) {
    parsedItem = item;
  } else {
    parsedItem = getInternalItem(item, state.fnArrays.undecorators, state.fnArrays.validators);
  }
  parsedItem.isExisting = true;
  removeItemFromStore(parsedItem.meta.id, eventInfoCb, state.store, state.structure);
  returnedItem = addItemToStore(parsedItem, eventInfoCb, state.store);
  state.structure = updateStructure.change(state.structure, returnedItem, state.store);
  return returnedItem;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var findItem, removeItem, validate;

findItem = __webpack_require__(12);

removeItem = __webpack_require__(29);

validate = __webpack_require__(0);

module.exports = function(state, eventInfoCb, query) {
  var unfilteredResult;
  validate([eventInfoCb], ['function']);
  unfilteredResult = findItem(state, eventInfoCb, query).map((function(_this) {
    return function(item) {
      return removeItem(state, eventInfoCb, item, true);
    };
  })(this));
  return unfilteredResult.filter(function(item) {
    return item != null;
  });
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var getItemFromStore, validateArguments;

validateArguments = __webpack_require__(0);

getItemFromStore = __webpack_require__(24);

module.exports = function(state, eventInfoCb, id) {
  validateArguments([id, eventInfoCb], ['id', 'function']);
  return getItemFromStore(id, eventInfoCb, state.store, state.structure);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var findItems, validateArguments;

findItems = __webpack_require__(12);

validateArguments = __webpack_require__(0);

module.exports = function(state, eventInfoCb, query) {
  var foundItem;
  validateArguments([query, eventInfoCb], ['query', 'function']);
  foundItem = findItems(state, eventInfoCb, query, true)[0];
  if (foundItem == null) {
    foundItem = null;
  }
  return foundItem;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var countItemsInStore, validateArguments;

validateArguments = __webpack_require__(0);

countItemsInStore = __webpack_require__(81);

module.exports = function(state, eventInfoCb, query) {
  validateArguments([query, eventInfoCb], ['query', 'function']);
  return countItemsInStore(query, eventInfoCb, state.store, state.structure);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var findItems, validateArguments;

findItems = __webpack_require__(11);

validateArguments = __webpack_require__(0);

module.exports = function(query, eventInfoCb, store, structure) {
  var itemIds;
  validateArguments([query, eventInfoCb], ['query', 'function']);
  if (typeof query === 'string') {
    itemIds = structure.byTag[query];
    if (itemIds != null) {
      return itemIds.length;
    }
  }
  return findItems(query, eventInfoCb, store, structure).length;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var validateArguments;

validateArguments = __webpack_require__(0);

module.exports = function(state, eventInfoCb, cb) {
  validateArguments([eventInfoCb, cb], ['function', 'function']);
  state.store.db.forEachItem(cb);
  state.store.memory.forEachItem(cb);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var validateArguments;

validateArguments = __webpack_require__(0);

module.exports = function(state, eventInfoCb) {
  validateArguments([eventInfoCb], ['function']);
  return state.store.db.isEmpty() && state.store.memory.isEmpty();
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var getClearStructure, validate;

getClearStructure = __webpack_require__(23);

validate = __webpack_require__(0);

module.exports = function(state, eventInfoCb) {
  validate([eventInfoCb], ['function']);
  state.store.db.clear();
  state.store.memory.clear();
  state.structure = getClearStructure();
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var CONFIG, getStackTrace, removeFirstLine, sliceStackTrace;

CONFIG = __webpack_require__(2);

getStackTrace = __webpack_require__(86);

sliceStackTrace = __webpack_require__(30);

removeFirstLine = function(str) {
  var lines;
  lines = str.split('\n');
  lines.shift();
  return lines.join('\n');
};

module.exports = function(store) {
  return store.__on('*', function(operationType, message, infoObj, data) {
    var args, strData;
    if (infoObj != null) {
      strData = Object.entries(infoObj).map(function(arg) {
        var key, value;
        key = arg[0], value = arg[1];
        return key + ': ' + value;
      }).join(', ');
      if (strData.length > 0) {
        strData = '\n\t' + '(' + strData + ')';
      }
    } else {
      strData = '';
    }
    args = [operationType + ': ' + message + strData];
    if (CONFIG.storeLogging.showLogData && (data != null)) {
      args.push('\n', data);
    }
    if (CONFIG.storeLogging.showStackTraces) {
      args.push('\n' + removeFirstLine(sliceStackTrace(getStackTrace(), 3)));
    }
    return console.log.apply(console, args);
  });
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var getStackTrace, sliceStackTrace;

sliceStackTrace = __webpack_require__(30);

getStackTrace = module.exports = function() {
  var container, err;
  if (Error.captureStackTrace != null) {
    container = {};
    Error.captureStackTrace(container, getStackTrace);
    return container.stack;
  } else {
    try {
      throw new Error('');
    } catch (error) {
      err = error;
      return sliceStackTrace(err.stack, 1);
    }
  }
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var serverApi, updateCollection, updateQuestions, updateSections;

serverApi = __webpack_require__(88);

updateCollection = __webpack_require__(93);

updateSections = function() {
  return updateCollection(db.STORE_TAGS.SECTION, serverApi.getSection);
};

updateQuestions = function() {
  return updateCollection(db.STORE_TAGS.QUESTION, serverApi.getQuestion);
};

module.exports = function() {
  return Promise.all([updateSections(), updateQuestions()]).then(function() {});
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var BASE_API_URL, getHeaders, getOptions, getQuery, getResource, qs;

BASE_API_URL = '/api/';

__webpack_require__(89);

qs = __webpack_require__(90);

getOptions = function(since) {
  return {
    method: 'GET',
    cache: 'no-cache',
    cors: 'cors',
    headers: new Headers({})
  };
};

getQuery = function(id, since, queryBase) {
  var queryObj, queryStr;
  if (queryBase == null) {
    queryBase = null;
  }
  queryObj = Object.assign({}, queryBase);
  if (since != null) {
    queryObj.since = Math.floor(since / 1000);
  }
  if (id != null) {
    if (Array.isArray(id)) {
      queryObj.id = id.join(',');
    } else {
      queryObj.id = id;
    }
  }
  queryStr = qs.stringify(queryObj);
  if (queryStr !== '') {
    queryStr = '?' + queryStr;
  }
  return queryStr;
};

getHeaders = function(headerObj) {
  var header, headers, iterator;
  iterator = headerObj.entries();
  headers = {};
  while (true) {
    header = iterator.next();
    if (header.done) {
      return headers;
    }
    headers[header.value[0]] = header.value[1];
  }
};

getResource = function(id, resourceName, sinceInMs) {
  var queryStr, url;
  if (id == null) {
    id = null;
  }
  if (resourceName == null) {
    resourceName = '';
  }
  queryStr = getQuery(id, sinceInMs);
  url = BASE_API_URL + resourceName + queryStr;
  return fetch(url, getOptions(sinceInMs)).then(function(response) {
    if (response.status === 304) {
      return null;
    }
    if (!response.ok) {
      throw new Error('Invalid status code returned from API: ' + response.status);
    }
    return response.json();
  });
};

module.exports = {
  getSection: function(id, since) {
    if (id == null) {
      id = null;
    }
    if (since == null) {
      since = null;
    }
    return getResource(id, 'getSection', since);
  },
  getQuestion: function(id, since) {
    if (id == null) {
      id = null;
    }
    if (since == null) {
      since = null;
    }
    return getResource(id, 'getQuestion', since, {
      withRemoteImg: false
    });
  }
};


/***/ }),
/* 89 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(91);
exports.encode = exports.stringify = __webpack_require__(92);


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 93 */
/***/ (function(module, exports) {

var getLastCheckTime, saveItems, writeLastCheckTime;

getLastCheckTime = function(collectionName) {
  var result;
  if (!store.persistentStorageAvailable()) {
    return null;
  }
  result = store.findOne({
    $tag: db.STORE_TAGS.LAST_CHECK_TIME,
    collection: collectionName
  });
  if (result != null) {
    result = result.time;
  }
  return result;
};

writeLastCheckTime = function(collectionName, checkTime, persistent) {
  if (!store.persistentStorageAvailable()) {
    return;
  }
  store.removeByQuery({
    $tag: db.STORE_TAGS.LAST_CHECK_TIME,
    collection: collectionName
  });
  store._add(db.STORE_TAGS.LAST_CHECK_TIME, persistent, {
    collection: collectionName,
    time: checkTime
  });
  return checkTime;
};

saveItems = function(tag, items, persistent) {
  var err, i, item, len;
  if (persistent == null) {
    persistent = true;
  }
  for (i = 0, len = items.length; i < len; i++) {
    item = items[i];
    try {
      store._add(tag, persistent, item);
    } catch (error) {
      err = error;
      if (!(err instanceof store.StorageFullError)) {
        throw err;
      }
      store.removeByQuery(tag);
      saveItems(tag, items, false);
      return false;
    }
  }
  return true;
};

module.exports = function(collectionTag, apiMethod) {
  var checkStartTime, since;
  since = getLastCheckTime(collectionTag);
  checkStartTime = Date.now();
  return apiMethod(null, since)["catch"](function(err) {
    if (since != null) {
      console.warn("Could not update `" + collectionTag + "s` - server connection failed");
      console.error(err);
    } else {
      console.error("Could not download `" + collectionTag + "s` - no local version saved and server connection failed");
      throw err;
    }
  }).then(function(items) {
    var persistent;
    if (items == null) {
      console.debug("`" + collectionTag + "s` update skipped - no changes");
      return;
    }
    store.removeByQuery(collectionTag);
    persistent = saveItems(collectionTag, items);
    writeLastCheckTime(collectionTag, checkStartTime, persistent);
    console.debug("`" + collectionTag + "s` updated from server");
  });
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var TAGS, validateObjStructure;

TAGS = __webpack_require__(13);

validateObjStructure = __webpack_require__(95);

module.exports = {
  cache: [
    {
      $tag: TAGS.QUESTION,
      id: null
    }, {
      $tag: TAGS.SECTION,
      id: null
    }, {
      $tag: TAGS.ANSWER,
      questionId: null,
      attemptNumber: 0
    }
  ],
  validators: [
    {
      tag: TAGS.ANSWER,
      validate: function(answer) {
        return validateObjStructure(answer, {
          mode: 'string',
          time: 'number',
          correctlyAnswered: 'boolean|null',
          selectedAnswerIndex: 'number|null',
          questionId: 'number',
          sections: 'array|null|undefined',
          questionTypes: 'array|null|undefined',
          testId: 'number|null|undefined',
          questionIndex: 'number',
          attemptNumber: 'number'
        });
      }
    }, {
      tag: TAGS.PRACTICE_TEST,
      validate: function(test) {
        return validateObjStructure(test, {
          startTime: 'number',
          endTime: 'number',
          passed: 'boolean',
          passScore: 'number',
          score: 'number',
          maxScore: 'number'
        });
      }
    }, {
      tag: TAGS.CURRENT_TEST,
      validate: function(test) {
        return validateObjStructure(test, {
          startTime: 'number',
          finished: 'boolean',
          lastViewedIndex: 'number|null',
          questionIds: 'array',
          answers: 'array',
          results: 'object|null'
        });
      }
    }, {
      tag: TAGS.CURRENT_BROWSING_SESSION,
      validate: function(session) {
        return validateObjStructure(session, {
          startTime: 'number',
          lastViewedIndex: 'number|null',
          sections: 'array',
          questionTypes: 'array',
          questionIds: 'array',
          finished: 'boolean',
          answers: 'array'
        });
      }
    }
  ],
  decorators: [
    {
      tag: TAGS.SECTION,
      decorate: function(sectionItem) {
        sectionItem.filterFn = function(questionId) {
          if (typeof questionId === 'object') {
            questionId = questionId.id;
          }
          return sectionItem.questions.indexOf(questionId) > -1;
        };
        return sectionItem;
      },
      undecorate: function(sectionItem) {
        delete sectionItem.filterFn;
        return sectionItem;
      }
    }
  ]
};


/***/ }),
/* 95 */
/***/ (function(module, exports) {

var renderOrArray, typeOf;

typeOf = function(variable) {
  if (variable === null) {
    return 'null';
  }
  if (Array.isArray(variable)) {
    return 'array';
  }
  return typeof variable;
};

renderOrArray = function(arr) {
  var lastItem;
  if (arr.length === 1) {
    return arr[0];
  }
  lastItem = arr.slice(-1);
  return arr.slice(0, -1).join(', ') + ' or ' + lastItem;
};

module.exports = function(obj, template) {
  var expectedTypeStr, expectedTypes, i, len, matches, name, realType, type;
  for (name in template) {
    expectedTypeStr = template[name];
    realType = typeOf(obj[name]);
    expectedTypes = expectedTypeStr.split('|').map(function(s) {
      return s.trim();
    }).filter(function(s) {
      return s !== '';
    });
    matches = false;
    for (i = 0, len = expectedTypes.length; i < len; i++) {
      type = expectedTypes[i];
      if (realType === type) {
        matches = true;
        break;
      }
    }
    if (!matches) {
      throw new Error('Invalid property type: ' + name + ' should be (' + renderOrArray(expectedTypes) + '), not (' + realType + ')');
    }
  }
  return true;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var SCREENS, createElem, getHash, parseHash, updateNavList;

parseHash = __webpack_require__(16).parse;

createElem = __webpack_require__(3);

SCREENS = {
  questionSelect: {
    name: 'Procházení',
    subpages: ['', 'questionSelect', 'browsing', 'evaluateSession', 'browseEvaluatedSession']
  },
  prepareTest: {
    name: 'Cvičný test',
    subpages: ['prepareTest', 'practiceTest', 'evaluateTest', 'browseEvaluatedTest']
  }
};

getHash = function() {
  return window.location.hash.slice(1);
};

updateNavList = function(elem) {
  var highlightedPage, key, page, pageObj;
  page = parseHash(getHash()).page;
  elem.innerHTML = '';
  for (key in SCREENS) {
    pageObj = SCREENS[key];
    if (pageObj.subpages.indexOf(page) > -1) {
      highlightedPage = key;
      elem.appendChild(createElem('li .selectedPage', [pageObj.name]));
    } else {
      elem.appendChild(createElem('li', [createElem("a href='#" + key + "'", [pageObj.name])]));
    }
  }
  if (highlightedPage == null) {
    console.warn("Unknown page name (in sidemenuManager): `" + page + "`");
  }
};

module.exports = function(navlistElem) {
  window.addEventListener('hashchange', function() {
    return updateNavList(navlistElem);
  });
  updateNavList(navlistElem);
};


/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = function(coverElem) {
  var out, timeoutId;
  timeoutId = null;
  return out = {
    show: function(timeout) {
      if (timeout) {
        if (timeoutId != null) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout((function() {
          return out.show();
        }), timeout);
      } else {
        timeoutId = null;
        coverElem.style.display = '';
      }
    },
    hide: function() {
      if (timeoutId != null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      return coverElem.style.display = 'none';
    }
  };
};


/***/ }),
/* 98 */
/***/ (function(module, exports) {

var CLASSES;

CLASSES = {
  MENU_HIDDEN: 'mobileMenuHidden',
  MENU_VISIBLE: 'mobileMenuOpen'
};

module.exports = function(buttonElem, sidebarElem, coverElem) {
  var hideMenu, isHidden, toggleMenu;
  isHidden = true;
  document.body.classList.add(CLASSES.MENU_HIDDEN);
  toggleMenu = function() {
    if (isHidden) {
      document.body.classList.remove(CLASSES.MENU_HIDDEN);
      document.body.classList.add(CLASSES.MENU_VISIBLE);
      isHidden = false;
    } else {
      document.body.classList.remove(CLASSES.MENU_VISIBLE);
      document.body.classList.add(CLASSES.MENU_HIDDEN);
      isHidden = true;
    }
  };
  hideMenu = function() {
    if (!isHidden) {
      toggleMenu();
    }
  };
  buttonElem.addEventListener('click', toggleMenu);
  coverElem.addEventListener('click', hideMenu);
  window.addEventListener('hashchange', hideMenu);
};


/***/ }),
/* 99 */
/***/ (function(module, exports) {

var EXPONENT, THRESHOLD, getAnswers, getCorrectRatio;

THRESHOLD = 0.7;

EXPONENT = 1.1;

getCorrectRatio = function(answers) {
  var answer, correct, i, j, len, total, value;
  correct = 0;
  total = 0;
  for (i = j = 0, len = answers.length; j < len; i = ++j) {
    answer = answers[i];
    value = Math.pow(i + 1, EXPONENT);
    total += value;
    if (answer.correctlyAnswered) {
      correct += value;
    }
  }
  return correct / total;
};

getAnswers = function(questionId) {
  return store.find({
    $tag: db.STORE_TAGS.ANSWER,
    questionId: questionId,
    attemptNumber: 0
  });
};

module.exports = [
  {
    id: 0,
    name: 'Neznámé otázky',
    filterFn: function(questionId) {
      var answers;
      if (typeof questionId === 'object') {
        questionId = questionId.id;
      }
      answers = getAnswers(questionId);
      return answers.length === 0;
    }
  }, {
    id: 1,
    name: 'Nesprávně zodpovězené otázky',
    filterFn: function(questionId) {
      var answers, ratio;
      if (typeof questionId === 'object') {
        questionId = questionId.id;
      }
      answers = getAnswers(questionId);
      if (answers.length === 0) {
        return false;
      }
      ratio = getCorrectRatio(answers);
      return ratio < THRESHOLD;
    }
  }, {
    id: 2,
    name: 'Správně zodpovězené otázky',
    filterFn: function(questionId) {
      var answers, ratio;
      if (typeof questionId === 'object') {
        questionId = questionId.id;
      }
      answers = getAnswers(questionId);
      if (answers.length === 0) {
        return false;
      }
      ratio = getCorrectRatio(answers);
      return ratio >= THRESHOLD;
    }
  }
];


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map