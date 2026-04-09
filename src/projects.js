let projects=[];
let currentProject = null;

function createProject(projectData){
    let project = document.createElement("div");
    project.classList.add("projects");

    let projectTitle = projectData.title;

    let projectCardTitle = document.createElement("h1");
    projectCardTitle.classList.add("project-title");
    projectCardTitle.textContent = projectTitle;

    let passedDueDate = projectData.dueDate;
    let projectId = new Date(passedDueDate).toLocaleDateString();

    project.classList.add(`project-${projectId}`);

    let projectObject = {
        title: projectTitle,
        id: projectId
    };

    projects.push(projectObject);
};