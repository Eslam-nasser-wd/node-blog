var express         = require('express');
var router          = express.Router();
var User            = require('../../models/User')

/* GET home page. */
router.get('/', function(req, res, next) {
    User.find({}, function(err, users) {
      res.render('admin/all-admins', {users: users})
    });
});

module.exports = router;