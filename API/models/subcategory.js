const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({
    Name: {
        required: true,
        type: String
    },
    Description: {
        required: true,
        type: String
    },
    Active: {
        required: true,
        type: String
    },
    Homeneeds: {
        required: true,
        type: [String]
    },
    employeeId: {
            required: true,
            type: mongoose.Schema.Types.ObjectId
        },


})

module.exports = mongoose.model('Subcategory', dataSchema)