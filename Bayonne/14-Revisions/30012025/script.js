const searchInput = document.getElementById("searchInput");
const orderBy = document.getElementById("orderBy");
const studentContainer = document.getElementById("students-container");
let students;

function renderStudents (filteredStudents) {
    if (filteredStudents.length === 0) {
        studentContainer.innerHTML = 
        `<p class= "text-center text-muted"> Aucun apprenant trouvé </p>`;
        return;
    }
    studentContainer.innerHTML = filteredStudents.map(student => `
    <div class="col-md-4">
        <div class="card text-center shadow-sm mb-3" data-id="${student.id}">
            <div class="card-body">
                <h5 class="card-title">${student.name}</h5>
                <p class="card-text">${student.age}</p>
                <p class="card-text"> Grade: <b>${student.grade}</b></p>
            </div>
        </div>
    </div>`
    ).join("")
};

function filterStudents() {
    const searchItem = searchInput.value.trim().toLowerCase();
    let sortedStudents;
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().startsWith(searchItem) ||
        (student.grade.toLowerCase().startsWith(searchItem.replace("grade:", "")) && searchItem.startsWith("grade:")) ||
        (`${student.age}`.startsWith(searchItem.replace("age:", "")) && searchItem.startsWith("age:"))
    );
    if (orderBy.value == "name") sortedStudents = filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
    if (orderBy.value == "grade") sortedStudents = filteredStudents.sort((a, b) => a.grade.localeCompare(b.grade));
    if (orderBy.value == "age") sortedStudents = filteredStudents.sort((a, b) => a.age - b.age);
    renderStudents(sortedStudents);
}


fetch("./students.json").then(response => response.json())
.then(data => {
    students = data;
    filterStudents();
    searchInput.addEventListener("input", filterStudents);
    orderBy.addEventListener("input", filterStudents);
}).catch(err => console.error(err));
