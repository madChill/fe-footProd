/* build1712v1
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\nvar cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ \"./node_modules/axios/lib/core/buildFullPath.js\");\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar Cancel = __webpack_require__(/*! ../cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n    var responseType = config.responseType;\n    var onCanceled;\n    function done() {\n      if (config.cancelToken) {\n        config.cancelToken.unsubscribe(onCanceled);\n      }\n\n      if (config.signal) {\n        config.signal.removeEventListener('abort', onCanceled);\n      }\n    }\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n\n    // HTTP basic authentication\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    var fullPath = buildFullPath(config.baseURL, config.url);\n    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);\n\n    // Set the request timeout in MS\n    request.timeout = config.timeout;\n\n    function onloadend() {\n      if (!request) {\n        return;\n      }\n      // Prepare the response\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?\n        request.responseText : request.response;\n      var response = {\n        data: responseData,\n        status: request.status,\n        statusText: request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n\n      settle(function _resolve(value) {\n        resolve(value);\n        done();\n      }, function _reject(err) {\n        reject(err);\n        done();\n      }, response);\n\n      // Clean up request\n      request = null;\n    }\n\n    if ('onloadend' in request) {\n      // Use onloadend if available\n      request.onloadend = onloadend;\n    } else {\n      // Listen for ready state to emulate onloadend\n      request.onreadystatechange = function handleLoad() {\n        if (!request || request.readyState !== 4) {\n          return;\n        }\n\n        // The request errored out and we didn't get a response, this will be\n        // handled by onerror instead\n        // With one exception: request that using file: protocol, most browsers\n        // will return status as 0 even though it's a successful request\n        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n          return;\n        }\n        // readystate handler is calling before onerror or ontimeout handlers,\n        // so we should call onloadend on the next 'tick'\n        setTimeout(onloadend);\n      };\n    }\n\n    // Handle browser request cancellation (as opposed to a manual cancellation)\n    request.onabort = function handleAbort() {\n      if (!request) {\n        return;\n      }\n\n      reject(createError('Request aborted', config, 'ECONNABORTED', request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle low level network errors\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle timeout\n    request.ontimeout = function handleTimeout() {\n      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';\n      var transitional = config.transitional || defaults.transitional;\n      if (config.timeoutErrorMessage) {\n        timeoutErrorMessage = config.timeoutErrorMessage;\n      }\n      reject(createError(\n        timeoutErrorMessage,\n        config,\n        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',\n        request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n    if (utils.isStandardBrowserEnv()) {\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?\n        cookies.read(config.xsrfCookieName) :\n        undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    }\n\n    // Add headers to the request\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    }\n\n    // Add withCredentials to request if needed\n    if (!utils.isUndefined(config.withCredentials)) {\n      request.withCredentials = !!config.withCredentials;\n    }\n\n    // Add responseType to request if needed\n    if (responseType && responseType !== 'json') {\n      request.responseType = config.responseType;\n    }\n\n    // Handle progress if needed\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    }\n\n    // Not all browsers support upload events\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken || config.signal) {\n      // Handle cancellation\n      // eslint-disable-next-line func-names\n      onCanceled = function(cancel) {\n        if (!request) {\n          return;\n        }\n        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);\n        request.abort();\n        request = null;\n      };\n\n      config.cancelToken && config.cancelToken.subscribe(onCanceled);\n      if (config.signal) {\n        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);\n      }\n    }\n\n    if (!requestData) {\n      requestData = null;\n    }\n\n    // Send the request\n    request.send(requestData);\n  });\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\nvar mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context);\n\n  // Copy axios.prototype to instance\n  utils.extend(instance, Axios.prototype, context);\n\n  // Copy context to instance\n  utils.extend(instance, context);\n\n  // Factory for creating new instances\n  instance.create = function create(instanceConfig) {\n    return createInstance(mergeConfig(defaultConfig, instanceConfig));\n  };\n\n  return instance;\n}\n\n// Create the default instance to be exported\nvar axios = createInstance(defaults);\n\n// Expose Axios class to allow class inheritance\naxios.Axios = Axios;\n\n// Expose Cancel & CancelToken\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\naxios.VERSION = __webpack_require__(/*! ./env/data */ \"./node_modules/axios/lib/env/data.js\").version;\n\n// Expose all/spread\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\n\n// Expose isAxiosError\naxios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ \"./node_modules/axios/lib/helpers/isAxiosError.js\");\n\nmodule.exports = axios;\n\n// Allow use of default import syntax in TypeScript\nmodule.exports[\"default\"] = axios;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\n\nmodule.exports = Cancel;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n\n  var token = this;\n\n  // eslint-disable-next-line func-names\n  this.promise.then(function(cancel) {\n    if (!token._listeners) return;\n\n    var i;\n    var l = token._listeners.length;\n\n    for (i = 0; i < l; i++) {\n      token._listeners[i](cancel);\n    }\n    token._listeners = null;\n  });\n\n  // eslint-disable-next-line func-names\n  this.promise.then = function(onfulfilled) {\n    var _resolve;\n    // eslint-disable-next-line func-names\n    var promise = new Promise(function(resolve) {\n      token.subscribe(resolve);\n      _resolve = resolve;\n    }).then(onfulfilled);\n\n    promise.cancel = function reject() {\n      token.unsubscribe(_resolve);\n    };\n\n    return promise;\n  };\n\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n\n/**\n * Subscribe to the cancel signal\n */\n\nCancelToken.prototype.subscribe = function subscribe(listener) {\n  if (this.reason) {\n    listener(this.reason);\n    return;\n  }\n\n  if (this._listeners) {\n    this._listeners.push(listener);\n  } else {\n    this._listeners = [listener];\n  }\n};\n\n/**\n * Unsubscribe from the cancel signal\n */\n\nCancelToken.prototype.unsubscribe = function unsubscribe(listener) {\n  if (!this._listeners) {\n    return;\n  }\n  var index = this._listeners.indexOf(listener);\n  if (index !== -1) {\n    this._listeners.splice(index, 1);\n  }\n};\n\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar buildURL = __webpack_require__(/*! ../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\nvar mergeConfig = __webpack_require__(/*! ./mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\nvar validator = __webpack_require__(/*! ../helpers/validator */ \"./node_modules/axios/lib/helpers/validator.js\");\n\nvar validators = validator.validators;\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = arguments[1] || {};\n    config.url = arguments[0];\n  } else {\n    config = config || {};\n  }\n\n  config = mergeConfig(this.defaults, config);\n\n  // Set config.method\n  if (config.method) {\n    config.method = config.method.toLowerCase();\n  } else if (this.defaults.method) {\n    config.method = this.defaults.method.toLowerCase();\n  } else {\n    config.method = 'get';\n  }\n\n  var transitional = config.transitional;\n\n  if (transitional !== undefined) {\n    validator.assertOptions(transitional, {\n      silentJSONParsing: validators.transitional(validators.boolean),\n      forcedJSONParsing: validators.transitional(validators.boolean),\n      clarifyTimeoutError: validators.transitional(validators.boolean)\n    }, false);\n  }\n\n  // filter out skipped interceptors\n  var requestInterceptorChain = [];\n  var synchronousRequestInterceptors = true;\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {\n      return;\n    }\n\n    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;\n\n    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  var responseInterceptorChain = [];\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  var promise;\n\n  if (!synchronousRequestInterceptors) {\n    var chain = [dispatchRequest, undefined];\n\n    Array.prototype.unshift.apply(chain, requestInterceptorChain);\n    chain = chain.concat(responseInterceptorChain);\n\n    promise = Promise.resolve(config);\n    while (chain.length) {\n      promise = promise.then(chain.shift(), chain.shift());\n    }\n\n    return promise;\n  }\n\n\n  var newConfig = config;\n  while (requestInterceptorChain.length) {\n    var onFulfilled = requestInterceptorChain.shift();\n    var onRejected = requestInterceptorChain.shift();\n    try {\n      newConfig = onFulfilled(newConfig);\n    } catch (error) {\n      onRejected(error);\n      break;\n    }\n  }\n\n  try {\n    promise = dispatchRequest(newConfig);\n  } catch (error) {\n    return Promise.reject(error);\n  }\n\n  while (responseInterceptorChain.length) {\n    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());\n  }\n\n  return promise;\n};\n\nAxios.prototype.getUri = function getUri(config) {\n  config = mergeConfig(this.defaults, config);\n  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\\?/, '');\n};\n\n// Provide aliases for supported request methods\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, config) {\n    return this.request(mergeConfig(config || {}, {\n      method: method,\n      url: url,\n      data: (config || {}).data\n    }));\n  };\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, data, config) {\n    return this.request(mergeConfig(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\n\nmodule.exports = Axios;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\nInterceptorManager.prototype.use = function use(fulfilled, rejected, options) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected,\n    synchronous: options ? options.synchronous : false,\n    runWhen: options ? options.runWhen : null\n  });\n  return this.handlers.length - 1;\n};\n\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\nvar combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n\n/**\n * Creates a new URL by combining the baseURL with the requestedURL,\n * only when the requestedURL is not already an absolute URL.\n * If the requestURL is absolute, this function returns the requestedURL untouched.\n *\n * @param {string} baseURL The base URL\n * @param {string} requestedURL Absolute or relative URL to combine\n * @returns {string} The combined full path\n */\nmodule.exports = function buildFullPath(baseURL, requestedURL) {\n  if (baseURL && !isAbsoluteURL(requestedURL)) {\n    return combineURLs(baseURL, requestedURL);\n  }\n  return requestedURL;\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/core/buildFullPath.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar Cancel = __webpack_require__(/*! ../cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n\n  if (config.signal && config.signal.aborted) {\n    throw new Cancel('canceled');\n  }\n}\n\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  // Ensure headers exist\n  config.headers = config.headers || {};\n\n  // Transform request data\n  config.data = transformData.call(\n    config,\n    config.data,\n    config.headers,\n    config.transformRequest\n  );\n\n  // Flatten headers\n  config.headers = utils.merge(\n    config.headers.common || {},\n    config.headers[config.method] || {},\n    config.headers\n  );\n\n  utils.forEach(\n    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],\n    function cleanHeaderConfig(method) {\n      delete config.headers[method];\n    }\n  );\n\n  var adapter = config.adapter || defaults.adapter;\n\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config);\n\n    // Transform response data\n    response.data = transformData.call(\n      config,\n      response.data,\n      response.headers,\n      config.transformResponse\n    );\n\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config);\n\n      // Transform response data\n      if (reason && reason.response) {\n        reason.response.data = transformData.call(\n          config,\n          reason.response.data,\n          reason.response.headers,\n          config.transformResponse\n        );\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n  if (code) {\n    error.code = code;\n  }\n\n  error.request = request;\n  error.response = response;\n  error.isAxiosError = true;\n\n  error.toJSON = function toJSON() {\n    return {\n      // Standard\n      message: this.message,\n      name: this.name,\n      // Microsoft\n      description: this.description,\n      number: this.number,\n      // Mozilla\n      fileName: this.fileName,\n      lineNumber: this.lineNumber,\n      columnNumber: this.columnNumber,\n      stack: this.stack,\n      // Axios\n      config: this.config,\n      code: this.code,\n      status: this.response && this.response.status ? this.response.status : null\n    };\n  };\n  return error;\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Config-specific merge-function which creates a new config-object\n * by merging two configuration objects together.\n *\n * @param {Object} config1\n * @param {Object} config2\n * @returns {Object} New object resulting from merging config2 to config1\n */\nmodule.exports = function mergeConfig(config1, config2) {\n  // eslint-disable-next-line no-param-reassign\n  config2 = config2 || {};\n  var config = {};\n\n  function getMergedValue(target, source) {\n    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {\n      return utils.merge(target, source);\n    } else if (utils.isPlainObject(source)) {\n      return utils.merge({}, source);\n    } else if (utils.isArray(source)) {\n      return source.slice();\n    }\n    return source;\n  }\n\n  // eslint-disable-next-line consistent-return\n  function mergeDeepProperties(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      return getMergedValue(config1[prop], config2[prop]);\n    } else if (!utils.isUndefined(config1[prop])) {\n      return getMergedValue(undefined, config1[prop]);\n    }\n  }\n\n  // eslint-disable-next-line consistent-return\n  function valueFromConfig2(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      return getMergedValue(undefined, config2[prop]);\n    }\n  }\n\n  // eslint-disable-next-line consistent-return\n  function defaultToConfig2(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      return getMergedValue(undefined, config2[prop]);\n    } else if (!utils.isUndefined(config1[prop])) {\n      return getMergedValue(undefined, config1[prop]);\n    }\n  }\n\n  // eslint-disable-next-line consistent-return\n  function mergeDirectKeys(prop) {\n    if (prop in config2) {\n      return getMergedValue(config1[prop], config2[prop]);\n    } else if (prop in config1) {\n      return getMergedValue(undefined, config1[prop]);\n    }\n  }\n\n  var mergeMap = {\n    'url': valueFromConfig2,\n    'method': valueFromConfig2,\n    'data': valueFromConfig2,\n    'baseURL': defaultToConfig2,\n    'transformRequest': defaultToConfig2,\n    'transformResponse': defaultToConfig2,\n    'paramsSerializer': defaultToConfig2,\n    'timeout': defaultToConfig2,\n    'timeoutMessage': defaultToConfig2,\n    'withCredentials': defaultToConfig2,\n    'adapter': defaultToConfig2,\n    'responseType': defaultToConfig2,\n    'xsrfCookieName': defaultToConfig2,\n    'xsrfHeaderName': defaultToConfig2,\n    'onUploadProgress': defaultToConfig2,\n    'onDownloadProgress': defaultToConfig2,\n    'decompress': defaultToConfig2,\n    'maxContentLength': defaultToConfig2,\n    'maxBodyLength': defaultToConfig2,\n    'transport': defaultToConfig2,\n    'httpAgent': defaultToConfig2,\n    'httpsAgent': defaultToConfig2,\n    'cancelToken': defaultToConfig2,\n    'socketPath': defaultToConfig2,\n    'responseEncoding': defaultToConfig2,\n    'validateStatus': mergeDirectKeys\n  };\n\n  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {\n    var merge = mergeMap[prop] || mergeDeepProperties;\n    var configValue = merge(prop);\n    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);\n  });\n\n  return config;\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/core/mergeConfig.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n  if (!response.status || !validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError(\n      'Request failed with status code ' + response.status,\n      response.config,\n      null,\n      response.request,\n      response\n    ));\n  }\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar defaults = __webpack_require__(/*! ./../defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\nmodule.exports = function transformData(data, headers, fns) {\n  var context = this || defaults;\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn.call(context, data, headers);\n  });\n\n  return data;\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\nvar enhanceError = __webpack_require__(/*! ./core/enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n  return adapter;\n}\n\nfunction stringifySafely(rawValue, parser, encoder) {\n  if (utils.isString(rawValue)) {\n    try {\n      (parser || JSON.parse)(rawValue);\n      return utils.trim(rawValue);\n    } catch (e) {\n      if (e.name !== 'SyntaxError') {\n        throw e;\n      }\n    }\n  }\n\n  return (encoder || JSON.stringify)(rawValue);\n}\n\nvar defaults = {\n\n  transitional: {\n    silentJSONParsing: true,\n    forcedJSONParsing: true,\n    clarifyTimeoutError: false\n  },\n\n  adapter: getDefaultAdapter(),\n\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Accept');\n    normalizeHeaderName(headers, 'Content-Type');\n\n    if (utils.isFormData(data) ||\n      utils.isArrayBuffer(data) ||\n      utils.isBuffer(data) ||\n      utils.isStream(data) ||\n      utils.isFile(data) ||\n      utils.isBlob(data)\n    ) {\n      return data;\n    }\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {\n      setContentTypeIfUnset(headers, 'application/json');\n      return stringifySafely(data);\n    }\n    return data;\n  }],\n\n  transformResponse: [function transformResponse(data) {\n    var transitional = this.transitional || defaults.transitional;\n    var silentJSONParsing = transitional && transitional.silentJSONParsing;\n    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;\n    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';\n\n    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {\n      try {\n        return JSON.parse(data);\n      } catch (e) {\n        if (strictJSONParsing) {\n          if (e.name === 'SyntaxError') {\n            throw enhanceError(e, this, 'E_JSON_PARSE');\n          }\n          throw e;\n        }\n      }\n    }\n\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n\n  maxContentLength: -1,\n  maxBodyLength: -1,\n\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  },\n\n  headers: {\n    common: {\n      'Accept': 'application/json, text/plain, */*'\n    }\n  }\n};\n\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\n\nmodule.exports = defaults;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ ((module) => {

