const todosUrl2 = "https://jsonplaceholder.typicode.com/todos/1";

async function fetchDataAsync(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erreur avec ton fetch pété !")
        const data = await response.json();
        const pre = document.createElement("pre");
        pre.innerHTML = JSON.stringify(data);
        document.querySelector("body").appendChild(pre);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

fetchDataAsync(todosUrl2);