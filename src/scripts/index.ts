import '@/assets/scss';

const todoCreatorInput = document.querySelector(
  '#main__todo-creator-input'
) as HTMLInputElement;
const todoCreatorButton = document.querySelector(
  '#main__todo-creator-button'
) as HTMLButtonElement;
const todoList = document.querySelector('#main__todo-list') as HTMLUListElement;
const todoAllClearButton = document.querySelector(
  '#main__todo-all-clear-button'
) as HTMLButtonElement;
const todoSearcherInput = document.querySelector(
  '#main__todo-searcher-input'
) as HTMLInputElement;
const todoTools = document.querySelector('#main__todo-tools') as HTMLDivElement;
const todoContainer = document.querySelector(
  '#main__todo-container'
) as HTMLDivElement;

const storageName: string = 'todos';

const getStorageItems = (): string[] => {
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
  const todos: string[] = getStorageItems();

  todos.push(todo);

  localStorage.setItem(storageName, JSON.stringify(todos));
};

const renderStorageItems = (): void => {
  const todos = getStorageItems();

  todos.forEach(todo => {
    const todoItem = document.createElement('li') as HTMLLIElement;
    todoList.append(todoItem);
    todoItem.classList.add('list-item');
    todoItem.classList.add('todo-container__item');

    const todoItemInput = document.createElement('input') as HTMLInputElement;
    todoItem.append(todoItemInput);
    todoItemInput.classList.add('input');
    todoItemInput.classList.add('list-item__input');
    todoItemInput.value = todo;
    todoCreatorInput.value = '';
    todoItemInput.disabled = true;

    const editTodoButton = document.createElement(
      'button'
    ) as HTMLButtonElement;
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

    const removeTodoButton = document.createElement(
      'button'
    ) as HTMLButtonElement;
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
  });
};

const getRandomPlaceholder = (): string => {
  const availablePlaceholders = [
    'Feed the fish...',
    'Clean the room...',
    'Do homework...'
  ] as string[];
  const randomNumber = Math.floor(
    Math.random() * availablePlaceholders.length
  ) as number;

  return availablePlaceholders[randomNumber];
};

const toDoOnWindowLoad = (): void => {
  todoCreatorInput.placeholder = getRandomPlaceholder();
  renderStorageItems();
};

const deleteItemFromStorage = (todo: HTMLLIElement): void => {
  const todos = getStorageItems();

  const currentItemInput = todo.children[0] as HTMLInputElement;
  const inputValue = currentItemInput.value;
  todos.splice(todos.indexOf(inputValue), 1);

  localStorage.setItem(storageName, JSON.stringify(todos));
};

const addTodo = (e: Event): void => {
  e.preventDefault();
  todoCreatorButton.blur();

  if (todoCreatorInput.value) {
    const todoItem = document.createElement('li');
    todoList.append(todoItem);
    todoItem.classList.add('list-item');
    todoItem.classList.add('todo-container__item');

    const todoItemInput = document.createElement('input');
    todoItem.append(todoItemInput);
    todoItemInput.classList.add('input');
    todoItemInput.classList.add('list-item__input');
    todoItemInput.value = todoCreatorInput.value;
    todoCreatorInput.value = '';
    todoItemInput.disabled = true;
    saveToStorage(todoItemInput.value);

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
  }
};

const handleTodoItemButtons = (e: Event): void => {
  const todoItemButton = e.target as HTMLButtonElement;

  if (todoItemButton.classList[1] === 'remove-button') {
    const todoItem = todoItemButton.parentElement as HTMLLIElement;
    const todoList = todoItem.parentElement as HTMLUListElement;
    deleteItemFromStorage(todoItem);
    todoItem.remove();
    if (!todoList.children.length) {
      localStorage.removeItem(storageName);
      todoTools.style.display = 'none';
      todoContainer.style.display = 'none';
    }
    return;
  }

  if (
    todoItemButton.classList[1] === 'edit-button' &&
    todoItemButton.classList[3] === 'edit-button--edit-mode'
  ) {
    const todoItem = todoItemButton.parentElement as HTMLLIElement;
    const todoItemInput = todoItem.children[0] as HTMLInputElement;
    todoItemInput.classList.toggle('list-item__input--edit-mode');
    todoItemButton.classList.toggle('edit-button--edit-mode');
    todoItemInput.disabled = !todoItemInput.disabled;
    todoItemInput.focus();
    todoItemButton.blur();
    return saveToStorage(todoItemInput.value);
  }

  if (todoItemButton.classList[1] === 'edit-button') {
    const todoItem = todoItemButton.parentElement as HTMLLIElement;
    const todoItemInput = todoItem.children[0] as HTMLInputElement;
    todoItemInput.classList.toggle('list-item__input--edit-mode');
    todoItemButton.classList.toggle('edit-button--edit-mode');
    todoItemInput.disabled = !todoItemInput.disabled;
    todoItemInput.focus();
    todoItemButton.blur();
    deleteItemFromStorage(todoItem);
  }
};

const clearAllTodoItems = (): void => {
  localStorage.removeItem(storageName);
  todoList.innerHTML = '';
  todoTools.style.display = 'none';
  todoContainer.style.display = 'none';
};

const filterTodos = (todos: HTMLLIElement[], text: string): void => {
  return todos.forEach(todo => {
    const regex = new RegExp(`${text}`, 'gi');
    const todoInput = todo.children[0] as HTMLInputElement;
    if (todoInput.value.match(regex)) todo.style.display = 'flex';
    else todo.style.display = 'none';
  });
};

const handleInputChange = (text: string): void => {
  const todos = Array.from(todoList.children) as HTMLLIElement[];
  if (!todos.length) return;

  filterTodos(todos, text);
};

todoCreatorButton.addEventListener('click', addTodo);
todoList.addEventListener('click', handleTodoItemButtons);
todoAllClearButton.addEventListener('click', clearAllTodoItems);
todoSearcherInput.addEventListener('input', () =>
  handleInputChange(todoSearcherInput.value)
);
window.addEventListener('load', toDoOnWindowLoad);

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
watchForHover();
