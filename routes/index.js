var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var user = require('./users.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.put('/user', user.create);

/*
 * Routes that can be accessed only by autheticated users
 */


/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);

module.exports = router;
