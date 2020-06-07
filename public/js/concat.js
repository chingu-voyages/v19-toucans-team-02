// The Auth0 client, initialized in configureClient()
let auth0 = null;

/**
 * Starts the authentication flow
 */
const login = async (targetUrl) => {
  try {
    console.log("Logging in", targetUrl);

    const options = {
      redirect_uri: window.location.origin
    };

    if (targetUrl) {
      options.appState = { targetUrl };
    }

    await auth0.loginWithRedirect(options);
  } catch (err) {
    console.log("Log in failed", err);
  }
};

/**
 * Executes the logout flow
 */
const logout = () => {
  try {
    console.log("Logging out");
    auth0.logout({
      returnTo: window.location.origin
    });
  } catch (err) {
    console.log("Log out failed", err);
  }
};

/**
 * Retrieves the auth configuration from the server
 */
const fetchAuthConfig = () => fetch("/auth_config.json");

/**
 * Initializes the Auth0 client
 */
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });
};

/**
 * Checks to see if the user is authenticated. If so, `fn` is executed. Otherwise, the user
 * is prompted to log in
 * @param {*} fn The function to execute if the user is logged in
 */
const requireAuth = async (fn, targetUrl) => {
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    return fn();
  }

  return login(targetUrl);
};

// Will run when page finishes loading
window.onload = async () => {
  await configureClient();

  // If unable to parse the history hash, default to the root URL
  if (!showContentFromUrl(window.location.pathname)) {
    showContentFromUrl("/");
    window.history.replaceState({ url: "/" }, {}, "/");
  }

  const bodyElement = document.getElementsByTagName("body")[0];

  // Listen out for clicks on any hyperlink that navigates to a #/ URL
  bodyElement.addEventListener("click", (e) => {
    if (isRouteLink(e.target)) {
      const url = e.target.getAttribute("href");

      if (showContentFromUrl(url)) {
        e.preventDefault();
        window.history.pushState({ url }, {}, url);
      }
    }
  });

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    console.log("> User is authenticated");
    window.history.replaceState({}, document.title, window.location.pathname);
    updateUI();
    return;
  }

  console.log("> User not authenticated");

  const query = window.location.search;
  const shouldParseResult = query.includes("code=") && query.includes("state=");

  if (shouldParseResult) {
    console.log("> Parsing redirect");
    try {
      const result = await auth0.handleRedirectCallback();

      if (result.appState && result.appState.targetUrl) {
        showContentFromUrl(result.appState.targetUrl);
      }

      console.log("Logged in!");
    } catch (err) {
      console.log("Error parsing redirect:", err);
    }

    window.history.replaceState({}, document.title, "/");
  }

  updateUI();
};

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


// book class - object 
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// ui class - interface
class UI {
    static displayBooks() {

        // get data from database
        //const books = Store.getBooks();
        const books = [
            {
                title: 'I Robot',
                author: 'Isaac asimov',
                isbn: '23768'
            },
            {
                title: 'Il Sole Nudo',
                author: 'Isaac asimov',
                isbn: '8439'
            },
            {
                title: '1984',
                author: 'Orwell',
                isbn: '0982'
            }
        ]

       books.forEach((book) => UI.addBookToList(book));

    }

    static addBookToList(book) {
        // add to database, connect to user
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">delete</a></td>
        `;

        list.appendChild(row);

    }

    static clearForm() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    // alert messages
    /* static showAlert(message, style){
        const div = document.createElement('div');

        div.style = `alert -${style}`;
        div.appendChild(document.createTextNode(message));

    } */

    // delete by id
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}

// store class - save, storage
class Store {

   static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books')); // JSON format

        }

    } 

    static addBook(book) { // id ?
        const books = Store.getBooks();

        books.push(book);

      //  localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn) { // id ?

        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        }); 

      localStorage.setItem('books', JSON.stringify(books));
    }
}
// ************************

// events class display stuff
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add an Item
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // get the info
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;


    if (title === '' || author === '' || isbn === '') {
        alert('fields missing');
        // UI.showAlert('missing fiels', 'red');
    } else {
        // create the book
        const book = new Book(title, author, isbn);

        // success message
        //UI.showAlert('success', '')

        console.log(book);
        UI.addBookToList(book);
        UI.clearForm();
        Store.addBook(book);


    }


});


// delete book
// target element
document.querySelector('#book-list').addEventListener('click', (e) => {
    // console.log(e.target);
    UI.deleteBook(e.target);
});


// URL mapping, from hash to a function that responds to that URL action
const router = {
  "/": () => showContent("content-home"),
  "/profile": () =>
    requireAuth(() => showContent("content-profile"), "/profile"),
  "/login": () => login()
};

//Declare helper functions

/**
 * Iterates over the elements matching 'selector' and passes them
 * to 'fn'
 * @param {*} selector The CSS selector to find
 * @param {*} fn The function to execute for every element
 */
const eachElement = (selector, fn) => {
  for (let e of document.querySelectorAll(selector)) {
    fn(e);
  }
};

/**
 * Tries to display a content panel that is referenced
 * by the specified route URL. These are matched using the
 * router, defined above.
 * @param {*} url The route URL
 */
const showContentFromUrl = (url) => {
  if (router[url]) {
    router[url]();
    return true;
  }

  return false;
};

/**
 * Returns true if `element` is a hyperlink that can be considered a link to another SPA route
 * @param {*} element The element to check
 */
const isRouteLink = (element) =>
  element.tagName === "A" && element.classList.contains("route-link");

/**
 * Displays a content panel specified by the given element id.
 * All the panels that participate in this flow should have the 'page' class applied,
 * so that it can be correctly hidden before the requested content is shown.
 * @param {*} id The id of the content to show
 */
const showContent = (id) => {
  eachElement(".page", (p) => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
};

/**
 * Updates the user interface
 */
const updateUI = async () => {
  try {
    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0.getUser();

      document.getElementById("profile-data").innerText = JSON.stringify(
        user,
        null,
        2
      );
    
      //document.querySelectorAll("pre code").forEach(hljs.highlightBlock);

      // eachElement(".profile-image", (e) => (e.src = user.picture));
      // eachElement(".user-name", (e) => (e.innerText = user.name));
      // eachElement(".user-email", (e) => (e.innerText = user.email));
      eachElement(".auth-invisible", (e) => e.classList.add("hidden"));
      eachElement(".auth-visible", (e) => e.classList.remove("hidden"));
    } else {
      eachElement(".auth-invisible", (e) => e.classList.remove("hidden"));
      eachElement(".auth-visible", (e) => e.classList.add("hidden"));
    }
  } catch (err) {
    console.log("Error updating UI!", err);
    return;
  }

  console.log("UI updated");
};

window.onpopstate = (e) => {
  if (e.state && e.state.url && router[e.state.url]) {
    showContentFromUrl(e.state.url);
  }
};
