const API_URL = '../php/api.php';

const userForm = document.getElementById('userForm');
const userTableBody = document.getElementById('userTableBody');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const formTitle = document.getElementById('formTitle');

const userIdInput = document.getElementById('userId');
const csaladiNevInput = document.getElementById('csaladi_nev');
const utoNevInput = document.getElementById('uto_nev');
const bejelentkezesInput = document.getElementById('bejelentkezes');
const jelszoInput = document.getElementById('jelszo');

document.addEventListener('DOMContentLoaded', fetchUsers);

async function fetchUsers() {
    try {
        const response = await fetch(API_URL, { method: 'GET' });
        const users = await response.json();
        
        userTableBody.innerHTML = '';
        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.csaladi_nev}</td>
                <td>${user.uto_nev}</td>
                <td>${user.bejelentkezes}</td>
                <td>********</td> <td class="text-center">
                    <button class="btn btn-sm btn-warning me-1" onclick="editUser(${user.id}, '${user.csaladi_nev}', '${user.uto_nev}', '${user.bejelentkezes}', '${user.jelszo}')">Szerkesztés</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Törlés</button>
                </td>
            `;
            userTableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = userIdInput.value;
    const userData = {
        csaladi_nev: csaladiNevInput.value,
        uto_nev: utoNevInput.value,
        bejelentkezes: bejelentkezesInput.value,
        jelszo: jelszoInput.value
    };

    try {
        if (id) {
            // UPDATE (PUT)
            userData.id = id;
            await fetch(API_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
        } else {
            // CREATE (POST)
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
        }
        
        resetForm();
        fetchUsers();
    } catch (error) {
        console.error('Error saving user:', error);
    }
});

async function deleteUser(id) {
    if (confirm('Biztosan törölni szeretnéd ezt a felhasználót?')) {
        try {
            await fetch(API_URL, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
}

function editUser(id, csaladi_nev, uto_nev, bejelentkezes, jelszo) {
    userIdInput.value = id;
    csaladiNevInput.value = csaladi_nev;
    utoNevInput.value = uto_nev;
    bejelentkezesInput.value = bejelentkezes;
    jelszoInput.value = jelszo;
    
    formTitle.textContent = 'Felhasználó Szerkesztése';
    saveBtn.textContent = 'Frissítés';
    saveBtn.classList.replace('btn-success', 'btn-warning');
    cancelBtn.classList.remove('d-none');
}

function resetForm() {
    userIdInput.value = '';
    userForm.reset();
    
    formTitle.textContent = 'Új Felhasználó';
    saveBtn.textContent = 'Mentés';
    saveBtn.classList.replace('btn-warning', 'btn-success');
    cancelBtn.classList.add('d-none');
}

cancelBtn.addEventListener('click', resetForm);
