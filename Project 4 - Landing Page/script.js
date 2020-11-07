const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

// Navigation bar Toggle
hamburger.addEventListener("click", function () {
  this.classList.toggle("active");
  navbar.classList.toggle("open");
});
