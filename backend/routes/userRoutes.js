// Đăng ký người dùng
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Kiểm tra xem người dùng đã tồn tại
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
    }
    // Tạo người dùng mới
    const user = new User({ username, password });
    await user.save(); // Lưu người dùng vào cơ sở dữ liệu
    res.status(201).json({ message: 'Người dùng đã được tạo' });
  } catch (error) {
    console.error(error); // In lỗi ra console để kiểm tra
    res.status(500).json({ message: 'Lỗi server' });
  }
});
