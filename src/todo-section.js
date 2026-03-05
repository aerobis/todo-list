export function todoListMaker(container){
    let legendSection = document.createElement('div');
    legendSection.classList.add("todo-section-legend-container");
    
    let legend = document.createElement('h1');
    legend.classList.add("todo-section-legend");
    legend.textContent = "TO-DO LIST";
    legendSection.appendChild(legend);

    let todoSection = document.createElement('div');
    todoSection.classList.add("main-content");

    

    container.appendChild(legendSection);
};