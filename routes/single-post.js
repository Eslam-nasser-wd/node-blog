var express         = require('express');
var router          = express.Router();
var Post            = require('../models/Post');

/* GET home page. */
router.get('/', function(req, res, next) {
    var postId = req.query.post_id;
    Post.findById(postId)
        .exec(function(err, post){
            var siteUrl = req.protocol + '://' + req.get('host')
            res.render('single-post', {
                post: post,
                siteUrl: siteUrl,
                pageTitle: post.title
            });
    })
});

module.exports = router;