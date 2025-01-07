const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({

    Name: {
        required: true,
        type: String
    },
    ClientName: {
        required: true,
        type: String
    },
    Status: {
        required: true,
        type: String
    },
    Description: {
        required: true,
        type: String
    },



})

module.exports = mongoose.model('Curd', dataSchema)
