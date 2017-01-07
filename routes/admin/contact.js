var express         = require('express');
var router          = express.Router();
var Settings        = require('../../models/Settings');

/* GET home page. */
router.get('/', function(req, res, next) {
    Settings.find({}, function(err, settings){
        res.render('admin/contact', {
            settings: settings[0]
        });
    })
});

router.post('/', function(req, res, next) {

    if(req.body.thisSetting_id){
        Settings.findById(req.body.thisSetting_id)
            .exec(function(err, item){
                item.site_email = req.body.site_email;
                item.site_phone = req.body.site_phone;
                item.location_lat = req.body.location_lat;
                item.location_lng = req.body.location_lng;
                item.location_address = req.body.location_address;

                item.save(function(err) {
                    if (err) throw err;
                    res.redirect('contact')                
                });
            })
    }else{
        var newSettings = new Settings({
            site_email: req.body.site_email,
            site_phone: req.body.site_phone,
            location_lat: req.body.location_lat,
            location_lng: req.body.location_lng,
            location_address: req.body.location_address
        });
        newSettings.save(function(err){
            if (err) throw err
            console.log('Settings saved successfully');
            res.redirect('contact')
        })
    }

    
});

module.exports = router;