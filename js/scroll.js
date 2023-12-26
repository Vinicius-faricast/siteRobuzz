const menuItens = document.querySelectorAll('.link-nav');

const getScrollTopByhref = idElement => {
    const section = document.querySelector(idElement);
    const to = section.offsetTop - 96;
    return to;
};

const scrollToPosition = target => {
    window.scroll({
        top: target,
        behavior: "smooth"
    });
};

const scrollToIDOnClick = e => {
    e.preventDefault();
    const idElement = e.target.getAttribute('href');

    const target = getScrollTopByhref(idElement);

    scrollToPosition(target);
};

export const scroll = () => {
    menuItens.forEach(item => {
        item.addEventListener('click', scrollToIDOnClick)
    })
}