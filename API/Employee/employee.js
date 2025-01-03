const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({
    Name: {
        required: true,
        type: String
    },
    EmailId: {
        required: true,
        type: String
    },
    Gender: {
        required: true,
        type: String
    },
    Address: {
        required: true,
        type: String
    },
    PhoneNumber: {
        required: true,
        type: String
    }


})

module.exports = mongoose.model('User', dataSchema)