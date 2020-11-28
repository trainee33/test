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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/files/dynamic_adapt.js":
/*!***************************************!*\
  !*** ./src/js/files/dynamic_adapt.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Dynamic Adapt v.1\n// HTML data-da=\"where(uniq class name),position(digi),when(breakpoint)\"\n// e.x. data-da=\"item,2,992\"\n// Andrikanych Yevhen 2020\n// https://www.youtube.com/c/freelancerlifestyle\n\n\n(function () {\n  var originalPositions = [];\n  var daElements = document.querySelectorAll('[data-da]');\n  var daElementsArray = [];\n  var daMatchMedia = []; //Заполняем массивы\n\n  if (daElements.length > 0) {\n    var number = 0;\n\n    for (var index = 0; index < daElements.length; index++) {\n      var daElement = daElements[index];\n      var daMove = daElement.getAttribute('data-da');\n\n      if (daMove != '') {\n        var daArray = daMove.split(',');\n        var daPlace = daArray[1] ? daArray[1].trim() : 'last';\n        var daBreakpoint = daArray[2] ? daArray[2].trim() : '767';\n        var daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';\n        var daDestination = document.querySelector('.' + daArray[0].trim());\n\n        if (daArray.length > 0 && daDestination) {\n          daElement.setAttribute('data-da-index', number); //Заполняем массив первоначальных позиций\n\n          originalPositions[number] = {\n            \"parent\": daElement.parentNode,\n            \"index\": indexInParent(daElement)\n          }; //Заполняем массив элементов \n\n          daElementsArray[number] = {\n            \"element\": daElement,\n            \"destination\": document.querySelector('.' + daArray[0].trim()),\n            \"place\": daPlace,\n            \"breakpoint\": daBreakpoint,\n            \"type\": daType\n          };\n          number++;\n        }\n      }\n    }\n\n    dynamicAdaptSort(daElementsArray); //Создаем события в точке брейкпоинта\n\n    for (var _index = 0; _index < daElementsArray.length; _index++) {\n      var el = daElementsArray[_index];\n      var _daBreakpoint = el.breakpoint;\n      var _daType = el.type;\n      daMatchMedia.push(window.matchMedia(\"(\" + _daType + \"-width: \" + _daBreakpoint + \"px)\"));\n\n      daMatchMedia[_index].addListener(dynamicAdapt);\n    }\n  } //Основная функция\n\n\n  function dynamicAdapt(e) {\n    for (var _index2 = 0; _index2 < daElementsArray.length; _index2++) {\n      var _el = daElementsArray[_index2];\n      var _daElement = _el.element;\n      var _daDestination = _el.destination;\n      var _daPlace = _el.place;\n      var _daBreakpoint2 = _el.breakpoint;\n      var daClassname = \"_dynamic_adapt_\" + _daBreakpoint2;\n\n      if (daMatchMedia[_index2].matches) {\n        //Перебрасываем элементы\n        if (!_daElement.classList.contains(daClassname)) {\n          var actualIndex = indexOfElements(_daDestination)[_daPlace];\n\n          if (_daPlace === 'first') {\n            actualIndex = indexOfElements(_daDestination)[0];\n          } else if (_daPlace === 'last') {\n            actualIndex = indexOfElements(_daDestination)[indexOfElements(_daDestination).length];\n          }\n\n          _daDestination.insertBefore(_daElement, _daDestination.children[actualIndex]);\n\n          _daElement.classList.add(daClassname);\n        }\n      } else {\n        //Возвращаем на место\n        if (_daElement.classList.contains(daClassname)) {\n          dynamicAdaptBack(_daElement);\n\n          _daElement.classList.remove(daClassname);\n        }\n      }\n    } //customAdapt();\n\n  } //Вызов основной функции\n\n\n  dynamicAdapt(); //Функция возврата на место\n\n  function dynamicAdaptBack(el) {\n    var daIndex = el.getAttribute('data-da-index');\n    var originalPlace = originalPositions[daIndex];\n    var parentPlace = originalPlace['parent'];\n    var indexPlace = originalPlace['index'];\n    var actualIndex = indexOfElements(parentPlace, true)[indexPlace];\n    parentPlace.insertBefore(el, parentPlace.children[actualIndex]);\n  } //Функция получения индекса внутри родителя\n\n\n  function indexInParent(el) {\n    var children = Array.prototype.slice.call(el.parentNode.children);\n    return children.indexOf(el);\n  } //Функция получения массива индексов элементов внутри родителя \n\n\n  function indexOfElements(parent, back) {\n    var children = parent.children;\n    var childrenArray = [];\n\n    for (var i = 0; i < children.length; i++) {\n      var childrenElement = children[i];\n\n      if (back) {\n        childrenArray.push(i);\n      } else {\n        //Исключая перенесенный элемент\n        if (childrenElement.getAttribute('data-da') == null) {\n          childrenArray.push(i);\n        }\n      }\n    }\n\n    return childrenArray;\n  } //Сортировка объекта\n\n\n  function dynamicAdaptSort(arr) {\n    arr.sort(function (a, b) {\n      if (a.breakpoint > b.breakpoint) {\n        return -1;\n      } else {\n        return 1;\n      }\n    });\n    arr.sort(function (a, b) {\n      if (a.place > b.place) {\n        return 1;\n      } else {\n        return -1;\n      }\n    });\n  } //Дополнительные сценарии адаптации\n\n\n  function customAdapt() {//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);\n  }\n})();\n\n//# sourceURL=webpack:///./src/js/files/dynamic_adapt.js?");

/***/ }),

/***/ "./src/js/files/webp.js":
/*!******************************!*\
  !*** ./src/js/files/webp.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function testWebP(callback) {\n  var webP = new Image();\n\n  webP.onload = webP.onerror = function () {\n    callback(webP.height == 2);\n  };\n\n  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';\n}\n\ntestWebP(function (support) {\n  if (support == true) {\n    document.querySelector('body').classList.add('webp');\n  } else {\n    document.querySelector('body').classList.add('no-webp');\n  }\n});\n\n//# sourceURL=webpack:///./src/js/files/webp.js?");

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _files_webp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./files/webp */ \"./src/js/files/webp.js\");\n/* harmony import */ var _files_webp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_files_webp__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _files_dynamic_adapt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./files/dynamic_adapt */ \"./src/js/files/dynamic_adapt.js\");\n/* harmony import */ var _files_dynamic_adapt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_files_dynamic_adapt__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n//# sourceURL=webpack:///./src/js/script.js?");

/***/ })

/******/ });