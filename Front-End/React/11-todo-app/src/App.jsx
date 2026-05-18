import React, { useEffect, useState } from "react";
import { TodoProvider } from "./context";
import { TodoForm, TodoItem } from "./components";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((elem) => (elem.id === id ? todo : elem))); // todo is an object not a single element or value
  };

  // It automatically returns a brand-new array without the item that matches your id condition.
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((elem) => elem.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((elem) => elem.id === id ? {...elem, completed: !elem.completed} : elem))
  }; // in here I want to change/toggle a single element/value so I need to spread all value without completed cause it should be changed/toggle

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem('todos'))

    if (localTodos && localTodos.length > 0) {
      setTodos(localTodos)
    }
    
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm/>
            </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => {
              return (
                <div className="w-full" key={todo.id}>
                  <TodoItem todo={todo}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
