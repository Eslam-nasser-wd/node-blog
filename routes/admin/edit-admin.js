var express         = require('express');
var router          = express.Router();
var multer          = require('multer');
var crypto          = require('crypto');
var path            = require('path');
var fs              = require('fs');
var passwordHash    = require('password-hash');
var User            = require('../../models/User');

var storage = multer.diskStorage({
  destination: './public/uploads/admins/',
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
    var editUserID = req.query.user_id;
    
    User.findById(editUserID)
      .exec(function(err, user){
        if (err || !user) {
            res.statusCode = 404;
            res.send({message: '404'});
        } else {
            var siteUrl = req.protocol + '://' + req.get('host')
            // Get categories 
            res.render('admin/edit-admin', {
                user: user,
                siteUrl: siteUrl
            });
            
        }
      })
});


router.put('/', upload.single('userAvatar'), function(req, res, next) {
    var editThisUserID = req.query.user_id;
    User.findById(editThisUserID)
      .exec(function(err, editThisUser){
        if (err || !editThisUser) {
            res.statusCode = 404;
            res.send({message: '404'});
        } else {
            var newHashedPassword = passwordHash.generate(req.body.editPassword)

            editThisUser.name = req.body.editUsername;
            editThisUser.password = newHashedPassword;
            editThisUser.email = req.body.editEmail;
            editThisUser.role = req.body.role;
            
            if(!req.file){
              console.log('\n USE SAME IMAGE \n')
            }else{
              if(editThisUser.avatarUrl){
                fs.unlink(editThisUser.avatarUrl.path, function(err){
                  if (err) throw err;
                  editThisUser.avatarUrl = req.file
                })
              }else{
                editThisUser.avatarUrl = req.file
              }
            }
            editThisUser.save(function(err) {
                if (err) throw err;
                res.redirect('all-admins')
            });
        }
      })
});

module.exports = router;