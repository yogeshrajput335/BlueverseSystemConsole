require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const employees = require('./routes/employees');
const payrolls = require('./routes/payrolls');
const userids = require('./routes/userids');
const attendence = require('./routes/attendence');
const leave = require('./routes/leaves');
const curds = require('./routes/curds');
const candidates=require('./routes/candidate');
const client =require('./routes/client');
const leavetype =require('./routes/leavetype');




var cors = require('cors');
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
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', employees);
app.use('/api', payrolls);
app.use('/api', userids);
app.use('/api', attendence);
app.use('/api', leave);
app.use('/api', curds);
app.use('/api', candidates);
app.use('/api', client);
app.use('/api', leavetype);



app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})