class Pizza {
    constructor(nev, kat, veget, ár) {
        this.nev = nev;
        this.kat = kat;
        this.veget = veget;
        this.ár = ár;
    }
    
    arModosit(emeles) {
        this.ár += emeles;
    }
    feltetModosit(hagyma, sajt, szalonna, gomba, kukorica) {
        this.hagyma = hagyma;
        this.sajt = sajt;
        this.szalonna = szalonna;
        this.gomba = gomba;
        this.kukorica = kukorica;
    }
}

class Feltétek extends Pizza {
    constructor(nev, kat, veget, ár, hagyma, sajt, szalonna, gomba, kukorica) {
        super(nev, kat, veget, ár);
        this.hagyma = hagyma;
        this.sajt = sajt;
        this.szalonna = szalonna;
        this.gomba = gomba;
        this.kukorica = kukorica;
    }    
    hagyma(hagyma) {
        this.hagyma = hagyma;
    }
    sajt(sajt) {
        this.sajt = sajt;
    }
    szalonna(szalonna) {
        this.szalonna = szalonna;
    }
    gomba(gomba) {
        this.gomba = gomba;
    }
    kukorica(kukorica) {
        this.kukorica = kukorica;
    }
}