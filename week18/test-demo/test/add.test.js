import assert from 'assert'
import {add} from '../src/add.js'
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
  describe('src/add', function () {
    it('should return 6 when run function add(2,4)', function () {
      assert.equal(add(2,4), 6);
    });
  });
});