import "./style.css";
import {projectListMaker} from "./project-section.js";
import {todoListMaker} from "./todo-section.js";

document.addEventListener("DOMContentLoaded", ()=>{
    let projectContainer = document.querySelector(".project-section");
    let todoContainer = document.querySelector(".todo-section");

    projectListMaker(projectContainer);
    todoListMaker(todoContainer);
});