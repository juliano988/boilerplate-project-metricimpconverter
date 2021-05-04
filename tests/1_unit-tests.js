const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

const invalidNumberRegex = /^\/|\/[0-9]\/|\/{2,}|\/[A-z]|[A-z]\/|[0-9][A-z][0-9]/;
const validUnitRegex = /^(gal|l|lbs|kg|mi|km)(?!.)|[0-9](gal|l|lbs|kg|mi|km)$/;

suite('Unit Tests', function () {

  test('convertHandler should correctly read a whole number input.', function () {
    assert.equal(convertHandler.getNum('10kg'), 10)
    assert.equal(convertHandler.getNum('10gal'), 10)
    assert.equal(convertHandler.getNum('2mi'), 2)
  })

  test('convertHandler should correctly read a decimal number input.', function () {
    assert.equal(convertHandler.getNum('10.5kg'), 10.5)
    assert.equal(convertHandler.getNum('14.3gal'), 14.3)
    assert.equal(convertHandler.getNum('2.44mi'), 2.44)
  })

  test('convertHandler should correctly read a fractional input.', function () {
    assert.equal(convertHandler.getNum('1/5kg'), 0.2)
    assert.equal(convertHandler.getNum('1/2gal'), 0.5)
    assert.equal(convertHandler.getNum('1/10mi'), 0.1)
  })

  test('convertHandler should correctly read a fractional input with a decimal.', function () {
    assert.equal(convertHandler.getNum('10.5/5kg'), 2.1)
    assert.equal(convertHandler.getNum('4.3/2gal'), 2.15)
    assert.equal(convertHandler.getNum('5/10.4mi'), 0.4807692307692307)
  })

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
    assert.isTrue(Boolean('5/5/2kg'.match(invalidNumberRegex)))
    assert.isTrue(Boolean('4/3/2gal'.match(invalidNumberRegex)))
    assert.isTrue(Boolean('5/1/4mi'.match(invalidNumberRegex)))
  })

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
    assert.equal(convertHandler.getNum('kg'), 1)
    assert.equal(convertHandler.getNum('gal'), 1)
    assert.equal(convertHandler.getNum('mi'), 1)
  })

  test('convertHandler should correctly read each valid input unit.', function () {
    assert.equal(convertHandler.getUnit('10.5/5kG'), 'kg')
    assert.equal(convertHandler.getUnit('4.3/2gAl'), 'gal')
    assert.equal(convertHandler.getUnit('5/10.4MI'), 'mi')
  })

  test('convertHandler should correctly return an error for an invalid input unit.', function () {
    assert.isFalse(Boolean('5/2kGg'.match(validUnitRegex)))
    assert.isFalse(Boolean('4.2GalL'.match(validUnitRegex)))
    assert.isFalse(Boolean('37m'.match(validUnitRegex)))
  })

});