document.addEventListener('DOMContentLoaded', function() {
// Tạo và thêm nút đóng cho một mục danh sách
function addCloseButton(li) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7"); // u00D7 : Dấu x
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  span.onclick = function() {
      var div = this.parentElement;
      div.remove(); 
  }
}
// Thêm nút xóa vào mỗi mục danh sách hiện có
var myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
addCloseButton(myNodelist[i]);
}
// Đánh dấu mục đã hoàn thành 
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
if (ev.target.tagName === 'LI') {
  ev.target.classList.toggle('completed');
}
}, false);

// Tạo một mục danh sách mới
// function newElement() {
// var li = document.createElement("li");
// var inputValue = document.getElementById("myInput").value;
// var t = document.createTextNode(inputValue);
// li.appendChild(t);
// if (inputValue === '') {
//   alert("Hãy viết nội dung trước khi thêm nhé!");
// } else {
//   document.getElementById("myUL").appendChild(li);
//   addCloseButton(li); // Thêm nút đóng cho mục mới add
// }
// document.getElementById("myInput").value = "";
// }
// function newElement() {
// var li = document.createElement("li");
// var inputValue = document.getElementById("myInput").value;
// var t = document.createTextNode(inputValue);


// Tạo phần tử danh sách mới
const input = document.getElementById('myInput');
const userId = localStorage.getItem('userId');
console.log('id:',userId);
function newElement() {
  const inputValue = input.value;
  console.log('inputValue:', inputValue);
  if (!inputValue) {
    alert("Hãy viết nội dung trước khi thêm nhé!");
    return;
  }
  const li = document.createElement("li");
  li.textContent = inputValue;
  document.getElementById("myUL").appendChild(li);
  addCloseButton(li);
  // Gửi nhiệm vụ mới lên server để lưu vào MongoDB
  fetch('http://localhost:5000/api/todo/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ userId: userId, task: inputValue }) 
  })
  .then(response => response.json())
  .then(data => {
      console.log(data.message); 
  })
  .catch(error => {
      console.error('Lỗi khi thêm nhiệm vụ:', error);
  });
  input.value = "";
}
// Xử lí "Add"
document.getElementById("addButton").addEventListener("click", newElement);
// Xử lí "Enter" từ bàn phím
document.getElementById("myInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      newElement();
  }
});

// Lấy danh sách nhiệm vụ từ server
async function loadTasks() {
    if (!userId) {
        alert('Vui lòng đăng nhập!');
        window.location.href = 'login.html';
        return;
    }
    console.log('Đang gửi yêu cầu API để tải nhiệm vụ...');  // Kiểm tra 
    try {
        const response = await fetch(`http://localhost:5000/api/todo/list/${userId}`);
        if (!response.ok) {
          throw new Error('Không thể tải nhiệm vụ');
        }
        console.log('API đã được gửi', response);  // Kiểm tra
        const todos = await response.json();
        console.log(todos)   // Kiểm tra
        const todoList = document.getElementById('myUL');
        todoList.innerHTML = ''; 
        todos.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.task;
            if (task.isCompleted) {
                li.style.textDecoration = 'line-through'; 
            }
            todoList.appendChild(li);
            addCloseButton(li);
        });
    } catch (error) {
        alert('Lỗi khi tải nhiệm vụ!!');
    }
}
// Tải nhiệm vụ khi trang được tải
loadTasks();

console.log('DOM is ready');
});
