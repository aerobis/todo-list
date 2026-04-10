let projects=[];
let activeProjectId = 'default';

export function createDefaultProject(){
    let projectId = 'default';
    let projectObject = {
        title: 'Default',
        id: projectId,
        todos: []
    }
    projects.push(projectObject);
    displayProjects();
}

export function createProject(projectTitle){
    let projectId = Date.now().toString();
    let projectObject = {
        title: projectTitle,
        id: projectId,
        todos: []
    };
    projects.push(projectObject);
    displayProjects();
};

function displayProjects(){
    let container = document.querySelector(".project-list");
    container.innerHTML = "";
    let length = projects.length;
    for(let i=0; i<length; i++){
        let projectTitle = projects[i].title;
        let projectId = projects[i].id;
        let projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        let projectCardTitle = document.createElement("h3");
        projectCardTitle.classList.add("project-card-title");
        projectCardTitle.textContent = projectTitle;
        projectCard.classList.add(`project-${projectId}`);

        projectCard.appendChild(projectCardTitle);
        container.appendChild(projectCard);
    }
}

export function setActiveProject(id){
    activeProjectId = id;
}

export function getActiveProject(){
    let projectLength = projects.length;
    for(let i=0; i<projectLength; i++){
        if(projects[i].id == activeProjectId){
            return projects[i];
        }
    }
}