eval("module.exports = {\n  \"version\": \"0.24.0\"\n};\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/env/data.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n    return fn.apply(thisArg, args);\n  };\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).\n    replace(/%3A/gi, ':').\n    replace(/%24/g, '$').\n    replace(/%2C/gi, ',').\n    replace(/%20/g, '+').\n    replace(/%5B/gi, '[').\n    replace(/%5D/gi, ']');\n}\n\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    var hashmarkIndex = url.indexOf('#');\n    if (hashmarkIndex !== -1) {\n      url = url.slice(0, hashmarkIndex);\n    }\n\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL\n    ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '')\n    : baseURL;\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs support document.cookie\n    (function standardBrowserEnv() {\n      return {\n        write: function write(name, value, expires, path, domain, secure) {\n          var cookie = [];\n          cookie.push(name + '=' + encodeURIComponent(value));\n\n          if (utils.isNumber(expires)) {\n            cookie.push('expires=' + new Date(expires).toGMTString());\n          }\n\n          if (utils.isString(path)) {\n            cookie.push('path=' + path);\n          }\n\n          if (utils.isString(domain)) {\n            cookie.push('domain=' + domain);\n          }\n\n          if (secure === true) {\n            cookie.push('secure');\n          }\n\n          document.cookie = cookie.join('; ');\n        },\n\n        read: function read(name) {\n          var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n          return (match ? decodeURIComponent(match[3]) : null);\n        },\n\n        remove: function remove(name) {\n          this.write(name, '', Date.now() - 86400000);\n        }\n      };\n    })() :\n\n  // Non standard browser env (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return {\n        write: function write() {},\n        read: function read() { return null; },\n        remove: function remove() {}\n      };\n    })()\n);\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Determines whether the payload is an error thrown by Axios\n *\n * @param {*} payload The value to test\n * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false\n */\nmodule.exports = function isAxiosError(payload) {\n  return (typeof payload === 'object') && (payload.isAxiosError === true);\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/helpers/isAxiosError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs have full support of the APIs needed to test\n  // whether the request URL is of the same origin as current location.\n    (function standardBrowserEnv() {\n      var msie = /(msie|trident)/i.test(navigator.userAgent);\n      var urlParsingNode = document.createElement('a');\n      var originURL;\n\n      /**\n    * Parse a URL to discover it's components\n    *\n    * @param {String} url The URL to be parsed\n    * @returns {Object}\n    */\n      function resolveURL(url) {\n        var href = url;\n\n        if (msie) {\n        // IE needs attribute set twice to normalize properties\n          urlParsingNode.setAttribute('href', href);\n          href = urlParsingNode.href;\n        }\n\n        urlParsingNode.setAttribute('href', href);\n\n        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n        return {\n          href: urlParsingNode.href,\n          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n          host: urlParsingNode.host,\n          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n          hostname: urlParsingNode.hostname,\n          port: urlParsingNode.port,\n          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?\n            urlParsingNode.pathname :\n            '/' + urlParsingNode.pathname\n        };\n      }\n\n      originURL = resolveURL(window.location.href);\n\n      /**\n    * Determine if a URL shares the same origin as the current location\n    *\n    * @param {String} requestURL The URL to test\n    * @returns {boolean} True if URL shares the same origin, otherwise false\n    */\n      return function isURLSameOrigin(requestURL) {\n        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;\n        return (parsed.protocol === originURL.protocol &&\n            parsed.host === originURL.host);\n      };\n    })() :\n\n  // Non standard browser envs (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return function isURLSameOrigin() {\n        return true;\n      };\n    })()\n);\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n// Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\nvar ignoreDuplicateOf = [\n  'age', 'authorization', 'content-length', 'content-type', 'etag',\n  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',\n  'last-modified', 'location', 'max-forwards', 'proxy-authorization',\n  'referer', 'retry-after', 'user-agent'\n];\n\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) { return parsed; }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n\n  return parsed;\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar VERSION = __webpack_require__(/*! ../env/data */ \"./node_modules/axios/lib/env/data.js\").version;\n\nvar validators = {};\n\n// eslint-disable-next-line func-names\n['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {\n  validators[type] = function validator(thing) {\n    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;\n  };\n});\n\nvar deprecatedWarnings = {};\n\n/**\n * Transitional option validator\n * @param {function|boolean?} validator - set to false if the transitional option has been removed\n * @param {string?} version - deprecated version / removed since version\n * @param {string?} message - some message with additional info\n * @returns {function}\n */\nvalidators.transitional = function transitional(validator, version, message) {\n  function formatMessage(opt, desc) {\n    return '[Axios v' + VERSION + '] Transitional option \\'' + opt + '\\'' + desc + (message ? '. ' + message : '');\n  }\n\n  // eslint-disable-next-line func-names\n  return function(value, opt, opts) {\n    if (validator === false) {\n      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));\n    }\n\n    if (version && !deprecatedWarnings[opt]) {\n      deprecatedWarnings[opt] = true;\n      // eslint-disable-next-line no-console\n      console.warn(\n        formatMessage(\n          opt,\n          ' has been deprecated since v' + version + ' and will be removed in the near future'\n        )\n      );\n    }\n\n    return validator ? validator(value, opt, opts) : true;\n  };\n};\n\n/**\n * Assert object's properties type\n * @param {object} options\n * @param {object} schema\n * @param {boolean?} allowUnknown\n */\n\nfunction assertOptions(options, schema, allowUnknown) {\n  if (typeof options !== 'object') {\n    throw new TypeError('options must be an object');\n  }\n  var keys = Object.keys(options);\n  var i = keys.length;\n  while (i-- > 0) {\n    var opt = keys[i];\n    var validator = schema[opt];\n    if (validator) {\n      var value = options[opt];\n      var result = value === undefined || validator(value, opt, options);\n      if (result !== true) {\n        throw new TypeError('option ' + opt + ' must be ' + result);\n      }\n      continue;\n    }\n    if (allowUnknown !== true) {\n      throw Error('Unknown option ' + opt);\n    }\n  }\n}\n\nmodule.exports = {\n  assertOptions: assertOptions,\n  validators: validators\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/helpers/validator.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\n\n// utils is a library of generic helper functions non-specific to axios\n\nvar toString = Object.prototype.toString;\n\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\n/**\n * Determine if a value is a Buffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Buffer, otherwise false\n */\nfunction isBuffer(val) {\n  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)\n    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);\n}\n\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\nfunction isFormData(val) {\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\n}\n\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\nfunction isArrayBufferView(val) {\n  var result;\n  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);\n  }\n  return result;\n}\n\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\nfunction isString(val) {\n  return typeof val === 'string';\n}\n\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n\n/**\n * Determine if a value is a plain Object\n *\n * @param {Object} val The value to test\n * @return {boolean} True if value is a plain Object, otherwise false\n */\nfunction isPlainObject(val) {\n  if (toString.call(val) !== '[object Object]') {\n    return false;\n  }\n\n  var prototype = Object.getPrototypeOf(val);\n  return prototype === null || prototype === Object.prototype;\n}\n\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\nfunction trim(str) {\n  return str.trim ? str.trim() : str.replace(/^\\s+|\\s+$/g, '');\n}\n\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n * nativescript\n *  navigator.product -> 'NativeScript' or 'NS'\n */\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||\n                                           navigator.product === 'NativeScript' ||\n                                           navigator.product === 'NS')) {\n    return false;\n  }\n  return (\n    typeof window !== 'undefined' &&\n    typeof document !== 'undefined'\n  );\n}\n\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  }\n\n  // Force an array if not already something iterable\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction merge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (isPlainObject(result[key]) && isPlainObject(val)) {\n      result[key] = merge(result[key], val);\n    } else if (isPlainObject(val)) {\n      result[key] = merge({}, val);\n    } else if (isArray(val)) {\n      result[key] = val.slice();\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\n/**\n * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)\n *\n * @param {string} content with BOM\n * @return {string} content value without BOM\n */\nfunction stripBOM(content) {\n  if (content.charCodeAt(0) === 0xFEFF) {\n    content = content.slice(1);\n  }\n  return content;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isPlainObject: isPlainObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  extend: extend,\n  trim: trim,\n  stripBOM: stripBOM\n};\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./node_modules/lodash/_DataView.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_DataView.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar DataView = getNative(root, 'DataView');\n\nmodule.exports = DataView;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_DataView.js?");

/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var hashClear = __webpack_require__(/*! ./_hashClear */ \"./node_modules/lodash/_hashClear.js\"),\n    hashDelete = __webpack_require__(/*! ./_hashDelete */ \"./node_modules/lodash/_hashDelete.js\"),\n    hashGet = __webpack_require__(/*! ./_hashGet */ \"./node_modules/lodash/_hashGet.js\"),\n    hashHas = __webpack_require__(/*! ./_hashHas */ \"./node_modules/lodash/_hashHas.js\"),\n    hashSet = __webpack_require__(/*! ./_hashSet */ \"./node_modules/lodash/_hashSet.js\");\n\n/**\n * Creates a hash object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Hash(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `Hash`.\nHash.prototype.clear = hashClear;\nHash.prototype['delete'] = hashDelete;\nHash.prototype.get = hashGet;\nHash.prototype.has = hashHas;\nHash.prototype.set = hashSet;\n\nmodule.exports = Hash;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_Hash.js?");

/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ \"./node_modules/lodash/_listCacheClear.js\"),\n    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ \"./node_modules/lodash/_listCacheDelete.js\"),\n    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ \"./node_modules/lodash/_listCacheGet.js\"),\n    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ \"./node_modules/lodash/_listCacheHas.js\"),\n    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ \"./node_modules/lodash/_listCacheSet.js\");\n\n/**\n * Creates an list cache object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction ListCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `ListCache`.\nListCache.prototype.clear = listCacheClear;\nListCache.prototype['delete'] = listCacheDelete;\nListCache.prototype.get = listCacheGet;\nListCache.prototype.has = listCacheHas;\nListCache.prototype.set = listCacheSet;\n\nmodule.exports = ListCache;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_ListCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Map = getNative(root, 'Map');\n\nmodule.exports = Map;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_Map.js?");

/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ \"./node_modules/lodash/_mapCacheClear.js\"),\n    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ \"./node_modules/lodash/_mapCacheDelete.js\"),\n    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ \"./node_modules/lodash/_mapCacheGet.js\"),\n    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ \"./node_modules/lodash/_mapCacheHas.js\"),\n    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ \"./node_modules/lodash/_mapCacheSet.js\");\n\n/**\n * Creates a map cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction MapCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `MapCache`.\nMapCache.prototype.clear = mapCacheClear;\nMapCache.prototype['delete'] = mapCacheDelete;\nMapCache.prototype.get = mapCacheGet;\nMapCache.prototype.has = mapCacheHas;\nMapCache.prototype.set = mapCacheSet;\n\nmodule.exports = MapCache;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_MapCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Promise.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_Promise.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Promise = getNative(root, 'Promise');\n\nmodule.exports = Promise;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_Promise.js?");

/***/ }),

/***/ "./node_modules/lodash/_Set.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Set = getNative(root, 'Set');\n\nmodule.exports = Set;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_Set.js?");

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Symbol = root.Symbol;\n\nmodule.exports = Symbol;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_Symbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_WeakMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_WeakMap.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar WeakMap = getNative(root, 'WeakMap');\n\nmodule.exports = WeakMap;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_WeakMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/***/ ((module) => {

eval("/**\n * A specialized version of `_.map` for arrays without support for iteratee\n * shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the new mapped array.\n */\nfunction arrayMap(array, iteratee) {\n  var index = -1,\n      length = array == null ? 0 : array.length,\n      result = Array(length);\n\n  while (++index < length) {\n    result[index] = iteratee(array[index], index, array);\n  }\n  return result;\n}\n\nmodule.exports = arrayMap;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_arrayMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/**\n * Gets the index at which the `key` is found in `array` of key-value pairs.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} key The key to search for.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction assocIndexOf(array, key) {\n  var length = array.length;\n  while (length--) {\n    if (eq(array[length][0], key)) {\n      return length;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = assocIndexOf;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_assocIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseGet.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * The base implementation of `_.get` without support for default values.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Array|string} path The path of the property to get.\n * @returns {*} Returns the resolved value.\n */\nfunction baseGet(object, path) {\n  path = castPath(path, object);\n\n  var index = 0,\n      length = path.length;\n\n  while (object != null && index < length) {\n    object = object[toKey(path[index++])];\n  }\n  return (index && index == length) ? object : undefined;\n}\n\nmodule.exports = baseGet;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_baseGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    getRawTag = __webpack_require__(/*! ./_getRawTag */ \"./node_modules/lodash/_getRawTag.js\"),\n    objectToString = __webpack_require__(/*! ./_objectToString */ \"./node_modules/lodash/_objectToString.js\");\n\n/** `Object#toString` result references. */\nvar nullTag = '[object Null]',\n    undefinedTag = '[object Undefined]';\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * The base implementation of `getTag` without fallbacks for buggy environments.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction baseGetTag(value) {\n  if (value == null) {\n    return value === undefined ? undefinedTag : nullTag;\n  }\n  return (symToStringTag && symToStringTag in Object(value))\n    ? getRawTag(value)\n    : objectToString(value);\n}\n\nmodule.exports = baseGetTag;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_baseGetTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]';\n\n/**\n * The base implementation of `_.isArguments`.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n */\nfunction baseIsArguments(value) {\n  return isObjectLike(value) && baseGetTag(value) == argsTag;\n}\n\nmodule.exports = baseIsArguments;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_baseIsArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isMasked = __webpack_require__(/*! ./_isMasked */ \"./node_modules/lodash/_isMasked.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./node_modules/lodash/_toSource.js\");\n\n/**\n * Used to match `RegExp`\n * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).\n */\nvar reRegExpChar = /[\\\\^$.*+?()[\\]{}|]/g;\n\n/** Used to detect host constructors (Safari). */\nvar reIsHostCtor = /^\\[object .+?Constructor\\]$/;\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to detect if a method is native. */\nvar reIsNative = RegExp('^' +\n  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\\\$&')\n  .replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g, '$1.*?') + '$'\n);\n\n/**\n * The base implementation of `_.isNative` without bad shim checks.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a native function,\n *  else `false`.\n */\nfunction baseIsNative(value) {\n  if (!isObject(value) || isMasked(value)) {\n    return false;\n  }\n  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;\n  return pattern.test(toSource(value));\n}\n\nmodule.exports = baseIsNative;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_baseIsNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    funcTag = '[object Function]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    objectTag = '[object Object]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    weakMapTag = '[object WeakMap]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/** Used to identify `toStringTag` values of typed arrays. */\nvar typedArrayTags = {};\ntypedArrayTags[float32Tag] = typedArrayTags[float64Tag] =\ntypedArrayTags[int8Tag] = typedArrayTags[int16Tag] =\ntypedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =\ntypedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =\ntypedArrayTags[uint32Tag] = true;\ntypedArrayTags[argsTag] = typedArrayTags[arrayTag] =\ntypedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =\ntypedArrayTags[dataViewTag] = typedArrayTags[dateTag] =\ntypedArrayTags[errorTag] = typedArrayTags[funcTag] =\ntypedArrayTags[mapTag] = typedArrayTags[numberTag] =\ntypedArrayTags[objectTag] = typedArrayTags[regexpTag] =\ntypedArrayTags[setTag] = typedArrayTags[stringTag] =\ntypedArrayTags[weakMapTag] = false;\n\n/**\n * The base implementation of `_.isTypedArray` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.\n */\nfunction baseIsTypedArray(value) {\n  return isObjectLike(value) &&\n    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];\n}\n\nmodule.exports = baseIsTypedArray;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_baseIsTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\"),\n    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ \"./node_modules/lodash/_nativeKeys.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction baseKeys(object) {\n  if (!isPrototype(object)) {\n    return nativeKeys(object);\n  }\n  var result = [];\n  for (var key in Object(object)) {\n    if (hasOwnProperty.call(object, key) && key != 'constructor') {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseKeys;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_baseKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseToString.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolToString = symbolProto ? symbolProto.toString : undefined;\n\n/**\n * The base implementation of `_.toString` which doesn't convert nullish\n * values to empty strings.\n *\n * @private\n * @param {*} value The value to process.\n * @returns {string} Returns the string.\n */\nfunction baseToString(value) {\n  // Exit early for strings to avoid a performance hit in some environments.\n  if (typeof value == 'string') {\n    return value;\n  }\n  if (isArray(value)) {\n    // Recursively convert values (susceptible to call stack limits).\n    return arrayMap(value, baseToString) + '';\n  }\n  if (isSymbol(value)) {\n    return symbolToString ? symbolToString.call(value) : '';\n  }\n  var result = (value + '');\n  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;\n}\n\nmodule.exports = baseToString;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_baseToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/***/ ((module) => {

eval("/**\n * The base implementation of `_.unary` without support for storing metadata.\n *\n * @private\n * @param {Function} func The function to cap arguments for.\n * @returns {Function} Returns the new capped function.\n */\nfunction baseUnary(func) {\n  return function(value) {\n    return func(value);\n  };\n}\n\nmodule.exports = baseUnary;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_baseUnary.js?");

/***/ }),

/***/ "./node_modules/lodash/_castPath.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_castPath.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isKey = __webpack_require__(/*! ./_isKey */ \"./node_modules/lodash/_isKey.js\"),\n    stringToPath = __webpack_require__(/*! ./_stringToPath */ \"./node_modules/lodash/_stringToPath.js\"),\n    toString = __webpack_require__(/*! ./toString */ \"./node_modules/lodash/toString.js\");\n\n/**\n * Casts `value` to a path array if it's not one.\n *\n * @private\n * @param {*} value The value to inspect.\n * @param {Object} [object] The object to query keys on.\n * @returns {Array} Returns the cast property path array.\n */\nfunction castPath(value, object) {\n  if (isArray(value)) {\n    return value;\n  }\n  return isKey(value, object) ? [value] : stringToPath(toString(value));\n}\n\nmodule.exports = castPath;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_castPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Used to detect overreaching core-js shims. */\nvar coreJsData = root['__core-js_shared__'];\n\nmodule.exports = coreJsData;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_coreJsData.js?");

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;\n\nmodule.exports = freeGlobal;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_freeGlobal.js?");

/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var isKeyable = __webpack_require__(/*! ./_isKeyable */ \"./node_modules/lodash/_isKeyable.js\");\n\n/**\n * Gets the data for `map`.\n *\n * @private\n * @param {Object} map The map to query.\n * @param {string} key The reference key.\n * @returns {*} Returns the map data.\n */\nfunction getMapData(map, key) {\n  var data = map.__data__;\n  return isKeyable(key)\n    ? data[typeof key == 'string' ? 'string' : 'hash']\n    : data.map;\n}\n\nmodule.exports = getMapData;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_getMapData.js?");

/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ \"./node_modules/lodash/_baseIsNative.js\"),\n    getValue = __webpack_require__(/*! ./_getValue */ \"./node_modules/lodash/_getValue.js\");\n\n/**\n * Gets the native function at `key` of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {string} key The key of the method to get.\n * @returns {*} Returns the function if it's native, else `undefined`.\n */\nfunction getNative(object, key) {\n  var value = getValue(object, key);\n  return baseIsNative(value) ? value : undefined;\n}\n\nmodule.exports = getNative;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_getNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the raw `toStringTag`.\n */\nfunction getRawTag(value) {\n  var isOwn = hasOwnProperty.call(value, symToStringTag),\n      tag = value[symToStringTag];\n\n  try {\n    value[symToStringTag] = undefined;\n    var unmasked = true;\n  } catch (e) {}\n\n  var result = nativeObjectToString.call(value);\n  if (unmasked) {\n    if (isOwn) {\n      value[symToStringTag] = tag;\n    } else {\n      delete value[symToStringTag];\n    }\n  }\n  return result;\n}\n\nmodule.exports = getRawTag;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_getRawTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_getTag.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var DataView = __webpack_require__(/*! ./_DataView */ \"./node_modules/lodash/_DataView.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\"),\n    Promise = __webpack_require__(/*! ./_Promise */ \"./node_modules/lodash/_Promise.js\"),\n    Set = __webpack_require__(/*! ./_Set */ \"./node_modules/lodash/_Set.js\"),\n    WeakMap = __webpack_require__(/*! ./_WeakMap */ \"./node_modules/lodash/_WeakMap.js\"),\n    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./node_modules/lodash/_toSource.js\");\n\n/** `Object#toString` result references. */\nvar mapTag = '[object Map]',\n    objectTag = '[object Object]',\n    promiseTag = '[object Promise]',\n    setTag = '[object Set]',\n    weakMapTag = '[object WeakMap]';\n\nvar dataViewTag = '[object DataView]';\n\n/** Used to detect maps, sets, and weakmaps. */\nvar dataViewCtorString = toSource(DataView),\n    mapCtorString = toSource(Map),\n    promiseCtorString = toSource(Promise),\n    setCtorString = toSource(Set),\n    weakMapCtorString = toSource(WeakMap);\n\n/**\n * Gets the `toStringTag` of `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nvar getTag = baseGetTag;\n\n// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.\nif ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||\n    (Map && getTag(new Map) != mapTag) ||\n    (Promise && getTag(Promise.resolve()) != promiseTag) ||\n    (Set && getTag(new Set) != setTag) ||\n    (WeakMap && getTag(new WeakMap) != weakMapTag)) {\n  getTag = function(value) {\n    var result = baseGetTag(value),\n        Ctor = result == objectTag ? value.constructor : undefined,\n        ctorString = Ctor ? toSource(Ctor) : '';\n\n    if (ctorString) {\n      switch (ctorString) {\n        case dataViewCtorString: return dataViewTag;\n        case mapCtorString: return mapTag;\n        case promiseCtorString: return promiseTag;\n        case setCtorString: return setTag;\n        case weakMapCtorString: return weakMapTag;\n      }\n    }\n    return result;\n  };\n}\n\nmodule.exports = getTag;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_getTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/***/ ((module) => {

