// Tạo và thêm nút "close" cho một mục danh sách
function addCloseButton(li) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7"); // Dấu "x" để xoá
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function(event) {
        event.stopPropagation(); // Ngăn chặn sự kiện nổi lên
        console.log("Nút xóa đã được nhấp!");
        li.remove(); // Xóa mục danh sách khi nhấp vào nút "x"
    }
}

// Đánh dấu mục đã hoàn thành khi nhấp vào
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('completed');
    }
}, false);

// Tạo một mục danh sách mới khi nhấp vào nút "Add"
async function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);

    if (inputValue === '') {
        alert("You must write something!");
    } else {
        // Gọi API để thêm công việc mới
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: inputValue })
        });

        const todo = await response.json();
        document.getElementById("myInput").value = "";
        getTodayTodos(); // Cập nhật danh sách sau khi thêm mới
    }
}

// Thêm nút "close" vào mỗi mục danh sách hiện có
var myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
    addCloseButton(myNodelist[i]);
}

// API
const apiUrl = "http://localhost:3000/todos";

// Lấy danh sách công việc hôm nay
async function getTodayTodos() {
    const response = await fetch(`${apiUrl}/today`);
    const todos = await response.json();

    const todoList = document.getElementById("myUL");
    todoList.innerHTML = ""; // Xóa danh sách hiện tại

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo.content;
        if (todo.isCompleted) {
            li.classList.add("completed");
        }
        addCloseButton(li);
        li.addEventListener("click", () => toggleTodoCompletion(todo._id, !todo.isCompleted));
        todoList.appendChild(li);
    });
}

// Cập nhật trạng thái công việc
async function toggleTodoCompletion(id, isCompleted) {
    await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ isCompleted })
    });
    getTodayTodos(); // Cập nhật danh sách sau khi thay đổi trạng thái
}

// Thêm sự kiện click cho nút "Add"
document.getElementById("addButton").addEventListener("click", newElement);

// Thêm sự kiện keypress để thêm công việc khi nhấn Enter
document.getElementById("myInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        newElement();
    }
});

// Tải công việc hôm nay khi trang được tải
getTodayTodos();
