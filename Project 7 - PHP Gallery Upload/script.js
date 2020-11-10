const navigationBar_header = document.querySelector('.header');
const responsiveNavbar_ul = document.querySelector('.header__navbar-links');
const hamburgerToggle_div = document.querySelector('.header__navbar-hamburger');

hamburgerToggle_div.addEventListener('click', toggleMobileMenu);
window.addEventListener('scroll', toggleStickyNavbar);

function toggleMobileMenu(){
    responsiveNavbar_ul.classList.toggle('open');
    hamburgerToggle_div.classList.toggle('toggled');
}

function toggleStickyNavbar(){
    if(window.scrollY > 0){
        navigationBar_header.classList.add('sticky');
    } else {
        navigationBar_header.classList.remove('sticky');
    }
}