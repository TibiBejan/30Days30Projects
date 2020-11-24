const hamburgetMenuToggle = document.querySelector('.hamburger-toggler');
let isOpen = false;

// EVENTS
hamburgetMenuToggle.addEventListener('click', toggleMobileMenu);

// TOGGLE MOBILE MENU
function toggleMobileMenu(){
    const mobileMenu = document.querySelector('.navbar-links');

    if(isOpen){
        this.classList.remove('active');
        mobileMenu.classList.remove('open');
        isOpen = false;
    } else {
        this.classList.add('active');
        mobileMenu.classList.add('open');
        isOpen = true;
    }
}