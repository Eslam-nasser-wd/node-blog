var express         = require('express');
var router          = express.Router();
var multer          = require('multer');
var crypto          = require('crypto');
var path            = require('path');
var fs              = require('fs');
var Post            = require('../../models/Post');
var Category        = require('../../models/Category')

var storage = multer.diskStorage({
  destination: './public/uploads/posts/',
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})
var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
    var editPostID = req.query.post_id;
    
    Post.findById(editPostID)
      .exec(function(err, item){
        if (err || !item) {
            res.statusCode = 404;
            res.send({message: '404'});
        } else {
            var siteUrl = req.protocol + '://' + req.get('host')
            // Get categories 
            Category.find({}, function(err, categories) {
                res.render('admin/edit-post', {
                    session: req.session,
                    post: item,
                    siteUrl: siteUrl,
                    categories: categories
                });
            });
            
        }
      })
});


router.put('/', upload.single('postImage'), function(req, res, next) {
    var editThisPostID = req.query.post_id;
    Post.findById(editThisPostID)
      .exec(function(err, editThisPost){
        if (err || !editThisPost) {
            res.statusCode = 404;
            res.send({message: '404'});
        } else {
            editThisPost.title = req.body.postTitle;
            editThisPost.category = req.body.postCategory;
            editThisPost.short_description = req.body.postSmallDescription;
            editThisPost.content = req.body.postContent;
            editThisPost.keywords = req.body.postKeywords;
            if(!req.file){
              console.log('\n USE SAME IMAGE \n')
            }else{
              if(editThisPost.imageUrl){
                fs.unlink(editThisPost.imageUrl.path, function(err){
                  if (err) throw err;
                  editThisPost.imageUrl = req.file
                })
              }else{
                editThisPost.imageUrl = req.file
              }
            }
            editThisPost.save(function(err) {
                if (err) throw err;
                res.redirect('all-posts')                
            });
        }
      })
});

module.exports = router;