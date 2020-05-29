const imageInput = document.getElementById("image_uploads");
const uploadPreview = document.getElementById("uploadPreview");
const navToggler = document.getElementById("mble-menu");
const toggleMenu = document.getElementById("toggle-menu");
const closeLink = document.querySelector('.close-link');
const mbleMenu = document.getElementById("mble-menu");



imageInput.addEventListener('change', PreviewImage)

function PreviewImage() {
  uploadPreview.classList.remove("hide");
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("image_uploads").files[0]);

  oFReader.onload = function (oFREvent) {
      uploadPreview.src = oFREvent.target.result;
  };
};

closeLink.addEventListener("click",closeMbleMenu);

function closeMbleMenu() {
  toggleMenu.classList.add("hide");
}

navToggler.addEventListener('click', togglerClick);

function togglerClick() {
 toggleMenu.classList.remove("hide");
 toggleMenu.classList.add("toggleMenuStyle")
}
