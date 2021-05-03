function ConvertHandler() {

  this.getNum = function (input) {
    return input.match(/[^A-z]+/) ? eval(input.match(/[^A-z]+/)[0]) : 1;
  };

  this.getUnit = function (input) {
    if (input.match(/[A-z]+/)[0] === 'L' | input.match(/[A-z]+/)[0] === 'l') {
      return 'L';
    } else {
      return input.match(/[A-z]+/)[0].toLowerCase();
    }
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case 'gal': return 'L';
      case 'l': return 'gal';
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
      case 'l': return 'liters';
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
      case 'gal': return (initNum * galToL).toFixed(5);
      case 'l': return (initNum / galToL).toFixed(5);
      case 'L': return (initNum / galToL).toFixed(5);
      case 'mi': return (initNum * miToKm).toFixed(5);
      case 'km': return (initNum / miToKm).toFixed(5);
      case 'lbs': return (initNum * lbsToKg).toFixed(5);
      case 'kg': return (initNum / lbsToKg).toFixed(5);
      default: return null;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return initNum + ' ' + initUnit + ' converts to ' + returnNum + ' ' + returnUnit;
  };

}

module.exports = ConvertHandler;
