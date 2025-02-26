
let api=`b7d5b93b9906b906126b9fd2f0335948`;
let sukamelo=[0,10,14];//levamiez a munnez e lettr

  // Defini zione della classe
class FilmInfo {
    constructor(id, lang='it-IT') {
        this.id = id;
        this.lang = lang;
        this.tokenApi = 'seyJhbGciOsiJIsUzI1NiJ9.eyJhdWQiOiJiN2Q1YjkzYjk5MDZiOTA2MTI2YjlmZDJmMDMzNTk0OCIsIm5iZiI6MTcwMzcxMDcwNC4xMzEsInN1YiI6IjY1OGM4ZmYwMjIxYmE2N2ZiNmRiNGNjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K64Ag-IcGGpmE7ISgOykiTcMm6_9OKN19cncdys_SPc';
        //.regista = regista;
    }

    // Metodo per ottenere informazioni sul film
    async  getInfo() {
      const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${this.tokenApi}`
  }
};
      try {
          const response = await fetch(`https://api.themoviedb.org/3/find/${this.id}?external_source=imdb_id&language=${this.lang}`, options)
             
          const data = await response.json();

            if (data.results && data.results.length > 0) {
                const film = data.results[0]; // Prende il primo risultato della ricerca
               
            } else {
                
            }
      } catch (e) {
        throw e
      }
   
    }
}

// 

// Creazione di un'istanza e chiamata della funzione asincrona
const film1 = new FilmInfo("ttm18472937");

film1.getInfo().then(info => console.log(info));



function removeCharsByIndexes(str, indexes) {
    return str
        .split("")
        .filter((_, i) => !indexes.includes(i))
        .join("");
}

// Esempio di utilizzo:
const myString = "Capri è bellissima!";
const indexesToRemove = [0, 1, 5, 10]; // Rimuove i caratteri in queste posizioni
const result = removeCharsByIndexes(myString, indexesToRemove);
console.log(result); // Output: "priè belissima!"