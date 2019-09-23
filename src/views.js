"use strict";

//imports
import { getFilters } from "./filters";
import { getTodos, toggleTodo, removeTodo } from "./todos";

// function to render todos
const renderTodos = () => {
    const todoEl = document.querySelector("#todos");
    // get todos and filters
    const todos = getTodos();
    const filters = getFilters();

    // create array of filteredTodos
    const filteredTodos = todos.filter((todo) => {
        // filter by searchText and completedMatch
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
        return searchTextMatch && hideCompletedMatch
    });

    // creates array of incompletedTodos
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

    // empties todoEl (#todos div) of all existing elements
    todoEl.innerHTML = "";

    // creates summary message with number of todos left to complete
    todoEl.appendChild(generateSummaryDOM(incompleteTodos));

    // renders all todos matching filters in todoEl (#todos div) or renders empty message
    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo));
        });
    } else {
        const emptyMessageEl = document.createElement("p");
        emptyMessageEl.classList.add("empty-message");
        emptyMessageEl.textContent = "No todos to show";
        todoEl.appendChild(emptyMessageEl);
    }
}

// function to handle logic of rendering each individual todo DOM
const generateTodoDOM = (todo) => {
    //create relevant elements
    const todoEl = document.createElement("label");
    const containerEl = document.createElement("div");
    const checkbox = document.createElement("input");
    const todoText = document.createElement("span");
    const deleteButton = document.createElement("button");

    // setup checkbox and set correct attributes
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todo.completed;
    containerEl.appendChild(checkbox);
    // setup event listener for rendered checkbox
    checkbox.addEventListener("change", (e) => {
        // call function to toggleTodo
        toggleTodo(todo.id);
        renderTodos();
    });

    // setup todo text
    todoText.textContent = todo.text;
    containerEl.appendChild(todoText);

    // setup containerEl
    todoEl.classList.add("list-item");
    containerEl.classList.add("list-item__container");
    todoEl.appendChild(containerEl);

    // setup button
    deleteButton.textContent = "remove";
    deleteButton.classList.add("button", "button--text")
    todoEl.appendChild(deleteButton);
    // setup event listener for button
    deleteButton.addEventListener("click", (e) => {
        removeTodo(todo.id);
        renderTodos();
    });

    return todoEl;
}

// function to create summary message with number of todos left to complete
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement("h2");
    summary.classList.add("list-title");
    // pluralizes todo if number of todos is zero or more than one
    const todos = (incompleteTodos.length === 1) ? "todo" : "todos";
    summary.textContent = `You have ${incompleteTodos.length} ${todos} left`;
    return summary
}

// exports
export { renderTodos, generateTodoDOM, generateSummaryDOM };