eval("/**\n * Gets the value at `key` of `object`.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction getValue(object, key) {\n  return object == null ? undefined : object[key];\n}\n\nmodule.exports = getValue;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_getValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/**\n * Removes all key-value entries from the hash.\n *\n * @private\n * @name clear\n * @memberOf Hash\n */\nfunction hashClear() {\n  this.__data__ = nativeCreate ? nativeCreate(null) : {};\n  this.size = 0;\n}\n\nmodule.exports = hashClear;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_hashClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/***/ ((module) => {

eval("/**\n * Removes `key` and its value from the hash.\n *\n * @private\n * @name delete\n * @memberOf Hash\n * @param {Object} hash The hash to modify.\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction hashDelete(key) {\n  var result = this.has(key) && delete this.__data__[key];\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = hashDelete;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_hashDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Gets the hash value for `key`.\n *\n * @private\n * @name get\n * @memberOf Hash\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction hashGet(key) {\n  var data = this.__data__;\n  if (nativeCreate) {\n    var result = data[key];\n    return result === HASH_UNDEFINED ? undefined : result;\n  }\n  return hasOwnProperty.call(data, key) ? data[key] : undefined;\n}\n\nmodule.exports = hashGet;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_hashGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Checks if a hash value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Hash\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction hashHas(key) {\n  var data = this.__data__;\n  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);\n}\n\nmodule.exports = hashHas;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_hashHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/**\n * Sets the hash `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Hash\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the hash instance.\n */\nfunction hashSet(key, value) {\n  var data = this.__data__;\n  this.size += this.has(key) ? 0 : 1;\n  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;\n  return this;\n}\n\nmodule.exports = hashSet;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_hashSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_isKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_isKey.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used to match property names within property paths. */\nvar reIsDeepProp = /\\.|\\[(?:[^[\\]]*|([\"'])(?:(?!\\1)[^\\\\]|\\\\.)*?\\1)\\]/,\n    reIsPlainProp = /^\\w*$/;\n\n/**\n * Checks if `value` is a property name and not a property path.\n *\n * @private\n * @param {*} value The value to check.\n * @param {Object} [object] The object to query keys on.\n * @returns {boolean} Returns `true` if `value` is a property name, else `false`.\n */\nfunction isKey(value, object) {\n  if (isArray(value)) {\n    return false;\n  }\n  var type = typeof value;\n  if (type == 'number' || type == 'symbol' || type == 'boolean' ||\n      value == null || isSymbol(value)) {\n    return true;\n  }\n  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||\n    (object != null && value in Object(object));\n}\n\nmodule.exports = isKey;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_isKey.js?");

/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/***/ ((module) => {

eval("/**\n * Checks if `value` is suitable for use as unique object key.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is suitable, else `false`.\n */\nfunction isKeyable(value) {\n  var type = typeof value;\n  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')\n    ? (value !== '__proto__')\n    : (value === null);\n}\n\nmodule.exports = isKeyable;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_isKeyable.js?");

/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var coreJsData = __webpack_require__(/*! ./_coreJsData */ \"./node_modules/lodash/_coreJsData.js\");\n\n/** Used to detect methods masquerading as native. */\nvar maskSrcKey = (function() {\n  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');\n  return uid ? ('Symbol(src)_1.' + uid) : '';\n}());\n\n/**\n * Checks if `func` has its source masked.\n *\n * @private\n * @param {Function} func The function to check.\n * @returns {boolean} Returns `true` if `func` is masked, else `false`.\n */\nfunction isMasked(func) {\n  return !!maskSrcKey && (maskSrcKey in func);\n}\n\nmodule.exports = isMasked;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_isMasked.js?");

/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/***/ ((module) => {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Checks if `value` is likely a prototype object.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.\n */\nfunction isPrototype(value) {\n  var Ctor = value && value.constructor,\n      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;\n\n  return value === proto;\n}\n\nmodule.exports = isPrototype;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_isPrototype.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/***/ ((module) => {

eval("/**\n * Removes all key-value entries from the list cache.\n *\n * @private\n * @name clear\n * @memberOf ListCache\n */\nfunction listCacheClear() {\n  this.__data__ = [];\n  this.size = 0;\n}\n\nmodule.exports = listCacheClear;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_listCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/** Used for built-in method references. */\nvar arrayProto = Array.prototype;\n\n/** Built-in value references. */\nvar splice = arrayProto.splice;\n\n/**\n * Removes `key` and its value from the list cache.\n *\n * @private\n * @name delete\n * @memberOf ListCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction listCacheDelete(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    return false;\n  }\n  var lastIndex = data.length - 1;\n  if (index == lastIndex) {\n    data.pop();\n  } else {\n    splice.call(data, index, 1);\n  }\n  --this.size;\n  return true;\n}\n\nmodule.exports = listCacheDelete;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_listCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Gets the list cache value for `key`.\n *\n * @private\n * @name get\n * @memberOf ListCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction listCacheGet(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  return index < 0 ? undefined : data[index][1];\n}\n\nmodule.exports = listCacheGet;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_listCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Checks if a list cache value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf ListCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction listCacheHas(key) {\n  return assocIndexOf(this.__data__, key) > -1;\n}\n\nmodule.exports = listCacheHas;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_listCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Sets the list cache `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf ListCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the list cache instance.\n */\nfunction listCacheSet(key, value) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    ++this.size;\n    data.push([key, value]);\n  } else {\n    data[index][1] = value;\n  }\n  return this;\n}\n\nmodule.exports = listCacheSet;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_listCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Hash = __webpack_require__(/*! ./_Hash */ \"./node_modules/lodash/_Hash.js\"),\n    ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\");\n\n/**\n * Removes all key-value entries from the map.\n *\n * @private\n * @name clear\n * @memberOf MapCache\n */\nfunction mapCacheClear() {\n  this.size = 0;\n  this.__data__ = {\n    'hash': new Hash,\n    'map': new (Map || ListCache),\n    'string': new Hash\n  };\n}\n\nmodule.exports = mapCacheClear;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_mapCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Removes `key` and its value from the map.\n *\n * @private\n * @name delete\n * @memberOf MapCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction mapCacheDelete(key) {\n  var result = getMapData(this, key)['delete'](key);\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = mapCacheDelete;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_mapCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Gets the map value for `key`.\n *\n * @private\n * @name get\n * @memberOf MapCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction mapCacheGet(key) {\n  return getMapData(this, key).get(key);\n}\n\nmodule.exports = mapCacheGet;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_mapCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Checks if a map value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf MapCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction mapCacheHas(key) {\n  return getMapData(this, key).has(key);\n}\n\nmodule.exports = mapCacheHas;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_mapCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Sets the map `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf MapCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the map cache instance.\n */\nfunction mapCacheSet(key, value) {\n  var data = getMapData(this, key),\n      size = data.size;\n\n  data.set(key, value);\n  this.size += data.size == size ? 0 : 1;\n  return this;\n}\n\nmodule.exports = mapCacheSet;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_mapCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_memoizeCapped.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_memoizeCapped.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var memoize = __webpack_require__(/*! ./memoize */ \"./node_modules/lodash/memoize.js\");\n\n/** Used as the maximum memoize cache size. */\nvar MAX_MEMOIZE_SIZE = 500;\n\n/**\n * A specialized version of `_.memoize` which clears the memoized function's\n * cache when it exceeds `MAX_MEMOIZE_SIZE`.\n *\n * @private\n * @param {Function} func The function to have its output memoized.\n * @returns {Function} Returns the new memoized function.\n */\nfunction memoizeCapped(func) {\n  var result = memoize(func, function(key) {\n    if (cache.size === MAX_MEMOIZE_SIZE) {\n      cache.clear();\n    }\n    return key;\n  });\n\n  var cache = result.cache;\n  return result;\n}\n\nmodule.exports = memoizeCapped;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_memoizeCapped.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\n/* Built-in method references that are verified to be native. */\nvar nativeCreate = getNative(Object, 'create');\n\nmodule.exports = nativeCreate;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_nativeCreate.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeKeys = overArg(Object.keys, Object);\n\nmodule.exports = nativeKeys;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_nativeKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\nvar freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports =  true && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && \"object\" == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Detect free variable `process` from Node.js. */\nvar freeProcess = moduleExports && freeGlobal.process;\n\n/** Used to access faster Node.js helpers. */\nvar nodeUtil = (function() {\n  try {\n    // Use `util.types` for Node.js 10+.\n    var types = freeModule && freeModule.require && freeModule.require('util').types;\n\n    if (types) {\n      return types;\n    }\n\n    // Legacy `process.binding('util')` for Node.js < 10.\n    return freeProcess && freeProcess.binding && freeProcess.binding('util');\n  } catch (e) {}\n}());\n\nmodule.exports = nodeUtil;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_nodeUtil.js?");

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/***/ ((module) => {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_objectToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/***/ ((module) => {

eval("/**\n * Creates a unary function that invokes `func` with its argument transformed.\n *\n * @private\n * @param {Function} func The function to wrap.\n * @param {Function} transform The argument transform.\n * @returns {Function} Returns the new function.\n */\nfunction overArg(func, transform) {\n  return function(arg) {\n    return func(transform(arg));\n  };\n}\n\nmodule.exports = overArg;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_overArg.js?");

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\nmodule.exports = root;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_root.js?");

/***/ }),

/***/ "./node_modules/lodash/_stringToPath.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_stringToPath.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ \"./node_modules/lodash/_memoizeCapped.js\");\n\n/** Used to match property names within property paths. */\nvar rePropName = /[^.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))/g;\n\n/** Used to match backslashes in property paths. */\nvar reEscapeChar = /\\\\(\\\\)?/g;\n\n/**\n * Converts `string` to a property path array.\n *\n * @private\n * @param {string} string The string to convert.\n * @returns {Array} Returns the property path array.\n */\nvar stringToPath = memoizeCapped(function(string) {\n  var result = [];\n  if (string.charCodeAt(0) === 46 /* . */) {\n    result.push('');\n  }\n  string.replace(rePropName, function(match, number, quote, subString) {\n    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));\n  });\n  return result;\n});\n\nmodule.exports = stringToPath;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_stringToPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_toKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_toKey.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/**\n * Converts `value` to a string key if it's not a string or symbol.\n *\n * @private\n * @param {*} value The value to inspect.\n * @returns {string|symbol} Returns the key.\n */\nfunction toKey(value) {\n  if (typeof value == 'string' || isSymbol(value)) {\n    return value;\n  }\n  var result = (value + '');\n  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;\n}\n\nmodule.exports = toKey;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_toKey.js?");

/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/***/ ((module) => {

eval("/** Used for built-in method references. */\nvar funcProto = Function.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/**\n * Converts `func` to its source code.\n *\n * @private\n * @param {Function} func The function to convert.\n * @returns {string} Returns the source code.\n */\nfunction toSource(func) {\n  if (func != null) {\n    try {\n      return funcToString.call(func);\n    } catch (e) {}\n    try {\n      return (func + '');\n    } catch (e) {}\n  }\n  return '';\n}\n\nmodule.exports = toSource;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/_toSource.js?");

/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/***/ ((module) => {

eval("/**\n * Performs a\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * comparison between two values to determine if they are equivalent.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.eq(object, object);\n * // => true\n *\n * _.eq(object, other);\n * // => false\n *\n * _.eq('a', 'a');\n * // => true\n *\n * _.eq('a', Object('a'));\n * // => false\n *\n * _.eq(NaN, NaN);\n * // => true\n */\nfunction eq(value, other) {\n  return value === other || (value !== value && other !== other);\n}\n\nmodule.exports = eq;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/eq.js?");

/***/ }),

/***/ "./node_modules/lodash/get.js":
/*!************************************!*\
  !*** ./node_modules/lodash/get.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var baseGet = __webpack_require__(/*! ./_baseGet */ \"./node_modules/lodash/_baseGet.js\");\n\n/**\n * Gets the value at `path` of `object`. If the resolved value is\n * `undefined`, the `defaultValue` is returned in its place.\n *\n * @static\n * @memberOf _\n * @since 3.7.0\n * @category Object\n * @param {Object} object The object to query.\n * @param {Array|string} path The path of the property to get.\n * @param {*} [defaultValue] The value returned for `undefined` resolved values.\n * @returns {*} Returns the resolved value.\n * @example\n *\n * var object = { 'a': [{ 'b': { 'c': 3 } }] };\n *\n * _.get(object, 'a[0].b.c');\n * // => 3\n *\n * _.get(object, ['a', '0', 'b', 'c']);\n * // => 3\n *\n * _.get(object, 'a.b.c', 'default');\n * // => 'default'\n */\nfunction get(object, path, defaultValue) {\n  var result = object == null ? undefined : baseGet(object, path);\n  return result === undefined ? defaultValue : result;\n}\n\nmodule.exports = get;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/get.js?");

/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ \"./node_modules/lodash/_baseIsArguments.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Built-in value references. */\nvar propertyIsEnumerable = objectProto.propertyIsEnumerable;\n\n/**\n * Checks if `value` is likely an `arguments` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n *  else `false`.\n * @example\n *\n * _.isArguments(function() { return arguments; }());\n * // => true\n *\n * _.isArguments([1, 2, 3]);\n * // => false\n */\nvar isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {\n  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&\n    !propertyIsEnumerable.call(value, 'callee');\n};\n\nmodule.exports = isArguments;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/isArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/***/ ((module) => {

eval("/**\n * Checks if `value` is classified as an `Array` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array, else `false`.\n * @example\n *\n * _.isArray([1, 2, 3]);\n * // => true\n *\n * _.isArray(document.body.children);\n * // => false\n *\n * _.isArray('abc');\n * // => false\n *\n * _.isArray(_.noop);\n * // => false\n */\nvar isArray = Array.isArray;\n\nmodule.exports = isArray;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/isArray.js?");

/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\");\n\n/**\n * Checks if `value` is array-like. A value is considered array-like if it's\n * not a function and has a `value.length` that's an integer greater than or\n * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is array-like, else `false`.\n * @example\n *\n * _.isArrayLike([1, 2, 3]);\n * // => true\n *\n * _.isArrayLike(document.body.children);\n * // => true\n *\n * _.isArrayLike('abc');\n * // => true\n *\n * _.isArrayLike(_.noop);\n * // => false\n */\nfunction isArrayLike(value) {\n  return value != null && isLength(value.length) && !isFunction(value);\n}\n\nmodule.exports = isArrayLike;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/isArrayLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\nvar root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\"),\n    stubFalse = __webpack_require__(/*! ./stubFalse */ \"./node_modules/lodash/stubFalse.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports =  true && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && \"object\" == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Built-in value references. */\nvar Buffer = moduleExports ? root.Buffer : undefined;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;\n\n/**\n * Checks if `value` is a buffer.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.\n * @example\n *\n * _.isBuffer(new Buffer(2));\n * // => true\n *\n * _.isBuffer(new Uint8Array(2));\n * // => false\n */\nvar isBuffer = nativeIsBuffer || stubFalse;\n\nmodule.exports = isBuffer;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/isBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/isEmpty.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isEmpty.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var baseKeys = __webpack_require__(/*! ./_baseKeys */ \"./node_modules/lodash/_baseKeys.js\"),\n    getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\");\n\n/** `Object#toString` result references. */\nvar mapTag = '[object Map]',\n    setTag = '[object Set]';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Checks if `value` is an empty object, collection, map, or set.\n *\n * Objects are considered empty if they have no own enumerable string keyed\n * properties.\n *\n * Array-like values such as `arguments` objects, arrays, buffers, strings, or\n * jQuery-like collections are considered empty if they have a `length` of `0`.\n * Similarly, maps and sets are considered empty if they have a `size` of `0`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is empty, else `false`.\n * @example\n *\n * _.isEmpty(null);\n * // => true\n *\n * _.isEmpty(true);\n * // => true\n *\n * _.isEmpty(1);\n * // => true\n *\n * _.isEmpty([1, 2, 3]);\n * // => false\n *\n * _.isEmpty({ 'a': 1 });\n * // => false\n */\nfunction isEmpty(value) {\n  if (value == null) {\n    return true;\n  }\n  if (isArrayLike(value) &&\n      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||\n        isBuffer(value) || isTypedArray(value) || isArguments(value))) {\n    return !value.length;\n  }\n  var tag = getTag(value);\n  if (tag == mapTag || tag == setTag) {\n    return !value.size;\n  }\n  if (isPrototype(value)) {\n    return !baseKeys(value).length;\n  }\n  for (var key in value) {\n    if (hasOwnProperty.call(value, key)) {\n      return false;\n    }\n  }\n  return true;\n}\n\nmodule.exports = isEmpty;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/isEmpty.js?");

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** `Object#toString` result references. */\nvar asyncTag = '[object AsyncFunction]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    proxyTag = '[object Proxy]';\n\n/**\n * Checks if `value` is classified as a `Function` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a function, else `false`.\n * @example\n *\n * _.isFunction(_);\n * // => true\n *\n * _.isFunction(/abc/);\n * // => false\n */\nfunction isFunction(value) {\n  if (!isObject(value)) {\n    return false;\n  }\n  // The use of `Object#toString` avoids issues with the `typeof` operator\n  // in Safari 9 which returns 'object' for typed arrays and other constructors.\n  var tag = baseGetTag(value);\n  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;\n}\n\nmodule.exports = isFunction;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/isFunction.js?");

/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/***/ ((module) => {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/**\n * Checks if `value` is a valid array-like length.\n *\n * **Note:** This method is loosely based on\n * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.\n * @example\n *\n * _.isLength(3);\n * // => true\n *\n * _.isLength(Number.MIN_VALUE);\n * // => false\n *\n * _.isLength(Infinity);\n * // => false\n *\n * _.isLength('3');\n * // => false\n */\nfunction isLength(value) {\n  return typeof value == 'number' &&\n    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;\n}\n\nmodule.exports = isLength;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/isLength.js?");

/***/ }),

/***/ "./node_modules/lodash/isNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isNumber.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar numberTag = '[object Number]';\n\n/**\n * Checks if `value` is classified as a `Number` primitive or object.\n *\n * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are\n * classified as numbers, use the `_.isFinite` method.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a number, else `false`.\n * @example\n *\n * _.isNumber(3);\n * // => true\n *\n * _.isNumber(Number.MIN_VALUE);\n * // => true\n *\n * _.isNumber(Infinity);\n * // => true\n *\n * _.isNumber('3');\n * // => false\n */\nfunction isNumber(value) {\n  return typeof value == 'number' ||\n    (isObjectLike(value) && baseGetTag(value) == numberTag);\n}\n\nmodule.exports = isNumber;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/isNumber.js?");

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/***/ ((module) => {

eval("/**\n * Checks if `value` is the\n * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)\n * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an object, else `false`.\n * @example\n *\n * _.isObject({});\n * // => true\n *\n * _.isObject([1, 2, 3]);\n * // => true\n *\n * _.isObject(_.noop);\n * // => true\n *\n * _.isObject(null);\n * // => false\n */\nfunction isObject(value) {\n  var type = typeof value;\n  return value != null && (type == 'object' || type == 'function');\n}\n\nmodule.exports = isObject;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/isObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/***/ ((module) => {

eval("/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return value != null && typeof value == 'object';\n}\n\nmodule.exports = isObjectLike;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/isObjectLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar symbolTag = '[object Symbol]';\n\n/**\n * Checks if `value` is classified as a `Symbol` primitive or object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.\n * @example\n *\n * _.isSymbol(Symbol.iterator);\n * // => true\n *\n * _.isSymbol('abc');\n * // => false\n */\nfunction isSymbol(value) {\n  return typeof value == 'symbol' ||\n    (isObjectLike(value) && baseGetTag(value) == symbolTag);\n}\n\nmodule.exports = isSymbol;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/isSymbol.js?");

/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ \"./node_modules/lodash/_baseIsTypedArray.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;\n\n/**\n * Checks if `value` is classified as a typed array.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.\n * @example\n *\n * _.isTypedArray(new Uint8Array);\n * // => true\n *\n * _.isTypedArray([]);\n * // => false\n */\nvar isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;\n\nmodule.exports = isTypedArray;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/isTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/memoize.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/memoize.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\");\n\n/** Error message constants. */\nvar FUNC_ERROR_TEXT = 'Expected a function';\n\n/**\n * Creates a function that memoizes the result of `func`. If `resolver` is\n * provided, it determines the cache key for storing the result based on the\n * arguments provided to the memoized function. By default, the first argument\n * provided to the memoized function is used as the map cache key. The `func`\n * is invoked with the `this` binding of the memoized function.\n *\n * **Note:** The cache is exposed as the `cache` property on the memoized\n * function. Its creation may be customized by replacing the `_.memoize.Cache`\n * constructor with one whose instances implement the\n * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)\n * method interface of `clear`, `delete`, `get`, `has`, and `set`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Function\n * @param {Function} func The function to have its output memoized.\n * @param {Function} [resolver] The function to resolve the cache key.\n * @returns {Function} Returns the new memoized function.\n * @example\n *\n * var object = { 'a': 1, 'b': 2 };\n * var other = { 'c': 3, 'd': 4 };\n *\n * var values = _.memoize(_.values);\n * values(object);\n * // => [1, 2]\n *\n * values(other);\n * // => [3, 4]\n *\n * object.a = 2;\n * values(object);\n * // => [1, 2]\n *\n * // Modify the result cache.\n * values.cache.set(object, ['a', 'b']);\n * values(object);\n * // => ['a', 'b']\n *\n * // Replace `_.memoize.Cache`.\n * _.memoize.Cache = WeakMap;\n */\nfunction memoize(func, resolver) {\n  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {\n    throw new TypeError(FUNC_ERROR_TEXT);\n  }\n  var memoized = function() {\n    var args = arguments,\n        key = resolver ? resolver.apply(this, args) : args[0],\n        cache = memoized.cache;\n\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    var result = func.apply(this, args);\n    memoized.cache = cache.set(key, result) || cache;\n    return result;\n  };\n  memoized.cache = new (memoize.Cache || MapCache);\n  return memoized;\n}\n\n// Expose `MapCache`.\nmemoize.Cache = MapCache;\n\nmodule.exports = memoize;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/memoize.js?");

/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/***/ ((module) => {

eval("/**\n * This method returns `false`.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {boolean} Returns `false`.\n * @example\n *\n * _.times(2, _.stubFalse);\n * // => [false, false]\n */\nfunction stubFalse() {\n  return false;\n}\n\nmodule.exports = stubFalse;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/stubFalse.js?");

/***/ }),

/***/ "./node_modules/lodash/toString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var baseToString = __webpack_require__(/*! ./_baseToString */ \"./node_modules/lodash/_baseToString.js\");\n\n/**\n * Converts `value` to a string. An empty string is returned for `null`\n * and `undefined` values. The sign of `-0` is preserved.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n * @example\n *\n * _.toString(null);\n * // => ''\n *\n * _.toString(-0);\n * // => '-0'\n *\n * _.toString([1, 2, 3]);\n * // => '1,2,3'\n */\nfunction toString(value) {\n  return value == null ? '' : baseToString(value);\n}\n\nmodule.exports = toString;\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/lodash/toString.js?");

/***/ }),

/***/ "./node_modules/ua-parser-js/src/ua-parser.js":
/*!****************************************************!*\
  !*** ./node_modules/ua-parser-js/src/ua-parser.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;/*!@license\n * UAParser.js v0.7.28\n * Lightweight JavaScript-based User-Agent string parser\n * https://github.com/faisalman/ua-parser-js\n *\n * Copyright © 2012-2021 Faisal Salman <f@faisalman.com>\n * Licensed under MIT License\n */\n\n(function (window, undefined) {\n\n    'use strict';\n\n    //////////////\n    // Constants\n    /////////////\n\n\n    var LIBVERSION  = '0.7.28',\n        EMPTY       = '',\n        UNKNOWN     = '?',\n        FUNC_TYPE   = 'function',\n        UNDEF_TYPE  = 'undefined',\n        OBJ_TYPE    = 'object',\n        STR_TYPE    = 'string',\n        MAJOR       = 'major', // deprecated\n        MODEL       = 'model',\n        NAME        = 'name',\n        TYPE        = 'type',\n        VENDOR      = 'vendor',\n        VERSION     = 'version',\n        ARCHITECTURE= 'architecture',\n        CONSOLE     = 'console',\n        MOBILE      = 'mobile',\n        TABLET      = 'tablet',\n        SMARTTV     = 'smarttv',\n        WEARABLE    = 'wearable',\n        EMBEDDED    = 'embedded',\n        UA_MAX_LENGTH = 255;\n\n\n    ///////////\n    // Helper\n    //////////\n\n\n    var util = {\n        extend : function (regexes, extensions) {\n            var mergedRegexes = {};\n            for (var i in regexes) {\n                if (extensions[i] && extensions[i].length % 2 === 0) {\n                    mergedRegexes[i] = extensions[i].concat(regexes[i]);\n                } else {\n                    mergedRegexes[i] = regexes[i];\n                }\n            }\n            return mergedRegexes;\n        },\n        has : function (str1, str2) {\n            return typeof str1 === STR_TYPE ? str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1 : false;\n        },\n        lowerize : function (str) {\n            return str.toLowerCase();\n        },\n        major : function (version) {\n            return typeof(version) === STR_TYPE ? version.replace(/[^\\d\\.]/g,'').split(\".\")[0] : undefined;\n        },\n        trim : function (str, len) {\n            str = str.replace(/^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$/g, '');\n            return typeof(len) === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);\n        }\n    };\n\n\n    ///////////////\n    // Map helper\n    //////////////\n\n\n    var mapper = {\n\n        rgx : function (ua, arrays) {\n\n            var i = 0, j, k, p, q, matches, match;\n\n            // loop through all regexes maps\n            while (i < arrays.length && !matches) {\n\n                var regex = arrays[i],       // even sequence (0,2,4,..)\n                    props = arrays[i + 1];   // odd sequence (1,3,5,..)\n                j = k = 0;\n\n                // try matching uastring with regexes\n                while (j < regex.length && !matches) {\n\n                    matches = regex[j++].exec(ua);\n\n                    if (!!matches) {\n                        for (p = 0; p < props.length; p++) {\n                            match = matches[++k];\n                            q = props[p];\n                            // check if given property is actually array\n                            if (typeof q === OBJ_TYPE && q.length > 0) {\n                                if (q.length == 2) {\n                                    if (typeof q[1] == FUNC_TYPE) {\n                                        // assign modified match\n                                        this[q[0]] = q[1].call(this, match);\n                                    } else {\n                                        // assign given value, ignore regex match\n                                        this[q[0]] = q[1];\n                                    }\n                                } else if (q.length == 3) {\n                                    // check whether function or regex\n                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {\n                                        // call function (usually string mapper)\n                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;\n                                    } else {\n                                        // sanitize match using given regex\n                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;\n                                    }\n                                } else if (q.length == 4) {\n                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;\n                                }\n                            } else {\n                                this[q] = match ? match : undefined;\n                            }\n                        }\n                    }\n                }\n                i += 2;\n            }\n        },\n\n        str : function (str, map) {\n\n            for (var i in map) {\n                // check if array\n                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {\n                    for (var j = 0; j < map[i].length; j++) {\n                        if (util.has(map[i][j], str)) {\n                            return (i === UNKNOWN) ? undefined : i;\n                        }\n                    }\n                } else if (util.has(map[i], str)) {\n                    return (i === UNKNOWN) ? undefined : i;\n                }\n            }\n            return str;\n        }\n    };\n\n\n    ///////////////\n    // String map\n    //////////////\n\n\n    var maps = {\n\n        browser : {\n            // Safari < 3.0\n            oldSafari : {\n                version : {\n                    '1.0'   : '/8',\n                    '1.2'   : '/1',\n                    '1.3'   : '/3',\n                    '2.0'   : '/412',\n                    '2.0.2' : '/416',\n                    '2.0.3' : '/417',\n                    '2.0.4' : '/419',\n                    '?'     : '/'\n                }\n            },\n            oldEdge : {\n                version : {\n                    '0.1'   : '12.',\n                    '21'    : '13.',\n                    '31'    : '14.',\n                    '39'    : '15.',\n                    '41'    : '16.',\n                    '42'    : '17.',\n                    '44'    : '18.'\n                }\n            }\n        },\n\n        os : {\n            windows : {\n                version : {\n                    'ME'        : '4.90',\n                    'NT 3.11'   : 'NT3.51',\n                    'NT 4.0'    : 'NT4.0',\n                    '2000'      : 'NT 5.0',\n                    'XP'        : ['NT 5.1', 'NT 5.2'],\n                    'Vista'     : 'NT 6.0',\n                    '7'         : 'NT 6.1',\n                    '8'         : 'NT 6.2',\n                    '8.1'       : 'NT 6.3',\n                    '10'        : ['NT 6.4', 'NT 10.0'],\n                    'RT'        : 'ARM'\n                }\n            }\n        }\n    };\n\n\n    //////////////\n    // Regex map\n    /////////////\n\n\n    var regexes = {\n\n        browser : [[\n\n            /\\b(?:crmo|crios)\\/([\\w\\.]+)/i                                      // Chrome for Android/iOS\n            ], [VERSION, [NAME, 'Chrome']], [\n            /edg(?:e|ios|a)?\\/([\\w\\.]+)/i                                       // Microsoft Edge\n            ], [VERSION, [NAME, 'Edge']], [\n            // breaking change (reserved for next major release):\n            ///edge\\/([\\w\\.]+)/i                                                  // Old Edge (Trident)\n            //], [[VERSION, mapper.str, maps.browser.oldEdge.version], [NAME, 'Edge']], [\n\n            // Presto based\n            /(opera\\smini)\\/([\\w\\.-]+)/i,                                       // Opera Mini\n            /(opera\\s[mobiletab]{3,6})\\b.+version\\/([\\w\\.-]+)/i,                // Opera Mobi/Tablet\n            /(opera)(?:.+version\\/|[\\/\\s]+)([\\w\\.]+)/i,                         // Opera\n            ], [NAME, VERSION], [\n            /opios[\\/\\s]+([\\w\\.]+)/i                                            // Opera mini on iphone >= 8.0\n            ], [VERSION, [NAME, 'Opera Mini']], [\n            /\\sopr\\/([\\w\\.]+)/i                                                 // Opera Webkit\n            ], [VERSION, [NAME, 'Opera']], [\n\n            // Mixed\n            /(kindle)\\/([\\w\\.]+)/i,                                             // Kindle\n            /(lunascape|maxthon|netfront|jasmine|blazer)[\\/\\s]?([\\w\\.]*)/i,     // Lunascape/Maxthon/Netfront/Jasmine/Blazer\n            // Trident based\n            /(avant\\s|iemobile|slim)(?:browser)?[\\/\\s]?([\\w\\.]*)/i,             // Avant/IEMobile/SlimBrowser\n            /(ba?idubrowser)[\\/\\s]?([\\w\\.]+)/i,                                 // Baidu Browser\n            /(?:ms|\\()(ie)\\s([\\w\\.]+)/i,                                        // Internet Explorer\n\n            // Webkit/KHTML based\n            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\\/([\\w\\.-]+)/i,\n                                                                                // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon\n            /(rekonq|puffin|brave|whale|qqbrowserlite|qq)\\/([\\w\\.]+)/i,         // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ\n            /(weibo)__([\\d\\.]+)/i                                               // Weibo\n            ], [NAME, VERSION], [\n            /(?:[\\s\\/]uc?\\s?browser|(?:juc.+)ucweb)[\\/\\s]?([\\w\\.]+)/i           // UCBrowser\n            ], [VERSION, [NAME, 'UCBrowser']], [\n            /(?:windowswechat)?\\sqbcore\\/([\\w\\.]+)\\b.*(?:windowswechat)?/i      // WeChat Desktop for Windows Built-in Browser\n            ], [VERSION, [NAME, 'WeChat(Win) Desktop']], [\n            /micromessenger\\/([\\w\\.]+)/i                                        // WeChat\n            ], [VERSION, [NAME, 'WeChat']], [\n            /konqueror\\/([\\w\\.]+)/i                                             // Konqueror\n            ], [VERSION, [NAME, 'Konqueror']], [\n            /trident.+rv[:\\s]([\\w\\.]{1,9})\\b.+like\\sgecko/i                     // IE11\n            ], [VERSION, [NAME, 'IE']], [\n            /yabrowser\\/([\\w\\.]+)/i                                             // Yandex\n            ], [VERSION, [NAME, 'Yandex']], [\n            /(avast|avg)\\/([\\w\\.]+)/i                                           // Avast/AVG Secure Browser\n            ], [[NAME, /(.+)/, '$1 Secure Browser'], VERSION], [\n            /focus\\/([\\w\\.]+)/i                                                 // Firefox Focus\n            ], [VERSION, [NAME, 'Firefox Focus']], [\n            /opt\\/([\\w\\.]+)/i                                                   // Opera Touch\n            ], [VERSION, [NAME, 'Opera Touch']], [\n            /coc_coc_browser\\/([\\w\\.]+)/i                                       // Coc Coc Browser\n            ], [VERSION, [NAME, 'Coc Coc']], [\n            /dolfin\\/([\\w\\.]+)/i                                                // Dolphin\n            ], [VERSION, [NAME, 'Dolphin']], [\n            /coast\\/([\\w\\.]+)/i                                                 // Opera Coast\n            ], [VERSION, [NAME, 'Opera Coast']],\n            [/xiaomi\\/miuibrowser\\/([\\w\\.]+)/i                                  // MIUI Browser\n            ], [VERSION, [NAME, 'MIUI Browser']], [\n            /fxios\\/([\\w\\.-]+)/i                                                // Firefox for iOS\n            ], [VERSION, [NAME, 'Firefox']], [\n            /(qihu|qhbrowser|qihoobrowser|360browser)/i                         // 360\n            ], [[NAME, '360 Browser']], [\n            /(oculus|samsung|sailfish)browser\\/([\\w\\.]+)/i\n            ], [[NAME, /(.+)/, '$1 Browser'], VERSION], [                       // Oculus/Samsung/Sailfish Browser\n            /(comodo_dragon)\\/([\\w\\.]+)/i                                       // Comodo Dragon\n            ], [[NAME, /_/g, ' '], VERSION], [\n            /\\s(electron)\\/([\\w\\.]+)\\ssafari/i,                                 // Electron-based App\n            /(tesla)(?:\\sqtcarbrowser|\\/(20[12]\\d\\.[\\w\\.-]+))/i,                // Tesla\n            /m?(qqbrowser|baiduboxapp|2345Explorer)[\\/\\s]?([\\w\\.]+)/i           // QQBrowser/Baidu App/2345 Browser\n            ], [NAME, VERSION], [\n            /(MetaSr)[\\/\\s]?([\\w\\.]+)/i,                                        // SouGouBrowser\n            /(LBBROWSER)/i                                                      // LieBao Browser\n            ], [NAME], [\n\n            // WebView\n            /;fbav\\/([\\w\\.]+);/i                                                // Facebook App for iOS & Android with version\n            ], [VERSION, [NAME, 'Facebook']], [\n            /FBAN\\/FBIOS|FB_IAB\\/FB4A/i                                         // Facebook App for iOS & Android without version\n            ], [[NAME, 'Facebook']], [\n            /safari\\s(line)\\/([\\w\\.]+)/i,                                       // Line App for iOS\n            /\\b(line)\\/([\\w\\.]+)\\/iab/i,                                        // Line App for Android\n            /(chromium|instagram)[\\/\\s]([\\w\\.-]+)/i                             // Chromium/Instagram\n            ], [NAME, VERSION], [\n            /\\bgsa\\/([\\w\\.]+)\\s.*safari\\//i                                     // Google Search Appliance on iOS\n            ], [VERSION, [NAME, 'GSA']], [\n\n            /headlesschrome(?:\\/([\\w\\.]+)|\\s)/i                                 // Chrome Headless\n            ], [VERSION, [NAME, 'Chrome Headless']], [\n\n            /\\swv\\).+(chrome)\\/([\\w\\.]+)/i                                      // Chrome WebView\n            ], [[NAME, 'Chrome WebView'], VERSION], [\n\n            /droid.+\\sversion\\/([\\w\\.]+)\\b.+(?:mobile\\ssafari|safari)/i         // Android Browser\n            ], [VERSION, [NAME, 'Android Browser']], [\n\n            /(chrome|omniweb|arora|[tizenoka]{5}\\s?browser)\\/v?([\\w\\.]+)/i      // Chrome/OmniWeb/Arora/Tizen/Nokia\n            ], [NAME, VERSION], [\n\n            /version\\/([\\w\\.]+)\\s.*mobile\\/\\w+\\s(safari)/i                      // Mobile Safari\n            ], [VERSION, [NAME, 'Mobile Safari']], [\n            /version\\/([\\w\\.]+)\\s.*(mobile\\s?safari|safari)/i                   // Safari & Safari Mobile\n            ], [VERSION, NAME], [\n            /webkit.+?(mobile\\s?safari|safari)(\\/[\\w\\.]+)/i                     // Safari < 3.0\n            ], [NAME, [VERSION, mapper.str, maps.browser.oldSafari.version]], [\n\n            /(webkit|khtml)\\/([\\w\\.]+)/i\n            ], [NAME, VERSION], [\n\n            // Gecko based\n            /(navigator|netscape)\\/([\\w\\.-]+)/i                                 // Netscape\n            ], [[NAME, 'Netscape'], VERSION], [\n            /ile\\svr;\\srv:([\\w\\.]+)\\).+firefox/i                                // Firefox Reality\n            ], [VERSION, [NAME, 'Firefox Reality']], [\n            /ekiohf.+(flow)\\/([\\w\\.]+)/i,                                       // Flow\n            /(swiftfox)/i,                                                      // Swiftfox\n            /(icedragon|iceweasel|camino|chimera|fennec|maemo\\sbrowser|minimo|conkeror)[\\/\\s]?([\\w\\.\\+]+)/i,\n                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror\n            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\\/([\\w\\.-]+)$/i,\n                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix\n            /(firefox)\\/([\\w\\.]+)\\s[\\w\\s\\-]+\\/[\\w\\.]+$/i,                       // Other Firefox-based\n            /(mozilla)\\/([\\w\\.]+)\\s.+rv\\:.+gecko\\/\\d+/i,                        // Mozilla\n\n            // Other\n            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\\/\\s]?([\\w\\.]+)/i,\n                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir\n            /(links)\\s\\(([\\w\\.]+)/i,                                            // Links\n            /(gobrowser)\\/?([\\w\\.]*)/i,                                         // GoBrowser\n            /(ice\\s?browser)\\/v?([\\w\\._]+)/i,                                   // ICE Browser\n            /(mosaic)[\\/\\s]([\\w\\.]+)/i                                          // Mosaic\n            ], [NAME, VERSION]\n        ],\n\n        cpu : [[\n\n            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\\)]/i                     // AMD64 (x64)\n            ], [[ARCHITECTURE, 'amd64']], [\n\n            /(ia32(?=;))/i                                                      // IA32 (quicktime)\n            ], [[ARCHITECTURE, util.lowerize]], [\n\n            /((?:i[346]|x)86)[;\\)]/i                                            // IA32 (x86)\n            ], [[ARCHITECTURE, 'ia32']], [\n\n            /\\b(aarch64|armv?8e?l?)\\b/i                                         // ARM64\n            ], [[ARCHITECTURE, 'arm64']], [\n\n            /\\b(arm(?:v[67])?ht?n?[fl]p?)\\b/i                                   // ARMHF\n            ], [[ARCHITECTURE, 'armhf']], [\n\n            // PocketPC mistakenly identified as PowerPC\n            /windows\\s(ce|mobile);\\sppc;/i\n            ], [[ARCHITECTURE, 'arm']], [\n\n            /((?:ppc|powerpc)(?:64)?)(?:\\smac|;|\\))/i                           // PowerPC\n            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [\n\n            /(sun4\\w)[;\\)]/i                                                    // SPARC\n            ], [[ARCHITECTURE, 'sparc']], [\n\n            /((?:avr32|ia64(?=;))|68k(?=\\))|\\barm(?:64|(?=v(?:[1-7]|[5-7]1)l?|;|eabi))|(?=atmel\\s)avr|(?:irix|mips|sparc)(?:64)?\\b|pa-risc)/i\n                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC\n            ], [[ARCHITECTURE, util.lowerize]]\n        ],\n\n        device : [[\n\n            //////////////////////////\n            // MOBILES & TABLETS\n            // Ordered by popularity\n            /////////////////////////\n\n            // Samsung\n            /\\b(sch-i[89]0\\d|shw-m380s|sm-[pt]\\w{2,4}|gt-[pn]\\d{2,4}|sgh-t8[56]9|nexus\\s10)/i\n            ], [MODEL, [VENDOR, 'Samsung'], [TYPE, TABLET]], [\n            /\\b((?:s[cgp]h|gt|sm)-\\w+|galaxy\\snexus)/i,\n            /\\ssamsung[\\s-]([\\w-]+)/i,\n            /sec-(sgh\\w+)/i\n            ], [MODEL, [VENDOR, 'Samsung'], [TYPE, MOBILE]], [\n\n            // Apple\n            /\\((ip(?:hone|od)[\\s\\w]*);/i                                        // iPod/iPhone\n            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [\n            /\\((ipad);[\\w\\s\\),;-]+apple/i,                                      // iPad\n            /applecoremedia\\/[\\w\\.]+\\s\\((ipad)/i,\n            /\\b(ipad)\\d\\d?,\\d\\d?[;\\]].+ios/i\n            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [\n\n            // Huawei\n            /\\b((?:agr|ags[23]|bah2?|sht?)-a?[lw]\\d{2})/i,\n            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, TABLET]], [\n            /d\\/huawei([\\w\\s-]+)[;\\)]/i,\n            /\\b(nexus\\s6p|vog-[at]?l\\d\\d|ane-[at]?l[x\\d]\\d|eml-a?l\\d\\da?|lya-[at]?l\\d[\\dc]|clt-a?l\\d\\di?|ele-l\\d\\d)/i,\n            /\\b(\\w{2,4}-[atu][ln][01259][019])[;\\)\\s]/i\n            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [\n\n            // Xiaomi\n            /\\b(poco[\\s\\w]+)(?:\\sbuild|\\))/i,                                   // Xiaomi POCO\n            /\\b;\\s(\\w+)\\sbuild\\/hm\\1/i,                                         // Xiaomi Hongmi 'numeric' models\n            /\\b(hm[\\s\\-_]?note?[\\s_]?(?:\\d\\w)?)\\sbuild/i,                       // Xiaomi Hongmi\n            /\\b(redmi[\\s\\-_]?(?:note|k)?[\\w\\s_]+)(?:\\sbuild|\\))/i,              // Xiaomi Redmi\n            /\\b(mi[\\s\\-_]?(?:a\\d|one|one[\\s_]plus|note lte)?[\\s_]?(?:\\d?\\w?)[\\s_]?(?:plus)?)\\sbuild/i  // Xiaomi Mi\n            ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [\n            /\\b(mi[\\s\\-_]?(?:pad)(?:[\\w\\s_]+))(?:\\sbuild|\\))/i                  // Mi Pad tablets\n            ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [\n\n            // OPPO\n            /;\\s(\\w+)\\sbuild.+\\soppo/i,\n            /\\s(cph[12]\\d{3}|p(?:af|c[al]|d\\w|e[ar])[mt]\\d0|x9007)\\b/i\n            ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [\n\n            // Vivo\n            /\\svivo\\s(\\w+)(?:\\sbuild|\\))/i,\n            /\\s(v[12]\\d{3}\\w?[at])(?:\\sbuild|;)/i\n            ], [MODEL, [VENDOR, 'Vivo'], [TYPE, MOBILE]], [\n\n            // Realme\n            /\\s(rmx[12]\\d{3})(?:\\sbuild|;)/i\n            ], [MODEL, [VENDOR, 'Realme'], [TYPE, MOBILE]], [\n\n            // Motorola\n            /\\s(milestone|droid(?:[2-4x]|\\s(?:bionic|x2|pro|razr))?:?(\\s4g)?)\\b[\\w\\s]+build\\//i,\n            /\\smot(?:orola)?[\\s-](\\w*)/i,\n            /((?:moto[\\s\\w\\(\\)]+|xt\\d{3,4}|nexus\\s6)(?=\\sbuild|\\)))/i\n            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [\n            /\\s(mz60\\d|xoom[\\s2]{0,2})\\sbuild\\//i\n            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [\n\n            // LG\n            /((?=lg)?[vl]k\\-?\\d{3})\\sbuild|\\s3\\.[\\s\\w;-]{10}lg?-([06cv9]{3,4})/i\n            ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [\n            /(lm-?f100[nv]?|nexus\\s[45])/i,\n            /lg[e;\\s\\/-]+((?!browser|netcast)\\w+)/i,\n            /\\blg(\\-?[\\d\\w]+)\\sbuild/i\n            ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [\n\n            // Lenovo\n            /(ideatab[\\w\\-\\s]+)/i,\n            /lenovo\\s?(s(?:5000|6000)(?:[\\w-]+)|tab(?:[\\s\\w]+)|yt[\\d\\w-]{6}|tb[\\d\\w-]{6})/i        // Lenovo tablets\n            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [\n\n            // Nokia\n            /(?:maemo|nokia).*(n900|lumia\\s\\d+)/i,\n            /nokia[\\s_-]?([\\w\\.-]*)/i\n            ], [[MODEL, /_/g, ' '], [VENDOR, 'Nokia'], [TYPE, MOBILE]], [\n\n            // Google\n            /droid.+;\\s(pixel\\sc)[\\s)]/i                                        // Google Pixel C\n            ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [\n            /droid.+;\\s(pixel[\\s\\daxl]{0,6})(?:\\sbuild|\\))/i                    // Google Pixel\n            ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [\n\n            // Sony\n            /droid.+\\s([c-g]\\d{4}|so[-l]\\w+|xq-a\\w[4-7][12])(?=\\sbuild\\/|\\).+chrome\\/(?![1-6]{0,1}\\d\\.))/i\n            ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [\n            /sony\\stablet\\s[ps]\\sbuild\\//i,\n            /(?:sony)?sgp\\w+(?:\\sbuild\\/|\\))/i\n            ], [[MODEL, 'Xperia Tablet'], [VENDOR, 'Sony'], [TYPE, TABLET]], [\n\n            // OnePlus\n            /\\s(kb2005|in20[12]5|be20[12][59])\\b/i,\n            /\\ba000(1)\\sbuild/i,                                                // OnePlus\n            /\\boneplus\\s(a\\d{4})[\\s)]/i\n            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [\n\n            // Amazon\n            /(alexa)webm/i,\n            /(kf[a-z]{2}wi)(\\sbuild\\/|\\))/i,                                    // Kindle Fire without Silk\n            /(kf[a-z]+)(\\sbuild\\/|\\)).+silk\\//i                                 // Kindle Fire HD\n            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [\n            /(sd|kf)[0349hijorstuw]+(\\sbuild\\/|\\)).+silk\\//i                    // Fire Phone\n            ], [[MODEL, 'Fire Phone'], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [\n\n            // BlackBerry\n            /\\((playbook);[\\w\\s\\),;-]+(rim)/i                                   // BlackBerry PlayBook\n            ], [MODEL, VENDOR, [TYPE, TABLET]], [\n            /((?:bb[a-f]|st[hv])100-\\d)/i,\n            /\\(bb10;\\s(\\w+)/i                                                   // BlackBerry 10\n            ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [\n\n            // Asus\n            /(?:\\b|asus_)(transfo[prime\\s]{4,10}\\s\\w+|eeepc|slider\\s\\w+|nexus\\s7|padfone|p00[cj])/i\n            ], [MODEL, [VENDOR, 'ASUS'], [TYPE, TABLET]], [\n            /\\s(z[es]6[027][01][km][ls]|zenfone\\s\\d\\w?)\\b/i\n            ], [MODEL, [VENDOR, 'ASUS'], [TYPE, MOBILE]], [\n\n            // HTC\n            /(nexus\\s9)/i                                                       // HTC Nexus 9\n            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [\n            /(htc)[;_\\s-]{1,2}([\\w\\s]+(?=\\)|\\sbuild)|\\w+)/i,                    // HTC\n\n            // ZTE\n            /(zte)-(\\w*)/i,\n            /(alcatel|geeksphone|nexian|panasonic|(?=;\\s)sony)[_\\s-]?([\\w-]*)/i // Alcatel/GeeksPhone/Nexian/Panasonic/Sony\n            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [\n\n            // Acer\n            /droid[x\\d\\.\\s;]+\\s([ab][1-7]\\-?[0178a]\\d\\d?)/i\n            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [\n\n            // Meizu\n            /droid.+;\\s(m[1-5]\\snote)\\sbuild/i,\n            /\\bmz-([\\w-]{2,})/i\n            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [\n\n            // MIXED\n            /(blackberry|benq|palm(?=\\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\\s_-]?([\\w-]*)/i,\n                                                                                // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron\n            /(hp)\\s([\\w\\s]+\\w)/i,                                               // HP iPAQ\n            /(asus)-?(\\w+)/i,                                                   // Asus\n            /(microsoft);\\s(lumia[\\s\\w]+)/i,                                    // Microsoft Lumia\n            /(lenovo)[_\\s-]?([\\w-]+)/i,                                         // Lenovo\n            /linux;.+(jolla);/i,                                                // Jolla\n            /droid.+;\\s(oppo)\\s?([\\w\\s]+)\\sbuild/i                              // OPPO\n            ], [VENDOR, MODEL, [TYPE, MOBILE]], [\n\n            /(archos)\\s(gamepad2?)/i,                                           // Archos\n            /(hp).+(touchpad(?!.+tablet)|tablet)/i,                             // HP TouchPad\n            /(kindle)\\/([\\w\\.]+)/i,                                             // Kindle\n            /\\s(nook)[\\w\\s]+build\\/(\\w+)/i,                                     // Nook\n            /(dell)\\s(strea[kpr\\s\\d]*[\\dko])/i,                                 // Dell Streak\n            /[;\\/]\\s?(le[\\s\\-]+pan)[\\s\\-]+(\\w{1,9})\\sbuild/i,                   // Le Pan Tablets\n            /[;\\/]\\s?(trinity)[\\-\\s]*(t\\d{3})\\sbuild/i,                         // Trinity Tablets\n            /\\b(gigaset)[\\s\\-]+(q\\w{1,9})\\sbuild/i,                             // Gigaset Tablets\n            /\\b(vodafone)\\s([\\w\\s]+)(?:\\)|\\sbuild)/i                            // Vodafone\n            ], [VENDOR, MODEL, [TYPE, TABLET]], [\n\n            /\\s(surface\\sduo)\\s/i                                               // Surface Duo\n            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, TABLET]], [\n            /droid\\s[\\d\\.]+;\\s(fp\\du?)\\sbuild/i\n            ], [MODEL, [VENDOR, 'Fairphone'], [TYPE, MOBILE]], [\n            /\\s(u304aa)\\sbuild/i                                                // AT&T\n            ], [MODEL, [VENDOR, 'AT&T'], [TYPE, MOBILE]], [\n            /sie-(\\w*)/i                                                        // Siemens\n            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [\n            /[;\\/]\\s?(rct\\w+)\\sbuild/i                                          // RCA Tablets\n            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [\n            /[;\\/\\s](venue[\\d\\s]{2,7})\\sbuild/i                                 // Dell Venue Tablets\n            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [\n            /[;\\/]\\s?(q(?:mv|ta)\\w+)\\sbuild/i                                   // Verizon Tablet\n            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [\n            /[;\\/]\\s(?:barnes[&\\s]+noble\\s|bn[rt])([\\w\\s\\+]*)\\sbuild/i          // Barnes & Noble Tablet\n            ], [MODEL, [VENDOR, 'Barnes & Noble'], [TYPE, TABLET]], [\n            /[;\\/]\\s(tm\\d{3}\\w+)\\sbuild/i\n            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [\n            /;\\s(k88)\\sbuild/i                                                  // ZTE K Series Tablet\n            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [\n            /;\\s(nx\\d{3}j)\\sbuild/i                                             // ZTE Nubia\n            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [\n            /[;\\/]\\s?(gen\\d{3})\\sbuild.*49h/i                                   // Swiss GEN Mobile\n            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [\n            /[;\\/]\\s?(zur\\d{3})\\sbuild/i                                        // Swiss ZUR Tablet\n            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [\n            /[;\\/]\\s?((zeki)?tb.*\\b)\\sbuild/i                                   // Zeki Tablets\n            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [\n            /[;\\/]\\s([yr]\\d{2})\\sbuild/i,\n            /[;\\/]\\s(dragon[\\-\\s]+touch\\s|dt)(\\w{5})\\sbuild/i                   // Dragon Touch Tablet\n            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [\n            /[;\\/]\\s?(ns-?\\w{0,9})\\sbuild/i                                     // Insignia Tablets\n            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [\n            /[;\\/]\\s?((nxa|Next)-?\\w{0,9})\\sbuild/i                             // NextBook Tablets\n            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [\n            /[;\\/]\\s?(xtreme\\_)?(v(1[045]|2[015]|[3469]0|7[05]))\\sbuild/i\n            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones\n            /[;\\/]\\s?(lvtel\\-)?(v1[12])\\sbuild/i                                // LvTel Phones\n            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [\n            /;\\s(ph-1)\\s/i\n            ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [                // Essential PH-1\n            /[;\\/]\\s?(v(100md|700na|7011|917g).*\\b)\\sbuild/i                    // Envizen Tablets\n            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [\n            /[;\\/]\\s?(trio[\\s\\w\\-\\.]+)\\sbuild/i                                 // MachSpeed Tablets\n            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [\n            /[;\\/]\\s?tu_(1491)\\sbuild/i                                         // Rotor Tablets\n            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [\n            /(shield[\\w\\s]+)\\sbuild/i                                           // Nvidia Shield Tablets\n            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, TABLET]], [\n            /(sprint)\\s(\\w+)/i                                                  // Sprint Phones\n            ], [VENDOR, MODEL, [TYPE, MOBILE]], [\n            /(kin\\.[onetw]{3})/i                                                // Microsoft Kin\n            ], [[MODEL, /\\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [\n            /droid\\s[\\d\\.]+;\\s(cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\\)/i     // Zebra\n            ], [MODEL, [VENDOR, 'Zebra'], [TYPE, TABLET]], [\n            /droid\\s[\\d\\.]+;\\s(ec30|ps20|tc[2-8]\\d[kx])\\)/i\n            ], [MODEL, [VENDOR, 'Zebra'], [TYPE, MOBILE]], [\n\n            ///////////////////\n            // CONSOLES\n            ///////////////////\n\n            /\\s(ouya)\\s/i,                                                      // Ouya\n            /(nintendo)\\s([wids3utch]+)/i                                       // Nintendo\n            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [\n            /droid.+;\\s(shield)\\sbuild/i                                        // Nvidia\n            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [\n            /(playstation\\s[345portablevi]+)/i                                  // Playstation\n            ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [\n            /[\\s\\(;](xbox(?:\\sone)?(?!;\\sxbox))[\\s\\);]/i                        // Microsoft Xbox\n            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [\n\n            ///////////////////\n            // SMARTTVS\n            ///////////////////\n\n            /smart-tv.+(samsung)/i                                              // Samsung\n            ], [VENDOR, [TYPE, SMARTTV]], [\n            /hbbtv.+maple;(\\d+)/i\n            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [\n            /(?:linux;\\snetcast.+smarttv|lg\\snetcast\\.tv-201\\d)/i,              // LG SmartTV\n            ], [[VENDOR, 'LG'], [TYPE, SMARTTV]], [\n            /(apple)\\s?tv/i                                                     // Apple TV\n            ], [VENDOR, [MODEL, 'Apple TV'], [TYPE, SMARTTV]], [\n            /crkey/i                                                            // Google Chromecast\n            ], [[MODEL, 'Chromecast'], [VENDOR, 'Google'], [TYPE, SMARTTV]], [\n            /droid.+aft([\\w])(\\sbuild\\/|\\))/i                                   // Fire TV\n            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, SMARTTV]], [\n            /\\(dtv[\\);].+(aquos)/i                                              // Sharp\n            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [\n            /hbbtv\\/\\d+\\.\\d+\\.\\d+\\s+\\([\\w\\s]*;\\s*(\\w[^;]*);([^;]*)/i            // HbbTV devices\n            ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [\n            /[\\s\\/\\(](android\\s|smart[-\\s]?|opera\\s)tv[;\\)\\s]/i                 // SmartTV from Unidentified Vendors\n            ], [[TYPE, SMARTTV]], [\n\n            ///////////////////\n            // WEARABLES\n            ///////////////////\n\n            /((pebble))app\\/[\\d\\.]+\\s/i                                         // Pebble\n            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [\n            /droid.+;\\s(glass)\\s\\d/i                                            // Google Glass\n            ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [\n            /droid\\s[\\d\\.]+;\\s(wt63?0{2,3})\\)/i\n            ], [MODEL, [VENDOR, 'Zebra'], [TYPE, WEARABLE]], [\n\n            ///////////////////\n            // EMBEDDED\n            ///////////////////\n\n            /(tesla)(?:\\sqtcarbrowser|\\/20[12]\\d\\.[\\w\\.-]+)/i                   // Tesla\n            ], [VENDOR, [TYPE, EMBEDDED]], [\n\n            ////////////////////\n            // MIXED (GENERIC)\n            ///////////////////\n\n            /droid .+?; ([^;]+?)(?: build|\\) applewebkit).+? mobile safari/i    // Android Phones from Unidentified Vendors\n            ], [MODEL, [TYPE, MOBILE]], [\n            /droid .+?;\\s([^;]+?)(?: build|\\) applewebkit).+?(?! mobile) safari/i  // Android Tablets from Unidentified Vendors\n            ], [MODEL, [TYPE, TABLET]], [\n            /\\s(tablet|tab)[;\\/]/i,                                             // Unidentifiable Tablet\n            /\\s(mobile)(?:[;\\/]|\\ssafari)/i                                     // Unidentifiable Mobile\n            ], [[TYPE, util.lowerize]], [\n            /(android[\\w\\.\\s\\-]{0,9});.+build/i                                 // Generic Android Device\n            ], [MODEL, [VENDOR, 'Generic']], [\n            /(phone)/i\n            ], [[TYPE, MOBILE]]\n        ],\n\n        engine : [[\n\n            /windows.+\\sedge\\/([\\w\\.]+)/i                                       // EdgeHTML\n            ], [VERSION, [NAME, 'EdgeHTML']], [\n\n            /webkit\\/537\\.36.+chrome\\/(?!27)([\\w\\.]+)/i                         // Blink\n            ], [VERSION, [NAME, 'Blink']], [\n\n            /(presto)\\/([\\w\\.]+)/i,                                             // Presto\n            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\\/([\\w\\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna\n            /ekioh(flow)\\/([\\w\\.]+)/i,                                          // Flow\n            /(khtml|tasman|links)[\\/\\s]\\(?([\\w\\.]+)/i,                          // KHTML/Tasman/Links\n            /(icab)[\\/\\s]([23]\\.[\\d\\.]+)/i                                      // iCab\n            ], [NAME, VERSION], [\n\n            /rv\\:([\\w\\.]{1,9})\\b.+(gecko)/i                                     // Gecko\n            ], [VERSION, NAME]\n        ],\n\n        os : [[\n\n            // Windows\n            /microsoft\\s(windows)\\s(vista|xp)/i                                 // Windows (iTunes)\n            ], [NAME, VERSION], [\n            /(windows)\\snt\\s6\\.2;\\s(arm)/i,                                     // Windows RT\n            /(windows\\sphone(?:\\sos)*)[\\s\\/]?([\\d\\.\\s\\w]*)/i,                   // Windows Phone\n            /(windows\\smobile|windows)[\\s\\/]?([ntce\\d\\.\\s]+\\w)(?!.+xbox)/i\n            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [\n            /(win(?=3|9|n)|win\\s9x\\s)([nt\\d\\.]+)/i\n            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [\n\n            // iOS/macOS\n            /ip[honead]{2,4}\\b(?:.*os\\s([\\w]+)\\slike\\smac|;\\sopera)/i,          // iOS\n            /cfnetwork\\/.+darwin/i\n            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [\n            /(mac\\sos\\sx)\\s?([\\w\\s\\.]*)/i,\n            /(macintosh|mac(?=_powerpc)\\s)(?!.+haiku)/i                         // Mac OS\n            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [\n\n            // Mobile OSes                                                      // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki/Sailfish OS\n            /(android|webos|palm\\sos|qnx|bada|rim\\stablet\\sos|meego|sailfish|contiki)[\\/\\s-]?([\\w\\.]*)/i,\n            /(blackberry)\\w*\\/([\\w\\.]*)/i,                                      // Blackberry\n            /(tizen|kaios)[\\/\\s]([\\w\\.]+)/i,                                    // Tizen/KaiOS\n            /\\((series40);/i                                                    // Series 40\n            ], [NAME, VERSION], [\n            /\\(bb(10);/i                                                        // BlackBerry 10\n            ], [VERSION, [NAME, 'BlackBerry']], [\n            /(?:symbian\\s?os|symbos|s60(?=;)|series60)[\\/\\s-]?([\\w\\.]*)/i       // Symbian\n            ], [VERSION, [NAME, 'Symbian']], [\n            /mozilla.+\\(mobile;.+gecko.+firefox/i                               // Firefox OS\n            ], [[NAME, 'Firefox OS']], [\n            /web0s;.+rt(tv)/i,\n            /\\b(?:hp)?wos(?:browser)?\\/([\\w\\.]+)/i                              // WebOS\n            ], [VERSION, [NAME, 'webOS']], [\n\n            // Google Chromecast\n            /crkey\\/([\\d\\.]+)/i                                                 // Google Chromecast\n            ], [VERSION, [NAME, 'Chromecast']], [\n            /(cros)\\s[\\w]+\\s([\\w\\.]+\\w)/i                                       // Chromium OS\n            ], [[NAME, 'Chromium OS'], VERSION],[\n\n            // Console\n            /(nintendo|playstation)\\s([wids345portablevuch]+)/i,                // Nintendo/Playstation\n            /(xbox);\\s+xbox\\s([^\\);]+)/i,                                       // Microsoft Xbox (360, One, X, S, Series X, Series S)\n\n            // GNU/Linux based\n            /(mint)[\\/\\s\\(\\)]?(\\w*)/i,                                          // Mint\n            /(mageia|vectorlinux)[;\\s]/i,                                       // Mageia/VectorLinux\n            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?=\\slinux)|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus|raspbian)(?:\\sgnu\\/linux)?(?:\\slinux)?[\\/\\s-]?(?!chrom|package)([\\w\\.-]*)/i,\n                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware\n                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus\n            /(hurd|linux)\\s?([\\w\\.]*)/i,                                        // Hurd/Linux\n            /(gnu)\\s?([\\w\\.]*)/i,                                               // GNU\n\n            // BSD based\n            /\\s([frentopc-]{0,4}bsd|dragonfly)\\s?(?!amd|[ix346]{1,2}86)([\\w\\.]*)/i,  // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly\n            /(haiku)\\s(\\w+)/i                                                   // Haiku\n            ], [NAME, VERSION], [\n\n            // Other\n            /(sunos)\\s?([\\w\\.\\d]*)/i                                            // Solaris\n            ], [[NAME, 'Solaris'], VERSION], [\n            /((?:open)?solaris)[\\/\\s-]?([\\w\\.]*)/i,                             // Solaris\n            /(aix)\\s((\\d)(?=\\.|\\)|\\s)[\\w\\.])*/i,                                // AIX\n            /(plan\\s9|minix|beos|os\\/2|amigaos|morphos|risc\\sos|openvms|fuchsia)/i,  // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia\n            /(unix)\\s?([\\w\\.]*)/i                                               // UNIX\n            ], [NAME, VERSION]\n        ]\n    };\n\n\n    /////////////////\n    // Constructor\n    ////////////////\n    var UAParser = function (ua, extensions) {\n\n        if (typeof ua === 'object') {\n            extensions = ua;\n            ua = undefined;\n        }\n\n        if (!(this instanceof UAParser)) {\n            return new UAParser(ua, extensions).getResult();\n        }\n\n        var _ua = ua || ((typeof window !== 'undefined' && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);\n        var _rgxmap = extensions ? util.extend(regexes, extensions) : regexes;\n\n        this.getBrowser = function () {\n            var _browser = { name: undefined, version: undefined };\n            mapper.rgx.call(_browser, _ua, _rgxmap.browser);\n            _browser.major = util.major(_browser.version); // deprecated\n            return _browser;\n        };\n        this.getCPU = function () {\n            var _cpu = { architecture: undefined };\n            mapper.rgx.call(_cpu, _ua, _rgxmap.cpu);\n            return _cpu;\n        };\n        this.getDevice = function () {\n            var _device = { vendor: undefined, model: undefined, type: undefined };\n            mapper.rgx.call(_device, _ua, _rgxmap.device);\n            return _device;\n        };\n        this.getEngine = function () {\n            var _engine = { name: undefined, version: undefined };\n            mapper.rgx.call(_engine, _ua, _rgxmap.engine);\n            return _engine;\n        };\n        this.getOS = function () {\n            var _os = { name: undefined, version: undefined };\n            mapper.rgx.call(_os, _ua, _rgxmap.os);\n            return _os;\n        };\n        this.getResult = function () {\n            return {\n                ua      : this.getUA(),\n                browser : this.getBrowser(),\n                engine  : this.getEngine(),\n                os      : this.getOS(),\n                device  : this.getDevice(),\n                cpu     : this.getCPU()\n            };\n        };\n        this.getUA = function () {\n            return _ua;\n        };\n        this.setUA = function (ua) {\n            _ua = (typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH) ? util.trim(ua, UA_MAX_LENGTH) : ua;\n            return this;\n        };\n        this.setUA(_ua);\n        return this;\n    };\n\n    UAParser.VERSION = LIBVERSION;\n    UAParser.BROWSER = {\n        NAME    : NAME,\n        MAJOR   : MAJOR, // deprecated\n        VERSION : VERSION\n    };\n    UAParser.CPU = {\n        ARCHITECTURE : ARCHITECTURE\n    };\n    UAParser.DEVICE = {\n        MODEL   : MODEL,\n        VENDOR  : VENDOR,\n        TYPE    : TYPE,\n        CONSOLE : CONSOLE,\n        MOBILE  : MOBILE,\n        SMARTTV : SMARTTV,\n        TABLET  : TABLET,\n        WEARABLE: WEARABLE,\n        EMBEDDED: EMBEDDED\n    };\n    UAParser.ENGINE = {\n        NAME    : NAME,\n        VERSION : VERSION\n    };\n    UAParser.OS = {\n        NAME    : NAME,\n        VERSION : VERSION\n    };\n\n    ///////////\n    // Export\n    //////////\n\n\n    // check js environment\n    if (typeof(exports) !== UNDEF_TYPE) {\n        // nodejs env\n        if (\"object\" !== UNDEF_TYPE && module.exports) {\n            exports = module.exports = UAParser;\n        }\n        exports.UAParser = UAParser;\n    } else {\n        // requirejs env (optional)\n        if (true) {\n            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n                return UAParser;\n            }).call(exports, __webpack_require__, exports, module),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n        } else {}\n    }\n\n    // jQuery/Zepto specific (optional)\n    // Note:\n    //   In AMD env the global scope should be kept clean, but jQuery is an exception.\n    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,\n    //   and we should catch that.\n    var $ = typeof window !== 'undefined' && (window.jQuery || window.Zepto);\n    if ($ && !$.ua) {\n        var parser = new UAParser();\n        $.ua = parser.getResult();\n        $.ua.get = function () {\n            return parser.getUA();\n        };\n        $.ua.set = function (uastring) {\n            parser.setUA(uastring);\n            var result = parser.getResult();\n            for (var prop in result) {\n                $.ua[prop] = result[prop];\n            }\n        };\n    }\n\n})(typeof window === 'object' ? window : this);\n\n\n//# sourceURL=webpack://foot-print1/./node_modules/ua-parser-js/src/ua-parser.js?");

/***/ }),

/***/ "./src/action/firsttimePageCaptureSystem.js":
/*!**************************************************!*\
  !*** ./src/action/firsttimePageCaptureSystem.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"captureSysInfo\": () => (/* binding */ captureSysInfo)\n/* harmony export */ });\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ \"./node_modules/lodash/get.js\");\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ua-parser-js */ \"./node_modules/ua-parser-js/src/ua-parser.js\");\n/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ua_parser_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper */ \"./src/helper.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api */ \"./src/api.js\");\n/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../const */ \"./src/const.js\");\n\r\n\r\n\r\n\r\n\r\nconst captureSysInfo = () => {\r\n    const basicInfo = getBasicInfo()\r\n    const packageInfo = getFromPackagesInfo()\r\n     // save session, check if session is existed \r\n    if (!sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_4__.sessionKeyUUID)) {\r\n        sessionStorage.setItem(_const__WEBPACK_IMPORTED_MODULE_4__.sessionKeyUUID, basicInfo.sessionId )\r\n    }\r\n    const flagCallSaveNonPerData = Number(sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_4__.footPrintNonPerFirstTime))\r\n    // applicationId\r\n\r\n    if (!flagCallSaveNonPerData || flagCallSaveNonPerData < 2) {\r\n        saveToSessionStorage({ ...basicInfo, ...packageInfo })\r\n        // current position\r\n        //post data\r\n        ;(0,_api__WEBPACK_IMPORTED_MODULE_3__.nonPersonal)({ ...basicInfo, ...packageInfo })\r\n            .then(res => {\r\n                //mark data is save\r\n                sessionStorage.setItem(_const__WEBPACK_IMPORTED_MODULE_4__.footPrintNonPerFirstTime, flagCallSaveNonPerData + 1)\r\n            })\r\n        // getDataNeedAllowed(({ lat, lon }) => {\r\n        //     console.log(lat, lon, \"===lat, lon===\");\r\n        // })\r\n    }\r\n\r\n    let getapplicationId = sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_4__.applicationId)\r\n    // applicationId\r\n    if (getapplicationId && 2 < flagCallSaveNonPerData < 4) {\r\n        saveToSessionStorage({ ...basicInfo, ...packageInfo })\r\n        ;(0,_api__WEBPACK_IMPORTED_MODULE_3__.nonPersonal)({ ...basicInfo, ...packageInfo, appId: getapplicationId })\r\n            .then(res => {\r\n                sessionStorage.setItem(_const__WEBPACK_IMPORTED_MODULE_4__.footPrintNonPerFirstTime, flagCallSaveNonPerData + 1)\r\n            })\r\n    }\r\n\r\n    getDataNeedAllowed(({ lat, lon }) => {\r\n        (0,_api__WEBPACK_IMPORTED_MODULE_3__.nonPersonal)({ ...basicInfo, ...packageInfo, latitude: lat, longitude: lon })\r\n            .then(res => {\r\n                //mark data is save\r\n                sessionStorage.setItem(_const__WEBPACK_IMPORTED_MODULE_4__.footPrintNonPerFirstTime, flagCallSaveNonPerData + 1)\r\n            })\r\n    })\r\n    return 1\r\n}\r\n\r\nconst getBasicInfo = () => {\r\n    \r\n    const urlUnpack = (new URLSearchParams(decodeURIComponent(location.search)))\r\n    return {\r\n        userAgent: navigator.userAgent,\r\n        screenWidth: screen.width,\r\n        screenHeight: screen.height,\r\n        sessionId: _helper__WEBPACK_IMPORTED_MODULE_2__.UUID.getInstance(),\r\n        utmSource: urlUnpack.get(\"utm_source\"), \r\n        utmMedium: urlUnpack.get(\"utm_medium\"), \r\n        utmCampaign: urlUnpack.get(\"utm_campaign\"), \r\n        utmId: urlUnpack.get(\"utm_id\"), \r\n        utmTerm: urlUnpack.get(\"utm_term\"), \r\n        utmContent: urlUnpack.get(\"utm_content\"), \r\n    }\r\n}\r\n\r\nconst getFromPackagesInfo =  () => {\r\n    var parser = new (ua_parser_js__WEBPACK_IMPORTED_MODULE_1___default())();\r\n    const result = parser.getResult()\r\n    const baseAgent = parser.setUA(navigator.userAgent).getDevice()\r\n    return {\r\n        browserName: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(result,'browser.name'),\r\n        browserNameVersion: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(result,'browser.version'),\r\n        typeOfDevice: (baseAgent.type||'Desktop')+'_'+(baseAgent.model||'')+'_'+(baseAgent.vendor||''),\r\n        operatingsystem: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(result, 'os.name') + '_' + lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(result, 'os.name'),\r\n        effectiveType: navigator?.connection?.effectiveType,\r\n        downlink: navigator?.connection?.downlink,\r\n    }\r\n}\r\n\r\nconst getDataNeedAllowed = (cb) => {\r\n    navigator.geolocation.getCurrentPosition(function (position) {\r\n        if (position.coords) {\r\n            let lat = position.coords.latitude;\r\n            let lon = position.coords.longitude;\r\n            saveToSessionStorage({ lat, lon })\r\n            cb({ lat, lon })\r\n        }\r\n      });\r\n}\r\n\r\nconst saveToSessionStorage = (basicValues, key=_const__WEBPACK_IMPORTED_MODULE_4__.localObjectCombineActionKey) => {\r\n    let old = sessionStorage.getItem(key) || `{}`;\r\n    old = JSON.parse(old)\r\n    sessionStorage.setItem(key, JSON.stringify({...old, ...basicValues}))\r\n}\n\n//# sourceURL=webpack://foot-print1/./src/action/firsttimePageCaptureSystem.js?");

/***/ }),

