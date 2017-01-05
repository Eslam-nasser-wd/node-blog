var express         = require('express');
var router          = express.Router();
var fs              = require('fs')
var Post            = require('../../models/Post')

router.get('/', function(req, res, next) {
    Post.find({}, function(err, posts) {
      res.render('admin/all-posts', {posts: posts})
    });
});

router.delete('/:post_id', function(req, res, next) {
    Post.findById(req.params.post_id)
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
                  res.redirect('/admin/all-posts');
                  if(item.imageUrl){
                    fs.unlink(item.imageUrl.path) // Delete post's image
                  }
                }
            });
        }
      })
});

module.exports = router;