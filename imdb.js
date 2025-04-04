
let sukamelo=[0,10,14,30];//levamiez a munnez e lettr

  // Defini zione della classe
class FilmInfo {
    constructor(id, lang='it-IT') {
        this.id = id;
        this.lang = lang;
        this.tokenApi = 'seyJhbGciOsiJIsUzI1NiJ9.eyJhdWsQiOiJiN2Q1YjkzYjk5MDZiOTA2MTI2YjlmZDJmMDMzNTk0OCIsIm5iZiI6MTcwMzcxMDcwNC4xMzEsInN1YiI6IjY1OGM4ZmYwMjIxYmE2N2ZiNmRiNGNjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K64Ag-IcGGpmE7ISgOykiTcMm6_9OKN19cncdys_SPc';
        this.apii = '';
    }
    
secure() { return this.tokenApi .split("") .filter((_, i) => !sukamelo.includes(i)).join("");
}

    // Metodo per ottenere informazioni sul film
    async  getInfo() {
     // console.log(this.secure())
      const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${this.secure()}`
  }
};
      try {
          const response = await fetch(`https://api.themoviedb.org/3/find/${this.id}?external_source=imdb_id&language=${this.lang}`, options)
             
          const data = await response.json();
          console.log(data);
            if (data.movie_results) {
                const film = data.movie_results[0]; // Prende il primo risultato della ric
                
                const response = await fetch(`https://api.themoviedb.org/3/movie/${film.id}/videos?language=${this.lang}`, options)
                  const dataTrailer = await response.json();
                 // console.log(dataTrailer)
                  let fullData=[];
                  let titolo=film.title;
                  let story= film.overview;
                  let trailer='';
                  if(!dataTrailer.results[0].video){

                  }else{

                  }
                  trailer=`https://www.youtube.com/embed/${dataTrailer.results[0].key}`;
          fullData.push({titolo , story , trailer});
              // console.log(fullData);
               return fullData
               
            } else {
                
            }
      } catch (e) {
        throw e
      }
   
    }
 
}

// 

// Creazione di un'istanza e chiamata della f async
//const film1 = new FilmInfo("tt4154756");

//film1.getInfo().then(info => console.log(info));
const showPage = (id)=>{
  let movie = new FilmInfo(id);
  movie.getInfo().then(info => {
    console.log(info);
    const p = document.createElement('p');
    p.textContent=`Trama: ${info[0].story}`;
    const cards=document.getElementById(id);
    cards.appendChild(p);
    
    const frame=document.createElement('iframe');
    frame.src=`${info[0].trailer}`;
    frame.style.width='350px';
    frame.style.height='350px';
    frame.setAttribute('allowfullscreen', '');
    cards.appendChild(frame)
    
    /*
    document.getElementById(id).innerHTML += `
    Trama:${info[0].story} \n 
    Trailer:<iframe width="250" height="250" src="${info[0].trailer}">
</iframe> `
*/
    });
}
//https://www.youtube.com/embed/tgbNymZ7vqY?