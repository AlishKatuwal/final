const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image : String,
    title : String,
    description : String,
    price : Number,
    size : Number,
    color : String,
    brand : String,
    
},{timestamps : true});

module.exports = mongoose.model('Product', ProductSchema);