import "./style.css";
import {projectListMaker} from "./project-section.js";

document.addEventListener("DOMContentLoaded", ()=>{
    let projectContainer = document.querySelector(".project-section");

    projectListMaker(projectContainer);
});