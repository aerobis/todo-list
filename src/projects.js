let projects=[];
let activeProjectId = 'default';

export function createProject(projectTitle){
    let container = document.querySelector(".project-list");

    let projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    let projectCardTitle = document.createElement("h3");
    projectCardTitle.classList.add("project-card-title");
    projectCardTitle.textContent = projectTitle;

    let projectId = Date.now().toString();

    projectCard.classList.add(`project-${projectId}`);

    let projectObject = {
        title: projectTitle,
        id: projectId,
        todos: []
    };

    projects.push(projectObject);

    projectCard.appendChild(projectCardTitle);
    container.appendChild(projectCard);
};

function setActiveProject(id){
    activeProjectId = id;
}







