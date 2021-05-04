'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const invalidNumber = Boolean(req.query.input.match(/^\/|\/[0-9]\/|\/{2,}|\/[A-z]|[A-z]\/|[0-9][A-z][0-9]/));
    const invalidUnit = !Boolean(req.query.input.toLowerCase().match(/^(gal|l|lbs|kg|mi|km)(?!.)|[0-9](gal|l|lbs|kg|mi|km)$/));
    
    if (invalidNumber && invalidUnit) {
      res.send('invalid number and unit');
    } else if (invalidNumber) {
      res.send('invalid number');
    } else if (invalidUnit) {
      res.send('invalid unit');
    } else {
      const initNum = convertHandler.getNum(req.query.input);
      const initUnit = convertHandler.getUnit(req.query.input);
      const spellInitUnit = convertHandler.spellOutUnit(initUnit);

      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const spellReturnUnit = convertHandler.spellOutUnit(returnUnit);

      const string = convertHandler.getString(initNum, spellInitUnit, returnNum, spellReturnUnit)

      res.json({ initNum: initNum, initUnit: initUnit, returnNum: Number(returnNum), returnUnit: returnUnit, string: string })
    }
  });

};
