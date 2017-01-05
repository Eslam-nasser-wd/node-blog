var express = require('express');
var router = express.Router();
var Category = require('../../models/Category')

/* GET home page. */
router.get('/', function(req, res, next) {
    Category.find({}, function(err, categories) {
        res.render('admin/all-categories', {categories: categories})
    });
});

router.delete('/:category_id', function(req, res, next) {
    Category.findById(req.params.category_id)
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
                  res.redirect('/admin/all-categories');
                }
            });
        }
      })
});

module.exports = router;