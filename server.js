const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
dotenv.config(); // Load các biến từ file .env
app.use(express.json()); // Cho phép server nhận dữ liệu JSON

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Tạo một schema cho công việc
const taskSchema = new mongoose.Schema({
  task: {
      type: String,
      required: true,
  },
  completed: {
      type: Boolean,
      default: false,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

// Sử dụng body-parser
app.use(bodyParser.json());
app.use(express.static('frontend'));

// API để lưu công việc
app.post('/api/tasks', async (req, res) => {
  const newTask = new Task({
      task: req.body.task,
  });
  try {
      await newTask.save(); // Lưu công việc vào cơ sở dữ liệu
      res.status(201).json({ message: 'Công việc đã được thêm thành công!' });
  } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi!' });
      console.error(error); // In lỗi ra console để kiểm tra
  }
});

//Port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
console.log(process.env.MONGO_URI);



