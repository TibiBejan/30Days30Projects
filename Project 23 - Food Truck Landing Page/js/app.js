(function toggleMobileMenu() {
    const toggler = document.querySelector('.mobile-menu');
    const closeButton = document.getElementById('close-button')
    const mobileMenu = document.querySelector('.header__navbar-mobile');
    const mainContent = document.getElementById('main');

    toggler.addEventListener('click', () => {
        toggler.classList.add('toggled');
        mobileMenu.style.right = "0";
        mainContent.classList.add('faded');
    });

    closeButton.addEventListener('click', () => {
        toggler.classList.remove('toggled');
        mobileMenu.style.right = "-300px";
        mainContent.classList.remove('faded');
    });

    window.addEventListener('resize', () => {
        if(window.innerWidth > 1250) {
            toggler.classList.remove('toggled');
            mobileMenu.style.right = "-300px";
            mainContent.classList.remove('faded');
        }
    });
})();

(function toggleStickyNavbar(){
    const navigationBar = document.querySelector('.header__navbar');

    window.addEventListener('scroll', () => {
        if(scrollY > 0){
            navigationBar.classList.add('sticky');
        } else {
            navigationBar.classList.remove('sticky');
        }
    });
})();