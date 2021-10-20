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

});

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
    // this fa parte della funzione "addEventListener" per cui si riferisce all'elemento corrente
    this.classList.toggle("cella--selezionata");
}
