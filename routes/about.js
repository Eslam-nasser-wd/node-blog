var express         = require('express');
var router          = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var siteUrl = req.protocol + '://' + req.get('host')
    res.render('about', {
        siteUrl: siteUrl,
        pageTitle: 'About'
    });
});

module.exports = router;