
const express = require('express');
const Model = require('../models/curd'); // Ensure this matches your actual export

const router = express.Router();

// Post Method
router.post('/add-curd', async (req, res) => {
    const data = new Model({
        Name: req.body.Name,
        ClientName: req.body.ClientName,
        Status: req.body.Status,
        Description: req.body.Description,
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all Method
router.get('/get-all-curd', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get by ID Method
router.get('/get-one-curd/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update by ID Method
router.patch('/update-curd/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(id, updatedData, options);

        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete by ID Method
router.delete('/delete-curd/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ID ${id} has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;