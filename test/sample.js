var vows = require('vows');
var assert = require('assert');

var suite = vows.describe('Array');
suite.addBatch({ // batch
  'An array with 3 elements': { // context
    topic: [1, 2, 3], // topic
    'has a length of 3': function (topic) { // vow
      assert.equal(topic.length, 3);
    }
  },
  'An array': { // context
    'with zero elements': { // sub-context
      topic: [], // topic
      'has a length of 0': function (topic) { // vow
        assert.equal(topic.length, 0);
      },
      'returns *undefined*, when `pop()`ed': function (topic) { // vow
        assert.isUndefined(topic.pop());
      }
    }
  }
}).export(module);
