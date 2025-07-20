import React from 'react'
import TodoItem from './TodoItem'

function TodoList({todos, onDelete, onToggle, filter}) {


    return (
        <ul className='todo-list'>
            {todos
                .filter(todo => {
                    if (filter === 'active') return !todo.completed;
                    if (filter === 'completed') return todo.completed;
                    return true; // 'all'
                })
                .map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
                ))

            }
        </ul>
    )
}

export default TodoList