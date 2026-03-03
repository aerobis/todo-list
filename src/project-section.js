export function projectListMaker(container){
    let legendSection = document.createElement('div');
    legendSection.classList.add("project-section-legend-container");

    let legend = document.createElement('h1');
    legend.classList.add("project-section-legend");
    legend.textContent = "PROJECTS";
    legendSection.appendChild(legend);

    let listSection = document.createElement('div');
    listSection.classList.add("project-list");



    container.appendChild(legendSection);
    container.appendChild(listSection);
}