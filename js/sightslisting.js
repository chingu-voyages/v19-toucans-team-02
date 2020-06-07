const navToggler = document.getElementById("mble-menu");
const toggleMenu = document.getElementById("toggle-menu");
const closeLink = document.querySelector('.close-link');
const mbleMenu = document.getElementById("mble-menu");

// closeLink.addEventListener("click",closeMbleMenu);

function closeMbleMenu() {
  toggleMenu.classList.add("hide");
}

// navToggler.addEventListener('click', togglerClick);

function togglerClick() {
 toggleMenu.classList.remove("hide");
 toggleMenu.classList.add("toggleMenuStyle")
}


/** functions */


// phone camera access
/*
const supported = 'mediaDevices' in navigator;

const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');

  const constraints = {
    video: true,
  };

// permission eed to be asked
  captureButton.addEventListener('click', () => {
    // Draw the video frame to the canvas.
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    player.srcObject.getVideoTracks().forEach(track => track.stop());
  });

  // Attach the video stream to the video element and autoplay.
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      player.srcObject = stream;
    });
*/
// *************************************
class Sight {
  constructor(name, date, specie, info, location, other) {
    this.name = name;
    this.info = info;
    this.date = date;
    this.specie = specie;
    this.location = location;
    this.other = other;
  }
}

// ui class - interface
class UI {
  static displaysights() {

      // get data from database
      const sights = Store.getsights();

    // sights.forEach((sight) => UI.addsightToList(sight));

  }

  static addsightToList(sight) {
      // add to database, connect to user
      const list = document.querySelector('#sights-list');

      const row = document.createElement('tr');

      row.innerHTML = `
      <td>${sight.name}</td>
      <td>${sight.date}</td>
      <td>${sight.specie}</td>
      <td>${sight.location}</td>
      <td>${sight.other}</td>
      <td><a href="#" class="delete">delete</a></td>
      `;

      list.appendChild(row);

  }

  static clearForm() {
      document.querySelector('#name').value = '';
      document.querySelector('#date').value = '';
      document.querySelector('#specie').value = '';
      document.querySelector('#location').value = '';
      document.querySelector('#other').value = '';
  }

  // delete by id
  static deletesight(el) {
      if (el.classList.contains('delete')) {
          el.parentElement.parentElement.remove();
      }
  }
}

// store class - save, storage
class Store {

 static getsights() {
      let sights;
      if (localStorage.getItem('sights') === null) {
          sights = [];
      } else {
          sights = JSON.parse(localStorage.getItem('sights')); // JSON format
      }

  } 

  static addsight(sight) { // id ?
      const sights = Store.getsights();

      sights.push(sight);

    //  localStorage.setItem('sights', JSON.stringify(sights));

  }
/*
  static removesight(specie) { // id ?

      const sights = Store.getsights();

      sights.forEach((sight, index) => {
          if (sight.specie === specie) {
              sights.splice(index, 1);
          }
      }); 

    localStorage.setItem('sights', JSON.stringify(sights));
  } */
}
// ************************

// events class display stuff
document.addEventListener('DOMContentLoaded', UI.displaysights);

// Add an Item
document.querySelector('#sight-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // get the info
  const name = document.querySelector('#name').value;
  const date = document.querySelector('#date').value;
  const specie = document.querySelector('#specie').value;
  const location = document.querySelector('#location').value;
  const other = document.querySelector('#other').value;
  

  if (name === '' || date === '' || specie === '') {
      alert('fields missing');
      
  } else {
      // create the sight
      const sight = new Sight(name, date, specie, location, other);

      console.log(sight);
      UI.addsightToList(sight);
      UI.clearForm();
      Store.addsight(sight);

  }

});

// delete sight
// target element
document.querySelector('#sights-list').addEventListener('click', (e) => {
  // console.log(e.target);
  UI.deletesight(e.target);
});

