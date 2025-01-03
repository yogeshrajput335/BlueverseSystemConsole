require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const employees = require('./routes/employees');
var cors = require('cors')
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
app.use('/api', employees)


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})