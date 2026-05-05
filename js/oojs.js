class PizzaAlap {
    constructor(nev) {
        this.nev = nev;
        this.emberMagassagCm = 180;
        this.emberMagassagPx = 400;
    }

    getPixelArany() {
        return this.emberMagassagPx / this.emberMagassagCm;
    }
}

class PizzaAranyosito extends PizzaAlap {
    constructor(nev) {
        super(nev);
        this.pizzaKep = null;
        this.meretValaszto = null;
        this.infoSzoveg = null;
    }

    megjelenit() {
        const foKontener = document.createElement('div');
        foKontener.className = 'container text-center mt-5';

        const cim = document.createElement('h1');
        cim.innerText = `${this.nev} - Arányosító`;
        foKontener.appendChild(cim);

        const vezerloKontener = document.createElement('div');
        vezerloKontener.className = 'my-4 d-flex justify-content-center gap-3';

        this.meretValaszto = document.createElement('select');
        this.meretValaszto.className = 'form-select w-auto';
        [26, 32, 50].forEach(meret => {
            const opcio = document.createElement('option');
            opcio.value = meret;
            opcio.innerText = `${meret} cm`;
            if (meret === 32) opcio.selected = true;
            this.meretValaszto.appendChild(opcio);
        });
        vezerloKontener.appendChild(this.meretValaszto);

        const gomb = document.createElement('button');
        gomb.className = 'btn btn-warning';
        gomb.innerText = 'Méret módosítása';
        gomb.onclick = () => this.frissitKepet();
        vezerloKontener.appendChild(gomb);

        foKontener.appendChild(vezerloKontener);

        this.infoSzoveg = document.createElement('h4');
        this.infoSzoveg.className = 'text-info mb-4';
        foKontener.appendChild(this.infoSzoveg);

        const kepekKontener = document.createElement('div');
        kepekKontener.className = 'd-flex align-items-end justify-content-center border-bottom pb-3';
        kepekKontener.style.height = '450px';

        const emberKep = document.createElement('img');
        emberKep.src = 'img/ember.jpg';
        emberKep.style.height = `${this.emberMagassagPx}px`;
        emberKep.style.marginRight = '50px';
        kepekKontener.appendChild(emberKep);

        this.pizzaKep = document.createElement('img');
        this.pizzaKep.src = 'img/pizza.png';
        this.pizzaKep.style.transition = 'width 0.5s ease, height 0.5s ease';
        kepekKontener.appendChild(this.pizzaKep);

        foKontener.appendChild(kepekKontener);

        document.body.appendChild(foKontener);

        this.frissitKepet();
    }

    frissitKepet() {
        const kivalasztottMeretCm = parseInt(this.meretValaszto.value);
        const pixelMeret = kivalasztottMeretCm * this.getPixelArany();
        this.pizzaKep.style.width = `${pixelMeret}px`;
        this.pizzaKep.style.height = `${pixelMeret}px`;
        this.infoSzoveg.innerText = `A pizza átmérője: ${kivalasztottMeretCm} cm (Ember: 180 cm)`;
    }
}

window.onload = function () {
    const alkalmazas = new PizzaAranyosito("Interaktív Pizzéria");
    alkalmazas.megjelenit();
};