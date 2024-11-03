const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/todolist', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Kết nối MongoDB thành công'))
    .catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Bắt đầu server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));

const Todo = require('./models/Todo');

// API tạo mới một task
app.post('/api/todos', async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title
        });
        const savedTodo = await todo.save();
        res.json(savedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API lấy tất cả task
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API cập nhật trạng thái completed của một task
app.patch('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Không tìm thấy task' });

        todo.completed = req.body.completed;
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API xóa một task
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ message: 'Không tìm thấy task' });

        res.json({ message: 'Xóa task thành công' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});