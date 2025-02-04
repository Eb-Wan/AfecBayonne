const searchInput = document.getElementById("searchInput");
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
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchItem) ||
        student.grade.toLowerCase().includes(searchItem.replace("grade:", "")) ||
        `${parseInt(student.age)}`.includes(searchItem.replace("age:", ""))
    );
    renderStudents(sortedStudents)
}


fetch("./students.json").then(response => response.json())
.then(data => {
    students = data;
    renderStudents(students);
    searchInput.addEventListener("input", filterStudents);

}).catch(err => console.error(err));
