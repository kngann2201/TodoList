document.addEventListener('DOMContentLoaded', function () {
    //Welcome
            const name = localStorage.getItem('name');
            const userId = localStorage.getItem('userId');
            const taskId = localStorage.getItem('taskId');
            console.log(name); //kiểm tra
            document.getElementById("name").innerHTML = `${name}`;
    //CHART
    async function loadTasksForCount() {
        try {
            const response = await fetch(`http://localhost:5000/api/todo/list/${userId}`);
            if (!response.ok) {
              throw new Error('Không thể tải nhiệm vụ');
            }
            const todos = await response.json();
            const xValues = ['Học tập', 'Đi chơi', 'Việc cần làm'];
            var ht = 0, dc = 0, td = 0;
            todos.forEach(task => {
                if (task.filter === "Học tập") ht++;
                else if (task.filter === "Đi chơi") dc++;
                else td++;  
            }); 
            const yValues = [ht, dc, td];
            const barColors = [
            "#F8DAE9",
            "#B9D6F3",
            "#F1E8D9",
            "#B5EAD7",
            "#F2D5DA",
            "#BFBFE3", 
            "#C4E2E4", 
            "#F3D2C9", 
            "#F8E3D0"     
            ];
            new Chart("todoChart", {
            type: "pie",
            data: {
                labels: xValues,
                datasets: [{
                backgroundColor: barColors,
                data: yValues
                }]
            },
            options: {
                responsive: true,
                hoverOffset: 20
            }
    })
        } catch (error) {
            alert('Lỗi khi tải nhiệm vụ!!');
        }
    }
    loadTasksForCount();

    //PROGRESS
    async function updateProgress() {
        try {
            const response = await fetch(`http://localhost:5000/api/todo/list/${userId}`);
            if (!response.ok) {
              throw new Error('Không thể tải nhiệm vụ');
            }
            // console.log('API đã được gửi', response);  // Kiểm tra
            const todos = await response.json();
            // const list = document.querySelectorAll('#myItem option');
            const xValues = ['Học tập', 'Đi chơi', 'Việc cần làm'];
            // console.log(list);
            var ht = 0, t = 0;
            var comp = 0, total = 0;
            const today = new Date();
            todos.forEach(task => {
                // Tính toán phần trăm hoàn thành
                if (task.completed === true) ht++;
                t++;  
                const dateType = new Date(task.createdAt);
                console.log(dateType);
                if (dateType.getDate() === today.getDate() && dateType.getMonth() === today.getMonth() && dateType.getFullYear() === today.getFullYear()) {
                    if (task.completed === true) comp++;
                    total++;
                }
            });
            const totalTasks = t;
            const completedCount = ht;
            console.log(t);
            console.log(ht)
            const progressPercentage = (completedCount / totalTasks) * 100;
            const progressBar = document.getElementById('progressBar');
            progressBar.style.width = progressPercentage + '%';
            const progressText = document.getElementById('progressText');
            if (!progressPercentage || progressPercentage === 0)
            {
                progressText.innerHTML = `Tiến độ hoàn thành các nhiệm vụ: 0% (${completedCount}/${totalTasks})`;
            }
            else {
                progressText.innerHTML = `Tiến độ hoàn thành các nhiệm vụ: ${progressPercentage}% (${completedCount}/${totalTasks})`;
            }
            const totalTasksToday = total;
            const completedCountToday = comp;
            console.log(total);
            console.log(comp)
            const progressPercentageToday = (completedCountToday/ totalTasksToday) * 100;
            const progressBarToday = document.getElementById('progressBarToday');
            progressBarToday.style.width = progressPercentageToday + '%';
            const progressTextToday = document.getElementById('progressTextToday');
            if (!progressPercentageToday || progressPercentageToday === 0)
            {
                progressTextToday.innerHTML = `Tiến độ hoàn thành các nhiệm vụ hôm nay: 0% (${completedCountToday}/${totalTasksToday})`;
            }
            else
            {
                progressTextToday.innerHTML = `Tiến độ hoàn thành các nhiệm vụ: ${progressPercentageToday}% (${completedCountToday}/${totalTasksToday})`;
            }
        } catch (error) {
            alert('Lỗi khi tải nhiệm vụ!!');
        }       
    }
    updateProgress();   
});