/***/ "./src/action/inputPrint.js":
/*!**********************************!*\
  !*** ./src/action/inputPrint.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"catchInputElement\": () => (/* binding */ catchInputElement),\n/* harmony export */   \"getListElementcheckCurrentPathChange\": () => (/* binding */ getListElementcheckCurrentPathChange)\n/* harmony export */ });\n/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ \"./node_modules/lodash/isEmpty.js\");\n/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash_isNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isNumber */ \"./node_modules/lodash/isNumber.js\");\n/* harmony import */ var lodash_isNumber__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isNumber__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/get */ \"./node_modules/lodash/get.js\");\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper */ \"./src/helper.js\");\n/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../const */ \"./src/const.js\");\n/* harmony import */ var _helperStorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helperStorage */ \"./src/helperStorage.js\");\n/* harmony import */ var _locallyLogic_jarvis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../locallyLogic/jarvis */ \"./src/locallyLogic/jarvis.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// ========form check input users========================================================================================================================================================================================\r\n// ================================================================================================================================================================================================\r\n// form check input users\r\n\r\nfunction saveInputForm(data) {\r\n  //save action history first\r\n  //  setNewTrackAction({ ...data, type: 'input' });\r\n  //\r\n  var listOfData = sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_4__.localKey2);\r\n  listOfData = JSON.parse(listOfData || '[]');\r\n  var { ele, ...data2 } = data;\r\n  var newDataTrackInput = [...listOfData, data2];\r\n  // filter same key value\r\n  newDataTrackInput = newDataTrackInput.filter(\r\n    (thing, i, self) => i === self.findIndex(t => t.key == thing.key)\r\n  );\r\n  sessionStorage.setItem(_const__WEBPACK_IMPORTED_MODULE_4__.localKey2, JSON.stringify(newDataTrackInput));\r\n}\r\n\r\nfunction checkingElement(myForm) {\r\n  for (let i = 0; i < myForm.length; i++) {\r\n    if (!myForm[i].isTrackedFocus) {\r\n      myForm[i].addEventListener('focus', event => {\r\n        // event.target.style.background = 'pink';\r\n        event.target.isTrackedFocus = true;\r\n\r\n        //save and get parent of components\r\n        if (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(event.target.trackingInput)) {\r\n          const nameItem = (0,_helper__WEBPACK_IMPORTED_MODULE_3__.getName)(event.target);\r\n          event.target.trackingInput = { displayName: nameItem.name };\r\n          event.target.parentTracking = nameItem.item;\r\n        }\r\n\r\n        event.target.timeStart = new Date().getTime();\r\n        event.target.focusTime = event.target.focusTime\r\n          ? event.target.focusTime + 1\r\n          : !event.target.focusTime;\r\n        if (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(event.target.jarvisField)) {\r\n          event.target.jarvisField = (0,_locallyLogic_jarvis__WEBPACK_IMPORTED_MODULE_6__.jarvisField)(\r\n            event.target,\r\n            event.target.trackingInput.displayName\r\n          );\r\n        }\r\n      });\r\n    }\r\n\r\n    if (!myForm[i].isTrackedBlur) {\r\n      myForm[i].addEventListener('blur', event => {\r\n        let valueInput =\r\n          (0,_helper__WEBPACK_IMPORTED_MODULE_3__.getValue)(event.target) ||\r\n          (0,_helper__WEBPACK_IMPORTED_MODULE_3__.getVal)(\r\n            event.target,\r\n            'parentElement.parentElement.firstElementChild.firstElementChild.innerHTML'\r\n          );\r\n\r\n        // check same value isn't captured.\r\n        let oldValue = event?.target?.trackingInput?.valueInput;\r\n        event.target.isTrackedBlur = true;\r\n\r\n        event.target.trackingInput = {\r\n          // ele: event.target,\r\n          beginInput: event.target.timeStart,\r\n          endInput: new Date().getTime(),\r\n          totalInput: new Date().getTime() - event.target.timeStart,\r\n          valueInput: valueInput,\r\n          key: event.target.timeStart + valueInput,\r\n          displayName: (0,_helper__WEBPACK_IMPORTED_MODULE_3__.getName)(event.target)?.name,\r\n          html: event.target.outerHTML,\r\n          urlPath: location.pathname,\r\n          timezoneOffset: new Date().getTimezoneOffset(),\r\n          sessionId: sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_4__.sessionKeyUUID),\r\n        };\r\n\r\n        // for only jarvis\r\n        if (event.target.jarvisField && event.target.jarvisField.isDateTime) {\r\n          // valueInput\r\n          event.target.parentTracking.valueTrack = (0,_locallyLogic_jarvis__WEBPACK_IMPORTED_MODULE_6__.dateTimeCompose)(\r\n            lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(event, 'target.trackingInput.valueInput'),\r\n            lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(event, 'target.parentTracking.valueTrack'),\r\n            event.target.jarvisField.level\r\n          );\r\n          event.target.trackingInput.valueInput =\r\n            event.target.parentTracking?.valueTrack;\r\n        }\r\n        if (event.target.jarvisField && event.target.jarvisField.isOTP) {\r\n          event.target.parentElement.valueTrack = (0,_locallyLogic_jarvis__WEBPACK_IMPORTED_MODULE_6__.otpCompose)(\r\n            lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(event, 'target.trackingInput.valueInput'),\r\n            lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(event, 'target.parentElement.valueTrack'),\r\n            event.target.jarvisField.level\r\n          );\r\n          event.target.trackingInput.valueInput =\r\n            event.target.parentElement?.valueTrack;\r\n        }\r\n\r\n        // event.target.style.background = '';\r\n        var saveTime = new Date().getTime() - event.target.timeStart;\r\n        event.target.timeSave = event.target.timeSave\r\n          ? event.target.timeSave + saveTime\r\n          : saveTime;\r\n\r\n        // event.target?.trackingInput?.nameInput = checkTypeOfInput(\r\n        //   event.target,\r\n        //   event.target.trackingInput\r\n        // );\r\n\r\n        //save to sessionStorage\r\n        if (event.target.trackingInput.valueInput !== oldValue) {\r\n          saveInputForm(event.target.trackingInput);\r\n        }\r\n        // cehck input before combine to value\r\n        console.log('track i');\r\n      });\r\n    }\r\n  }\r\n}\r\n\r\nfunction addEventList(MOUNT_NODE) {\r\n  var myForm1 = MOUNT_NODE.getElementsByTagName('input');\r\n  var myForm2 = MOUNT_NODE.getElementsByTagName('select');\r\n  var myForm3 = MOUNT_NODE.getElementsByTagName('textarea');\r\n  checkingElement(myForm1);\r\n  checkingElement(myForm2);\r\n  checkingElement(myForm3);\r\n\r\n  //jarvis custom action\r\n  (0,_locallyLogic_jarvis__WEBPACK_IMPORTED_MODULE_6__.bindCustomAction)(MOUNT_NODE);\r\n}\r\n\r\nfunction catchInputElement(MOUNT_NODE) {\r\n  // when change route\r\n  let countMouseMove = 0;\r\n  let countMouseClick = 0;\r\n  let countontouchstart = 0;\r\n  let onkeypress = 0;\r\n  //when users move mouse\r\n  MOUNT_NODE.onkeypress = function myFunction(e) {\r\n    console.log(e, \"=========e==================\");\r\n    if (!onkeypress) {\r\n      console.log(\r\n        'onkeypress onkeypress onkeypressonkeypress onkeypress onkeypress onkeypress onkeypress'\r\n      );\r\n      addEventList(MOUNT_NODE);\r\n    }\r\n    onkeypress++;\r\n  };\r\n  MOUNT_NODE.countontouchstart = function myFunction(e) {\r\n    if (!countontouchstart) {\r\n      console.log(\r\n        'countontouchstart countontouchstart countontouchstart countontouchstart countontouchstart'\r\n      );\r\n      addEventList(MOUNT_NODE);\r\n    }\r\n    countontouchstart++;\r\n  };\r\n  MOUNT_NODE.onmousemove = function myFunction(e) {\r\n    if (!countMouseMove) {\r\n      console.log(\r\n        'mouse move mouse move mouse movemouse movemouse movemouse move mouse move'\r\n      );\r\n      addEventList(MOUNT_NODE);\r\n    }\r\n    countMouseMove++;\r\n  };\r\n  MOUNT_NODE.onclick = function myFunction(e) {\r\n    if (!countMouseClick) {\r\n      console.log(\r\n        'mouse onclick = mouse onclick =mouse onclick =mouse onclick =mouse onclick =mouse onclick '\r\n      );\r\n      addEventList(MOUNT_NODE);\r\n    }\r\n    countMouseClick++;\r\n  };\r\n\r\n  setInterval(() => {\r\n    var historyTrack = JSON.parse(sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_4__.localKey));\r\n    if ((0,_helperStorage__WEBPACK_IMPORTED_MODULE_5__.isChangeRouteCheck)()) {\r\n      console.log('===route change===');\r\n      addEventList(MOUNT_NODE);\r\n      // var myForm1 = MOUNT_NODE.getElementsByTagName('input');\r\n      // var myForm2 = MOUNT_NODE.getElementsByTagName('select');\r\n      // var myForm3 = MOUNT_NODE.getElementsByTagName('textarea');\r\n      // checkingElement(myForm1);\r\n      // checkingElement(myForm2);\r\n      // checkingElement(myForm3);\r\n    }\r\n  }, 2000);\r\n}\r\n\r\n// for react csr\r\nfunction checkCurrentPathChange(myForm, MOUNT_NODE) {\r\n  for (let i = 0; i < myForm.length; i++) {\r\n    myForm[i].addEventListener('focus', event => {\r\n      if (_const__WEBPACK_IMPORTED_MODULE_4__.currentPath !== window.location.pathname) {\r\n        //if it isn't same path\r\n        checkingElement(MOUNT_NODE);\r\n        _const__WEBPACK_IMPORTED_MODULE_4__.currentPath = window.location.pathname;\r\n      }\r\n    });\r\n\r\n    myForm[i].addEventListener('blur', event => {\r\n      // event.target.style.background = '';\r\n      if (_const__WEBPACK_IMPORTED_MODULE_4__.currentPath !== window.location.pathname) {\r\n        checkingElement(MOUNT_NODE);\r\n        _const__WEBPACK_IMPORTED_MODULE_4__.currentPath = window.location.pathname;\r\n      }\r\n    });\r\n  }\r\n}\r\n\r\nfunction getListElementcheckCurrentPathChange(MOUNT_NODE) {\r\n  var myForm1 = MOUNT_NODE.getElementsByTagName('input');\r\n  var myForm2 = MOUNT_NODE.getElementsByTagName('select');\r\n  var myForm3 = MOUNT_NODE.getElementsByTagName('textarea');\r\n  // debugger;\r\n  checkCurrentPathChange(myForm1, MOUNT_NODE);\r\n  checkCurrentPathChange(myForm2, MOUNT_NODE);\r\n  checkCurrentPathChange(myForm3, MOUNT_NODE);\r\n}\r\n\n\n//# sourceURL=webpack://foot-print1/./src/action/inputPrint.js?");

