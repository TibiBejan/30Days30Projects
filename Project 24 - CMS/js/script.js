window.addEventListener('scroll', toggleScrollTop);

//  ============= TOGGLE SCROLL TOP BUTTON ==============
function toggleScrollTop(){
    const scrollTop_a = document.getElementById('scroll-top');
    const header = document.querySelector('.header');
    const headerHeight = header.getBoundingClientRect().height;

    if(window.pageYOffset > headerHeight){
        scrollTop_a.classList.add('visible');
    } else {
        scrollTop_a.classList.remove('visible');
    }
};

//  ============= SHOW MENU ==============
(function toggleMobileMenu(){
    const toggler_div = document.getElementById('toggle-menu');
    const mobileMenu_navbar = document.querySelector('.navbar-bottom');
    const close_button = document.getElementById('close-menu');

    toggler_div.addEventListener('click', () => {
        mobileMenu_navbar.classList.add('visible');
    });

    close_button.addEventListener('click', () => {
        mobileMenu_navbar.classList.remove('visible');
    });
})();

//  ============= SHOW SEARCH OVERLAY ==============
(function toggleSearchOverlay(){
    const search_button = document.querySelector('.search-button');
    const searchOverlay_div = document.querySelector('.header__search-overlay');

    search_button.addEventListener('click', () => {
        searchOverlay_div.classList.add('visible');
    });

    searchOverlay_div.addEventListener('click', (e) => {
        if(!e.target.closest('form')){
            searchOverlay_div.classList.remove('visible');
        }
    });
})();

//  ============= TOGGLE STICKY NAVBAR ==============
(function toggleStickyNavbar(){
    const headerNavbar = document.querySelector('.header__navbar');

    window.addEventListener('scroll', () => {
        if(window.scrollY > 100){
            headerNavbar.classList.add('sticky');
        } else {
            headerNavbar.classList.remove('sticky');
        }
    })
})();
