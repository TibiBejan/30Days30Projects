const headerNavbar_nav = document.querySelector('.header__navbar');
const headerNavbarLinks_ul = document.querySelector('.header__navbar-links');
const hamburgerToggle = document.querySelector('.header__navbar-hamburger');

// EVENT LISTENERS
hamburgerToggle.addEventListener('click', toggleMenu);
window.addEventListener('scroll', toggleStickyNav);

// TOGGLE RESPONSIVE MENU
function toggleMenu(){
    headerNavbarLinks_ul.classList.toggle('open');
    hamburgerToggle.classList.toggle('toggled');
}

// TOGGLE STICKY NAV
function toggleStickyNav(){
    if(window.scrollY > 0){
        headerNavbar_nav.classList.add('sticky');
    } else {
        headerNavbar_nav.classList.remove('sticky');
    }
}
