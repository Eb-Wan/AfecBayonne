const todosUrl3 = "https://jsonplaceholder.typicode.com/todos/";

async function fetchDataAsync(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erreur avec ton fetch pété !")
        const data = await response.json();
        const pre = document.createElement("table");
        pre.innerHTML = `<tr><th>User ID</th><th>Title</th><th>Completed</th></tr>`;
        data.forEach(element => {
            pre.innerHTML += `<tr><td>${element.userId}</td><td>${element.title}</td><td>${element.completed}</td></tr>`;
        });
        document.querySelector("body").appendChild(pre);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

fetchDataAsync(todosUrl3);