/***/ }),

/***/ "./src/action/mouseMove.js":
/*!*********************************!*\
  !*** ./src/action/mouseMove.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ trackMouse)\n/* harmony export */ });\n/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const */ \"./src/const.js\");\n// track history action - new options 1\r\n\r\nwindow[_const__WEBPACK_IMPORTED_MODULE_0__.localTrackAction] = [];\r\n\r\nfunction setNewTrackAction(action) {\r\n  window[_const__WEBPACK_IMPORTED_MODULE_0__.localTrackAction].push(action);\r\n  // ex: action {type: 'mousemove', x: 12, y: 11}\r\n  // sessionStorage.setItem(\r\n  //   localKey,\r\n  //   JSON.stringify({\r\n  //     start: new Date(),\r\n  //     lastActiveTime: null, //set when last action\r\n  //     currentPath: location.pathname,\r\n  //     key: new Date().getTime() + location.pathname,\r\n  //   }),\r\n  // );\r\n}\r\nfunction trackMouse(MOUNT_NODE) {\r\n    // document.body.onmousemove = function myFunction(e) {\r\n    MOUNT_NODE.onmousemove = function myFunction(e) {\r\n      var x = e.clientX;\r\n      var y = e.clientY;\r\n      var coor = 'Coordinates: (' + x + ',' + y + ')';\r\n      setNewTrackAction({ type: 'mousemove', x, y });\r\n    };\r\n  \r\n    MOUNT_NODE.onclick = function myFunction(e) {\r\n      var x = e.clientX;\r\n      var y = e.clientY;\r\n      var coor = 'click: (' + x + ',' + y + ')';\r\n      setNewTrackAction({ type: 'click', x, y });\r\n    };\r\n  }\n\n//# sourceURL=webpack://foot-print1/./src/action/mouseMove.js?");

