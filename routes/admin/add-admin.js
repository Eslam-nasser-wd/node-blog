var express         = require('express');
var router          = express.Router();
var multer          = require('multer')
var crypto          = require('crypto')
var path            = require('path');
var passwordHash    = require('password-hash');
var User            = require('../../models/User')


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
    res.render('admin/add-admin');
});

router.post('/', upload.single('userAvatar'), function(req, res, next) {
    var newHashedPassword = passwordHash.generate(req.body.newPassword)
    // create a user
    var newUser = new User({ 
        name: req.body.newUsername,
        password: newHashedPassword,
        email: req.body.newEmail,
        avatarUrl: req.file,
        role: req.body.role,
        createdAt: new Date()
    });
    // save the user
    newUser.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.redirect('all-admins')
    });
});



module.exports = router;