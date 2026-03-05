export function todoMaker(title, description, dueDate, priority, status, container){
    let card = document.createElement('div');
    card.classList.add("todo-card");
    
    let cardTitle = document.createElement('h1');
    cardTitle.classList.add("todo-card-title");
    cardTitle.textContent = title;

    let cardDescription = document.createElement("p");
    cardDescription.classList.add("todo-card-description");
    cardDescription.textContent = description;
    
    // let due = new Date(dueDate);
    // let today = new Date();
    // today.setHours(0,0,0,0);

    let formattedDate = new Date(dueDate).toLocaleDateString();

    // let cardDueDate = document.createElement('p');
    // cardDueDate.classList.add("todo-card-due-date");
    // cardDueDate.textContent = formattedDate;

    let cardPriority = document.createElement('p');
    cardPriority.classList.add("todo-card-priority");
    cardPriority.textContent = priority;

    let cardStatus = document.createElement('p');
    cardStatus.textContent = status;

    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    // card.appendChild(cardDueDate);
    card.appendChild(cardPriority);
    card.appendChild(cardStatus);

    return card;
};