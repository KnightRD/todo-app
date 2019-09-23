"use strict"

// imports
import uuidv4 from "uuid/v4";

// setup an empty todos array
let todos = [];

// function to load todos from localStorage from JSON format, or set todos to an empty array
const loadTodos = () => {
    const todosJSON = localStorage.getItem("todos");
    try {
        todos = todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
        todos = [];
    }
}

// function to return todos
const getTodos = () => todos;

// function to save todos to localStorage in JSON format
const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// function to create a new todo & saves todos
const createTodo = (todoText) => {
    todos.push({
        id: uuidv4(),
        text: todoText,
        completed: false
    });
    saveTodos();
}


// function to remove a todo by unique id number
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
    }
    saveTodos()
}

// function to toggle 'completed' property of todo object - targeted by unique id
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
    }
    saveTodos();
}

// initial call to loadTodos
loadTodos();

// exports
export { loadTodos, getTodos, saveTodos, createTodo, removeTodo, toggleTodo };