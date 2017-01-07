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

    if(req.body.thisSetting_id){
        Settings.findById(req.body.thisSetting_id)
            .exec(function(err, item){
                item.site_name = req.body.siteName;
                item.site_description = req.body.siteDescription;
                item.site_keywords = req.body.siteKeywords;
                if(!req.file){
                    console.log('\n USE SAME IMAGE \n')
                }else{
                    fs.unlink(item.site_logo.path, function(err){
                        if (err) throw err;
                    })
                    item.site_logo = req.file
                    console.log('\n\n LOGO: \n\n', item.site_logo)
                }
                item.save(function(err) {
                    if (err) throw err;
                    res.redirect('general')                
                });
            })
    }else{
        var newSettings = new Settings({
            site_name: req.body.siteName,
            site_description: req.body.siteDescription,
            site_keywords: req.body.siteKeywords,
            site_logo: req.file,
        });
        newSettings.save(function(err){
            if (err) throw err
            console.log('Settings saved successfully');
            res.redirect('general')
        })
    }

    
});

module.exports = router;