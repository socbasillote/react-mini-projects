import { useState } from 'react'
import TodoList from './TodoList';

import './App.css'
import { useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('my-todos');
    return storedTodos ? JSON.parse(storedTodos) : []
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAdd = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    }
    setTodos([...todos, newTodo]);
    setInput('');
  }

  const handleDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed } : todo
      )
    )
  }

  const clearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);
    setTodos(activeTodos);
  }

  useEffect(() => {
    localStorage.setItem('my-todos', JSON.stringify(todos));
  }, [todos]);

  return (
 
      <div>
        <h1>To-do List</h1>
        <form onSubmit={handleAdd}>
          <input 
            type='text'
            placeholder='Add a task...'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type='submit'>Add</button>
        </form>

        <div>
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
          <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
        </div>

        <TodoList 
          todos={todos}
          onDelete={handleDelete}
          onToggle={toggleComplete}
          filter={filter}
        />

        <button onClick={clearCompleted}>Clear Completed</button>

      </div>

  )
}

export default App
