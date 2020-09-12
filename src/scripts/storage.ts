import { STORAGE_NAME } from './consts';
import { createTodo } from './helpers';

const getStorageItems = (storageName: string): string[] => {
  let todos: string[];

  if (!localStorage.getItem(storageName)) {
    todos = [];
    return todos;
  } else {
    todos = JSON.parse(localStorage.getItem(storageName));
    return todos;
  }
};

const saveToStorage = (todo: string): void => {
  const todos: string[] = getStorageItems(STORAGE_NAME);

  todos.push(todo);

  localStorage.setItem(STORAGE_NAME, JSON.stringify(todos));
};

const renderStorageItems = (
  todoList: HTMLUListElement,
  todoCreatorInput: HTMLInputElement,
  todoTools: HTMLDivElement,
  todoContainer: HTMLDivElement
): void => {
  const todos = getStorageItems(STORAGE_NAME);

  todos.forEach(todo =>
    createTodo(
      false,
      todoList,
      todoCreatorInput,
      todoTools,
      todoContainer,
      todo
    )
  );
};

const deleteItemFromStorage = (todo: HTMLLIElement): void => {
  const todos = getStorageItems(STORAGE_NAME);

  const currentItemInput = todo.children[0] as HTMLInputElement;
  const inputValue = currentItemInput.value;
  todos.splice(todos.indexOf(inputValue), 1);

  localStorage.setItem(STORAGE_NAME, JSON.stringify(todos));
};

export {
  getStorageItems,
  saveToStorage,
  renderStorageItems,
  deleteItemFromStorage
};
