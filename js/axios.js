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
        const response = await axios.get(API_URL);
        const pizzak = response.data;
        
        pizzaTableBody.innerHTML = '';
        pizzak.forEach(pizza => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${pizza.nev}</td>
                <td>${pizza.kategorianev}</td>
                <td>${pizza.vegetarianus}</td>
                <td class="text-center">
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
        if (originalNev) {
            await axios.put(API_URL, pizzaData);
        } else {
            await axios.post(API_URL, pizzaData);
        }
        
        resetForm();
        fetchPizzak();
    } catch (error) {
        console.error('Error saving pizza:', error);
    }
});

async function deletePizza(nev) {
    if (confirm('Biztosan törölni szeretnéd ezt a pizzát?')) {
        try {
            await axios.delete(API_URL, {
                data: { nev: nev }
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
