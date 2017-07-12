var jwt = require('jwt-simple');
var UserModel = require('../models/Users.js');
var bcrypt = require('bcrypt-nodejs');

var auth = {

  login: function(req, res) {
    var email = req.body.email || '';
    var password = req.body.password || '';

    if (email == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    UserModel.findOne({ email: email }, function(err, user) {
      if (user) {
        bcrypt.compare(password, user.password, function(err, resp) {
          if (resp) {
              res.json(genToken());
          } else {
            res.status(401);
            res.json({
              "status": 401,
              "message": "Invalid password"
            });
          }
        });
      } else {
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid email"
        });
      }
    });
  },

  validateUser: function(username) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB.
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };

    return dbUserObj;
  },
}

// private method
function genToken() {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());

  return {
    token: token,
    expires: expires
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
