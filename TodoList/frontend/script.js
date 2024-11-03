const apiUrl = 'http://localhost:5000/api/todos';

// Lấy danh sách todos từ server
async function fetchTodos() {
    try {
        const res = await fetch(apiUrl);
        const todos = await res.json();
        renderTodos(todos);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách nhiệm vụ:', error);
    }
}

// Hiển thị danh sách todos lên giao diện
function renderTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; // Xóa danh sách hiện tại

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.title;
        li.className = todo.completed ? 'completed' : '';
        li.onclick = () => toggleTodoCompleted(todo._id, !todo.completed);
        todoList.appendChild(li);
    });
}

// Thêm nhiệm vụ mới
async function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const title = todoInput.value.trim();

    if (!title) {
        alert('Vui lòng nhập một nhiệm vụ!');
        return;
    }

    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });

        if (!res.ok) {
            throw new Error('Không thể thêm nhiệm vụ');
        }

        fetchTodos(); // Lấy lại danh sách todos mới
        todoInput.value = ''; // Xóa ô nhập
    } catch (error) {
        console.error('Lỗi khi thêm nhiệm vụ:', error);
    }
}

// Cập nhật trạng thái hoàn thành của một nhiệm vụ
async function toggleTodoCompleted(id, completed) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed })
        });
        fetchTodos(); // Cập nhật lại danh sách todos
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái nhiệm vụ:', error);
    }
}

// Gán sự kiện cho nút "Add"
document.getElementById('addButton').onclick = addTodo;

// Lấy danh sách todos khi trang được tải
fetchTodos();
