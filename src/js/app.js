//Helpers

function $(query){
    return document.querySelector(query);
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
    book : $('.book')
};


//Scroll animations

const posTriggers = {
    book: elements.book.parentElement.offsetTop,
    bookParentSize: elements.book.parentElement.offsetHeight
}

function checkSlide(e){
    const halfScreen = window.scrollY + (window.innerHeight / 2);

    if(screen.width >= 600){

        if(halfScreen > posTriggers.book) elements.book.classList.add('book--active');
        else elements.book.classList.remove('book--active');

    }
    


   


}
window.addEventListener('scroll', debounce(checkSlide));