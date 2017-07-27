(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(0);

var _stringify2 = _interopRequireDefault(_stringify);

exports.success = success;
exports.failure = failure;

var _awsSdk = __webpack_require__(3);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function success(body) {
    return buildResponse(200, body);
}

function failure(body) {
    return buildResponse(500, body);
}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: (0, _stringify2.default)(body)
    };
}

module.exports.someFunction = function (event, context, callback) {
    console.log(event, 'The Event object');
    var response = {
        statusCode: 200,
        body: (0, _stringify2.default)({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event
        })
    };

    callback(null, response);

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.someOtherFunction = function (event, context, callback) {
    console.log(event, 'The Event object');

    var response = {
        statusCode: 200,
        body: (0, _stringify2.default)({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event
        })
    };

    callback(null, response);

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.authNeededFunc = function (event, context, callback) {
    console.log(event);
    if (!event.body.idToken) {
        var _response = {
            statusCode: 400,
            body: (0, _stringify2.default)({
                message: 'no token!',
                input: event
            })
        };

        return callback(null, _response);
    }
    //

    var idToken = new _awsSdk.AmazonCognitoIdentity.CognitoIdToken({
        IdToken: event.body.tokens.idToken
    });
    var accessToken = new _awsSdk.AmazonCognitoIdentity.CognitoAccessToken({
        AccessToken: event.body.tokens.accessToken
    });
    var refreshToken = new _awsSdk.AmazonCognitoIdentity.CognitoRefreshToken({
        RefreshToken: event.body.tokens.refreshToken
    });

    var tokenData = { IdToken: idToken,
        RefreshToken: refreshToken,
        AccessToken: accessToken };

    var session = new _awsSdk.AmazonCognitoIdentity.CognitoUserSession(tokenData);

    var poolData = {
        UserPoolId: 'us-west-2_gj5EhwKNU',
        ClientId: '19cra7jhurb8fq5e70vdihrjjj',
        IdentityPoolId: 'us-west-2_gj5EhwKNU'
    };

    var userPool = new CognitoUserPool(poolData);

    var userData = {
        Username: req.body.username,
        Pool: userPool
    };

    var cognitoUser = new _awsSdk.AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.signInUserSession = session;
    var message = 'valid? ' + session.isValid();
    console.log('valid? ' + session.isValid());
    console.log(event, 'The Event object');

    var response = {
        statusCode: 200,
        body: (0, _stringify2.default)({
            message: message,
            input: event
        })
    };

    callback(null, response);

    // RAN OUT OF TIME!
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ })
/******/ ])));