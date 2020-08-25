const todoCreatorInput = document.querySelector("#todo_creator_input")
const todoCreatorButton = document.querySelector("#todo_creator_button")
const todoList = document.querySelector("#todo_list")
const todoFullClearerButton = document.querySelector("#todo_fullclearer_button")
const todoSearcherInput = document.querySelector("#todo_searcher_input")
const todoTools = document.querySelector("#todo_tools")
const todoContainer = document.querySelector("#todo_container")

const checkIfTodosExist = () => {
    let todos

    if (!localStorage.getItem('todos')) {
        todos = []
        return todos
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
        return todos
    }
}

const saveToLocalStorage = todo => {
    const todos = checkIfTodosExist()

    todos.push(todo)

    localStorage.setItem('todos', JSON.stringify(todos))
}

const getFromLocalStorage = () => {
    const todos = checkIfTodosExist()

    todos.forEach(todo => {
        const todoItem = document.createElement('li')
        todoList.append(todoItem)
        todoItem.classList.add('todo_item')

        const todoItemInput = document.createElement('input')
        todoItem.append(todoItemInput)
        todoItemInput.classList.add('todo_input')
        todoItemInput.classList.add('todo_item_input')
        todoItemInput.value = todo
        todoCreatorInput.value = ''
        todoItemInput.disabled = true

        const editTodoButton = document.createElement('button')
        todoItem.append(editTodoButton)
        editTodoButton.classList.add('todo_button')
        editTodoButton.classList.add('edit_todo_button')
        editTodoButton.innerHTML = `
            <svg
                class="edit_todo_button_svg"
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
        removeTodoButton.classList.add('todo_button')
        removeTodoButton.classList.add('remove_todo_button')
        removeTodoButton.innerHTML = `
            <svg
                class="remove_todo_button_svg"
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
    getFromLocalStorage()
}

const deleteFromLocalStorage = (todo) => {
    const todos = checkIfTodosExist()

    const currentItem = todo.children[0].value
    todos.splice(todos.indexOf(currentItem), 1)

    localStorage.setItem('todos', JSON.stringify(todos))
}

const handleAddTodo = e => {
    e.preventDefault()
    e.target.blur()

    if (todoCreatorInput.value) {
        const todoItem = document.createElement('li')
        todoList.append(todoItem)
        todoItem.classList.add('todo_item')

        const todoItemInput = document.createElement('input')
        todoItem.append(todoItemInput)
        todoItemInput.classList.add('todo_input')
        todoItemInput.classList.add('todo_item_input')
        todoItemInput.value = todoCreatorInput.value
        todoCreatorInput.value = ''
        todoItemInput.disabled = true
        saveToLocalStorage(todoItemInput.value)

        const editTodoButton = document.createElement('button')
        todoItem.append(editTodoButton)
        editTodoButton.classList.add('todo_button')
        editTodoButton.classList.add('edit_todo_button')
        editTodoButton.innerHTML = `
            <svg
                class="edit_todo_button_svg"
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
        removeTodoButton.classList.add('todo_button')
        removeTodoButton.classList.add('remove_todo_button')
        removeTodoButton.innerHTML = `
            <svg
                class="remove_todo_button_svg"
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

    if (todoItemButton.classList[1] === 'remove_todo_button') {
        const todoItem = todoItemButton.parentElement
        const todoList = todoItem.parentElement
        deleteFromLocalStorage(todoItem)
        todoItem.remove()
        if (!todoList.children.length) {
            localStorage.removeItem('todos')
            todoTools.style.display = 'none'
            todoContainer.style.display = 'none'
        }
    }

    if (todoItemButton.classList[1] === 'edit_todo_button') {
        const todoItem = todoItemButton.parentElement
        const todoItemInput = todoItem.children[0]
        const editTodoItem = todoItem.children[1]
        editTodoItem.classList.toggle('edit_mode')
        todoItemInput.classList.toggle('input_edit_mode')
        todoItemInput.disabled = !todoItemInput.disabled
        todoItemInput.focus()
        e.target.blur()
    }
}

const handleClearAllTodoItems = () => {
    localStorage.removeItem('todos')
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

todoCreatorButton.addEventListener('click', handleAddTodo)
todoList.addEventListener('click', handleTodoItemButtons)
todoFullClearerButton.addEventListener('click', handleClearAllTodoItems)
todoSearcherInput.addEventListener('input', () => handleInputChange(todoSearcherInput.value))
window.addEventListener('load', toDoOnWindowLoad)
