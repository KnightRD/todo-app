"use strict";

// imports
import { renderTodos } from "./views";
import { createTodo, loadTodos } from "./todos";
import { setFilters } from "./filters";

// render initial todos
renderTodos();

// input listener for searchText input - changes filters.searchText to each input change and then renders todos
document.querySelector("#search-todos").addEventListener("input", (e) => {
    setFilters({
        "searchText": e.target.value
    });
    renderTodos();
});

// checkbox listener - changes filters.hideCompleted to true or false
document.querySelector("#hide-completed").addEventListener("change", (e) => {
    setFilters({
        "hideCompleted": e.target.checked
    });
    renderTodos();
});

// submit button listener for newTodo creation - create new todo and save to localStorage
document.querySelector("#new-todo-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const sanitizedInput = e.target.elements.newTodo.value.trim();
    if (sanitizedInput.length > 0) {
        createTodo(sanitizedInput);
        e.target.elements.newTodo.value = "";
        renderTodos();
    } else {
        location.assign("/index.html");
    }
});

// listener for changes to localstorage and re-renders content - live changes rendered in duplicate tabs
window.addEventListener("storage", (e) => {
    if (e.key === "todos") {
        loadTodos();
        renderTodos();
    }
});