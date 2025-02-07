const taskInput: HTMLInputElement = document.getElementById("taskInput") as HTMLInputElement;
const addTaskBtn: HTMLButtonElement = document.getElementById("addTask") as HTMLButtonElement;
const taskList: HTMLLIElement = document.getElementById("taskList") as HTMLLIElement;

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
    const deleteButton: HTMLButtonElement = li.querySelector(".delete") as HTMLButtonElement;
    deleteButton.addEventListener("click", () => {
        li.remove();
    });
});
