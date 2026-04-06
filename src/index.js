import "./style.css";
import {projectListMaker} from "./project-section.js";
import {todoListMaker} from "./todo-section.js";
import {addTodoToList} from "./todo-section.js";
import {updateTodoCard} from "./todo-maker.js";

let editMode = false;
let editingCard = null;
let modalBackdrop = null;

document.addEventListener("DOMContentLoaded", ()=>{
    let projectContainer = document.querySelector(".project-section");
    let todoContainer = document.querySelector(".todo-section");
    let todoForm = document.querySelector("#todo-form");
    let newTodoBtn = document.querySelector("#new-todo-button");
    let todoCancelBtn = document.querySelector("#todo-cancel-button");

    projectListMaker(projectContainer);
    todoListMaker(todoContainer);

    
    function showModal(){
        modalBackdrop = document.createElement('div');
        modalBackdrop.className = 'modal-backdrop';
        Object.assign(modalBackdrop.style, {
            position: 'fixed',
            top: '0', left: '0',
            width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: '999',
        });
        document.body.appendChild(modalBackdrop);

        todoForm.style.display = 'flex';
        todoForm.style.zIndex = '1000';
    };

    function hideModal(){
        if(modalBackdrop){
            modalBackdrop.remove();
            todoForm.reset();
            todoForm.style.display = 'none';
        }
    };

    newTodoBtn.addEventListener("click", ()=>{
        // todoForm.style.display = "flex";
        showModal();
    });

    todoCancelBtn.addEventListener("click", ()=>{
        // todoForm.reset();
        // todoForm.style.display = "none";
        hideModal();
    });

    document.querySelector(".todo-section").addEventListener("click", (event)=>{
        if(event.target.matches('.todo-edit-button')){
            editingCard = event.target.closest(".todo-card");
            editMode = true;
            let formTitle = document.querySelector("#title");
            let formDescription = document.querySelector("#description");
            let formDueDate = document.querySelector("#due-date");
            let formPriority = document.querySelector("#priority");
            let formStatus = document.querySelector("#status");
            
            formTitle.value = editingCard.dataset.title;
            formDescription.value = editingCard.dataset.description;
            formDueDate.value = editingCard.dataset.dueDate;
            formPriority.value = editingCard.dataset.priority;
            formStatus.value = editingCard.dataset.status;

            // todoForm.style.display="flex";
            showModal();
        }
    });

    todoForm.addEventListener("submit", (e)=>{
        e.preventDefault();

        let title = document.querySelector("#title").value;
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
            hideModal();
            editMode = false;
            editingCard = null;
        }else{
            addTodoToList(passedTodo);
            // todoForm.reset();
            // todoForm.style.display="none";
            hideModal();
        }
    });
});