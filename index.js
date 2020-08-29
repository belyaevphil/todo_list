const todoCreatorInput = document.querySelector("#main__todo-creator-input")
const todoCreatorButton = document.querySelector("#main__todo-creator-button")
const todoList = document.querySelector("#main__todo-list")
const todoAllClearButton = document.querySelector("#main__todo-all-clear-button")
const todoSearcherInput = document.querySelector("#main__todo-searcher-input")
const todoTools = document.querySelector("#main__todo-tools")
const todoContainer = document.querySelector("#main__todo-container")

const storageName = 'todos'

const getStorageItems = () => {
    let todos

    if (!localStorage.getItem(storageName)) {
        todos = []
        return todos
    } else {
        todos = JSON.parse(localStorage.getItem(storageName))
        return todos
    }
}

const saveToStorage = todo => {
    const todos = getStorageItems()

    todos.push(todo)

    localStorage.setItem(storageName, JSON.stringify(todos))
}

const renderStorageItems = () => {
    const todos = getStorageItems()

    todos.forEach(todo => {
        const todoItem = document.createElement('li')
        todoList.append(todoItem)
        todoItem.classList.add('main__todo-item')

        const todoItemInput = document.createElement('input')
        todoItem.append(todoItemInput)
        todoItemInput.classList.add('main__todo-item-input')
        todoItemInput.classList.add('input')
        todoItemInput.value = todo
        todoCreatorInput.value = ''
        todoItemInput.disabled = true

        const editTodoButton = document.createElement('button')
        todoItem.append(editTodoButton)
        editTodoButton.classList.add('main__edit-todo-button')
        editTodoButton.classList.add('button')
        editTodoButton.innerHTML = `
            <svg
                class="main__edit-todo-svg svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 12.6662V16H3.33379L13.1707 6.16305L9.8369 2.82926L0 12.6662Z"
                    fill="white"
                />
                <path
                    d="M15.74 2.33586L13.6641 0.260036C13.3174 -0.0866786 12.7528 -0.0866786 12.4061 0.260036L10.7792 1.88693L14.113 5.22072L15.7399 3.59383C16.0867 3.24711 16.0867 2.68258 15.74 2.33586Z"
                    fill="white"
                />
            </svg>
        `

        const removeTodoButton = document.createElement('button')
        todoItem.append(removeTodoButton)
        removeTodoButton.classList.add('main__remove-todo-button')
        removeTodoButton.classList.add('button')
        removeTodoButton.innerHTML = `
            <svg
                class="main__remove-todo-svg svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#fff"
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
        `

        todoTools.style.display = 'flex'
        todoContainer.style.display = 'flex'
    })
}

const getRandomPlaceholder = () => {
    const availablePlaceholders = ['Feed the fish...', 'Clean the room...', 'Do homework...']
    return availablePlaceholders[Math.floor(Math.random() * availablePlaceholders.length)]
}

const toDoOnWindowLoad = () => {
    todoCreatorInput.placeholder = getRandomPlaceholder()
    renderStorageItems()
}

const deleteItemFromStorage = (todo) => {
    const todos = getStorageItems()

    const currentItem = todo.children[0].value
    todos.splice(todos.indexOf(currentItem), 1)

    localStorage.setItem(storageName, JSON.stringify(todos))
}

const addTodo = e => {
    e.preventDefault()
    e.target.blur()

    if (todoCreatorInput.value) {
        const todoItem = document.createElement('li')
        todoList.append(todoItem)
        todoItem.classList.add('main__todo-item')

        const todoItemInput = document.createElement('input')
        todoItem.append(todoItemInput)
        todoItemInput.classList.add('main__todo-item-input')
        todoItemInput.classList.add('input')
        todoItemInput.value = todoCreatorInput.value
        todoCreatorInput.value = ''
        todoItemInput.disabled = true
        saveToStorage(todoItemInput.value)

        const editTodoButton = document.createElement('button')
        todoItem.append(editTodoButton)
        editTodoButton.classList.add('main__edit-todo-button')
        editTodoButton.classList.add('button')
        editTodoButton.innerHTML = `
            <svg
                class="main__edit-todo-svg svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 12.6662V16H3.33379L13.1707 6.16305L9.8369 2.82926L0 12.6662Z"
                    fill="white"
                />
                <path
                    d="M15.74 2.33586L13.6641 0.260036C13.3174 -0.0866786 12.7528 -0.0866786 12.4061 0.260036L10.7792 1.88693L14.113 5.22072L15.7399 3.59383C16.0867 3.24711 16.0867 2.68258 15.74 2.33586Z"
                    fill="white"
                />
            </svg>
        `

        const removeTodoButton = document.createElement('button')
        todoItem.append(removeTodoButton)
        removeTodoButton.classList.add('main__remove-todo-button')
        removeTodoButton.classList.add('button')
        removeTodoButton.innerHTML = `
            <svg
                class="main__remove-todo-svg svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#fff"
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
        `

        todoTools.style.display = 'flex'
        todoContainer.style.display = 'flex'
    }
}

const handleTodoItemButtons = e => {
    const todoItemButton = e.target

    if (todoItemButton.classList[0] === 'main__remove-todo-button') {
        const todoItem = todoItemButton.parentElement
        const todoList = todoItem.parentElement
        deleteItemFromStorage(todoItem)
        todoItem.remove()
        if (!todoList.children.length) {
            localStorage.removeItem(storageName)
            todoTools.style.display = 'none'
            todoContainer.style.display = 'none'
        }
    }

    if (todoItemButton.classList[0] === 'main__edit-todo-button') {
        const todoItem = todoItemButton.parentElement
        const todoItemInput = todoItem.children[0]
        const editTodoItem = todoItem.children[1]
        todoItemInput.classList.toggle('main__todo-item-input--edit-mode')
        editTodoItem.classList.toggle('main__edit-todo-button--edit-mode')
        todoItemInput.disabled = !todoItemInput.disabled
        todoItemInput.focus()
        e.target.blur()
    }
}

const clearAllTodoItems = () => {
    localStorage.removeItem(storageName)
    todoList.innerHTML = ''
    todoTools.style.display = 'none'
    todoContainer.style.display = 'none'
}

const filterTodos = (todos, text) => {
    return todos.forEach(todo => {
        const regex = new RegExp(`${text}`, 'gi')
        if (todo.children[0].value.match(regex)) todo.style.display = 'flex'
        else todo.style.display = 'none'
    })
}

const handleInputChange = text => {
    const todos = Array.from(todoList.children)
    if (!todos.length) return

    filterTodos(todos, text)
}

todoCreatorButton.addEventListener('click', addTodo)
todoList.addEventListener('click', handleTodoItemButtons)
todoAllClearButton.addEventListener('click', clearAllTodoItems)
todoSearcherInput.addEventListener('input', () => handleInputChange(todoSearcherInput.value))
window.addEventListener('load', toDoOnWindowLoad)
