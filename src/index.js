import "./style.css";
import {projectListMaker} from "./project-section.js";
import {todoListMaker} from "./todo-section.js";
import {addTodoToList} from "./todo-section.js";
import {updateTodoCard} from "./todo-maker.js";
import {createDefaultProject} from "./projects.js";

let editMode = false;
let editingCard = null;
let todoModalBackdrop = null;
let projectModalBackdrop = null;

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
    createDefaultProject();

    
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

    document.querySelector(".todo-section").addEventListener("click", (event)=>{
        if(event.target.matches('.todo-edit-button')){
            editingCard = event.target.closest(".todo-card");
            editMode = true;
            let formHeading = document.querySelector("#form-heading")
            let formTitle = document.querySelector("#title");
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

    document.querySelector(".todo-section").addEventListener("click", (event)=>{
        if(event.target.matches('.todo-delete-button')){
            event.target.closest(".todo-card").remove()
        }
    });

    todoForm.addEventListener("submit", (e)=>{
        e.preventDefault();

        let title = document.querySelector("#todo-title").value;
        let description = document.querySelector("#description").value;
        let dueDate = document.querySelector("#due-date").value;
        let priority = document.querySelector("#priority").value;
        let status = document.querySelector("#status").value;

        let passedTodo = {
            title: title,
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
            addTodoToList(passedTodo);
            // todoForm.reset();
            // todoForm.style.display="none";
            hideTodoModal();
        }
    });
});