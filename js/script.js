// select all card which is present
const cards = document.querySelectorAll('.card');
// select all the card container
const containers = document.querySelectorAll('.btm');

// current moving element (global trak);
let movingCard = null;
let originalContainer = null;

cards.forEach(card => {
    card.addEventListener("dragstart", (e) => {
        movingCard = card;
        originalContainer = e.target.parentElement;
    })
})


containers.forEach(container => {
    container.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    container.addEventListener("dragenter", () => {
        container.classList.toggle('active');
    })

    container.addEventListener("dragleave", () => {
        container.classList.toggle('active');
    })
    container.addEventListener('drop', (e) => {
        e.preventDefault();
        if (originalContainer.id === e.currentTarget.id) return;
        else {
            e.currentTarget.appendChild(movingCard);
            movingCard = null;
            container.classList.toggle('active');
            // if (e.currentTarget.id === 'todo-list') {
            //     e.currentTarget.appendChild(movingCard);
            // }
            // else if (e.currentTarget.id === 'in-progress-list') {
            //     e.currentTarget.appendChild(movingCard);
            // } else if (e.currentTarget.id === 'completed-list') {
            //     e.currentTarget.appendChild(movingCard);
            // }
        }
        // console.log(movingCard);
        // console.log(originalContainer.id);
        // console.log(e.currentTarget);
        // console.log(e);
    })
})