/***/ }),

/***/ "./src/action/routeHistory.js":
/*!************************************!*\
  !*** ./src/action/routeHistory.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"routeStuck\": () => (/* binding */ routeStuck),\n/* harmony export */   \"historyTrack\": () => (/* binding */ historyTrack)\n/* harmony export */ });\n/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ \"./node_modules/lodash/isEmpty.js\");\n/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const */ \"./src/const.js\");\n// scenario catch history path of users\r\n// cause of many cases these actions on browser changes route that's js source cannot catch up\r\n// should use interval to check and save for router history\r\n\r\n  \r\n\r\n\r\nfunction setNewTrack({ completed }) {\r\n  sessionStorage.setItem(\r\n    _const__WEBPACK_IMPORTED_MODULE_1__.localKey,\r\n    JSON.stringify({\r\n      start: new Date().getTime(),\r\n      timeBegin: new Date().getTime(),\r\n      timeEnd: null, //set when last action\r\n      currentPath: location.pathname,\r\n      urlPath: location.href,\r\n      key: new Date().getTime() + location.pathname,\r\n      completed\r\n    }),\r\n  );\r\n}\r\n\r\n\r\n//tracking route change\r\nfunction trackingInterval() {\r\n  // const trackingRange = setInterval(() => {\r\n    if (sessionStorage) {\r\n      // var key = localKey + location.pathname;\r\n      var historyTrack = sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_1__.localKey);\r\n      if (!historyTrack) {\r\n        setNewTrack({ completed: false});\r\n      } else {\r\n        historyTrack = JSON.parse(historyTrack);\r\n        //track path\r\n        if (historyTrack.currentPath != location.pathname) {\r\n          //save to history localKeyHistory\r\n          var localHistory = sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_1__.localKeyHistory);\r\n          sessionStorage.setItem(_const__WEBPACK_IMPORTED_MODULE_1__.isChangeRoute, '1')\r\n          var newLocalHistory = [];\r\n          if (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(localHistory)) {\r\n            newLocalHistory = [{...historyTrack, completed: true}];\r\n            sessionStorage.setItem(\r\n              _const__WEBPACK_IMPORTED_MODULE_1__.localKeyHistory,\r\n              JSON.stringify(newLocalHistory),\r\n            );\r\n          } else {\r\n            localHistory = JSON.parse(localHistory);\r\n            localHistory = localHistory.map(i => ({ ...i, completed: true }))\r\n            // newLocalHistory = [...localHistory, historyTrack];\r\n            localHistory.push({ ...historyTrack, completed: true })\r\n            // if (!localHistory.findIndex(e => e.key == historyTrack.key)) {\r\n              sessionStorage.setItem(\r\n                _const__WEBPACK_IMPORTED_MODULE_1__.localKeyHistory,\r\n                JSON.stringify(localHistory),\r\n              );\r\n            // }\r\n          }\r\n\r\n          //set new track when change route\r\n          setNewTrack({ completed: false});\r\n        } else {\r\n          clearInterval(trackingRange);\r\n        }\r\n      }\r\n    }\r\n  // }, 500);\r\n}\r\n\r\n\r\n//tracking users is stucked in any screen\r\nfunction routeStuck() {\r\n  setInterval(() => {\r\n    if (sessionStorage) {\r\n      var key = _const__WEBPACK_IMPORTED_MODULE_1__.localKey;\r\n      // var key = localKey + location.pathname;\r\n      var historyTrack = JSON.parse(sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_1__.localKey));\r\n      historyTrack = { ...historyTrack, completed: false }\r\n      historyTrack.totalTime =  Math.abs(new Date() - new Date(historyTrack.start))\r\n      historyTrack.sessionId =  sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_1__.sessionKeyUUID)\r\n      // sessionKeyUUID\r\n      //////\r\n      if (historyTrack) {\r\n        if (Math.abs(new Date() - new Date(historyTrack.start)) > 10000 && historyTrack.currentPath == location.pathname) {\r\n            let localHistory = sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_1__.localKeyHistory);\r\n            let newLocalHistory = [];\r\n            if (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(localHistory)) {\r\n              newLocalHistory = [{...historyTrack, completed: false}];\r\n              sessionStorage.setItem(\r\n                _const__WEBPACK_IMPORTED_MODULE_1__.localKeyHistory,\r\n                JSON.stringify(newLocalHistory),\r\n              );\r\n            } else {\r\n              localHistory = JSON.parse(localHistory);\r\n              var currentRoute = localHistory.pop();\r\n              // combine currentRoute to get id its has saved before\r\n              localHistory.push({ ...currentRoute, ...historyTrack, completed: false });\r\n              // if (!localHistory.findIndex(e => e.key == historyTrack.key)) {\r\n                sessionStorage.setItem(\r\n                  _const__WEBPACK_IMPORTED_MODULE_1__.localKeyHistory,\r\n                  JSON.stringify(localHistory),\r\n                );\r\n              // }\r\n            }\r\n        }\r\n      }\r\n    }\r\n  },20000)\r\n}\r\n\r\n// last action\r\nconst historyTrack = () => {\r\n  document.getElementsByTagName('body')[0].addEventListener('mouseleave', e => {\r\n    trackingInterval();\r\n  });\r\n\r\n  document.getElementsByTagName('body')[0].addEventListener('click', e => {\r\n    trackingInterval();\r\n  });\r\n\r\n  trackingInterval()\r\n\r\n  //tracking route change\r\n  // trackingInterval();\r\n  // tracking route is stucked\r\n  routeStuck()\r\n};\r\n\n\n//# sourceURL=webpack://foot-print1/./src/action/routeHistory.js?");

