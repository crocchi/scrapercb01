let url = 'https://cineblog01.now/film/?sorting=news_read'; // Replace with the URL you want to scrape
let proxyUrl2 = 'https://cors-anywhere.herokuapp.com/';
let proxyUrl = 'https://solana-token-info.onrender.com/'//'https://api.allorigins.win/'//'https://corsproxy.io/';//'https://proxy.cors.sh/'//'https://api.allorigins.win/raw?url=';
let currentProxy = 1;
const urlHost = "https://cineblog01.now/";

const checkProxyStatus = async () => {
    document.getElementById('activate-proxy-btn').innerText = 'Checking proxy status..aspè';
    document.getElementById('activate-proxy-btn').style.backgroundColor = 'red';
    let casualNumber=Math.floor(Math.random() * 1000) + 1000;//a random number for no-cache problem
    fetch('https://solana-token-info.onrender.com/https://cineblog01.now/?'+casualNumber)
        .then(response => {
            if (!response.ok) {
                // Se la richiesta fallisce, usa il proxy
                alert('errore richiesta...!');
            }

        }).finally(() => {
            document.getElementById('activate-proxy-btn').innerText = 'Activated Proxy';
            document.getElementById('activate-proxy-btn').style.backgroundColor = 'green';
        }).catch(error => {
            renderErrorMessage(error);
            document.getElementById('activate-proxy-btn').innerText = 'aspett nu minut!';
            document.getElementById('activate-proxy-btn').style.backgroundColor = 'yellow';
            document.getElementById('activate-proxy-btn').style.color = 'black';
        });

};

checkProxyStatus();
const switchProxy = () => {
    currentProxy = currentProxy === 1 ? 2 : 1;
    return currentProxy === 1 ? proxyUrl : proxyUrl2;
};
let selectedGenere = 0;//fantasy
let selectedSorting = 0;
let page = 0;
let type = 0;//film - serie-tv

const craftUrl = () => {
    url = `https://cineblog01.now/`;
    if (type) {
        url += `${type}/`;
    } else { url += "film/" }

    if (page) {
        url += `page/${page}/?`;
    } else { url += "?" }

    if (selectedGenere) {
        url += `genere=${selectedGenere}&`;
    }
    if (selectedSorting) {
        url += `sorting=${selectedSorting}`;
    }
    console.log("craftUrl ->", url);
    return url;
};
document.getElementById('page-select').addEventListener('change', function () {
    page = this.value;
    let url = craftUrl()
    init(url)
    document.getElementById('results').innerHTML = "";
});

document.getElementById('genere-select').addEventListener('change', function () {
    selectedGenere = this.value;
    let url = craftUrl()
    init(url)
    document.getElementById('results').innerHTML = "";
});

document.getElementById('search-select').addEventListener('click', function () {
    //----------- selectedGenere = this.value;
    //search-input
    let valueTemp = document.getElementById("search-input").value;
    let url = `https://cineblog01.now/${type}/?story=${valueTemp}&do=search&subaction=search`
    //let url = craftUrl()
    init(url)
    document.getElementById('results').innerHTML = "";
});

//type-select
document.getElementById('type-select').addEventListener('change', function () {
    type = this.value;
    selectedGenere=0;// no genre selection for serie tv
    if (type == "serie-tv") {

        document.getElementById('genere-select').disabled = true;
    } else { document.getElementById('genere-select').disabled = false; }
    let url = craftUrl()
    init(url)
    document.getElementById('results').innerHTML = "";

});

