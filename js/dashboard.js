const menu = document.querySelector(".menu-icon");
const mobileNav = document.querySelector(".mobile-nav");

menu.addEventListener("click", () => {
  mobileNav.classList.toggle("active-mobile-nav");
});
