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
// unique id for each element
let uniqueId = 0;
// array which contain all card information
let allCard = [];

// current moving element (global trak);
let movingCard = null;
let originalContainer = null;

// element inside which current card is creating..
let cardContainer = null;

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

// this function create card according to input field & add it into that particular container.
function makeCardForUi(tag, title, description, container) {
    // main div
    const card = document.createElement("div");
    card.className = "card";
    card.id = uniqueId++;
    card.setAttribute("draggable", "true");

    // tag
    let dynamicClass = container === 'add-new-todo' ? 'todo-ele' :
        container === 'add-new-in-prog' ? 'inp-ele' : 'comp-ele';
    const tagDiv = document.createElement("div");
    tagDiv.className = `tag ${dynamicClass}`;
    tagDiv.innerText = tag;

    // title
    const titleEl = document.createElement("h3");
    titleEl.innerText = title;

    // description
    const desc = document.createElement("p");
    desc.innerText = description;

    // profile container
    const prfContain = document.createElement("div");
    prfContain.className = "prf-contain";

    // profile div
    const profile = document.createElement("div");
    profile.className = "profile";

    const img = document.createElement("img");
    img.src = "https://avatars.githubusercontent.com/u/106401203?s=400&u=774668cafb31bf8c4b3df9755700de11cd093d5a&v=4";
    img.alt = "";

    profile.appendChild(img);

    // delete button
    const del = document.createElement("div");
    del.className = "delete";

    const icon = document.createElement("i");
    icon.className = "ri-delete-bin-6-line";

    del.appendChild(icon);

    // append profile + delete
    prfContain.appendChild(profile);
    prfContain.appendChild(del);

    // append all to card
    card.appendChild(tagDiv);
    card.appendChild(titleEl);
    card.appendChild(desc);
    card.appendChild(prfContain);
    cardContainer = null;
    renderCard(card, container);
    let obj = {
        id: card.id,
        title: title,
        description: description,
        tag: tag,
        container: container,
    }
    allCard.push(obj)
    saveToLocal();
}

// render card ui into a particular container.
function renderCard(card, container) {
    let todo = document.querySelector('#todo-list');
    let inProgress = document.querySelector('#in-progress-list');
    let completed = document.querySelector('#completed-list');
    let currentContianer = null;
    if (container === 'add-new-todo') {
        todo.appendChild(card);
        currentContianer = todo;
    }
    else if (container === 'add-new-in-prog') {
        inProgress.appendChild(card);
        currentContianer = inProgress;
    }
    else if (container === 'add-new-comp') {
        completed.appendChild(card);
        currentContianer = completed;
    }
    updateCardCount(currentContianer);
}

// count number of cards for each container
function updateCardCount(container) {
    const childrenArray = Array.from(container.children);
    let count = childrenArray.length;
    container.parentElement.children[0].children[0].children[1].innerText = `${count}   Total`;
}

// save data into localStorage
function saveToLocal() {
    localStorage.setItem('allSavedCards', JSON.stringify(allCard));
    console.log(allCard);
    console.log(localStorage.getItem('allSavedCards'));
}

// here we put values when use start draging a card.
containers.forEach(container => {
    container.addEventListener("dragstart", (e) => {
        movingCard = e.target;
        originalContainer = container;
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
        cardContainer = button.id;
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
    let title = e.target[2].value;
    let description = e.target[0].value;
    let tag = e.target[1].value;
    makeCardForUi(title, description, tag, cardContainer);
    cardForm.reset();
})

// delete card on clicking delete icon..
containers.forEach(container => {
    container.addEventListener('click', (e) => {
        let closestCard = e.target.closest('.card');
        if (e.target.classList.contains('ri-delete-bin-6-line')) {
            closestCard.remove();
            updateCardCount(container);
            allCard = allCard.filter(item => item.id !== closestCard.id);
            saveToLocal();
        }
    });
})