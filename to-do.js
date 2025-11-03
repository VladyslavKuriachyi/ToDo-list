const form = document.querySelector('.js--form');
const input = document.querySelector('.js--form__input');
const todosWrapper = document.querySelector('.js--todos-wrapper');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todosWrapper.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        if (todo.completed) li.classList.add('todo-item--checked');

        li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''}>
      <span class="todo-item__description">${todo.text}</span>
      <button class="todo-item__delete">Видалити</button>`;

        li.querySelector('input').addEventListener('change', () => {
            todos[index].completed = !todos[index].completed;
            saveAndRender();
        });

        li.querySelector('.todo-item__delete').addEventListener('click', () => {
            todos.splice(index, 1);
            saveAndRender();
        });

        todosWrapper.appendChild(li);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    todos.push({text, completed: false});
    input.value = '';
    saveAndRender();
});

function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

renderTodos();
