// step: 1
import {createSlice, nanoid} from '@reduxjs/toolkit'

// step: 2
const initialState = {
    todos: [ // todos is a state
        
    ]
}


// step: 3
export const todoSlice = createSlice({ // this is a reducer we can make more slicer/reducer like: authSlice, noteSlice, uploadSlice etc
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            // we can also destructure with default values
            const {text, priority = 'normal', completed = false} = action.payload
            const newTodo = {
                id: nanoid(),
                text,
                priority,
                completed,
                createAt: Date.now(),
                // text: action.payload.text ,// we can add, update, delete through action
                // completed: action.payload.completed // we can add, update, delete through action
            }
            state.todos.push(newTodo) // we get access todos state with state properties then push a new todo
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload.id ? {...todo, ...action.payload} : todo )
        },
        setTodos: (state, action) => {
            state.todos = action.payload
        }
    }
})

// step: 4
export const {addTodo, updateTodo, removeTodo, setTodos} = todoSlice.actions

// step: 5
export default todoSlice.reducer