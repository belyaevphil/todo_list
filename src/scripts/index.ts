import { STORAGE_NAME } from './consts';
import {
  createTodo,
  getRandomPlaceholder,
  filterTodos,
  handleEditButton,
  watchForHover
} from './helpers';
import { renderStorageItems, deleteItemFromStorage } from './storage';

import '@/assets/scss';

const todoCreatorInput = document.querySelector(
  '#todo-creator-form__input'
) as HTMLInputElement;
const todoCreatorButton = document.querySelector(
  '#todo-creator-form__button'
) as HTMLButtonElement;
const todoList = document.querySelector('#main__todo-list') as HTMLUListElement;
const todoAllClearButton = document.querySelector(
  '#todo-tools__button'
) as HTMLButtonElement;
const todoSearcherInput = document.querySelector(
  '#todo-tools__input'
) as HTMLInputElement;
const todoTools = document.querySelector('#main__todo-tools') as HTMLDivElement;
const todoContainer = document.querySelector(
  '#main__todo-container'
) as HTMLDivElement;

const addTodo = (e: Event): void => {
  e.preventDefault();
  todoCreatorButton.blur();

  if (todoCreatorInput.value)
    createTodo(true, todoList, todoCreatorInput, todoTools, todoContainer);
};

const handleTodoItemButtons = (e: Event): void => {
  const todoItemButton = e.target as HTMLButtonElement;
  const isRemoveButton = todoItemButton.classList[1] === 'remove-button';
  const isEditButton = todoItemButton.classList[1] === 'edit-button';
  const isEditMode =
    todoItemButton.classList[1] === 'edit-button' &&
    todoItemButton.classList[3] === 'edit-button--edit-mode';

  if (isRemoveButton) {
    const todoItem = todoItemButton.parentElement as HTMLLIElement;
    const todoList = todoItem.parentElement as HTMLUListElement;
    deleteItemFromStorage(todoItem);
    todoItem.remove();
    if (!todoList.children.length) {
      localStorage.removeItem(STORAGE_NAME);
      todoTools.style.display = 'none';
      todoContainer.style.display = 'none';
    }
    return;
  }
  if (isEditMode) return handleEditButton(todoItemButton, true);
  if (isEditButton) return handleEditButton(todoItemButton, false);
};

const clearAllTodoItems = (): void => {
  localStorage.removeItem(STORAGE_NAME);
  todoList.innerHTML = '';
  todoTools.style.display = 'none';
  todoContainer.style.display = 'none';
};

const handleInputChange = (text: string): void => {
  const todos = Array.from(todoList.children) as HTMLLIElement[];
  if (!todos.length) return;

  filterTodos(todos, text);
};

const toDoOnWindowLoad = (): void => {
  todoCreatorInput.placeholder = getRandomPlaceholder();
  renderStorageItems(todoList, todoCreatorInput, todoTools, todoContainer);
};

watchForHover();

todoCreatorButton.addEventListener('click', addTodo);
todoList.addEventListener('click', handleTodoItemButtons);
todoAllClearButton.addEventListener('click', clearAllTodoItems);
todoSearcherInput.addEventListener('input', () =>
  handleInputChange(todoSearcherInput.value)
);
window.addEventListener('load', toDoOnWindowLoad);
