function ConvertHandler() {

  this.getNum = function (input) {
    return input.match(/[^A-z]+/) ? eval(input.match(/[^A-z]+/)[0]) : 1;
  };

  this.getUnit = function (input) {
    if (input.match(/[A-z]+/)[0] === 'l') {
      return 'L';
    } else {
      return input.match(/[A-z]+/)[0];
    }
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit.toLowerCase()) {
      case 'gal': return 'L';
      case 'l': return 'gal';
      case 'mi': return 'km';
      case 'km': return 'mi';
      case 'lbs': return 'kg';
      case 'kg': return 'lbs';
      default: return null;
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit.toLowerCase()) {
      case 'gal': return 'gallons';
      case 'l': return 'liters';
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

    switch (initUnit.toLowerCase()) {
      case 'gal': return Number((initNum * galToL).toFixed(5));
      case 'l': return Number((initNum / galToL).toFixed(5));
      case 'mi': return Number((initNum * miToKm).toFixed(5));
      case 'km': return Number((initNum / miToKm).toFixed(5));
      case 'lbs': return Number((initNum * lbsToKg).toFixed(5));
      case 'kg': return Number((initNum / lbsToKg).toFixed(5));
      default: return null;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return initNum + ' ' + initUnit + ' converts to ' + returnNum + ' ' + returnUnit;
  };

}

module.exports = ConvertHandler;
