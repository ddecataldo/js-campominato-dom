/*
- dobbiamo generare 16 numeri
  - questi devono essere in un range da 1 a x (x dipende dalla difficoltà scelta)
  - i numeri generati devono essere unici
    - creiamo un array VUOTO dove inserirò i numeri generati
    - dobbiamo fare un ciclo dentro il quale generare i vari numeri, 16 volte (devono esserci 16 bombe)
    - nel ciclo (while?), genero un numero e lo confronto con l'array di quelli già creati
      - se lo trovo nell'array, vuole dire che è un doppione, 
        - lo devo ricreare
      - se non lo trovo, faccio il push dentro l'array
*/

let bombe = [];


// Seleziono il contenitore HTML che mi permette di settare la difficoltà
const selectDifficolta = document.getElementById("difficolta");
// Seleziono il tasto dove cliccando mi genererà le celle del campo minato in base alla dificoltà scelta
const btnStartGame = document.getElementById("start_game");
// Seleziono il contenitore dove andranno create le varie celle
const gridContenitore = document.getElementById("grid");


// Creo un evento sul pulsante che darà via al gioco
btnStartGame.addEventListener("click", function(){

    // Ottengo il valore (inserito nella value delle option della selection) scelto dall'utente
    const valoreDifficolta = selectDifficolta.value;
    // Numero di celle da creare
    const totCelle = quantitaCelle(valoreDifficolta);

    generatoreCelle(totCelle);

    bombe = numeroBombe(16, totCelle);

});

function numeroBombe(numBombe, numeroCelle) {

    const arrayBombe = [];

    for (let i = 0; i < 16; i++){
        // Genero un numero massimo che va fra 1 e il numero contenuto in numeroMassimoRandom
        const nuovaBomba = generateRandomNum(1, numeroCelle)
        // Verifico se il numero è già presente nell'array
        let numeroEsistente = arrayBombe.includes(nuovaBomba);

        if (!numeroEsistente) {
            arrayBombe.push(nuovaBomba);
        } else {
        // Decremento in modo che se esiste il contatore non va avanti e quindi stampa semre 16 numeri
        i--;
        }
    }

    return arrayBombe;

}

// Creo una funzione dove in base alla difficoltà scelta dell'utente definisce il numero di celle da creare;
function quantitaCelle(valoreDifficolta){
    let numCelle;

    // In base al valore della variabile "valoreDifficolta" viene cenerato il numero di celle in base a uno dei case
    switch (parseInt(valoreDifficolta)) {
    case 1:
        numCelle = 100;
        break;
    case 2:
        numCelle = 81;
        break;
    case 3:
        numCelle = 49;
        break;
    }

    return numCelle;
}

// Creo una funzione dove in base alla scelta dell'utente crea il numero di celle
function generatoreCelle(totCelle){

    // Con Math.sqrt calcolo la radice quadrata del numeto totale delle celle
    const cellePerRiga = Math.sqrt(totCelle);
    const dimensioneCelle = 100 / cellePerRiga;

    // Resetto la variabile gridContenitore
    gridContenitore.innerHTML = "";

    for (let i = 0; i < totCelle; i++) {
        
        const cella = document.createElement("div");
        cella.classList.add("cella");
        cella.style.width = dimensioneCelle + "%";
        cella.style.height = dimensioneCelle + "%";
        cella.addEventListener("click", cellaSelezionata);
        cella.textContent = (i + 1);

        gridContenitore.append(cella);
        
    }

}

// Creo una funzione che crea una classe alla cella selezionata
function cellaSelezionata() {

    const numCellaCorrente = parseInt(this.textContent);

    // Se la cella corrente è stata selezionata 
    if (bombe.includes(numCellaCorrente)) {
        // this fa parte della funzione "addEventListener" per cui si riferisce all'elemento corrente
        this.classList.add("cella--bomba");
    } else {
        // this fa parte della funzione "addEventListener" per cui si riferisce all'elemento corrente
        this.classList.add("cella--selezionata");
    }
    
}

// Creo una funzione che mi permetta di calcolare dei numeri random
function generateRandomNum(minNumber = 1, maxNumber = 10) {
    const numRandom = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
    return numRandom;
}