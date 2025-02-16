const express = require('express');
const Model = require('../models/employee');

const router = express.Router()
//Post Method
router.post('/add-employee', async (req, res) => {
    const data = new Model({
        Name: req.body.Name,
        EmailId: req.body.EmailId,
        Gender: req.body.Gender,
        Address: req.body.Address,
        PhoneNumber: req.body.PhoneNumber


    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/get-count-employee', async (req, res) => {
    try {
        const employees = await Model.find();
        res.status(200).json({
            employees,
            count: employees.length, // Total number of employees
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
//Get all Method
router.get('/get-all-employee', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//Get by ID Method
router.get('/get-one-employee/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update-employee/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete-employee/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;