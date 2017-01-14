var express         = require('express');
var router          = express.Router();
var Category        = require('../models/Category');
var Post            = require('../models/Post');

/* GET home page. */
router.get('/:category_name', function(req, res, next) {
  var category_name = req.params.category_name
  Post.find({'category': category_name}, function(err, posts){
    var siteUrl = req.protocol + '://' + req.get('host')
    res.render('single-category',{
      posts: posts,
      siteUrl: siteUrl,
      pageTitle: category_name + ' Category'
    });
  })
});


module.exports = router;