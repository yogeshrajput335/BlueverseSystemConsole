const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({

    userName: {
        required: true,
        type: String
    },
    employeeId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    emailId: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },



})

module.exports = mongoose.model('User', dataSchema)
