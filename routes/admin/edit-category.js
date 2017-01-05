var express         = require('express');
var router          = express.Router();
var Category        = require('../../models/Category');


/* GET home page. */
router.get('/', function(req, res, next) {
    var editCategoryID = req.query.category_id
    Category.findById(editCategoryID)
      .exec(function(err, item){
        if (err || !item) {
            res.statusCode = 404;
            res.send({message: '404'});
        } else {
            res.render('admin/edit-category', {
                category: item
            });
        }
      })
});


router.put('/', function(req, res, next) {
    var editThisCategoryID = req.query.category_id;
    Category.findById(editThisCategoryID)
      .exec(function(err, editThisCategory){
        if (err || !editThisCategory) {
            res.statusCode = 404;
            res.send({message: '404'});
        } else {
            editThisCategory.name = req.body.categoryName;
            editThisCategory.short_description = req.body.categoryDescription;
            editThisCategory.keywords = req.body.categoryKeywords;
            editThisCategory.save(function(err) {
                if (err) throw err;
                res.redirect('all-categories')                
            });
        }
      })
});

module.exports = router;