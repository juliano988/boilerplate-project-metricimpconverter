const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  test('convertHandler should correctly read a whole number input.',function(){
    const value = convertHandler.getNum('gal');
    console.log(value)
    assert.isNumber(value)
  })

});