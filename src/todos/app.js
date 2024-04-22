import todoStore from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos } from "./use-cases";

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input'
}

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
    }

    (() => {
       const app = document.createElement('div');
       app.innerHTML = html;
       document.querySelector(elementId).append(app);
       displayTodos();
    })()

    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput);
    const todoListUl = document.querySelector( ElementIDs.TodoList );

    newDescriptionInput.addEventListener('keyup', (event) =>{
        if ( event.keyCode !== 13 ) return;
        if ( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    })

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest( '[data-id]' );
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
    })

    todoListUl.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest( '[data-id]' );
        if( !element || !isDestroyElement ) return;
        
        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos();
    })
}