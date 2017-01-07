var express         = require('express');
var router          = express.Router();
var fs              = require('fs')
var User            = require('../../models/User')

/* GET home page. */
router.get('/', function(req, res, next) {
    User.find({}, function(err, users) {
      res.render('admin/all-admins', {users: users})
    });
});


router.delete('/:user_id', function(req, res, next) {
    User.findById(req.params.user_id)
      .exec(function(err, item){
        if (err || !item) {
            res.statusCode = 404;
            res.send({message: '404'});
        } else {
            item.remove(function(err) {
                if (err) {
                    res.statusCode = 403;
                    res.send(err);
                } else {
                  res.redirect('/admin/all-admins');
                  if(item.avatarUrl){
                    fs.unlink(item.avatarUrl.path) // Delete post's image
                  }
                }
            });
        }
      })
});


module.exports = router;