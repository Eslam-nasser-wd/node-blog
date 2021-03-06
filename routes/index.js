var express         = require('express');
var router          = express.Router();
var Post            = require('../models/Post');

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({}, function(err, posts){
    var siteUrl = req.protocol + '://' + req.get('host')
    res.render('index', {
      posts: posts,
      siteUrl: siteUrl,
      pageTitle: 'Home'
    });
  })
});


module.exports = router;