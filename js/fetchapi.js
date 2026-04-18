const API_URL = '../php/api.php';

const pizzaForm = document.getElementById('pizzaForm');
const pizzaTableBody = document.getElementById('pizzaTableBody');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const formTitle = document.getElementById('formTitle');

const pizzaNevInput = document.getElementById('nev');
const pizzaKategoriaInput = document.getElementById('kategoria');
const pizzaVegetarianusInput = document.getElementById('vegetarianus');
const originalNevInput = document.getElementById('originalNev');

document.addEventListener('DOMContentLoaded', fetchPizzak);

async function fetchPizzak() {
    try {
        const response = await fetch(API_URL, { method: 'GET' });
        const pizzak = await response.json();
        
        pizzaTableBody.innerHTML = '';
        pizzak.forEach(pizza => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${pizza.nev}</td>
                <td>${pizza.kategorianev}</td>
                <td>${pizza.vegetarianus}</td><td class="text-center">
                    <button class="btn btn-sm btn-warning me-1" onclick="editPizza('${pizza.nev}', '${pizza.kategorianev}', '${pizza.vegetarianus}')">Szerkesztés</button>
                    <button class="btn btn-sm btn-danger" onclick="deletePizza('${pizza.nev}')">Törlés</button>
                </td>
            `;
            pizzaTableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching pizzak:', error);
    }
}

pizzaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const originalNev = originalNevInput.value;
    const pizzaData = {
        nev: pizzaNevInput.value,
        kategorianev: pizzaKategoriaInput.value,
        vegetarianus: pizzaVegetarianusInput.value
    };

    if (originalNev) {
        pizzaData.originalNev = originalNev;
    }

    try {
        const method = originalNev ? 'PUT' : 'POST';
        await fetch(API_URL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pizzaData)
        });
        
        resetForm();
        fetchPizzak();
    } catch (error) {
        console.error('Error saving pizza:', error);
    }
});

async function deletePizza(nev) {
    if (confirm('Biztosan törölni szeretnéd ezt a pizzát?')) {
        try {
            await fetch(API_URL, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nev: nev })
            });
            fetchPizzak();
        } catch (error) {
            console.error('Sikertelen törlés:', error);
        }
    }
}

function editPizza(nev, kategorianev, vegetarianus) {
    originalNevInput.value = nev;
    pizzaNevInput.value = nev;
    pizzaKategoriaInput.value = kategorianev;
    pizzaVegetarianusInput.value = vegetarianus;
    
    formTitle.textContent = 'Pizza Szerkesztése';
    saveBtn.textContent = 'Frissítés';
    saveBtn.classList.replace('btn-success', 'btn-warning');
    cancelBtn.classList.remove('d-none');
}

function resetForm() {
    originalNevInput.value = '';
    pizzaNevInput.value = '';
    pizzaKategoriaInput.value = '';
    pizzaVegetarianusInput.value = '';
    pizzaForm.reset();
    
    formTitle.textContent = 'Új Pizza';
    saveBtn.textContent = 'Mentés';
    saveBtn.classList.replace('btn-warning', 'btn-success');
    cancelBtn.classList.add('d-none');
}

cancelBtn.addEventListener('click', resetForm);