/***/ }),

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"apiList\": () => (/* binding */ apiList),\n/* harmony export */   \"landing\": () => (/* binding */ landing),\n/* harmony export */   \"personal\": () => (/* binding */ personal),\n/* harmony export */   \"nonPersonal\": () => (/* binding */ nonPersonal)\n/* harmony export */ });\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ \"./src/request.js\");\n\r\n// import { GET_TODO_LIST, GET_DASHBOARD_STATISTIC, TOKEN_KEY } from './const';\r\nconst apiList = {\r\n  landing: '/data-gathering/save-landing',\r\n  nonPersonal: '/data-gathering/save-non-personal-data',\r\n  personal: '/data-gathering/save-personal-data',\r\n};\r\n\r\n// export const getToken = () => {\r\n//   if (process.browser) {\r\n//     // client-side-only\r\n//     // return storage.getItem(TOKEN_KEY);\r\n//   } else return;\r\n// };\r\nconst landing = payload => {\r\n  return (0,_request__WEBPACK_IMPORTED_MODULE_0__.post)({\r\n    url: apiList.landing,\r\n    data: payload,\r\n    apiName: 'landing',\r\n  });\r\n};\r\n\r\nconst personal = payload => {\r\n  return (0,_request__WEBPACK_IMPORTED_MODULE_0__.post)({\r\n    url: apiList.personal,\r\n    data: payload,\r\n    apiName: 'personal',\r\n  });\r\n};\r\n\r\nconst nonPersonal = payload => {\r\n  // payload = {\r\n  //   \"source\":\"SOURCE\",\r\n  //   \"campaign\":\"campaign\",\r\n  //   \"utmSource\":\"utmSource\",\r\n  //   \"utmMedium\":\"utmMedium\",\r\n  //   \"utmCampaign\":\"utmCampaign\",\r\n  //   \"utmTerm\":\"utmTerm\",\r\n  //   \"utmContent\":\"utmContent\",\r\n  //   \"browser\":\"CHORME\",\r\n  //   \"userAgent\":\"USER AGENT\",\r\n  //   \"ipAddress\":\"192.168.0.1\",\r\n  //   \"latitude\":\"105\",\r\n  //   \"longitude\":\"106\",\r\n  //   \"typeofDevice\":\"MOBILE\",\r\n  //   \"operatingSystem\":\"WINDOS 7\",\r\n  //   \"screenWidth\":\"1024\",\r\n  //   \"screenHeight\":\"768\",\r\n  //   \"sessionId\":\"2323132\",\r\n  //   \"phoneNumber\":\"0932222222\"\r\n  // }\r\n  return (0,_request__WEBPACK_IMPORTED_MODULE_0__.post)({\r\n    url: apiList.nonPersonal,\r\n    data: payload,\r\n    apiName: 'nonPersonal',\r\n  });\r\n};\r\n\r\n// body personal data\r\n// [\r\n//   {\r\n//     \"displayName\":\"so dien thoai\",\r\n//     \"valueInput\":\"0975705499\",\r\n//     \"nameInput\":\"sdt\",\r\n//     \"totalInput\":2,\r\n//     \"beginInput\":\"1\",\r\n//     \"endInput\":\"2\",\r\n//     \"orderInput\":1,\r\n//     \"urlPath\":\"vnexpress.net\",\r\n//     \"phoneNumber\":\"0975705488\",\r\n//     \"sessionId\":\"222222\"\r\n//   }\r\n//   ]\n\n//# sourceURL=webpack://foot-print1/./src/api.js?");

/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"timeRequestPersonalData\": () => (/* binding */ timeRequestPersonalData),\n/* harmony export */   \"localKey\": () => (/* binding */ localKey),\n/* harmony export */   \"isChangeRoute\": () => (/* binding */ isChangeRoute),\n/* harmony export */   \"localKeyHistory\": () => (/* binding */ localKeyHistory),\n/* harmony export */   \"localKeyHistoryKey\": () => (/* binding */ localKeyHistoryKey),\n/* harmony export */   \"trackingRange\": () => (/* binding */ trackingRange),\n/* harmony export */   \"currentPath\": () => (/* binding */ currentPath),\n/* harmony export */   \"localKey2\": () => (/* binding */ localKey2),\n/* harmony export */   \"localTrackAction\": () => (/* binding */ localTrackAction),\n/* harmony export */   \"localObjectCombineActionKey\": () => (/* binding */ localObjectCombineActionKey),\n/* harmony export */   \"sessionKeyUUID\": () => (/* binding */ sessionKeyUUID),\n/* harmony export */   \"footPrintNonPerFirstTime\": () => (/* binding */ footPrintNonPerFirstTime),\n/* harmony export */   \"applicationId\": () => (/* binding */ applicationId)\n/* harmony export */ });\nvar timeRequestPersonalData = 15000;\r\n\r\nvar localKey = '___trackingRange__';\r\nvar isChangeRoute = '___trackingisChangeRoute__';\r\nvar localKeyHistory = '___trackingRangeHistory__';\r\nvar localKeyHistoryKey = '___trackingRangeHistoryKey__';\r\nvar trackingRange = null;\r\nvar currentPath = window.location.pathname;\r\nvar localKey2 = '___trackingRangeInputUsers__';\r\nvar localTrackAction = '___trackingRangeHistoryAction__';\r\nvar localObjectCombineActionKey = '___trackLocalObjectCombineAction__';\r\nvar sessionKeyUUID = \"___sessionKeyUUID___\"\r\nvar footPrintNonPerFirstTime = \"___footPrintNonPerFirstTime___\"\r\nvar applicationId = \"applicationId\"\r\n\n\n//# sourceURL=webpack://foot-print1/./src/const.js?");

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getVal\": () => (/* binding */ getVal),\n/* harmony export */   \"UUID\": () => (/* binding */ UUID),\n/* harmony export */   \"generateUUID\": () => (/* binding */ generateUUID),\n/* harmony export */   \"getValue\": () => (/* binding */ getValue),\n/* harmony export */   \"getName\": () => (/* binding */ getName),\n/* harmony export */   \"filterOTP\": () => (/* binding */ filterOTP),\n/* harmony export */   \"loadJs\": () => (/* binding */ loadJs)\n/* harmony export */ });\n// helper function\r\n\r\nconst getVal = (object, path) =>\r\n  path\r\n    .replace(/\\[/g, '.')\r\n    .replace(/\\]/g, '')\r\n    .split('.')\r\n    .reduce((o, k) => (o || {})[k], object);\r\n\r\nconst UUID = (function () {\r\n  var instance;\r\n\r\n  function createInstance() {\r\n    var d = new Date().getTime();\r\n    var d2 =\r\n      (typeof performance !== 'undefined' &&\r\n        performance.now &&\r\n        performance.now() * 1000) ||\r\n      0; //Time in microseconds since page-load or 0 if unsupported\r\n    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(\r\n      /[xy]/g,\r\n      function (c) {\r\n        var r = Math.random() * 16;\r\n        if (d > 0) {\r\n          //Use timestamp until depleted\r\n          r = (d + r) % 16 | 0;\r\n          d = Math.floor(d / 16);\r\n        } else {\r\n          //Use microseconds since page-load if supported\r\n          r = (d2 + r) % 16 | 0;\r\n          d2 = Math.floor(d2 / 16);\r\n        }\r\n        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);\r\n      }\r\n    );\r\n  }\r\n\r\n  return {\r\n    getInstance: function () {\r\n      if (!instance) {\r\n        instance = createInstance();\r\n      }\r\n      return instance;\r\n    },\r\n  };\r\n})();\r\n\r\nfunction generateUUID() {\r\n  var d = new Date().getTime();\r\n  var d2 =\r\n    (typeof performance !== 'undefined' &&\r\n      performance.now &&\r\n      performance.now() * 1000) ||\r\n    0; //Time in microseconds since page-load or 0 if unsupported\r\n  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {\r\n    var r = Math.random() * 16;\r\n    if (d > 0) {\r\n      //Use timestamp until depleted\r\n      r = (d + r) % 16 | 0;\r\n      d = Math.floor(d / 16);\r\n    } else {\r\n      //Use microseconds since page-load if supported\r\n      r = (d2 + r) % 16 | 0;\r\n      d2 = Math.floor(d2 / 16);\r\n    }\r\n    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);\r\n  });\r\n}\r\n\r\n// go through 100 parent items to get name or not\r\n\r\nfunction getValue(eleRaw) {\r\n  let name = null;\r\n  var count = 100;\r\n  let ele = eleRaw;\r\n  while (!name && count) {\r\n    if (ele?.innerText || ele?.value) {\r\n      name = ele?.value ||  ele?.innerText ;\r\n      return name;\r\n    }\r\n\r\n    let children = ele?.children || [];\r\n    for (let item of children) {\r\n      if (ele?.innerText || ele?.value) {\r\n        name = ele?.innerText || ele?.value;\r\n        return name;\r\n      }\r\n    }\r\n    count--;\r\n    if (!ele.parentElement) {\r\n      return;\r\n    }\r\n    ele = ele.parentElement;\r\n  }\r\n  return name;\r\n}\r\n\r\nfunction iterator1LevelTree(item) {\r\n  if (item?.name) {\r\n    return { item, name: item.name };\r\n  }\r\n  if (item.tagName == 'LABEL' && item.innerText) {\r\n    return { item, name: item.innerText };\r\n  }\r\n\r\n  let children = item?.children || [];\r\n  for (let item2 of children) {\r\n    if (item2?.name) {\r\n      return { item: item2, name: item2.name };\r\n    }\r\n    if (item2.tagName == 'LABEL' && item2.innerText) {\r\n      return { item: item2, name: item2.innerText };\r\n    }\r\n  }\r\n}\r\n\r\nfunction getName(eleRaw) {\r\n  let name = null;\r\n  var count = 100;\r\n  let ele = eleRaw;\r\n  while (!name && count) {\r\n    if (ele?.name) {\r\n      name = ele.name;\r\n      return { item: ele, name: ele.name };\r\n    }\r\n    if (ele.tagName == 'LABEL' && ele.innerText) {\r\n      return { item: ele, name: ele.innerText };\r\n    }\r\n\r\n    let children = ele?.children || [];\r\n    for (let item of children) {\r\n      name = iterator1LevelTree(item);\r\n      if (name) {\r\n        return name;\r\n      }\r\n    }\r\n    count--;\r\n    if (!ele.parentElement) {\r\n      return;\r\n    }\r\n    ele = ele.parentElement;\r\n  }\r\n  return name;\r\n}\r\n\r\nconst OTPremovePattern = /pin1|pin2|pin3|pin4|pin5/\r\nfunction filterOTP(value) {\r\n  return value.filter(i=>!OTPremovePattern.test(i.displayName))\r\n}\r\n\r\n\r\nconst loadJs = (src) => {\r\n  var scriptTag = document.createElement('script');\r\n  // jq.src = \"https://ajax.googleapis.com/ajax/libs/jquery/~~/jquery.min.js\";\r\n  scriptTag.src = src;\r\n  document.getElementsByTagName('head')[0].appendChild(scriptTag);\r\n} \n\n//# sourceURL=webpack://foot-print1/./src/helper.js?");

/***/ }),

