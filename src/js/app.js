//Helpers

function $(query, quant = 'one'){
    if(quant === 'one') return document.querySelector(query);
    else if(quant === 'two') return document.querySelectorAll(query);
}

function debounce(func, wait = 20, immediate = true){
    let timeout;
    return function() {
        let context = this,
            args = arguments;

        function later(){
            timeout = null;
            if(!immediate) func.apply(context, args);
        }

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow) func.apply(context, args);

    }
}

//Elements

const elements = {
    book : $('.book'),
    wcidSection: $('.section-wcid'),
    featureBoxOne: $('.feature-box', 'two')[0],
    featureBoxTwo: $('.feature-box', 'two')[1],
    svgPen: $('.feature-box__svg--pen'),
    svgLap: $('.feature-box__svg--laptop'),
    menu: $('.navigation__list'),
    menuCheckbox: $('.navigation__checkbox')
};

//Scroll animations

const posTriggers = {
    book: elements.book.parentElement.offsetTop,
    bookParentSize: elements.book.parentElement.offsetHeight,
    featureBoxOne: elements.featureBoxOne.offsetTop + elements.wcidSection.offsetTop + elements.featureBoxOne.offsetHeight + 100,
    featureBoxTwo: elements.featureBoxTwo.offsetTop + elements.wcidSection.offsetTop + elements.featureBoxTwo.offsetHeight + 100 
}

function checkSlide(e){
    const halfScreen = window.scrollY + (window.innerHeight / 2);
    const bottomPos = window.scrollY + window.innerHeight;

    

    if(screen.width >= 600){

        if(halfScreen > posTriggers.book) elements.book.classList.add('book--active');
        else elements.book.classList.remove('book--active');

    }

    if(bottomPos >= posTriggers.featureBoxOne){
        elements.svgPen.classList.add('feature-box__svg--pen-active');
    }

    if(bottomPos >= posTriggers.featureBoxTwo + 100){
        elements.svgLap.classList.add('feature-box__svg--laptop-active');
    }
    


   


}
window.addEventListener('scroll', debounce(checkSlide));


//menu navigation

elements.menu.addEventListener('click', e => {
    if(!e.target.matches('a')) return;
    elements.menuCheckbox.checked = false;
});