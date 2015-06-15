var test = require('tape');
var HttpError = require('./index');

test('create error with code', function(t) {
  var err = HttpError(500);
  t.ok(err);
  t.equal(err.code, 500);
  t.equal(err.status, 500);
  t.equal(err.statusCode, 500);
  t.equal(err.msg, 'Internal Server Error');
  t.equal(err.name, 'HttpError');

  t.end();
});

test('create error with specific message', function(t) {
  var err = HttpError('404', 'uups');
  t.ok(err);
  t.equal(err.status, 404);
  t.equal(err.msg, 'uups');
  t.equal(err.name, 'HttpError');

  t.end();
});

test('create error with additional properties', function(t) {
  var err = HttpError('404', {
    reason: 'dunno',
    action: 'nada'
  });
  t.ok(err);
  t.equal(err.status, 404);
  t.equal(err.msg, 'Not Found');
  t.equal(err.name, 'HttpError');
  t.equal(err.reason, 'dunno');
  t.equal(err.action, 'nada');

  t.end();
});

test('test codes', function(t) {

  var codes = HttpError.codes;
  t.ok(codes);
  t.equal(codes[200], 'OK');
  t.equal(codes[400], 'Bad Request');
  t.end();
});

test('test toString()', function(t) {

  var err = HttpError('400');
  var str = err.toString();
  t.ok(str);

  t.equal(str, 'HttpError: Bad Request');
  t.end();
});

test('test toJSON()', function(t) {

  var err = HttpError('400');
  var json = err.toJSON();
  t.ok(json);

  t.equal(json.msg, 'Bad Request');
  t.end();
});
