const formElement = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const todosElement = document.querySelector('#todos');

async function getTodos() {
    todosElement.innerHTML = '';
    const response = await fetch('http://localhost:5000/todos');
    const todos = await response.json();

    todos.forEach((todo) => {
        const todoElement = document.createElement('div');
        todoElement.classList.add('todo');

        const nameElement = document.createElement('h5');
        nameElement.textContent = todo.name;
        const descElement = document.createElement('p');
        descElement.textContent = todo.description;
        const dateElement = document.createElement('small');
        const created_date = new Date(todo.created_date);
        dateElement.textContent = created_date.toLocaleString();

        todoElement.appendChild(nameElement);
        todoElement.appendChild(descElement);
        todoElement.appendChild(dateElement);

        todosElement.appendChild(todoElement);
    });
    formElement.style.display = '';
    loadingElement.style.display = 'none';
};

async function formSubmitted(event) { 
    event.preventDefault();
    formElement.style.display = 'none';
    loadingElement.style.display = '';

    const formData = new FormData(formElement);
    
    const name = formData.get('name');
    const description = formData.get('description');

    const todo = {
        name,
        description,
    };
    const respone = await fetch('http://localhost:5000/to-do', {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    const json = await respone.json();
    formElement.style.display = '';
    loadingElement.style.display = 'none';
    formElement.reset();
    getTodos();
};

formElement.style.display = 'none';
formElement.addEventListener('submit', formSubmitted);

getTodos();