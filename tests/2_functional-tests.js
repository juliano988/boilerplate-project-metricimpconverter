const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
  test('Convert a valid input such as 10L: GET request to /api/convert',function(done){
    chai.request(server)
      .get('/api/convert')
      .query({input: '10L'})
      .end(function(err,res){
        assert.equal(JSON.parse(res.text).string,'10 liters converts to 2.64172 gallons')
        done()
      })
  })

  test('Convert an invalid input such as 32g: GET request to /api/convert.',function(done){
    chai.request(server)
      .get('/api/convert')
      .query({input: '32g'})
      .end(function(err,res){
        assert.equal(res.text,'invalid unit')
        done()
      })
  })

  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.',function(done){
    chai.request(server)
      .get('/api/convert')
      .query({input: '3/7.2/4kg'})
      .end(function(err,res){
        console.log(res.text)
        assert.equal(res.text,'invalid number')
        done()
      })
  })

});
