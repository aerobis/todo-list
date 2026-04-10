export function createTodoCard(passedTodo){
    let card = document.createElement('div');
    card.classList.add("todo-card");

    let cardInfo = document.createElement('div');
    cardInfo.classList.add("todo-card-info");

    let cardTitle = document.createElement('h1');
    cardTitle.classList.add("todo-card-title");
    cardTitle.textContent = passedTodo.title;

    let cardDescription = document.createElement("p");
    cardDescription.classList.add("todo-card-description");
    let maxLength = 100;
    cardDescription.textContent = passedTodo.description.length > maxLength
        ? passedTodo.description.substring(0, maxLength) + "..." 
        : passedTodo.description;

    //If description > 100 characters, default to showing 100, if not, show all

    let passedDueDate = passedTodo.dueDate;
    let cardDueDate = document.createElement('p');
    cardDueDate.classList.add('todo-card-due-date');
    cardDueDate.textContent = new Date(passedDueDate).toLocaleDateString();

    let cardPriority = document.createElement('p');
    cardPriority.classList.add("todo-card-priority");
    cardPriority.textContent = `Priority: ${passedTodo.priority}`;

    let cardStatus = document.createElement('p');
    cardStatus.textContent = `Status: ${passedTodo.status}`;

    let cardButtons = document.createElement('div');
    cardButtons.classList.add("todo-card-button-container");

    let editBtn = document.createElement('button');
    editBtn.classList.add("todo-card-buttons");
    editBtn.classList.add("todo-edit-button");
    editBtn.textContent = "Edit";

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add("todo-card-buttons");
    deleteBtn.classList.add("todo-delete-button");
    // let deleteBtnSpan = document.createElement('span');
    // deleteBtnSpan.classList.add("delete-button-span");
    // deleteBtnSpan.textContent = "🗑️";
    // deleteBtn.appendChild(deleteBtnSpan);
    let binIcon = document.createElement('i');
    binIcon.classList.add("fa-solid");
    binIcon.classList.add("fa-trash-can");
    deleteBtn.appendChild(binIcon);

    //<i class="fa-solid fa-trash-can"></i>

    // card.appendChild(cardTitle);
    // card.appendChild(cardDescription);
    // card.appendChild(cardDueDate);
    // card.appendChild(cardPriority);
    // card.appendChild(cardStatus);
    // card.appendChild(editBtn);
    // card.appendChild(deleteBtn);

    cardInfo.appendChild(cardTitle);
    cardInfo.appendChild(cardDescription);
    cardInfo.appendChild(cardDueDate);
    cardInfo.appendChild(cardPriority);
    cardInfo.appendChild(cardStatus);
    cardButtons.appendChild(editBtn);
    cardButtons.appendChild(deleteBtn);
    
    card.appendChild(cardInfo);
    card.appendChild(cardButtons);

    card.dataset.id = passedTodo.id;
    card.dataset.title = passedTodo.title;
    card.dataset.description = passedTodo.description;
    card.dataset.dueDate = passedTodo.dueDate;
    card.dataset.priority = passedTodo.priority;
    card.dataset.status = passedTodo.status;

    return card;
};

//ATTACH EVENT LISTENER TO EDIT BUTTON TO OPEN UP FORM/EXPAND CARD
export function updateTodoCard(existingCard, updatedData){
    existingCard.replaceWith(createTodoCard(updatedData));
};