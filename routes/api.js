'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const initNum = convertHandler.getNum(req.query.input);
    const initUnit = convertHandler.getUnit(req.query.input);
    const spellInitUnit = convertHandler.spellOutUnit(initUnit);

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const spellReturnUnit = convertHandler.spellOutUnit(returnUnit);

    const string = convertHandler.getString(initNum, spellInitUnit, returnNum, spellReturnUnit)

    res.json({ initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: string })
  });

};
