var express         = require('express');
var router          = express.Router();
var multer          = require('multer')
var crypto          = require('crypto')
var path            = require('path');
var Post            = require('../../models/Post')
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
    Category.find({}, function(err, categories) {
        res.render('admin/add-post', {
            session: req.session,
            categories: categories
        });
    });
});

router.post('/', upload.single('postImage'), function(req, res){
    var newPost = new Post({
        title: req.body.postTitle,
        by: req.session.name,
        category: req.body.postCategory,
        short_description: req.body.postSmallDescription,
        content: req.body.postContent,
        keywords: req.body.postKeywords,
        createdAt: new Date(),
        imageUrl: req.file
    });
    // save the post
    newPost.save(function(err) {
        if (err) throw err;
        console.log('Post saved successfully');
        res.redirect('all-posts')
    });
})

module.exports = router;