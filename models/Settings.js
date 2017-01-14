// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Settings', new Schema({ 
    site_name: String,
    site_description: String, 
    site_keywords: String,
    site_logo: Object,

    site_email: String,
    site_phone: String,
    location_lat: String,
    location_lng: String,
    location_address: String,
    
    active: {
        type: Boolean,
        default: 'true'
    }
}));