var express         = require('express');
var router          = express.Router();
var User            = require('../../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
    var thisUserID = req.session.userId;
    User.findById(thisUserID)
      .exec(function(err, item){
        if (err || !item) {
            res.statusCode = 404;
            res.send({message: '404'});
        } else {
            var siteUrl = req.protocol + '://' + req.get('host')
            res.render('admin/profile', {
                user: item,
                siteUrl: siteUrl
            });
            console.log(req.session)
        }
      })
});

module.exports = router;