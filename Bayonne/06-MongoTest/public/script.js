function getUser(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formEntries = Array.from(formData);
    let urlParams = new URLSearchParams();
    formEntries.forEach (e => e[1]!="" && urlParams.append(e[0], e[1]));
    urlParams = urlParams.toString()?"?"+urlParams.toString():"";
    fetch("/db/users/"+urlParams, {method: "GET"})
    .then(result => result.json()).then(result => updateDom(result)).catch(error => console.error(error));
}

function updateDom(result) {
    const container = document.getElementById("container");
    container.innerHTML = "";
    result.forEach(element => {
        let card = document.createElement("div");
        card.className = "card bordered-light";
        card.innerHTML = 
        `
            <div class="medium-text text-bold">Username :${removeSpecialChars(element.name)}</div>
            <div class="medium-text text-bold">Email :${removeSpecialChars(element.email)}</div>
        `;
        container.appendChild(card);
    });
}
function removeSpecialChars (text) {
    return text.replace(/[&<>"']/g, "");
}