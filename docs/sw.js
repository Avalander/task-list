var serviceWorkerOption = {
  "assets": [
    "/674f50d287a8c48dc19ba404d20fe713.eot",
    "/af7ae505a9eed503f8b8e6982036873e.woff2",
    "/fee66e712a8a08eef5805a46892932ad.woff",
    "/b06871f281fee6b241d60582ae9369b9.ttf",
    "/912ec66d7572ff821749319396470bde.svg",
    "/21e34be24e1dcf90700db552fd3d17bf.ttf",
    "/9c46095118380d38f12e67c916b427f9.ttf",
    "/main.bundle.js",
    "/sw.bundle.js",
    "/style.css",
    "/index.html"
  ]
};
        
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var static_cache_name = 'task-list-static-v1';

self.addEventListener('install', function (event) {
	return event.waitUntil(caches.open(static_cache_name).then(function (cache) {
		return cache.addAll(serviceWorkerOption.assets);
	}));
});

self.addEventListener('activate', function (event) {
	return event.waitUntil(caches.keys().then(function (cache_names) {
		return Promise.all(cache_names.filter(function (x) {
			return x.startsWith('task-list-') && x !== static_cache_name;
		}).map(function (x) {
			return caches.delete(x);
		}));
	}));
});

self.addEventListener('fetch', function (event) {
	var request_url = new URL(event.request.url);

	if (request_url.origin === location.origin) {
		if (request_url.pathname === '/') {
			event.respondWith(caches.match('/index.html'));
			return;
		}
	}

	event.respondWith(caches.match(event.request).then(function (response) {
		return response || fetch(event.request);
	}));
});

self.addEventListener('message', function (event) {
	if (event.data.action === 'skip-waiting') self.skipWaiting();
});

/***/ })
/******/ ]);