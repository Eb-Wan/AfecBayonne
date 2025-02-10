const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText.length === 0) {
        alert("C'est vide !")
        return;
    }
    const li = document.createElement("li");
    li.innerHTML = `${taskText} <button class="delete">Supprimer</button>`;
    taskList.appendChild(li);
    taskInput.value = "";
    li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
    });
});
