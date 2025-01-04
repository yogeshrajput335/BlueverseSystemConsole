require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const employees = require('./routes/employees');
const leave=require('./routes/leaves')


var cors = require('cors');
const leave = require('./Leave/leave');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

let corsOptions = {
    origin: ['http://localhost:4200'],
}
app.use(cors(corsOptions))
app.use(express.json());
app.use('/api', leave)


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})