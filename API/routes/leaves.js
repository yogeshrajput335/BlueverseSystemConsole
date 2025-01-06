const express = require('express');
const Model = require('../models/leave');

const router = express.Router()
//Post Method
router.post('/add-leave', async (req, res) => {
    const data = new Model({
        Name: req.body.Name,
        Leavetype: req.body.Leavetype,
        Reason: req.body.Reason,
        Fromdate: req.body.Fromdate,
        Todate: req.body.Todate,
        Status: req.body.Status
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Get all Method
router.get('/get-all-leave', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/get-one-leave/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update-leave/:id', async (req, res) => {
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
router.delete('/delete-leave/:id', async (req, res) => {
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