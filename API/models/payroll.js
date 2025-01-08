const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({

    employeeId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    Name: {
        required: true,
        type: String
    },
    Month: {
        required: true,
        type: String
    },
    Year: {
        required: true,
        type: String
    },
    TotalDays: {
        required: true,
        type: String
    },
    WorkingDays: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Payroll', dataSchema)