var express         = require('express');
var router          = express.Router();
var Category        = require('../../models/Category')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin/add-category');
});

router.post('/', function(req, res){
    var newCategory = new Category({
        name: req.body.categoryName,
        short_description: req.body.categoryDescription,
        keywords: req.body.categoryKeywords,
        createdAt: new Date()
    });
    // save the category
    newCategory.save(function(err) {
        if (err) throw err;
        console.log('Category saved successfully');
        res.redirect('all-categories')
    });
})

module.exports = router;