var routes = require('../routes');
var server = require('../server');
var assert = require('assert');
var expect = require('expect');

describe('Array', function() {

  describe('index of', function(){

    it('should return -1 if value is not present', function(){

      assert.equal(-1, [0,1,2].indexOf(99));

    });

  });

});


describe('Server', function() {

  it('should ensure the server starts correctly', function(){

    //todo: resolve async await issue with server startup
    server.boot();
    expect(server.server.listening).to.equal(true);
  });

});
