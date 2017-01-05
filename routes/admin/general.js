var express         = require('express');
var router          = express.Router();
var multer          = require('multer')
var crypto          = require('crypto')
var path            = require('path');
var fs              = require('fs');
var Settings        = require('../../models/Settings');

var storage = multer.diskStorage({
  destination: './public/uploads/settings/',
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
    Settings.find({}, function(err, settings){
        var siteUrl = req.protocol + '://' + req.get('host')
        res.render('admin/general', {
            settings: settings[0],
            siteUrl: siteUrl
        });
    })
});

router.post('/', upload.single('siteLogo'), function(req, res, next) {
    var newSettings = new Settings({
        site_name: req.body.siteName,
        site_description: req.body.siteDescription,
        site_keywords: req.body.siteKeywords,
        site_logo: req.file,
    });
    // res.json({general: newSettings})
    newSettings.save(function(err){
        if (err) throw err
        console.log('Settings saved successfully');
        res.redirect('general')
    })
});

module.exports = router;