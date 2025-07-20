import React from 'react'

function TodoItem({ todo, onDelete, onToggle }) {

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        <span onClick={() => onToggle(todo.id)}>{todo.text}</span>
        <button onClick={() => onDelete(todo.id)}>❌</button>
    </li>
  )
}

export default TodoItem