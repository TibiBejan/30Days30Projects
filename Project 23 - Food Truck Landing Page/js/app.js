(function toggleMobileMenu() {
    const toggler = document.querySelector('.mobile-menu');
    const closeButton = document.getElementById('close-button')
    const mobileMenu = document.querySelector('.header__navbar-mobile');
    const mainContent = document.getElementById('main');

    toggler.addEventListener('click', () => {
        openMobileMenu();
    });

    closeButton.addEventListener('click', () => {
        closeMobileMenu();
    });

    window.addEventListener('resize', () => {
        if(window.innerWidth > 1250) {
            closeMobileMenu();
        }
    });

    function openMobileMenu(){
        toggler.classList.add('toggled');
        mobileMenu.classList.add('active');
        mainContent.classList.add('faded');
    }

    function closeMobileMenu(){
        toggler.classList.remove('toggled');
        mobileMenu.classList.remove('active');
        mainContent.classList.remove('faded');
    }
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