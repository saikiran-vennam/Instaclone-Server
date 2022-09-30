const mongoose = require('mongoose');

//  Your code goes here
const postSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    author: {
        type : String,
        required : true
    },
    location: {
        type : String,
        required : true
    },
    description: {
        type: String,
        required: true
    }   
}, {
    timestamps: true
});

const postModel = mongoose.model('instaPosts', postSchema);

module.exports = postModel;