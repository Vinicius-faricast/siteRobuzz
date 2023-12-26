
const btnMobile = document.querySelector('.btn-mobile');
const linkNav = document.querySelectorAll('.link-nav');
const nav = document.querySelector('.menu-itens');

const toogleMenu = e => {

    if(e.type === "touchstart"){
        e.preventDefault();
    };
 
    nav.classList.toggle('active');
    e.target.classList.toggle('open');

    const active = nav.classList.contains('active');
    e.target.setAttribute('aria-expanded', active);
    
    const result = active ? 'Fechar menu' : 'Abrir menu';
    e.target.setAttribute('aria-label', result);


    linkNav.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        })
    })
}

export const menuBarMobile = () => {

    btnMobile.addEventListener('click', toogleMenu);
    btnMobile.addEventListener('touchstart', toogleMenu);

};