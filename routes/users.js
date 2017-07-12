var UserModel = require('../models/Users.js');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);

var users = {

  getAll: function(req, res) {
    var allusers = data; // Spoof a DB call
    res.json(allusers);
  },

  getOne: function(req, res) {
    var id = req.params.id;
    var user = data[0]; // Spoof a DB call
    res.json(user);
  },

  create: function(req, res) {
    var body = req.body;

    var _firstName = body.firstName;
    var _lastName = body.firstName;
    var _email = body.email;
    var _password = body.password;

    if (_firstName && _lastName && _email && _password) {

      var hash = bcrypt.hashSync(_password, salt);

      var newUser = new UserModel({
        firstName: _firstName,
        lastName: _lastName,
        email: _email,
        password: hash
      });

      newUser.save(function(err) {
        if (err) {
          if (err.code == 11000) {
            res.status(409);
            res.json({
              "status": 409,
              "message": "A user with this email already exists."
            });
          }
        } else {
          res.status(200);
          res.json({
            "status": 200,
            "message": "User saved successfully."
          });
        }
      });
    } else {
      res.status(422);
      res.json({
        "status": 422,
        "message": "Missing parameter."
      });
    }
  },

  update: function(req, res) {
    var updateuser = req.body;
    var id = req.params.id;
    data[id] = updateuser // Spoof a DB call
    res.json(updateuser);
  },

  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};

var data = [{
  name: 'user 1',
  id: '1'
}, {
  name: 'user 2',
  id: '2'
}, {
  name: 'user 3',
  id: '3'
}];

module.exports = users;
