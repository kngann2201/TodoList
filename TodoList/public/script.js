// Tạo và thêm nút "close" cho một mục danh sách
function addCloseButton(li) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7"); // Dấu "x" để xoá
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    span.onclick = function() {
        var div = this.parentElement;
        div.remove(); // Xóa mục danh sách khi nhấp vào nút "x"
    }
}
// Thêm nút "close" vào mỗi mục danh sách hiện có
var myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
  addCloseButton(myNodelist[i]);
}
// Đánh dấu mục đã hoàn thành khi nhấp vào
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('completed');
  }
}, false);
// Tạo một mục danh sách mới khi nhấp vào nút "Add" hoặc "Enter" trên bàn phím
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);

  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
    addCloseButton(li); // Thêm nút "close" cho mục mới
  }

  document.getElementById("myInput").value = "";
}
// Thêm sự kiện click cho nút "Add"
document.getElementById("addButton").addEventListener("click", newElement);
// Thêm sự kiện bấm "Enter" trên ô nhập liệu
document.getElementById("myInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        newElement();
    }
});

