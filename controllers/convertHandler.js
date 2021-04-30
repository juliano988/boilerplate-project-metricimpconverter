function ConvertHandler() {

  this.getNum = function (input) {
    return input.match(/[^A-z]+/) ? eval(input.match(/[^A-z]+/)[0]) : 1;
  };

  this.getUnit = function (input) {
    return input.match(/[A-z]+/)[0];
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case 'gal': return 'L';
      case 'L': return 'gal';
      case 'mi': return 'km';
      case 'km': return 'mi';
      case 'lbs': return 'kg';
      case 'kg': return 'lbs';
      default: return null;
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case 'gal': return 'gallons';
      case 'L': return 'liters';
      case 'mi': return 'miles';
      case 'km': return 'kilometers';
      case 'lbs': return 'pounds';
      case 'kg': return 'kilograms';
      default: return null;
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case 'gal': return initNum * galToL;
      case 'L': return initNum / galToL;
      case 'mi': return initNum * miToKm;
      case 'km': return initNum / miToKm;
      case 'lbs': return initNum * lbsToKg;
      case 'kg': return initNum / lbsToKg;
      default: return null;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return initNum + ' ' + initUnit + ' converts to ' + returnNum + ' ' + returnUnit;
  };

}

module.exports = ConvertHandler;