document.getElementById('download-html-btn').addEventListener('click', () => {
    const htmlContent = document.documentElement.outerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

document.getElementById('sorting-select').addEventListener('change', function () {
    selectedSorting = this.value;
    let url = craftUrl()
    init(url)
    document.getElementById('results').innerHTML = "";
});
document.getElementById('activate-proxy-btn').addEventListener('click', () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/' + url;
    window.open(proxyUrl, '_blank');
});

const init = (url2 = "https://cineblog01.now/film/?genere=6&sorting=news_read") => {
    //const url2="https://cineblog01.now/film/?genere=6&sorting=news_read"
    //a=document.querySelectorAll("#dle-content > article > div.short-main > h3 > a")
    //genere fantasy
    //https://cineblog01.now/film/?genere=9&sorting=news_read
    //https://cineblog01.now/film/page/2/?genere=9&sorting=fixed
    //https://cors-anywhere.herokuapp.com/https://cineblog01.now/film/?genere=9&sorting=time
    //let proxyUrlBack="https://api.allorigins.win/raw?url="
    //https://proxy.cors.sh/https://google.it


    const targetUrl = url2; //'https://cineblog01.now'; // Replace with the URL you want to scrape

    console.log(proxyUrl + targetUrl);

    fetch(proxyUrl + targetUrl/*,{ headers: {
      'Origin': 'https://scrapercb01.onrender.com',
      'x-requested-with': 'XMLHttpRequest'
    }}*/)
        .then(response => {
            if (!response.ok) {
                // Se la richiesta fallisce, usa il proxy
                //return fetch(proxyUrl + targetUrl);
                alert(`fetch error! switch proxy - ${response.reason}`);
                proxyUrl = switchProxy();
            }
            return response;
        })
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const articles = [];
            let linksCb = [];
            let filmdb = [];
            let cont = 0;
            let htmlCode = '';

            //qui prende i link e il nome del film degli articoli dalle locandine dalla pagina
            const articleElements = doc.querySelectorAll("#dle-content > article > div.short-main > h3 > a");


            articleElements.forEach(element => {
                const title = element.textContent;
                const links = element.href;

                articles.push({ title, links });
            });

            const resultsDiv = document.getElementById('results');


            articles.forEach(async (article) => {

                if (type == "serie-tv") {
                    // console.log('serie tv')
                    // console.log(article)

                    //qui prende il link del film e scrapa la pagina con i link del film
                    await sukaSerie(article.links)
                        .then(html => {
                            console.log(html)
                            if (html.length == 0) { return }//se sn film nn farli visualizzare(se ha solo 2 link)
                            htmlCode += ` <p class="card">`;
                            htmlCode += ` <label for="ser-select">${article.title}</label>`;
                            htmlCode += ` <img class="series-card-img" src="${html[0].locandinaUrl}" alt="locandina">`;
                            htmlCode += ` <span>${html[0].storyFilm}</span>`;
                            htmlCode += ` <select onchange='serieOpen(this)'name="genere" id="ser-select">`;
                            htmlCode += ` <option value="none">- Stagione 1 -</option>`;
                            htmlCode += ` </p>`
                            // htmlCode+=` <div class="serietv">`;
                            html.forEach((element) => {

                                const { url,urlTwo,  num, title  } = element;

       htmlCode += ` <option value="${url}">${num}</option>`;
       htmlCode += ` <option value="${urlTwo}">${num} (dropload)</option>`;
       let tmpUrl=urlTwo.replace('embed-' , 'd/')
htmlCode += ` <option value="${tmpUrl}">${num} (download)</option>`;
                            });
                            htmlCode += ` </select>`;
                            resultsDiv.innerHTML += htmlCode;
                            htmlCode = '';
                        }).catch(error => {
                            renderErrorMessage(`Error SukaSerie! Fetch | ${error}`);
                        });

                } else {

                    await suka(article.links)
                        .then(html => {
                            //debugger
                      console.log(html)

                            let temp = html[0].linkVideo;
                            linksCb.push(temp);
                            filmdb.push(html[0]);
                        }).catch(error => {
                            renderErrorMessage(`Error SukaFilm Fetch | ${error}`);
                        });

                    //creazione elementi film
                    const p = document.createElement('p');
                    const a = document.createElement('a');
                    const span = document.createElement('span');
                    const trailerLink = document.createElement('a');
                    const img = document.createElement('img');
                    img.src = filmdb[cont].urlLocandina;
                    img.className = 'locandina';
                    p.appendChild(img);
                    trailerLink.textContent = 'Trailer';
                    let imdbstring=linksCb[cont];
                    imdbstring=imdbstring.replace('https://mostraguarda.stream/movie/',"");
                   // console.log(imdbstring);
                  //  trailerLink.href = filmdb[cont].trailerVideo;
                //  trailerLink.onclick='showPage(imdbstring)';
                 trailerLink.addEventListener('click', (event) => {
                        event.preventDefault();
                        showPage(imdbstring);
                    });
                  //  trailerLink.target = '_blank';
                    p.appendChild(trailerLink);
                    span.textContent = filmdb[cont].storyFilm;
                    p.appendChild(span);
                    p.className = "card";
                    p.id=imdbstring;
                    a.textContent = article.title;
                    a.href = linksCb[cont];
                    let lin = linksCb[cont];
                    a.addEventListener('click', (event) => {
                        event.preventDefault();
                        document.getElementById('rame').src = lin;
                        window.scrollTo(0, document.body.scrollHeight);
                    }); a.target = '_blank';
                    p.appendChild(a);
                    resultsDiv.appendChild(p);
                    cont++
                }


            })


        })// fine then

    const sukaSerie = async (tUrl) => {

        try {
            const response = await fetch(proxyUrl + tUrl);
            const html2 = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(html2, 'text/html');
            // cscrape links e stagioni episodio

            const mirrors = doc.querySelectorAll('.mirrors .mr');
           
            const stagioniserie = doc.querySelectorAll("#tt_holder > div.tt_series > div > div > ul > li > a");
            let locandinaUrl=doc.querySelector("#dle-content > article > div.story-cover > img").src;
            locandinaUrl = replaceDomain(locandinaUrl);
            let storyFilm = doc.querySelector(" div.story").textContent;
            //document.querySelectorAll("#tt_holder > div.tt_series > div > div.tab-pane.active > ul > li > a")
            //document.querySelector("#serie-1_1")
            const urls = [];
            const urlSupervideo = [];
            const urlDropload = [];
            let fullStagione = [];
            
            mirrors.forEach(mirror => {
                const url = mirror.getAttribute('data-link');

                if (url.includes('supervideo')) {
                    urlSupervideo.push(url);
                } else if (url.includes('dropload')) {
                //  console.log(url)
                    urlDropload.push(url);
                }

            });
           let contatore=0;
            stagioniserie.forEach(mirror => {
                const url = mirror.dataset.link;
                const urlTwo = urlDropload[contatore];
                const num = mirror.dataset.num;
                const title = mirror.dataset.title;

                fullStagione.push({ url,urlTwo, num, title,locandinaUrl,storyFilm });
                contatore++
            });
          //  console.log(fullStagione);
            return fullStagione;
        } catch (error) {
            renderErrorMessage(`Error fetching the URL | ${error} | \n${tUrl}`);
        }
    }// fine sukaserie

    const suka = async (tUrl) => {
        // debugger;
        let infoFilm = [];
        try {
            const response = await fetch(proxyUrl + tUrl);
            const htmlContent = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');

            // suka info dalla pagina del film
            let linkVideo = doc.querySelectorAll("iframe")[1].src;
            //let trailerVideo = doc.querySelector("#trailer").src;
            let trailerVideo = doc.querySelectorAll("#trailer")[0].src
            let urlLocandina = doc.querySelector("#dle-content > article > div.story-cover > img").src;
            urlLocandina = replaceDomain(urlLocandina);
            let storyFilm = doc.querySelector(" div.story").textContent;

            infoFilm.push({ linkVideo, trailerVideo, urlLocandina, storyFilm });

            //document.querySelector("#mirrorFrame") #download-table > tbody > tr
            //console.log(docEl)
            return infoFilm;
            //return (docEl ,trailerVideo,urlLocandina,storyFilm);

        } catch (error) {
            renderErrorMessage(`Error fetching the URL | ${error} | \n${tUrl}`);
        }

    };// fine SUKA

} // FINE INIT
//document.querySelector("#download-table > tbody > tr ")

const renderErrorMessage = (errorMessage) => {
    const errorEl = document.getElementById('error')
    errorEl.textContent = "";
    console.error(errorMessage);
    errorEl.textContent = errorMessage;
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('install-app-btn').style.display = 'block';
});

document.getElementById('install-app-btn').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
    }
});

window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

const serieOpen = (e) => {
    let url = e.value;
  
    //window.scrollTo(0, document.body.scrollHeight);
    document.getElementById('rame').src = url;
      if(url.includes('/d/')){ 
        window.open(url,"_blank");
        url=url.replace('.html', '')
        document.getElementById('rame').src =proxyUrl+url+'_h';
      }
};

const replaceDomain = (url) => {
    let oldDomain = "https://scrapercb01.onrender.com/";
    if (url[0] == "f") {
        // local file
        oldDomain = "file:///";
    }
    return url.replace(oldDomain, urlHost);
};