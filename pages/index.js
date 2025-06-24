import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

document.addEventListener("DOMContentLoaded", () => {
  const addTodoButton = document.querySelector(".button_action_add");
  const addTodoPopupEl = document.querySelector("#add-todo-popup");
  const addTodoForm = document.forms["add-todo-form"];
  const todoTemplate = document.querySelector("#todo-template");
  const todosList = document.querySelector(".todos__list");

  const addTodoPopup = new PopupWithForm({
    popupSelector: "#add-todo-popup",

    handleFormSubmit: (inputValues) => {
      const name = inputValues.name;
      const dateInput = inputValues.date;

      const date = new Date(dateInput);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

      const id = uuidv4();
      const values = { name, date, id };
      const todo = generateTodo(values);
      section.addItem(todo);
      todoCounter.updateTotal(true);
      newTodoValidator.resetValidation();
      addTodoPopup.close();
    },
  });

  addTodoPopup.setEventListeners();

  function handleCheck(completed) {
    todoCounter.updateCompleted(completed);
  }

  function handleDelete(completed) {
    todoCounter.updateTotal(false);
    if (completed) {
      todoCounter.updateCompleted(false);
    }
  }

  const generateTodo = (data) => {
    const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
    const todoElement = todo.getView();

    return todoElement;
  };

  addTodoButton.addEventListener("click", () => {
    addTodoPopup.open();
  });

  const section = new Section({
    items: initialTodos, //pass initial todos
    renderer: (item) => {
      const todoElement = generateTodo(item);
      section.addItem(todoElement);
    },
    containerSelector: ".todos__list",
  });
  section.renderItems();

  const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
  newTodoValidator.enableValidation();
});
