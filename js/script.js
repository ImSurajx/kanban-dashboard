// select all card which is present
const cards = document.querySelectorAll('.card');
// select all the card container
const containers = document.querySelectorAll('.btm');

// current moving element (global trak);
let movingCard = null;
let originalContainer = null;

// here we put values when use start draging a card.
cards.forEach(card => {
    card.addEventListener("dragstart", (e) => {
        movingCard = card;
        originalContainer = e.target.parentElement;
    })
})

// drag effect is manage by here
containers.forEach(container => {
    // enable draging of element in browser.
    container.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    // when card enter any container area it will be highlighted.
    container.addEventListener("dragenter", () => {
        container.classList.toggle('active');
    })
    // when card leave the present card area it will be removed.
    container.addEventListener("dragleave", () => {
        container.classList.toggle('active');
    })
    // this lister make card dragble from one container to another.
    container.addEventListener('drop', (e) => {
        e.preventDefault();
        // checking if our current container has the same id as the initial card contianer then return the function & don't change anything¸
        if (originalContainer.id === e.currentTarget.id) return;
        // move our card into current target element.
        else {
            e.currentTarget.appendChild(movingCard);
            movingCard = null;
            container.classList.toggle('active');
        }
    })
})


