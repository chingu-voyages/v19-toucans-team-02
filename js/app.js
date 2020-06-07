const navToggler = document.getElementById("mble-menu");
const toggleMenu = document.getElementById("toggle-menu");
const closeLink = document.querySelector('.close-link');

closeLink.addEventListener("click",closeMbleMenu);

function closeMbleMenu() {
  toggleMenu.classList.add("hide");
}

navToggler.addEventListener('click', togglerClick);

function togglerClick() {
 toggleMenu.classList.remove("hide");
 toggleMenu.classList.add("toggleMenuStyle")
}


var clientId = "pZuuESr6uFSyW0NWopY5IqxoDUPYWQ6M";
var domain = "dev-a3qx3c2b.eu.auth0.com";
var options = {
    auth: {
      redirect: true,
      redirectUrl: 'http://google.com'

    },
    theme: {
     title: "The Big Year",
     logo: 'https://i.ibb.co/bNXm4tS/logo2.png', 
     primaryColor: '#FE9A84'
    }
};
window.onload=function(){
const loginBtn = document.getElementById("login-btn");
const createAccountBtn = document.getElementById("create-account-btn");
var lock = new Auth0Lock(this.clientId,this.domain,this.options);

loginBtn.addEventListener("click", (e) => {
e.preventDefault();
lock.show()
})

createAccountBtn.addEventListener("click", (e) => {
  e.preventDefault();
  lock.show()
  })
}


