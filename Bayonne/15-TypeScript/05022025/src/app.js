var taskInput = document.getElementById("taskInput");
var addTaskBtn = document.getElementById("addTask");
var taskList = document.getElementById("taskList");
addTaskBtn.addEventListener("click", function () {
    var taskText = taskInput.value.trim();
    if (taskText.length === 0) {
        alert("C'est vide !");
        return;
    }
    var li = document.createElement("li");
    li.innerHTML = "".concat(taskText, " <button class=\"delete\">Supprimer</button>");
    taskList.appendChild(li);
    taskInput.value = "";
    li.querySelector(".delete").addEventListener("click", function () {
        li.remove();
    });
});
