function fetchDataCallBack(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(null, JSON.parse(xhr.responseText));
            } else {
                callback(new Error("Haha look at at this monkey. OOGA BOOGA OOGA BOOGA"));
                console.log("Haha look at at this monkey. OOGA BOOGA OOGA BOOGA");
            }
        }
    };
    xhr.open("GET", url, true)
    xhr.send();
}

fetchDataCallBack("https://jsonplaceholder.typicode.com/todos/1", (error, data) => {
    if (error) {
        console.error(error);
    } else {
        const pre = document.createElement("pre");
        pre.innerHTML = JSON.stringify(data);
        document.querySelector("body").appendChild(pre);
        console.log(data);
    }
});