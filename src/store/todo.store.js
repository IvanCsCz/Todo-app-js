import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra 1'),
        new Todo('Piedra 2'),
        new Todo('Piedra 3'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    console.log(state);
    console.log('InitStore 🥑');
}

const loadStore = () => {
    throw new Error('not implemented');
}

const getTodos = ( filter = Filters.All ) => {
    switch(filter){
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return [...state.todos.filter( todo => todo.done )]

        case Filters.Pending:
            return [...state.todos.filter( todo => !todo.done )]

        default:
            throw new Error(`Option ${ filter } is not valid`)
    }
}

const addTodo = ( description ) => {
    if ( !description ) throw new Error('Description is required');
    state.todos.push( new Todo(description) );
}

const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if(todo.id === todoId) todo.done = !todo.done
        return todo 
    })
}

const deleteTodo = ( todoId ) => {
    if ( !todoId ) throw new Error('todoId is required');

    state.todos = state.todos.filter( todo.id === todoId );
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo.done );
}

const setFilter = ( newFilter = Filters.All ) => {
    if ( !Object.keys(Filters).includes(newFilter) ) throw new Error(`${ newFilter } is not allowed`)
    state.filter = newFilter;
}

const getCurrentFilter = () => {
    return state.filter
}

export default {
    addTodo,   
    deleteCompleted,    
    deleteTodo, 
    getCurrentFilter,   
    getTodos, 
    initStore,
    loadStore,
    setFilter,  
    toggleTodo, 
}