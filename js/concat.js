// default text
var stdText = 'So you want to be a pirate, eh? You look more like a flooring inspector.';

// google fonts
function generate() {
    let GoogleAPI = 'https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyDNpDEJYucCGaRhFbAEg7IvLcd216l-CHI';

    fetch(GoogleAPI).then(response => {
        return response.json()
    })

        // synch + nested code method
        .then(data => {

            // get all the font names and create a css import readeable string
            let sheet = document.createElement('style');
            let template = document.querySelector('#tmpl').content;
            let fonts = '';

            // la lista dei font deve essere mandata fuori dal fetch/then
            data.items.forEach(element => {
                // to css import
                fonts += element.family.replace(/ /g, '+') + '|';

                let name = template.querySelector('.box-name');
                let text = template.querySelector('.box-text');

                name.textContent = element.family;
                text.style.fontFamily = element.family;

                document.querySelector('.grid').appendChild(document.importNode(template, true));

            });

            // add all the fonts to import
            let fontImport = "@import url('https://fonts.googleapis.com/css?family=" + fonts + "&display=swap')";
            sheet.innerHTML = fontImport;

            console.log(fontImport);
            document.body.appendChild(sheet);

            textFill();
            textChange();
            changeLayout();
            fontSize();
            toTop();
            reset();
            contrast();
            search();

        })

        .catch(err => {
            console.log('API Error');
        })
}

// font-size
function fontSize() {
    let select = document.getElementById('f-size');
    let text = document.querySelectorAll('.box-text');

    select.addEventListener('change', (e) => {

        for (let i = 0; i < text.length; i++) {
            text[i].style.fontSize = e.target.value;
        }
    });
}

// contrast 
function contrast() {
    let rad = document.getElementsByName('lightdark');

    // better way?
    for (let i = 0; i < rad.length; i++) {
        rad[i].addEventListener('change', function () {
            if (this.value == 'v-dark') {
                document.body.classList.add("dark");
            } else {
                document.body.classList.remove("dark");
            }
        });
    }
}

// layout grid / list
function changeLayout() {
    let llist = document.getElementById('la-list');
    let lgrid = document.getElementById('la-grid');
    let grid = document.querySelector('.grid');

    lgrid.addEventListener('click', (e) => {
       grid.style.display = null;
    });

    llist.addEventListener('click', (e) => {
       grid.style.display = 'block';
    });
}

// page to top
function toTop() {
    let top = document.querySelector('#to-top');

    top.addEventListener('click', (e) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// page reset
function reset() {
    let reset = document.querySelector('#reset');
    let text = document.querySelectorAll('.box-text');
    let box = document.querySelectorAll('.font-box');
    let input = document.querySelector('#sentence');
    let search = document.querySelector('#font-name');
    let select = document.getElementById('f-size');
    let grid = document.querySelector('.grid');

    reset.addEventListener('click', (e) => {
        for (let i = 0; i < text.length; i++) {
            text[i].innerHTML = stdText;
            input.value = '';
            search.value = '';
            box[i].style.display = '';
            text[i].style.fontSize = '24px';
            select.value = '24px';
            grid.style.display = null;
        }
    });
}

// initial text
function textFill() {
    let text = document.querySelectorAll('.box-text');

    for (let i = 0; i < text.length; i++) {
        text[i].innerHTML = stdText;
    }
}

// text change from user input
function textChange() {
    let text = document.querySelectorAll('.box-text');
    let input = document.querySelector('#sentence');

    input.addEventListener('keyup', (e) => {
        for (let i = 0; i < text.length; i++) {
            if (input.value == '') {
                text[i].innerHTML = stdText;
            }
            else {
                text[i].innerHTML = input.value;
            }
        }
    });
}

function search() {
    let input = document.querySelector('#font-name');

    input.addEventListener('keyup', (e) => {

        let filter = input.value.toUpperCase();
        let box = document.querySelectorAll('.font-box');

        for (var i = 0; i < box.length; i++) {

            let name = box[i].querySelector(".box-name");
            let txtValue = name.textContent;

            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                box[i].style.display = "";
            } else {
                box[i].style.display = "none";
            }
        }
    });
}

// main function
generate();