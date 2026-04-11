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
    save();
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

        let projectEditButton = document.createElement('div');
        projectEditButton.classList.add("project-edit-button");

        let projectEditIcon = document.createElement("i");
        projectEditIcon.classList.add("fa-solid");
        projectEditIcon.classList.add("fa-ellipsis-vertical");

        projectCard.dataset.title = projectTitle;
        projectCard.dataset.id = projectId;

        projectEditButton.appendChild(projectEditIcon);
        projectCard.appendChild(projectCardTitle);
        projectCard.appendChild(projectEditButton);
        container.appendChild(projectCard);
        save();
    }
}

export function updateProjectCard(editingCard, passedTitle){
    let projectsLength = projects.length;
    let currentId = editingCard.dataset.id;
    for(let i=0; i<projectsLength; i++){
        if(currentId == projects[i].id){
            projects[i].title = passedTitle;
        }
    }
    displayProjects();
};

export function setActiveProject(card){
    let cardId = card.dataset.id;
    let projectsLength = projects.length;
    if(projectsLength > 0){
        for(let i=0; i<projectsLength; i++){
            if(cardId == projects[i].id){
                activeProjectId = projects[i].id;
            }
        }
    }
}

export function getActiveProject(){
    let projectLength = projects.length;
    for(let i=0; i<projectLength; i++){
        if(projects[i].id == activeProjectId){
            return projects[i];
        }
    }
}

export function setActiveProjectColor(activeCard){
    if(projects.length >= 1){
        activeCard.classList.add('active-card');
    }
}

export function removeActiveProjectColor(activeCard){
    if(projects.length >= 1){
        activeCard.classList.remove('active-card');
    }
}

export function getLatestProjectId(){
    let lastIndex = projects.length - 1;
    let projectId = projects[lastIndex].id;
    return projectId;
}

export function deleteProject(card){
    let projectsLength = projects.length;
    let cardId = card.dataset.id;
    for(let i=0; i<projectsLength; i++){
        if(cardId == projects[i].id){
            projects = projects.filter(project => project.id !== cardId);
        }
    }
    displayProjects();
}

/*LOCAL STORAGE*/
export function save(){
    let state = {
        projects: projects,
        activeProjectId: activeProjectId
    };

    localStorage.setItem("todoApp", JSON.stringify(state));
}

export function load(){
    let data = localStorage.getItem("todoApp");

    if(!data){
        return;
    }

    let parsedData = JSON.parse(data);

    projects = parsedData.projects;
    activeProjectId = parsedData.activeProjectId;

    displayProjects();
    let activeCard = document.querySelector(`.project-card[data-id="${activeProjectId}"]`);
}







