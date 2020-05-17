// login - register popups (merge popup calls)

function loginPop() {
    let btn = document.getElementById('btn-login');
    
    btn.addEventListener('click', (e) => {
        document.getElementById("login").style.display = "block";
    });

}

function registerPop() {
    let btn = document.getElementById('btn-register');
    
    btn.addEventListener('click', (e) => {
        document.getElementById("register").style.display = "block";
    });

}

/** MAIN */

loginPop();
registerPop();