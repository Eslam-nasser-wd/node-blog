// get an instance of mongoose and mongoose.Schema
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Post', new Schema({ 
    title: String,
    by: String,
    category: String,
    short_description: String,
    content: String,
    keywords: String,
    imageUrl: Object,
    createdAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 }
}));