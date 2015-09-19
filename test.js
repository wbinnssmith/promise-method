var test = require('blue-tape');
var Pinkie = require('pinkie');
var method = require('./');

test('given a function, returns a promise-returning function', function (t) {
  function foo (x, y) {
    return x * y;
  }

  return method(foo)(5, 6).then(function (res) {
    t.equal(res, 30);
  });
});

test('can return promises without re-wrapping', function (t) {
  function foo (x, y) {
    return Promise.resolve(x * y);
  }

  return method(foo)(5, 6).then(function (res) {
    t.equal(res, 30);
  });
});

test('passing through the calling context', function (t) {
  var foo = {
    z: 5,
    bar: method(function (x, y) {
      return x * y * this.z;
    })
  };

  return foo.bar(2, 3).then(function (res) {
    t.equal(res, 30);
  });
});

test('turns exceptions into rejection', function (t) {
  t.plan(1);

  var error = new Error('oh noes!');
  var foo = {
    z: 5,
    bar: method(function (x, y) {
      throw error;
    })
  };

  foo.bar(2, 3).then(function () {
    t.fail();
  }).catch(function (e) {
    t.equal(e, error);
  });
});

test('user-provided Promise', function (t) {
  function foo (x, y) {
    return x * y;
  }

  return method(foo, Pinkie)(5, 6).then(function (res) {
    t.equal(res, 30);
  });
});
