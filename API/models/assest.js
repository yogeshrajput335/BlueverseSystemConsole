const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({


    Assetname: {
        required: true,
        type: String
    },
    assesttypeId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    Active: {
        required: true,
        type: String
    },
    checkbox: { type: [String], required: true },
    // checkbox: {
    //     required: true,
    //     type: String
    // },
    Description: {
        required: true,
        type: String
    }

})

module.exports = mongoose.model('Assest', dataSchema)