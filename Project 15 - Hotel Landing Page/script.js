// const hamburgetMenuToggle = document.querySelector('.hamburger-toggler');
// let isOpen = false;

// // EVENTS
// hamburgetMenuToggle.addEventListener('click', toggleMobileMenu);

// // TOGGLE MOBILE MENU
// function toggleMobileMenu(){
//     const mobileMenu = document.querySelector('.navbar-links');

//     if(isOpen){
//         this.classList.remove('active');
//         mobileMenu.classList.remove('open');
//         isOpen = false;
//     } else {
//         this.classList.add('active');
//         mobileMenu.classList.add('open');
//         isOpen = true;
//     }
// }

// TESTIMONIAL SLIDER
const slider_ul = document.querySelector('.testimonials__wrapper-content');
const slides = [...slider_ul.children];
const slideWidth = slides[0].getBoundingClientRect().width;

const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');

//EVENT LISTENERS
nextButton.addEventListener('click', toggleNextSlide);
prevButton.addEventListener('click', togglePreviousSlide);

function positionSlides(slides){
    slides.forEach((slide,index) => {
        slide.style.left = slideWidth * index + "px";
    })
}

positionSlides(slides);

function toggleNextSlide(){
    const currentSlide = slider_ul.querySelector('.current-slide');
    let nextSlide = currentSlide.nextElementSibling;

    if(!nextSlide) {
        nextSlide = slides[0];
    }

    moveToTargetSlide(currentSlide, nextSlide);
}

function togglePreviousSlide(){
    const currentSlide = slider_ul.querySelector('.current-slide');
    let prevSlide = currentSlide.previousElementSibling;

    if(!prevSlide) {
        prevSlide = slides[slides.length - 1];
    }

    moveToTargetSlide(currentSlide, prevSlide);
}

function moveToTargetSlide(currentSlide, targetSlide){
    const position = targetSlide.style.left;
    slider_ul.style.transform = `translateX(-${position})`;

    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

