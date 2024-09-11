const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add event listener for Enter key
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    if (inputBox.value.trim() === '') {
        showAlert("Please enter a task!");
        return;
    }
    
    createTaskElement(inputBox.value);
    inputBox.value = "";
    saveData();
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.innerHTML = taskText;
    listContainer.appendChild(li);
    
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    
    // Add animation class
    li.classList.add("task-item-animation");
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        if (confirm("Are you sure you want to delete this task?")) {
            e.target.parentElement.remove();
            saveData();
        }
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}

function showAlert(message) {
    const alert = document.createElement("div");
    alert.className = "alert";
    alert.textContent = message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add("fadeOut");
        setTimeout(() => alert.remove(), 500);
    }, 2000);
}

// Sort tasks
function sortTasks() {
    const tasks = Array.from(listContainer.getElementsByTagName("li"));
    tasks.sort((a, b) => {
        const aChecked = a.classList.contains("checked");
        const bChecked = b.classList.contains("checked");
        if (aChecked === bChecked) return 0;
        return aChecked ? 1 : -1;
    });
    tasks.forEach(task => listContainer.appendChild(task));
    saveData();
}

// Add sort button to HTML
const sortButton = document.createElement("button");
sortButton.textContent = "Sort Tasks";
sortButton.onclick = sortTasks;
document.querySelector(".todo-app").insertBefore(sortButton, listContainer);

showTask();