// Sight object
class Sight {
    constructor(name, location, image) {
        this.name = name;
        this.location = location;
        this.image = image;
    }
}

// Interface
class UI {

    // get db ->
    static displaySights() {

        // get data from database - dummy for now
        const recSights = [
            {
                name: 'Bird one',
                location: '0, 0', // coordinates
                image: 'alpha.png' // check camera integration/libraries
            },
            {
                name: 'Bird two',
                location: '1, 1', // coordinates
                image: 'beta.png' // check camera integration/libraries
            },
            {
                name: 'Bird three',
                location: '2, 2', // coordinates
                image: 'gamma.png' // check camera integration/libraries
            }
           
        ];

        const sights = recSights;

        sights.forEach((sight) => UI.addSight(sight));
        // need to count 

    }

    static addSight(sight) {
        // add to database, connect to user
        const sights = document.querySelector('#sights');

        const row = document.createElement('tr');

        // row data
        row.innerHTML = `
        <td>${sight.name}</td> 
        <td>${sight.location}</td>
        <td>${sight.image}</td>
        <td><a href="#">remove</a></td>
        `;

        sights.appendChild(row);

    }

    static clearForm() {
        document.querySelector('#name').value = '';
        document.querySelector('#location').value = '';
        document.querySelector('#image').value = '';
    }

    // delete by id
    static deleteSight() {

    }

}

document.addEventListener('DOMContentLoaded', UI.displaySights);

// add sight
document.querySelector('#addSight').addEventListener('submit', (e) => {
    e.preventDefault();
    // get the info
    const name = document.querySelector('#name').value;
    const location = document.querySelector('#location').value; // geolocation API -> openmap
    const image = document.querySelector('#image').value;

    // inst. sight
    const sight = new Sight(name, location, image);

    console.log(sight);
    UI.addSight(sight);

});
