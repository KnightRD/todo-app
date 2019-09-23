"use strict";

// set up filters object
let filters = {
    searchText: "",
    hideCompleted: false,
}

// function to return filters object
const getFilters = () => filters;

// function to set properties of filters object
const setFilters = (updates) => {
    if (typeof updates.searchText === "string") {
        filters.searchText = updates.searchText;
    }
    if (typeof updates.hideCompleted === "boolean") {
        filters.hideCompleted = updates.hideCompleted;
    }
}

// exports
export { setFilters, getFilters }