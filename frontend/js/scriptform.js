document.addEventListener('DOMContentLoaded', function() {
// Đăng ký người dùng
async function registerUser(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của biểu mẫu
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
    alert(data.message);
  }
  
  // Đăng nhập người dùng
  async function loginUser(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của biểu mẫu
  
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
    alert(data.message);
  }
  
  // Kiểm tra xem DOM đã sẵn sàng chưa
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', registerUser);
        }
  
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', loginUser);
        }
    }
  };
});