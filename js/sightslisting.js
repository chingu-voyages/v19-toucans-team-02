const navToggler = document.getElementById("mble-menu");
const toggleMenu = document.getElementById("toggle-menu");
const closeLink = document.querySelector('.close-link');
const mbleMenu = document.getElementById("mble-menu");

closeLink.addEventListener("click",closeMbleMenu);

function closeMbleMenu() {
  toggleMenu.classList.add("hide");
}

navToggler.addEventListener('click', togglerClick);

function togglerClick() {
 toggleMenu.classList.remove("hide");
 toggleMenu.classList.add("toggleMenuStyle")
}
