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
  const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
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

  // const openModal = (modal) => {
  //   modal.classList.add("popup_visible");
  // };

  // const closeModal = (modal) => {
  //   modal.classList.remove("popup_visible");
  // };

  // The logic in this function should all be handled in the Todo class.
  // const generateTodo = (data) => {
  //   const todo = new Todo(data, "#todo-template");
  //   const todoElement = todo.getView();
  // const todoElement = todoTemplate.content
  //   .querySelector(".todo")
  //   .cloneNode(true);
  //   const todoNameEl = todoElement.querySelector(".todo__name");
  //   const todoCheckboxEl = todoElement.querySelector(".todo__completed");
  //   const todoLabel = todoElement.querySelector(".todo__label");
  //   const todoDate = todoElement.querySelector(".todo__date");
  //   const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");
  //   todoNameEl.textContent = data.name;
  //   todoCheckboxEl.checked = data.completed;
  //   // Apply id and for attributes.
  //   // The id will initially be undefined for new todos.
  //   todoCheckboxEl.id = `todo-${data.id}`;
  //   todoLabel.setAttribute("for", `todo-${data.id}`);
  //   // If a due date has been set, parsing this it with `new Date` will return a
  //   // number. If so, we display a string version of the due date in the todo.
  //   const dueDate = new Date(data.date);
  //   if (!isNaN(dueDate)) {
  //     todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
  //       year: "numeric",
  //       month: "short",
  //       day: "numeric",
  //     })}`;
  //   }
  //   todoDeleteBtn.addEventListener("click", () => {
  //     todoElement.remove();
  //   });
  //   return todoElement;
  // };

  // const renderTodo = (item) => {
  //   const todo = generateTodo(item);
  //   section.addItem(todo); //use addItem instead
  // };

  // addTodoButton.addEventListener("click", () => {
  //   addTodoPopup.open();
  // });

  addTodoCloseBtn.addEventListener("click", () => {
    addTodoPopup.close();
  });

  // addTodoForm.addEventListener("submit", (evt) => {
  //   evt.preventDefault();
  //   const name = evt.target.name.value;
  //   const dateInput = evt.target.date.value;
  //

  //   // Create a date object and adjust for timezone
  //   const date = new Date(dateInput);
  //   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  //   const id = uuidv4();
  //   const values = { name, date, id };
  //   const todo = generateTodo(values);
  //   section.addItem(todo);
  //   addTodoPopup.close();
  // });

  // initialTodos.forEach((item) => {
  //   const todo = generateTodo(item);
  //   todosList.append(todo); //use addItem instead
  // });

  const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
  newTodoValidator.enableValidation();
});
