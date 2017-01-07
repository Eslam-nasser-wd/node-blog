var express         = require('express');
var router          = express.Router();
var User            = require('../../models/User')
var Category        = require('../../models/Category')
var Post            = require('../../models/Post')


/* GET home page. */
router.get('/', function(req, res, next) {

    //  It's a miss I know :|
    // Please if you have a better solution contact me, Thanks :D
    Post.find({}, function(err, posts) { 
        User.find({}, function(err, users) { 
            Category.find({}, function(err, categories) {
                res.render('admin/dashboard', {
                    posts: posts,
                    users: users,
                    categories: categories,
                });
            })
        })
    })
    
    console.log(`\n=========================\n `, req.session, ` \n=========================\n`)
});

module.exports = router;