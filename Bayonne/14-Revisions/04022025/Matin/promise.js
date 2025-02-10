const todosUrl = "https://jsonplaceholder.typicode.com/todos/1";

function fetchDataPromise(url) {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    res(JSON.parse(xhr.responseText));
                } else {
                    rej("Error");
                }
            }
        };
        xhr.send();
    });
}

fetchDataPromise(todosUrl).then(data => {
    const pre = document.createElement("pre");
    pre.innerHTML = JSON.stringify(data);
    document.querySelector("body").appendChild(pre);
    console.log(data);
}).catch(err => console.error(err));
