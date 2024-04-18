import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'all',
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
    console.log(state)
    console.log('InitStore 🥑')
}

export default {
    initStore,
}