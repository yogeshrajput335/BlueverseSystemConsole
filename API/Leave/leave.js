const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({
    Name: {
        required: true,
        type: String
    },
    Leavetype: {
        required: true,
        type: String
    },
    Reason: {
        required: true,
        type: String
    },
    Fromdate: {
        required: true,
        type: String
    },
    Todate: {
        required: true,
        type: String
    },
    Status: {
        required: true,
        type: String
    }


})

module.exports = mongoose.model('Leave', dataSchema)