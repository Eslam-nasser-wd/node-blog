var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.name){
        res.redirect('dashboard');
    }else{
        res.redirect('login');
    }
});

module.exports = router;