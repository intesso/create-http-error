/**
 * module dependencies.
 */
var codes = require('http').STATUS_CODES;

/**
 * HttpError constructor function.
 *
 * @param code http error code
 * @param message optional message
 * @returns {HttpError}
 * @constructor
 */
function HttpError(code, message, properties) {
  // make sure calling HttpError also works without the new keyword
  if (!(this instanceof HttpError)) return new HttpError(code, message);

  // default arguments
  if (typeof message === 'object') properties = message, message = undefined;
  code = code || 500;
  code = typeof code === 'number' ? code : Number(code);
  message = message || codes[code] || codes[500];

  // create Error
  Error.call(this, message);
  this.name = 'HttpError';
  this.code = this.status = this.statusCode = code;
  this.msg = message; // message property is not assignable with `Error` Object. therefore use `msg` property

  var self = this;
  if (properties) {
    Object.keys(properties).forEach(function(key) {
      self[key] = properties[key];
    });
  }

  Error.captureStackTrace(this, HttpError);
}

/**
 * inherit from `Error`.
 *
 * @type {Error}
 */
HttpError.prototype = Object.create(Error.prototype, {
  constructor: {value: HttpError}
});

/**
 * return the `Error`s properties.
 *
 * @returns `Error` properties.
 */
HttpError.prototype.toJSON = function() {
  var self = this;
  var obj = {};
  Object.keys(this).forEach(function(key) {
    obj[key] = self[key];
  });

  return obj;
};

HttpError.prototype.toString = function() {
  var msg = this.msg || '';
  return 'HttpError: ' + msg;
};


/**
 * Expose HttpError
 * @type {HttpError}
 */
exports = module.exports = HttpError;

/**
 * Expose http codes
 * @type {exports.STATUS_CODES|*}
 */
exports.codes = codes;
