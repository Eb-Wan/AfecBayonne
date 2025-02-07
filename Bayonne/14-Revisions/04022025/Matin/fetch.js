const todosUrl = "https://jsonplaceholder.typicode.com/todos/1";

function fetchData(url) {
    fetch(url).then(res => res.json()).then(data => {
        const pre = document.createElement("pre");
        pre.innerHTML = JSON.stringify(data);
        document.querySelector("body").appendChild(pre);
        console.log(data);
    }).catch(err => console.error(err));
}

fetchData(todosUrl);