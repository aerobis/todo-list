import "./style.css";
import {projectListMaker} from "./project-section.js";
import {todoListMaker} from "./todo-section.js";
import {addTodoToList} from "./todo-section.js";
import {renderTodoList} from "./todo-section.js";
import {updateTodoCard} from "./todo-maker.js";
import {createProject} from "./projects.js";
import {createDefaultProject} from "./projects.js";
import {getActiveProject} from "./projects.js";
import {setActiveProject} from "./projects.js";
import {setActiveProjectColor} from "./projects.js";
import {removeActiveProjectColor} from "./projects.js";
import {getLatestProjectId} from "./projects.js";
import {updateProjectCard} from "./projects.js";
import {deleteProject} from "./projects.js";
import {save, load} from "./projects.js"; //LOCALSTORAGE

let editMode = false;
let editingCard = null;
let todoModalBackdrop = null;
let projectModalBackdrop = null; 

let activeProjectCard = null;

let confirmModal = null;
let onConfirmAction = null; 

document.addEventListener("DOMContentLoaded", ()=>{
    let projectContainer = document.querySelector(".project-section");
    let todoContainer = document.querySelector(".todo-section");
    let todoForm = document.querySelector("#todo-form");
    let newTodoBtn = document.querySelector("#new-todo-button");
    let todoCancelBtn = document.querySelector("#todo-cancel-button");
    let projectForm = document.querySelector("#project-form");
    let newProjectBtn = document.querySelector("#new-project-button");
    let projectCancelBtn = document.querySelector("#project-cancel-button");

    projectListMaker(projectContainer);
    todoListMaker(todoContainer);
    load(activeProjectCard);

    let defaultCard = document.querySelector(".project-default");
    let totalCards = document.querySelector(".project-card");
    if(totalCards.length === 1){ 
        setActiveProjectColor(defaultCard);
        activeProjectCard = defaultCard;
    }

    function showTodoModal(){
        todoModalBackdrop = document.createElement('div');
        todoModalBackdrop.className = 'modal-backdrop';
        // Object.assign(modalBackdrop.style, {
        //     position: 'fixed',
        //     top: '0', left: '0',
        //     width: '100vw', height: '100vh',
        //     background: 'rgba(100, 100, 100,0.5)',
        //     backdropFilter: 'blur(4px)',
        //     zIndex: '999',
        // });
        document.body.appendChild(todoModalBackdrop);

        todoForm.style.display = 'flex';
        // todoForm.style.zIndex = '1000';
    };

    function showProjectModal(){
        projectModalBackdrop = document.createElement('div');
        projectModalBackdrop.className = 'modal-backdrop';
        document.body.appendChild(projectModalBackdrop);
        projectForm.style.display = 'flex';
    }

    function hideTodoModal(){
        if(todoModalBackdrop){
            todoModalBackdrop.remove();
            todoModalBackdrop = null;
            todoForm.reset();
            todoForm.style.display = 'none';
        }
    };

    function hideProjectModal(){
        if(projectModalBackdrop){
            projectModalBackdrop.remove();
            projectModalBackdrop = null;
            projectForm.reset();
            projectForm.style.display = 'none';
            if(editMode){
                document.querySelector(".project-delete-button").remove();
            }
        }
    }

    function createConfirmModal(){
        confirmModal = document.createElement('div');
        confirmModal.className = 'confirm-modal';
        confirmModal.innerHTML = `
            <p id="confirm-message">Are you sure?</p>
            <div class="confirm-modal-buttons">
                <button class="confirm-btn confirm-yes" id="confirm-yes">Yes, Delete</button>
                <button class="confirm-btn confirm-no" id="confirm-no">Cancel</button>
            </div>
        `;
        document.body.appendChild(confirmModal);

        let backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        document.body.appendChild(backdrop);

        //If yes
        confirmModal.querySelector("#confirm-yes").onclick = () => {
            if(onConfirmAction){
                onConfirmAction();
            }
            onConfirmAction = null;
            hideConfirm();
            backdrop.remove();
        }

        confirmModal.querySelector("#confirm-no").onclick = () => {
            hideConfirm();
            backdrop.remove();
        }
        backdrop.onclick = hideConfirm;
        backdrop.remove();
    }

    function showConfirm(action, message = 'Are you sure?'){
        if(!confirmModal){
            createConfirmModal();
        }

        onConfirmAction = action;

        document.getElementById('confirm-message').textContent = message;
        confirmModal.classList.add('active');
    }

    function hideConfirm(){
        if(confirmModal){
            confirmModal.classList.remove('active');
        }
    }

    newTodoBtn.addEventListener("click", ()=>{
        // todoForm.style.display = "flex";
        showTodoModal();
    });

    todoCancelBtn.addEventListener("click", ()=>{
        // todoForm.reset();
        // todoForm.style.display = "none";
        hideTodoModal();
    });

    newProjectBtn.addEventListener("click", ()=>{
        showProjectModal();
    });

    projectCancelBtn.addEventListener("click", ()=>{
        hideProjectModal();
    })

    /*TODO EDIT CLICK*/
    document.querySelector(".todo-section").addEventListener("click", (event)=>{
        if(event.target.matches('.todo-edit-button')){
            editingCard = event.target.closest(".todo-card");
            editMode = true;
            let formHeading = document.querySelector("#form-heading")
            let formTitle = document.querySelector("#todo-title");
            let formDescription = document.querySelector("#description");
            let formDueDate = document.querySelector("#due-date");
            let formPriority = document.querySelector("#priority");
            let formStatus = document.querySelector("#status");
            
            formHeading.textContent = "EDIT TODO CARD";
            formTitle.value = editingCard.dataset.title;
            formDescription.value = editingCard.dataset.description;
            formDueDate.value = editingCard.dataset.dueDate;
            formPriority.value = editingCard.dataset.priority;
            formStatus.value = editingCard.dataset.status;

            // todoForm.style.display="flex";
            showTodoModal();
        }
    });

    /*TODO DELETE CLICK*/
    document.querySelector(".todo-section").addEventListener("click", (event)=>{
        if(event.target.matches('.todo-delete-button')){
            showConfirm(()=>{
                let currentCard = event.target.closest(".todo-card");
                currentCard.remove();
                let activeProject = getActiveProject();
                let todoLength = activeProject.todos.length;
                for(let i=0; i<todoLength; i++){
                    if(currentCard.dataset.id == activeProject.todos[i].id){
                        activeProject.todos = activeProject.todos.filter(todo => todo.id !== currentCard.dataset.id); //Remake the array such that every element BUT the one with the id of the card is present
                    }
                }
                save();
            });
        }
    });

    /*TODO FORM SUBMIT*/
    todoForm.addEventListener("submit", (event)=>{
        event.preventDefault();

        let title = document.querySelector("#todo-title").value;
        let description = document.querySelector("#description").value;
        let dueDate = document.querySelector("#due-date").value;
        let priority = document.querySelector("#priority").value;
        let status = document.querySelector("#status").value;

        let passedTodo = {
            title: title,
            id: crypto.randomUUID(),
            description: description,
            dueDate: dueDate,
            priority: priority,
            status: status,
        }

        if(editMode){
            updateTodoCard(editingCard, passedTodo);
            // todoForm.reset();
            // todoForm.style.display="none";
            hideTodoModal();
            editMode = false;
            editingCard = null;
        }else{
              let activeProject = getActiveProject()
              activeProject.todos.push(passedTodo);
            addTodoToList(passedTodo);
            // todoForm.reset();
            // todoForm.style.display="none";
            hideTodoModal();
        }
        save();
    });

    /*PROJECT FORM SUBMIT*/
    projectForm.addEventListener("submit",(event)=>{
        event.preventDefault();

        let title = document.querySelector("#project-title").value;
        if(editMode){
            let activeProjectId = editingCard.dataset.id;
            updateProjectCard(editingCard, title);
            let activeProjectCard = document.querySelector(`.project-card[data-id="${activeProjectId}"]`);
            setActiveProject(activeProjectCard);
            setActiveProjectColor(activeProjectCard);
            renderTodoList();
            hideProjectModal();
            editMode = false;
            editingCard = null;
        }else{
            createProject(title);
            let latestProjectId = getLatestProjectId();
            activeProjectCard = document.querySelector(`.project-card[data-id="${latestProjectId}"]`);
            setActiveProject(activeProjectCard);
            setActiveProjectColor(activeProjectCard);
            renderTodoList();
            hideProjectModal();
        }
        save();
    });

    /*PROJECT LIST CLICK*/
    document.querySelector(".project-list").addEventListener("click", (event)=>{
        if(event.target.matches(".project-card")){
            let currentCard = event.target.closest(".project-card");
            let activeProjectId = getActiveProject().id;
            activeProjectCard = document.querySelector(`.project-card[data-id="${activeProjectId}"]`);
            if(activeProjectCard){
                removeActiveProjectColor(activeProjectCard);
            }
            setActiveProjectColor(currentCard);
            setActiveProject(currentCard);
            activeProjectCard = currentCard;
            renderTodoList();
        }
        // save();
    });

    /*PROJECT EDIT CLICK*/
    document.querySelector(".project-list").addEventListener("click", (event)=>{
        if(event.target.matches(".project-edit-button")){
            editMode = true;
            let currentProject = event.target.closest(".project-card");
            editingCard = currentProject;

            let projectForm = document.querySelector("#project-form");
            let projectFormTitle = document.querySelector("#project-title");
            let projectFormHeading = document.querySelector("#project-form-heading");
            let deleteSection = document.createElement('div');
            deleteSection.classList.add("project-delete-button-container");

            let deleteBtn = document.createElement('button');
            deleteBtn.classList.add('project-delete-button');
            deleteBtn.textContent = "DELETE";

            deleteSection.appendChild(deleteBtn);
            projectForm.appendChild(deleteSection);

            projectFormHeading.textContent = "EDIT PROJECT";
            projectFormTitle.value = currentProject.dataset.title;

            showProjectModal();

            /*PROJECT DELETE CLICK*/
            deleteBtn.addEventListener("click", (event)=>{
                showConfirm(()=>{
                    deleteProject(currentProject);
                    hideProjectModal();
                    save();
                })
            })
        }
    });
});