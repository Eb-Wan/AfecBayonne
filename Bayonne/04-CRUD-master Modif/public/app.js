// Cette fonction est appelée lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const formEdit = document.getElementById('editForm');
    const userList = document.getElementById('userList');
    let users = 0;
    // Fonction pour récupérer les utilisateurs depuis l'API
    const fetchUsers = async () => {
        const res = await fetch('/api/utilisateurs');
        users = await res.json();
        userList.innerHTML = users.map(u =>
            `<li class="box">
                ID: ${u.id} - ${u.nom} ${u.prenom}
                <button class="button is-warning is-small" onclick="editUser(${u.id})">Modifier</button>
                <button class="button is-danger is-small" onclick="deleteUser(${u.id})">Supprimer</button>
            </li>`
        ).join('');
    };

    // Fonction pour supprimer un utilisateur
    const deleteUser = async (id) => {
        await fetch(`/api/utilisateurs/${id}`, { method: 'DELETE' });
        fetchUsers();
    };

    // Fonction pour modifier pour ouvrir la fenêtre de modification
    const editUser = async (id) => {
        document.getElementById("editWindow").classList.add('is-active');
        const userToEdit = users[id-1];
        document.getElementById('nomEdit').value = userToEdit.nom;
        document.getElementById('prenomEdit').value = userToEdit.prenom;
        document.getElementById('userId').value = id;
    };

    // Fonction pour modifier un utilisateur
    formEdit.onsubmit = async (e) => {
        e.preventDefault();
        document.getElementById("editWindow").classList.remove('is-active');
        const nom = document.getElementById('nomEdit').value;
        const prenom = document.getElementById('prenomEdit').value;
        const id = document.getElementById('userId').value;
        await fetch('/api/utilisateurs', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id, nom, prenom })
        });
        form.reset();
        fetchUsers();
    };

    // Fonction pour récupérer les utilisateurs au chargement de la page
    form.onsubmit = async (e) => {
        e.preventDefault();
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        await fetch('/api/utilisateurs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom })
        });
        form.reset();
        fetchUsers();
    };
    window.deleteUser = deleteUser;
    window.editUser = editUser;
});
