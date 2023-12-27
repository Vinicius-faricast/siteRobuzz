
const targets = document.querySelectorAll('[data-animation]');
const animationClass = "animate";

const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
        const context = this;
        const later = function() {
            timeout = null;
            if(!immediate) func.apply(context, args)
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow) func.apply(context, args);
    };
};

const addClassInElements = element => {
    const formWindow = window.innerHeight*0.78;
    const windowTop = window.scrollY + formWindow;
    const targetTopValue = element.offsetTop

    windowTop > targetTopValue 
        ? element.classList.add(animationClass)
        : element.classList.remove(animationClass);
}

const animation = () => {
    targets.forEach(addClassInElements);
}

animation();

export const animeSectionScroll = () => {
    window.addEventListener('scroll', debounce(animation, 50))
}