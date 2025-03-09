

class Guardaserie {
    constructor() {
        this.host = proxyUrl+'https://guardoserie.quest/';
        this.seriesTvLinks = [];
        this.episodes = [];
        this.searchString = '';
        this.titolo ='';
        this.locandina ='';
        this.linkEp='';
        //this.type = 'serie' //
    }

    async fetchDocument(url) {
        const response = await fetch(url);
        const htmlContent = await response.text();
        const parser = new DOMParser();
        return parser.parseFromString(htmlContent, 'text/html');
    }

    craftUrl(search) { //https://guardoserie.quest/?s=i+simpson
        this.searchString=search;
        return `${this.host}/?s=${search}`;
      //  return `${this.host}/?story=${search}&do=search&subaction=search&titleonly=3`;
    }

    async searchSeries(search) {// cerca nella pagina della ricerca i link delle serie
        const url = this.craftUrl(search);
        const doc = await this.fetchDocument(url);
        console.log(doc)
        this.seriesTvLinks = Array.from(doc.querySelectorAll(".movies-list > div > a"))
            .filter(link => link.href.includes('serie'))
            .map(link => link.href);
    }

    async fetchEpisodes(seriesUrl) {
        const doc = await this.fetchDocument(proxyUrl+seriesUrl);
        this.titolo=doc.querySelector("#mv-info > div > div.mvic-desc > h2").textContent;
        this.story=doc.querySelector("p.f-desc").textContent;
        this.locandina=doc.querySelector(".thumb > img").getAttribute('data-src');
        doc.querySelectorAll('.les-content a').forEach(link => {
            const href = link.href;
            const match = href.match(/stagione-(\d+)-episodio-(\d+)/);
            if (match) {
                const season = match[1];
                const episode = match[2];
                this.episodes.push({
                    season: parseInt(season, 10),
                    episode: parseInt(episode, 10),
                    link: href
                });
            }
        });
        return this.episodes;
    }

    async fetchEpisodesLink(url){
        const doc = await this.fetchDocument(proxyUrl+url);
        this.linkEp = await doc.querySelector(".movieplay > iframe").src;
        return this.linkEp
    }

    getEpisodes() {
        return this.episodes;
    }
    showResult() {
        const resultsDiv = document.getElementById('results');
        //resultsDiv.innerHTML = ''; // Clear previous results

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        const imgElement = document.createElement('img');
        imgElement.src = this.locandina;
        imgElement.className = 'locandina';
        cardDiv.appendChild(imgElement);

        const titleElement = document.createElement('h2');
        titleElement.textContent = this.titolo;
        cardDiv.appendChild(titleElement);

        const storyElement = document.createElement('span');
        storyElement.textContent = this.story;
        cardDiv.appendChild(storyElement);

        const selectElement = document.createElement('select');
       selectElement.className = 'guardaserie';

    selectElement.onchange = async function() {
        preload('serie tv..')
        await scraper.fetchEpisodesLink(this.value);
        document.getElementById('rame').src = scraper.linkEp;
        preload();
    };

     this.episodes.forEach(ep => {
            const optionElement = document.createElement('option');
            optionElement.value = ep.link;
            optionElement.textContent = `Stagione ${ep.season}, Episodio ${ep.episode}`;
            selectElement.appendChild(optionElement);
        });
        cardDiv.appendChild(selectElement);

        resultsDiv.appendChild(cardDiv);
    }
}


const serieOpenTwo = (e) => {
    let url = e.value;
    document.getElementById('rame').src = url;
}
let scraper;
const searchGuardaSerie= async (text)=>{
    scraper = new Guardaserie();
    await scraper.searchSeries(text);
    await scraper.fetchEpisodes(scraper.seriesTvLinks[0]);
    scraper.fetchEpisodesLink(scraper.episodes[0].link)
    console.log(scraper)
    scraper.showResult();
    return scraper
}



/*

document.getElementById('genere-select').addEventListener('change', function () {
    selectedGenere = this.value;
    let url = craftUrl()
    init(url)
    document.getElementById('results').innerHTML = "";
});

*/