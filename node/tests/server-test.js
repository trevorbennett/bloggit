var assert = require('assert');

describe('Array', function() {

  describe('index of', function(){

    it('should return -1 if value is not present', function(){

      assert.equal(-1, [0,1,2].indexOf(99));

    })

  })

})
