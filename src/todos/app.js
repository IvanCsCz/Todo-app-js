import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderPending, renderTodos } from "./use-cases";

const ElementIDs = {
    TodoFilters: '.filter',
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    PendingCountLabel: '#pending-count',
}

export const App = (elementId) => {

    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel);
    }

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
        updatePendingCount();
    }

    (() => {
       const app = document.createElement('div');
       app.innerHTML = html;
       document.querySelector(elementId).append(app);
       displayTodos();
    })()

    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput);
    const todoListUl = document.querySelector( ElementIDs.TodoList );
    const clearCompletedBtn = document.querySelector ( ElementIDs.ClearCompleted );
    const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );

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

    clearCompletedBtn.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach( element => {
        element.addEventListener('click', (event) => {
            filtersLIs.forEach( el => el.classList.remove('selected'))
            event.target.classList.add('selected')

            switch(event.target.text){
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                break;
            }

            displayTodos();

        })

    })
}