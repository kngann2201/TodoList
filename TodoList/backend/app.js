const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/todolist', {
    
})
.then(() => {
    console.log('Đã kết nối đến MongoDB');
})
.catch(err => {
    console.error('Lỗi kết nối đến MongoDB', err);
});

// // Kiểm tra kết nối MongoDB
// mongoose.connection.once("open", () => {
//   console.log("Đã kết nối đến MongoDB");
// });

// Định nghĩa Schema và Model cho Todo
const todoSchema = new mongoose.Schema({
  content: String,
  isCompleted: Boolean,
  date: { type: Date, default: Date.now }
});

const Todo = mongoose.model("Todo", todoSchema);

// API: Lấy danh sách công việc hôm nay
app.get("/todos/today", async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todos = await Todo.find({
    date: { $gte: startOfDay, $lte: endOfDay }
  });

  res.json(todos);
});

// API: Tạo công việc mới
app.post("/todos", async (req, res) => {
  const todo = new Todo({
    content: req.body.content,
    isCompleted: false
  });

  await todo.save();
  res.json(todo);
});

// API: Cập nhật trạng thái công việc
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  const todo = await Todo.findByIdAndUpdate(id, { isCompleted }, { new: true });
  res.json(todo);
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});

