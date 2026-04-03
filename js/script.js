// select all card which is present
const cards = document.querySelectorAll('.card');
// select all the card container
const containers = document.querySelectorAll('.btm');
// select all add new task button.
const addNewButtons = document.querySelectorAll('.add-new');
// select create card container
const createCard = document.querySelector('.creat-card');
// select card form 
const cardForm = document.querySelector('#card-form');



// current moving element (global trak);
let movingCard = null;
let originalContainer = null;


// this function update the count of number of cards & also change the style of card according to container
function syncContainerStyle(container, parentOfContainer, parentOfOriginalContainer, originalContainer) {

    let childrens = container.children;
    for (let i = 0; i < childrens.length; i++) {
        // make all children class empty.
        childrens[i].children[0].className = '';
        // set card class according to the container.
        // console.log(childrens[i].children[0].className);
        let dynamicClass = container.id === 'todo-list' ? 'todo-ele' :
            container.id === 'in-progress-list' ? 'inp-ele' : 'comp-ele';
        childrens[i].children[0].classList.add(`tag`, dynamicClass);
    }
    // count total number of children in destination container
    let childCountDestination = childrens.length;
    // extract all children from the original card
    let oChildrens = originalContainer.children;
    // total number of children inside original container
    let childCountOriginal = oChildrens.length || 0;
    // update total number of cards container by destination container
    parentOfContainer.children[0].children[0].children[1].innerText = `${childCountDestination}   Total`;
    // console.log(childCountOriginal);
    parentOfOriginalContainer.children[0].children[0].children[1].innerText = `${childCountOriginal}   Total`;

}

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
            syncContainerStyle(e.currentTarget, e.currentTarget.parentElement, originalContainer.parentElement, originalContainer);
            movingCard = null;
            container.classList.toggle('active');
        }
    })
})

// on click of add new task button bring the create card page.
addNewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        createCard.style.display = "flex";
    })
})

// clicking outside of form remove create card page
createCard.addEventListener('click', (e) => {
    if (!cardForm.contains(e.target)) {
        createCard.style.display = "none";
    }
})


// get value of input field..
cardForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent form reset after submission
    createCard.style.display = "none";
})




