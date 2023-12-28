const articleContainer = document.querySelector('.articles-container');
const nextBtns = document.querySelectorAll('[data-js="carousel__button--next"]');
const prevBtns = document.querySelectorAll('[data-js="carousel__button--prev"]');

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

const createCarrosselSlidesInHtml = async() => {
    const articleHTML = await createCarrosselSlides();
    
    articleHTML.forEach((article) => {
        articleContainer.appendChild(article);
    })

    nextSlideService()
    prevSlideService();

}

const nextSlideService = () => {
    nextBtns.forEach(nextBtn => {
        nextBtn.addEventListener('click', () => {
            ManipulateSlideService(500);
        })
    })
}

const prevSlideService = () => {
    prevBtns.forEach(prevBtn => {
        prevBtn.addEventListener('click', () => {
            ManipulateSlideService(-100);
        })
    })
}

const ManipulateSlideService = leftValue => {
    articleContainer.scrollBy({
        top: 0,
        left: leftValue,
        behavior: "smooth",
      });
}

const ArticleHTMlstructure = ({title, content, image}) => {
    const divArticle = document.createElement('div');
    divArticle.classList.add('services-article');
    divArticle.setAttribute('data-js', 'services-article')

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

export const createArticleServices = () => {
    createCarrosselSlidesInHtml()
}