import { availablePlaceholders } from './consts';
import { saveToStorage, deleteItemFromStorage } from './storage';

const createTodo = (
  isNewTodo: boolean,
  todoList: HTMLUListElement,
  todoCreatorInput: HTMLInputElement,
  todoTools: HTMLDivElement,
  todoContainer: HTMLDivElement,
  todo?: string
): void => {
  const todoItem = document.createElement('li');
  todoList.append(todoItem);
  todoItem.classList.add('list-item');
  todoItem.classList.add('todo-container__item');

  const todoItemInput = document.createElement('input');
  todoItem.append(todoItemInput);
  todoItemInput.classList.add('input');
  todoItemInput.classList.add('list-item__input');
  if (isNewTodo) todoItemInput.value = todoCreatorInput.value;
  else todoItemInput.value = todoItemInput.value = todo;
  todoCreatorInput.value = '';
  todoItemInput.disabled = true;
  if (isNewTodo) saveToStorage(todoItemInput.value);

  const editTodoButton = document.createElement('button');
  todoItem.append(editTodoButton);
  editTodoButton.classList.add('button');
  editTodoButton.classList.add('edit-button');
  editTodoButton.classList.add('list-item__edit-button');
  editTodoButton.innerHTML = `
            <svg
                class="svg edit-button__svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 12.6662V16H3.33379L13.1707 6.16305L9.8369 2.82926L0 12.6662Z"
                />
                <path
                    d="M15.74 2.33586L13.6641 0.260036C13.3174 -0.0866786 12.7528 -0.0866786 12.4061 0.260036L10.7792 1.88693L14.113 5.22072L15.7399 3.59383C16.0867 3.24711 16.0867 2.68258 15.74 2.33586Z"
                />
            </svg>
        `;

  const removeTodoButton = document.createElement('button');
  todoItem.append(removeTodoButton);
  removeTodoButton.classList.add('button');
  removeTodoButton.classList.add('remove-button');
  removeTodoButton.classList.add('list-item__remove-button');
  removeTodoButton.innerHTML = `
            <svg
                class="svg remove-button__svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="5.63605"
                    y="7.05025"
                    width="2"
                    height="16"
                    rx="1"
                    transform="rotate(-45 5.63605 7.05025)"
                />
                <rect
                    x="16.9497"
                    y="5.63604"
                    width="2"
                    height="16"
                    rx="1"
                    transform="rotate(45 16.9497 5.63604)"
                />
            </svg>
        `;

  todoTools.style.display = 'flex';
  todoContainer.style.display = 'flex';
};

const getRandomPlaceholder = (): string => {
  const randomNumber = Math.floor(
    Math.random() * availablePlaceholders.length
  ) as number;

  return availablePlaceholders[randomNumber];
};

const filterTodos = (todos: HTMLLIElement[], text: string): void => {
  return todos.forEach(todo => {
    const regex = new RegExp(`${text}`, 'gi');
    const todoInput = todo.children[0] as HTMLInputElement;
    if (todoInput.value.match(regex)) todo.style.display = 'flex';
    else todo.style.display = 'none';
  });
};

const handleEditButton = (
  todoItemButton: HTMLButtonElement,
  isEditMode: boolean
): void => {
  const todoItem = todoItemButton.parentElement as HTMLLIElement;
  const todoItemInput = todoItem.children[0] as HTMLInputElement;
  todoItemInput.classList.toggle('list-item__input--edit-mode');
  todoItemButton.classList.toggle('edit-button--edit-mode');
  todoItemInput.disabled = !todoItemInput.disabled;
  todoItemInput.focus();
  todoItemButton.blur();

  if (isEditMode) return saveToStorage(todoItemInput.value);
  else return deleteItemFromStorage(todoItem);
};

const watchForHover = (): void => {
  let lastTouchTime = 0 as number;
  const date = new Date().getMilliseconds() as number;

  const enableHover = () => {
    if (date - lastTouchTime < 500) return;
    document.body.classList.add('has-hover');
  };
  const disableHover = () => document.body.classList.remove('has-hover');
  const updateLastTouchTime = () => (lastTouchTime = date);

  document.addEventListener('touchstart', updateLastTouchTime, true);
  document.addEventListener('touchstart', disableHover, true);
  document.addEventListener('mousemove', enableHover, true);

  enableHover();
};

export {
  createTodo,
  getRandomPlaceholder,
  filterTodos,
  handleEditButton,
  watchForHover
};
