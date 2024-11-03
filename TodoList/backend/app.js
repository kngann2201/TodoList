const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Đã kết nối MongoDB'))
  .catch((error) => console.error('Lỗi kết nối MongoDB:', error));

// Định nghĩa model Todo
const todoSchema = new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);

// API: Lấy danh sách todos
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách nhiệm vụ' });
    }
});

// API: Thêm nhiệm vụ mới
app.post('/api/todos', async (req, res) => {
    const { title } = req.body;
    const newTodo = new Todo({
        title,
        completed: false
    });

    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm nhiệm vụ' });
    }
});

// API: Cập nhật trạng thái hoàn thành của một nhiệm vụ
app.patch('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { completed },
            { new: true }
        );
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái nhiệm vụ' });
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
