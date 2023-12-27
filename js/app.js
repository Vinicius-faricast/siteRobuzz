const nextBtns = document.querySelectorAll('[data-js="carousel__button--next"]');
const prevBtns = document.querySelectorAll('[data-js="carousel__button--prev"]');
const articleContainer = document.querySelector('.articles-container');

let currentIndex = -1
let lastIndexArticles

const eventNextBtn = () => {
    nextBtns.forEach(nextBtn => {
        nextBtn.addEventListener('click', () => {
            
            const articleVisible = document.querySelector('.services-article');

            manipulatedCarrosselSlides(currentIndex, true);
            articleVisible ? articleContainer.removeChild(articleVisible) : '';
        })
    })
}

const eventPrevBtn = () => {
    prevBtns.forEach(prevBtn => {
        prevBtn.addEventListener('click', () => {
            const articleVisible = document.querySelector('.services-article');

            manipulatedCarrosselSlides(currentIndex, false);
            articleVisible ? articleContainer.removeChild(articleVisible) : '';
        })
    })
}

const fetchArticles = async () => {
    const articlesJson = await fetch('./articles.json');
    const articles = await articlesJson.json();

    return articles;
}

const createCarrosselSlides = async () => {
    const articles = await fetchArticles();

    const articleHTML = articles.map(article => {
        const articleObj = {...article}
        return ArticleHTMlstructure(articleObj);
    })

    return articleHTML;
}

const accIndex = (index, lastIndexArticle) => {
    currentIndex = index === lastIndexArticle 
    ? 0
    : ++currentIndex

    return currentIndex
}

const decIndex = (index, lastIndexArticle) => {
    currentIndex = index === 0 
    ? lastIndexArticle
    : --currentIndex

    return currentIndex
}

const manipulatedCarrosselSlides = async (index, type = true) => {
    const articleHTML = await createCarrosselSlides();
    
    lastIndexArticles = articleHTML.length -1

    const currentIndex = type 
        ? accIndex(index, lastIndexArticles)
        : decIndex(index, lastIndexArticles);
    
    articleContainer.appendChild(articleHTML[currentIndex]);
    // console.log(articleHTML[currentIndex])
    // articleContainer.innerHTML = articleHTML[currentIndex]
}

const ArticleHTMlstructure = ({title, content, image}) => {
    const divArticle = document.createElement('div');
    divArticle.classList.add('services-article');

    const divServiceContent = document.createElement('div');
    divServiceContent.classList.add('service-content');

    const serviceTitle = document.createElement('h1');
    serviceTitle.classList.add('service-title');
    serviceTitle.innerText = title;

    const serviceParagraph = document.createElement('p');
    serviceParagraph.classList.add('service-paragraph');
    serviceParagraph.innerText = content;

    const serviceCta = document.createElement('a');
    serviceCta.classList.add('service-cta');
    serviceCta.setAttribute('href', 'https://wa.me/5515981609302');
    serviceCta.setAttribute('target', '_blank');
    serviceCta.innerText = 'Fale Comigo';

    const imgService = document.createElement('img');
    imgService.classList.add('service-img');
    imgService.setAttribute('src', image);
    imgService.setAttribute('alt', '#');

    divArticle.appendChild(divServiceContent);
    divServiceContent.appendChild(serviceTitle);
    divServiceContent.appendChild(serviceParagraph);
    divServiceContent.appendChild(serviceCta);
    divArticle.appendChild(imgService);

    return divArticle;
}

export const eventCarrosselBtn = () => {
    manipulatedCarrosselSlides(currentIndex);
    eventNextBtn();
    eventPrevBtn();
}