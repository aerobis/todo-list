import "./style.css";
import {projectListMaker} from "./project-section.js";
import {todoListMaker} from "./todo-section.js";
import {addTodoToList} from "./todo-section.js";
import {updateTodoCard} from "./todo-maker.js";

let editMode = false;
let editingCard = null;

document.addEventListener("DOMContentLoaded", ()=>{
    let projectContainer = document.querySelector(".project-section");
    let todoContainer = document.querySelector(".todo-section");
    let todoForm = document.querySelector("#todo-form");
    let newTodoBtn = document.querySelector("#new-todo-button");
    let todoCancelBtn = document.querySelector("#todo-cancel-button");

    projectListMaker(projectContainer);
    todoListMaker(todoContainer);

    newTodoBtn.addEventListener("click", ()=>{
        todoForm.style.display = "flex";
    });

    todoCancelBtn.addEventListener("click", ()=>{
        todoForm.style.display = "none";
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

            todoForm.style.display="flex";
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
            todoForm.reset();
            todoForm.style.display="none";
            editMode = false;
            editingCard = null;
        }else{
            addTodoToList(passedTodo);
            todoForm.reset();
            todoForm.style.display="none";
        }
    });
});