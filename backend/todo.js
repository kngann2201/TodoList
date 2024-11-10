const express = require('express');
const Todo = require('./models/Todo');
const User = require('./models/User');
const mongoose = require('mongoose');
const router = express.Router();

// Thêm nhiệm vụ mới
router.post('/add', async (req, res) => {
   try {
      const { userId, task } = req.body;  
      console.log(req.body);  
      // Kiểm tra người dùng tồn tại
      const user = await User.findById(userId);
      if (!user) {
         return res.status(404).json({ message: 'Người dùng không tồn tại!' });
      }
      const newTodo = new Todo({
         userId,
         task,
         completed: false
      });
      await newTodo.save();
      res.status(201).json({ message: 'Nhiệm vụ đã được thêm thành công!' });
   } catch (error) {
      res.status(500).json({ message: 'Lỗi thêm nhiệm vụ!' });
   }
});
// Lấy danh sách nhiệm vụ của người dùng
router.get('/list/:userId', async (req, res) => {
   try {
      const { userId } = req.params;
      const tasks = await Todo.find({ userId }).select('task completed').sort({ createdAt: -1 });
      // Kiểm tra nếu không có nhiệm vụ
      if (tasks.length === 0) {
         console.log('Không có nhiệm vụ nào được tìm thấy cho userId:', userId);
         return res.json([]);
     }
     else {
      console.log('Các nhiệm vụ tìm thấy:', tasks);
      res.status(200).json(tasks);
      }
   } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách từ server!' });
   }
});
// Đánh dấu nhiệm vụ hoàn thành
router.put('/complete/:todoId', async (req, res) => {
   try {
      const { todoId } = req.params;
      const todo = await Todo.findById(todoId);

      if (!todo) {
         return res.status(404).json({ message: 'Nhiệm vụ không tồn tại!' });
      }

      todo.isCompleted = true;
      await todo.save();

      res.status(200).json({ message: 'Nhiệm vụ đã được đánh dấu hoàn thành!' });
   } catch (error) {
      res.status(500).json({ message: 'Lỗi server!' });
   }
});
module.exports = router;

