const API_KEY = "1406e19ec17f4a2799dee61d8aafc03b";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

// Try to do different function = Separation of consern is good

function reload() {
    window.location.reload();
}


async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`) // fetch direct data anipareni API ru So, se promise return kare. Jahaku ame await karu
    const data = await res.json();
    console.log(data); /* What is json */ // api ru jou data asuchi taku "json" format re convert kariba pain ame json() use kare 
    bindData(data.articles);
}

/* json Format

{
    "FirstName" : "Sriram",
    "LastName"  : "Sahoo"
} */

function bindData(articles) {
    const cardsConatiner = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("tempalte-news-card");

    cardsConatiner.innerHTML = ""; // So New data asipariba

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsConatiner.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#new-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });  // You do not have to remember it , to set this value you just need some research in internate and have to find out 1:- How to set date 2:-How to set time zone etc tyoe of question

    newsSource.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank"); // _blank stands for new tab
    })  // To get to the webpage where the news belong 
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});