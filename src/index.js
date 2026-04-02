import "./style.css";
import {projectListMaker} from "./project-section.js";
import {todoListMaker} from "./todo-section.js";

document.addEventListener("DOMContentLoaded", ()=>{
    let projectContainer = document.querySelector(".project-section");
    let todoContainer = document.querySelector(".todo-section");
    let todoForm = document.querySelector("#todo-form");
    let newTodoBtn = document.querySelector("#new-todo-button");
    let todoSubmitBtn = document.querySelector("#todo-submit-button");
    let todoCancelBtn = document.querySelector("#todo-cancel-button");

    projectListMaker(projectContainer);
    todoListMaker(todoContainer);

    console.log(newTodoBtn);

    newTodoBtn.addEventListener("click", ()=>{
        todoForm.style.display = "flex";
    });

    todoCancelBtn.addEventListener("click", ()=>{
        todoForm.style.display = "none";
    });
});