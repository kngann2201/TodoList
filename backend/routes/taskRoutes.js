// const express = require('express');
// const Task = require('../models/Task');

// const router = express.Router();

// // Route để thêm task mới
// router.post('/', async (req, res) => {
//     const { task } = req.body;

//     try {
//         const newTask = new Task({ task });
//         await newTask.save();
//         res.status(201).json({ message: 'Task added successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error saving task' });
//     }
// });

// module.exports = router;

