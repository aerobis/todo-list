export function todoMaker(passedTodo){
    let card = document.createElement('div');
    card.classList.add("todo-card");
    
    let cardTitle = document.createElement('h1');
    cardTitle.classList.add("todo-card-title");
    cardTitle.textContent = passedTodo.title;

    let cardDescription = document.createElement("p");
    cardDescription.classList.add("todo-card-description");
    cardDescription.textContent = passedTodo.description;

    let passedDueDate = passedTodo.dueDate;
    let cardDueDate = document.createElement('p');
    cardDueDate.classList.add('todo-card-due-date');
    cardDueDate.textContent = new Date(passedDueDate).toLocaleDateString();

    let cardPriority = document.createElement('p');
    cardPriority.classList.add("todo-card-priority");
    cardPriority.textContent = passedTodo.priority;

    let cardStatus = document.createElement('p');
    cardStatus.textContent = passedTodo.status;

    let editBtn = document.createElement('button');
    editBtn.classList.add("todo-edit-button");
    editBtn.textContent = "Edit";

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add("todo-delete-button");
    deleteBtn.textContent = "🗑️";

    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    card.appendChild(cardDueDate);
    card.appendChild(cardPriority);
    card.appendChild(cardStatus);
    card.appendChild(editBtn);
    card.appendChild(deleteBtn);

    return card;
};