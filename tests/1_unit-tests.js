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
    assert.isFalse(Boolean('5/2kGgmI'.match(validUnitRegex)))
    assert.isFalse(Boolean('4.2gGal'.match(validUnitRegex)))
    assert.isFalse(Boolean('37m'.match(validUnitRegex)))
  })

  test('convertHandler should return the correct return unit for each valid input unit.', function () {
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
    assert.equal(convertHandler.getReturnUnit('gal'), 'L')
    assert.equal(convertHandler.getReturnUnit('mi'), 'km')
  })

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
  })

  test('convertHandler should correctly convert gal to L.', function () {
    assert.equal(convertHandler.convert(10,'gal'), 37.85410)
    assert.equal(convertHandler.convert(21.5,'gal'), 81.38632)
    assert.equal(convertHandler.convert(44.98,'gal'), 170.26774)
  })

  test('convertHandler should correctly convert L to gal.', function () {
    assert.equal(convertHandler.convert(4,'L'), 1.05669)
    assert.equal(convertHandler.convert(33.1,'L'), 8.74410)
    assert.equal(convertHandler.convert(12.65,'L'), 3.34178)
  })

  test('convertHandler should correctly convert mi to km.', function () {
    assert.equal(convertHandler.convert(7,'mi'), 11.26538)
    assert.equal(convertHandler.convert(20.36,'mi'), 32.76616)
    assert.equal(convertHandler.convert(12.61,'mi'), 20.29378)
  })

  test('convertHandler should correctly convert km to mi.', function () {
    assert.equal(convertHandler.convert(2,'km'), 1.24275)
    assert.equal(convertHandler.convert(23.423,'km'), 14.55441)
    assert.equal(convertHandler.convert(432.21,'km'), 268.56351)
  })

  test('convertHandler should correctly convert lbs to kg.', function () {
    assert.equal(convertHandler.convert(4,'lbs'), 1.81437)
    assert.equal(convertHandler.convert(41.008,'lbs'), 18.60090)
    assert.equal(convertHandler.convert(12.56,'lbs'), 5.69712)
  })

  test('convertHandler should correctly convert kg to lbs.', function () {
    assert.equal(convertHandler.convert(8.1,'kg'), 17.85746)
    assert.equal(convertHandler.convert(21.73,'kg'), 47.90649)
    assert.equal(convertHandler.convert(31.44,'kg'), 69.31339)
  })

});