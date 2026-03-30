// get all card which is currently present in the ui
let cards = document.querySelectorAll(".card");
let containers = document.querySelectorAll(".btm");
// store current dragable element 
let dragElement = null;

cards.forEach(element => {
    element.addEventListener("dragstart", (e) => {
        dragElement = element;
        // track the parent of current drag element..
        const originalContainer = e.target.parentElement;
        containers.forEach(cont => {
            cont.addEventListener("drop", (evt) => {
                evt.preventDefault();
                console.log(element);
                console.log(cont);
                if (cont.id === originalContainer.id) return;
                else {
                    if (cont.id === "todo-list") {
                        element.remove();
                        cont.appendChild(element);
                    }
                }
            })
        })
    })
})



// if (dragElement) {
//     dragElement.addEventListener("drag", (evt) => {
//         console.log(evt);
//     })
// }