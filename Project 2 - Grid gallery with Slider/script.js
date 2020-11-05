// SELECT ELEMENTS FOR MODAL
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.container');
const gallery = document.querySelector('.gallery');
const galleryImages = [...gallery.children];

// SELECT ELEMENTS FOR SLIDER
const prevButton = document.querySelector('.left-button');
const nextButton = document.querySelector('.right-button');

const slider = document.querySelector('.slider');
const sliderImages = [...slider.children];
const slideWidth = sliderImages[0].getBoundingClientRect().width;

const dotsNav = document.querySelector('.dots');
const dots = [...dotsNav.children];


// TOGGLE MODAL AND GET THE INDEX OF GALLERY IMAGE
galleryImages.forEach(image => {
    image.addEventListener('click', function(){
        modal.classList.add('modal-open');
        modalContent.classList.add('modal-open');

        // FIND THE TARGET IMAGE INDEX
        const galleryImageTargetIndex = getIndex(this, galleryImages);
        //sliderImages[galleryImageTargetIndex].classList.add('active');

        // MOVE TO THE SELECTED IMAGE ON SLIDER
        const currentSlide = document.querySelector('.slide.active');
        const targetSlide = sliderImages[galleryImageTargetIndex];

        moveToSlide(currentSlide, targetSlide);
        
        // MOVE THE CURRENT DOT TO THE TARGET POSITION
        const currentDot = document.querySelector('.dot.active');
        const targetDot = dots[galleryImageTargetIndex];
        toggleActive(currentDot, targetDot);
    });
});

modal.addEventListener('click', (e) => {
    if(e.target.classList.contains('modal')){
        modal.classList.remove('modal-open');
        modalContent.classList.remove('modal-open');
    }
});


// FUNCTION TO POSITION IMAGES
function  positionSlides(sliderImages){ 
    for(let i = 0; i < sliderImages.length; i++){
        sliderImages[i].style.left = slideWidth * i + "px";
    }
}
positionSlides(sliderImages);

// EVENT LISTENERS
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// FUNCTION TO TOGGLE NEXT SLIDE
function nextSlide(){
    const currentSlide = document.querySelector('.active');
    let nextSlide;

    if(!currentSlide.nextElementSibling){
        nextSlide = sliderImages[0];
    } else {
        nextSlide = currentSlide.nextElementSibling;
    }

    const nextSlideIndex = getIndex(nextSlide, sliderImages);
    const currentDot = document.querySelector('.dot.active');
    let targetDot = dots[nextSlideIndex];

    moveToSlide(currentSlide, nextSlide);
    toggleActive(currentDot, targetDot);
}

// FUNCTION TO TOGGLE PREVIOUS SLIDE
function prevSlide(){
    const currentSlide = document.querySelector('.active');
    let prevSlide;

    if(!currentSlide.previousElementSibling){
        prevSlide = sliderImages[sliderImages.length - 1];
    } else {
        prevSlide = currentSlide.previousElementSibling;
    }

    const prevSlideIndex = getIndex(prevSlide, sliderImages);
    const currentDot = document.querySelector('.dot.active');
    let targetDot = dots[prevSlideIndex];

    moveToSlide(currentSlide, prevSlide);
    toggleActive(currentDot, targetDot);
}

// FUNCTION TO TOGGLE DOTS
dotsNav.addEventListener('click', (e) => {
    if(!e.target.classList.contains('dot')) return;

    const currentDot = document.querySelector('.dot.active');
    const targetDot = e.target;
    let targetDotIndex = getIndex(targetDot, dots);

    const currentSlide = document.querySelector('.slide.active');
    const targetSlide = sliderImages[targetDotIndex];

    moveToSlide(currentSlide, targetSlide);
    toggleActive(currentDot, targetDot);
});

// FUNCTION TO MOVE THE SLIDER TO THE CURRENT SLIDE
function moveToSlide(currentSlide, targetSlide){
    const position = targetSlide.style.left;
    slider.style.transform = `translateX(-${position})`;

    toggleActive(currentSlide, targetSlide);
}

// FUNCTION TO TOGGLE ACTIVE CLASS
function toggleActive(current, target){
    current.classList.remove('active');
    target.classList.add('active');
}

// FUNCTION TO GET THE INDEX
function getIndex(item, items){
    for(let i = 0; i < items.length; i++){
        if(items[i] === item){
            return i;
        }
    }
}