/***/ "./src/helperStorage.js":
/*!******************************!*\
  !*** ./src/helperStorage.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isChangeRouteCheck\": () => (/* binding */ isChangeRouteCheck)\n/* harmony export */ });\n/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const */ \"./src/const.js\");\n\r\n\r\nfunction isChangeRouteCheck() {\r\n  let isChangeRoute1 = sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_0__.isChangeRoute);\r\n  if (isChangeRoute1) {\r\n    sessionStorage.removeItem(_const__WEBPACK_IMPORTED_MODULE_0__.isChangeRoute);\r\n    return true;\r\n  } else {\r\n      return false\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://foot-print1/./src/helperStorage.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _action_mouseMove__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action/mouseMove */ \"./src/action/mouseMove.js\");\n/* harmony import */ var _action_inputPrint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./action/inputPrint */ \"./src/action/inputPrint.js\");\n/* harmony import */ var _action_routeHistory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action/routeHistory */ \"./src/action/routeHistory.js\");\n/* harmony import */ var _action_firsttimePageCaptureSystem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./action/firsttimePageCaptureSystem */ \"./src/action/firsttimePageCaptureSystem.js\");\n/* harmony import */ var _makeRequest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./makeRequest */ \"./src/makeRequest.js\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n// last click and last active on that page\r\n// setInterval to catch route change and save time start with each route\r\n// current route is undefined or last active(\"click\" and \"mouseleave\") time is null\r\n// restart setInterval check route change when last action has already done.\r\n// if not -> remove setInterval, if thats true save start and end time with path and save new path and start time\r\n\r\n\r\n\r\nconst historyTrack = (MOUNT_NODE) => {\r\n    var historyTrack = sessionStorage.getItem(localKey);\r\n    document.getElementsByTagName('body')[0].addEventListener('mouseleave', e => {\r\n      setInterval(() => {\r\n        (0,_action_routeHistory__WEBPACK_IMPORTED_MODULE_2__.trackingInterval)();\r\n        //track change route \r\n        if (historyTrack.currentPath != location.pathname) {\r\n          console.log(\"===================change route====================================\");\r\n        }\r\n      }, 500);\r\n    });\r\n  \r\n    \r\n    // MOUNT_NODE.onkeypress = function myFunction(e) {\r\n    //   if (!countontouchstart) {\r\n    //     console.log(\r\n    //       \"countontouchstart countontouchstart countontouchstart countontouchstart countontouchstart\"\r\n    //     );\r\n    //     addEventList(MOUNT_NODE);\r\n    //   }\r\n    //   countontouchstart++;\r\n    // };\r\n  //tracking route change\r\n  // trackingInterval();\r\n  // tracking route is stucked\r\n  (0,_action_routeHistory__WEBPACK_IMPORTED_MODULE_2__.routeStuck)()\r\n}\r\n\r\n// global func attact to dom\r\nconst routeCheckInputUsers = (MOUNT_NODE) => {\r\n  if (MOUNT_NODE && MOUNT_NODE.getElementsByTagName) {\r\n    var excuteTime = 0;\r\n    const intervalAfterRender = setInterval(() => {\r\n      excuteTime++;\r\n      if (excuteTime >= 2) {\r\n        clearInterval(intervalAfterRender);\r\n      }\r\n      console.log(\"track analytics\");\r\n      (0,_action_firsttimePageCaptureSystem__WEBPACK_IMPORTED_MODULE_3__.captureSysInfo)();\r\n      // route history track\r\n      historyTrack(MOUNT_NODE);\r\n      \r\n      // =============================\r\n      (0,_action_inputPrint__WEBPACK_IMPORTED_MODULE_1__.catchInputElement)(MOUNT_NODE);\r\n      // getListElementcheckCurrentPathChange(MOUNT_NODE);\r\n      // trackMouse(MOUNT_NODE);\r\n\r\n      // track firsttime open page, capture system and utm\r\n    }, 2000);\r\n  }\r\n};\r\n\r\n// load 3th party js\r\n(0,_helper__WEBPACK_IMPORTED_MODULE_5__.loadJs)(\"https://score.juicyscore.com/static/13.2.0/js.js\");\r\nrouteCheckInputUsers(document.body);\r\n(0,_makeRequest__WEBPACK_IMPORTED_MODULE_4__.personalRequest)();\r\n\r\nwindow.juicyScoreApi.getSessionId().then(function (s) {\r\n  console.log(\"Session from getSessionId()\", s);\r\n});\r\n\n\n//# sourceURL=webpack://foot-print1/./src/index.js?");

/***/ }),

/***/ "./src/locallyLogic/jarvis.js":
/*!************************************!*\
  !*** ./src/locallyLogic/jarvis.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isDateTime\": () => (/* binding */ isDateTime),\n/* harmony export */   \"isOTP\": () => (/* binding */ isOTP),\n/* harmony export */   \"jarvisField\": () => (/* binding */ jarvisField),\n/* harmony export */   \"dateTimeCompose\": () => (/* binding */ dateTimeCompose),\n/* harmony export */   \"otpCompose\": () => (/* binding */ otpCompose),\n/* harmony export */   \"bindCustomAction\": () => (/* binding */ bindCustomAction)\n/* harmony export */ });\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ \"./node_modules/lodash/get.js\");\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper */ \"./src/helper.js\");\n/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const */ \"./src/const.js\");\n\r\n\r\n\r\n\r\nfunction isDateTime(name1) {\r\n  const name = /dateOfIssue|dob/;\r\n  return name.test(name1);\r\n}\r\n\r\nfunction isOTP(name1) {\r\n  const name = /pin1|pin/;\r\n  return name.test(name1);\r\n}\r\n\r\nfunction convertLevel(levelName) {\r\n  const level = [/ngày|Ngày/, /tháng|Tháng/, /năm|Năm/];\r\n  for (let [index, val] of level.entries()) {\r\n    if (val.test(levelName)) {\r\n      return index;\r\n    }\r\n  }\r\n}\r\n\r\nfunction jarvisField(element, name = \"\") {\r\n  const level = element[\"aria-activedescendant\"];\r\n  const isDate = isDateTime(name);\r\n\r\n  const isOTPConvert = isOTP(element.name);\r\n  const composeObj = {};\r\n  if (isDate) {\r\n    composeObj.level = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(\r\n      element,\r\n      \"parentElement.parentElement.children[0].textContent\"\r\n    ); // ngày|tháng|năm\r\n    composeObj.level = convertLevel(composeObj.level);\r\n  }\r\n\r\n  if (isOTPConvert) {\r\n    composeObj.level = element.name.match(/\\d/)\r\n      ? element.name.match(/\\d/)[0]\r\n      : null;\r\n  }\r\n\r\n  return {\r\n    ...composeObj,\r\n    isDateTime: isDate,\r\n    isOTP: isOTPConvert,\r\n  };\r\n}\r\n\r\nfunction dateTimeCompose(value, oldValue = \"/__/__/____/\", loc) {\r\n  let convertOldValue = oldValue.match(/\\/[\\d|\\_]{1,}/gm);\r\n  convertOldValue[loc] = \"/\" + value;\r\n  return convertOldValue.join(\"\");\r\n}\r\n\r\nString.prototype.replaceAt = function (index, replacement) {\r\n  return (\r\n    this.substr(0, index) + replacement + this.substr(index + 1, this.length)\r\n  );\r\n};\r\n// isNumber\r\nfunction otpCompose(value = \"_\", oldValue = \"______\", loc) {\r\n  if (!Number(value)) {\r\n    return oldValue;\r\n  }\r\n  var validValue = Number(value) ? value : \"_\";\r\n  return oldValue.replaceAt(loc - 1, validValue);\r\n}\r\n\r\n\r\nfunction saveInputForm(data) {\r\n  //save action history first\r\n  //  setNewTrackAction({ ...data, type: 'input' });\r\n  //\r\n  var listOfData = sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_2__.localKey2);\r\n  listOfData = JSON.parse(listOfData || '[]');\r\n  var { ele, ...data2 } = data;\r\n  var newDataTrackInput = [...listOfData, data2];\r\n  // filter same key value\r\n  newDataTrackInput = newDataTrackInput.filter(\r\n    (thing, i, self) => i === self.findIndex(t => t.key == thing.key)\r\n  );\r\n  sessionStorage.setItem(_const__WEBPACK_IMPORTED_MODULE_2__.localKey2, JSON.stringify(newDataTrackInput));\r\n}\r\n\r\nconst bindActionSecondDivChannel = (MOUNT_NODE) => {\r\n  setTimeout(() => {\r\n    var subBenefit = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(MOUNT_NODE.getElementsByClassName(\"container\"), \"[3].children[1].children[1]\")\r\n    if (subBenefit && !subBenefit.isTrackedBlur) {\r\n      subBenefit.addEventListener('click', (event) => {\r\n        console.log(event.target);\r\n        console.log((0,_helper__WEBPACK_IMPORTED_MODULE_1__.getValue)(event.target));\r\n  \r\n        let valueInput = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.getValue)(event.target);\r\n        event.target.isTrackedBlur = true;\r\n        event.target.trackingInput = {\r\n          beginInput: event.target.timeStart,\r\n          endInput: new Date().getTime(),\r\n          totalInput: new Date().getTime() - event.target.timeStart,\r\n          valueInput: valueInput,\r\n          key: event.target.timeStart + valueInput,\r\n          displayName: (0,_helper__WEBPACK_IMPORTED_MODULE_1__.getName)(event.target)?.name,\r\n          html: event.target.outerHTML,\r\n          urlPath: location.pathname,\r\n          timezoneOffset: new Date().getTimezoneOffset(),\r\n          sessionId: sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_2__.sessionKeyUUID),\r\n        };\r\n        saveInputForm(event.target.trackingInput);\r\n      })\r\n    }\r\n  },1000)\r\n  \r\n}\r\n\r\nfunction bindCustomAction(MOUNT_NODE) {\r\n  if (location.href === 'https://testdg.vpbank.com.vn/cards/benefits'||location.href === 'https://cards.vpbank.com.vn/cards/benefits') {\r\n    var mainBenefit = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(MOUNT_NODE.getElementsByClassName(\"container\"), \"[3].children[1].children[0]\")\r\n    // var subBenefit = get(MOUNT_NODE.getElementsByClassName(\"container\"), \"[3].children[1].children[1]\")\r\n\r\n      if (mainBenefit && !mainBenefit.isTrackedBlur) {\r\n        mainBenefit.addEventListener('click', (event) => {\r\n          console.log(event.target);\r\n          console.log((0,_helper__WEBPACK_IMPORTED_MODULE_1__.getValue)(event.target));\r\n  \r\n          let valueInput = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.getValue)(event.target);\r\n          event.target.isTrackedBlur = true;\r\n          event.target.trackingInput = {\r\n            // ele: event.target,\r\n            beginInput: event.target.timeStart,\r\n            endInput: new Date().getTime(),\r\n            totalInput: new Date().getTime() - event.target.timeStart,\r\n            valueInput: valueInput,\r\n            key: event.target.timeStart + valueInput,\r\n            displayName: (0,_helper__WEBPACK_IMPORTED_MODULE_1__.getName)(event.target)?.name,\r\n            html: event.target.outerHTML,\r\n            urlPath: location.pathname,\r\n            timezoneOffset: new Date().getTimezoneOffset(),\r\n            sessionId: sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_2__.sessionKeyUUID),\r\n          };\r\n          saveInputForm(event.target.trackingInput);\r\n          bindActionSecondDivChannel(MOUNT_NODE)\r\n        })\r\n    }\r\n    \r\n    // if (subBenefit && !subBenefit.isTrackedBlur) {\r\n    //   subBenefit.addEventListener('click', (event) => {\r\n    //     console.log(event.target);\r\n    //     console.log(getValue(event.target));\r\n\r\n    //     let valueInput = getValue(event.target);\r\n    //     event.target.isTrackedBlur = true;\r\n    //     event.target.trackingInput = {\r\n    //       beginInput: event.target.timeStart,\r\n    //       endInput: new Date().getTime(),\r\n    //       totalInput: new Date().getTime() - event.target.timeStart,\r\n    //       valueInput: valueInput,\r\n    //       key: event.target.timeStart + valueInput,\r\n    //       displayName: getName(event.target)?.name,\r\n    //       html: event.target.outerHTML,\r\n    //       urlPath: location.pathname,\r\n    //       timezoneOffset: new Date().getTimezoneOffset(),\r\n    //       sessionId: sessionStorage.getItem(sessionKeyUUID),\r\n    //     };\r\n    //     console.log(event.target.trackingInput, \"==============+============\");\r\n    //     saveInputForm(event.target.trackingInput);\r\n    //   })\r\n    // }\r\n\r\n  }\r\n}\n\n//# sourceURL=webpack://foot-print1/./src/locallyLogic/jarvis.js?");

/***/ }),

/***/ "./src/makeRequest.js":
/*!****************************!*\
  !*** ./src/makeRequest.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"personalRequest\": () => (/* binding */ personalRequest)\n/* harmony export */ });\n/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ \"./node_modules/lodash/isEmpty.js\");\n/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./const */ \"./src/const.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n\r\n\r\n\r\n\r\nfunction personalRequest() {\r\n  setInterval(() => {\r\n    const usersData = JSON.parse(sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_1__.localKey2));\r\n    if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(usersData)) {\r\n      const filterJarvis = (0,_helper__WEBPACK_IMPORTED_MODULE_3__.filterOTP)(usersData)\r\n      // console.log(filterJarvis);\r\n      ;(0,_api__WEBPACK_IMPORTED_MODULE_2__.personal)(filterJarvis).then(() => {\r\n          sessionStorage.removeItem(_const__WEBPACK_IMPORTED_MODULE_1__.localKey2)\r\n      })\r\n    }\r\n\r\n    let usersDataRouteHistory = JSON.parse(\r\n      sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_1__.localKeyHistory)\r\n    );\r\n    if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(usersDataRouteHistory)) {\r\n      //get key before save\r\n      let routeHistoryOfUsers = usersDataRouteHistory.shift();\r\n      const key = sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_1__.localKeyHistoryKey);\r\n      // routeHistoryOfUsers = routeHistoryOfUsers.id ? { ...routeHistoryOfUsers, id: key }: routeHistoryOfUsers\r\n      (0,_api__WEBPACK_IMPORTED_MODULE_2__.landing)(routeHistoryOfUsers).then((res) => {\r\n        // sessionStorage.setItem(localKeyHistoryKey, res.id)\r\n        if (routeHistoryOfUsers.completed) {\r\n          console.log(\"request completed 1\");\r\n          sessionStorage.setItem(\r\n            _const__WEBPACK_IMPORTED_MODULE_1__.localKeyHistory,\r\n            JSON.stringify(usersDataRouteHistory)\r\n          );\r\n        } else {\r\n          console.log(\"request is not completed 1\");\r\n\r\n          routeHistoryOfUsers = !routeHistoryOfUsers.id\r\n            ? { ...routeHistoryOfUsers, id: res.id }\r\n            : routeHistoryOfUsers;\r\n          usersDataRouteHistory.unshift(routeHistoryOfUsers);\r\n          sessionStorage.setItem(\r\n            _const__WEBPACK_IMPORTED_MODULE_1__.localKeyHistory,\r\n            JSON.stringify(usersDataRouteHistory)\r\n          );\r\n        }\r\n      });\r\n    }\r\n  }, _const__WEBPACK_IMPORTED_MODULE_1__.timeRequestPersonalData || 10000);\r\n}\r\n\r\n// {\r\n// \t\"displayName\":\"so dien thoai\",\r\n\r\n// \t\"valueInput\":\"0975705499\",\r\n\r\n// \t\"nameInput\":\"sdt\",\r\n\r\n// \t\"totalInput\":2,\r\n\r\n// \t\"beginInput\":\"1\",\r\n\r\n// \t\"endInput\":\"2\",\r\n\r\n// \t\"orderInput\":1,\r\n\r\n// \t\"urlPath\":\"vnexpress.net\",\r\n\r\n// \t\"phoneNumber\":\"0975705488\",\r\n// \t\"sessionId\":\"222222\"\r\n// },\r\n\n\n//# sourceURL=webpack://foot-print1/./src/makeRequest.js?");

/***/ }),

/***/ "./src/request.js":
/*!************************!*\
  !*** ./src/request.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ROOT_URI\": () => (/* binding */ ROOT_URI),\n/* harmony export */   \"API_TIMEOUT\": () => (/* binding */ API_TIMEOUT),\n/* harmony export */   \"download\": () => (/* binding */ download),\n/* harmony export */   \"get\": () => (/* binding */ get),\n/* harmony export */   \"post\": () => (/* binding */ post),\n/* harmony export */   \"put\": () => (/* binding */ put),\n/* harmony export */   \"deleteData\": () => (/* binding */ deleteData)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./const */ \"./src/const.js\");\n/* eslint-disable no-unused-vars */\r\n\r\n\r\n\r\nconst ROOT_URI = 'https://testdg.vpbank.com.vn/jarvisapi/';\r\n\r\n\r\nconst API_TIMEOUT = '30000';\r\n// const ROOT_URI = process.env.ROOT_URI;\r\nconst instance = axios__WEBPACK_IMPORTED_MODULE_0___default().create({\r\n  baseURL: ROOT_URI,\r\n  // timeout: API_TIMEOUT,\r\n});\r\n\r\nconst sendRequest = ({ url, method, params, data, apiName = '', isGetHeader, headers = {} }) =>\r\n  instance({\r\n    url,\r\n    method,\r\n    params,\r\n    data,\r\n    headers: {\r\n      ...headers,\r\n      Authorization: sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_1__.sessionKeyUUID) ? `${sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_1__.sessionKeyUUID)}` : '',\r\n      'Access-Control-Allow-Origin': '*',\r\n    },\r\n    // mode: 'no-cors',\r\n  })\r\n    .then(response =>\r\n      !isGetHeader ? handleSuccess(response.data, apiName, response) : handleSuccess(response, apiName, response)\r\n    )\r\n    .catch(error => handleError(error, apiName));\r\n\r\nconst sendDownloadRequest = ({ url, method, params, data, apiName = '', isGetHeader, headers = {} }) =>\r\n  instance({\r\n    url,\r\n    method,\r\n    params,\r\n    data,\r\n    responseType: 'blob',\r\n    headers: {\r\n      ...headers,\r\n      Authorization: sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_1__.sessionKeyUUID) ? `${sessionStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_1__.sessionKeyUUID)}` : '',\r\n      'Access-Control-Allow-Origin': '*',\r\n    },\r\n    // mode: 'no-cors',\r\n  })\r\n    .then(response => {\r\n      const url = window.URL.createObjectURL(new Blob([response.data]));\r\n      const link = document.createElement('a');\r\n      link.href = url;\r\n      link.setAttribute('download', 'file.xls');\r\n      document.body.appendChild(link);\r\n      link.click();\r\n    })\r\n    .catch(error => handleError(error, apiName));\r\n\r\nconst download = ({ url, params = {}, apiName, isGetHeader }) =>\r\n  sendDownloadRequest({ url, params, method: 'GET', apiName, isGetHeader });\r\n\r\nconst get = ({ url, params = {}, apiName, isGetHeader }) =>\r\n  sendRequest({ url, params, method: 'GET', apiName, isGetHeader });\r\n\r\nconst post = ({ url, params, data, apiName, headers }) =>\r\n  sendRequest({ url, params, data, method: 'POST', apiName, headers });\r\n\r\nconst put = ({ url, params, data, apiName }) => sendRequest({ url, params, data, method: 'PUT', apiName });\r\n\r\nconst deleteData = ({ url, params, data, apiName }) =>\r\n  sendRequest({ url, params, data, method: 'DELETE', apiName });\r\n\r\nconst handleSuccess = (respond, apiName, response) => {\r\n  if (apiName) {\r\n    const message = `${apiName} is succeed`;\r\n  }\r\n  if (response) {\r\n    if (response.headers.authorization) {\r\n      sessionStorage.setItem('token', response.headers.authorization);\r\n    }\r\n  }\r\n  return Promise.resolve(respond);\r\n};\r\n\r\nconst handleError = (error, apiName) => {\r\n  let message = `Something went wrong`;\r\n  if (error.response?.status == 401) {\r\n    // alert('bạn cần bạn cần đăng nhập lại');\r\n    // location.replace(ROUTE.notFound);\r\n  }\r\n  if (error.response) {\r\n    if (error.response.data) {\r\n      message = error.response.data.error || error.response.data.message;\r\n    }\r\n  }\r\n\r\n  if (apiName) {\r\n    message = `${apiName} is failed`;\r\n  }\r\n  // throw new Error(error);\r\n  return Promise.reject(error);\r\n};\r\n\n\n//# sourceURL=webpack://foot-print1/./src/request.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
