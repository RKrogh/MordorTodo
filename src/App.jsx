import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Flame, Trash2, CheckCircle, Circle, Plus, Crown } from 'lucide-react'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('mordor-todos')
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "Forge the One Ring", completed: false, priority: 'high' },
      { id: 2, text: "Build Barad-dûr", completed: false, priority: 'high' },
      { id: 3, text: "Command the Nazgûl", completed: true, priority: 'medium' },
      { id: 4, text: "Conquer Middle-earth", completed: false, priority: 'high' }
    ]
  })
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('mordor-todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        priority: 'medium'
      }
      setTodos([...todos, todo])
      setNewTodo('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="app">
      {/* Floating Eye of Sauron */}
      <motion.div 
        className="eye-of-sauron"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Eye size={40} />
      </motion.div>

      <div className="container">
        <motion.header 
          className="header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="title-section">
            <motion.div 
              className="crown-icon"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Crown size={32} />
            </motion.div>
            <h1>Mordor Todo</h1>
            <motion.div 
              className="flame-icon"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame size={28} />
            </motion.div>
          </div>
          <p className="subtitle">One Task to Rule Them All</p>
        </motion.header>

        <motion.div 
          className="stats"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div className="stat">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">{totalCount}</span>
            <span className="stat-label">Total</span>
          </div>
        </motion.div>

        <motion.form 
          className="add-todo-form"
          onSubmit={addTodo}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task to your dark agenda..."
            className="todo-input"
          />
          <motion.button 
            type="submit"
            className="add-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
          </motion.button>
        </motion.form>

        <div className="filters">
          {['all', 'active', 'completed'].map(filterType => (
            <motion.button
              key={filterType}
              className={`filter-btn ${filter === filterType ? 'active' : ''}`}
              onClick={() => setFilter(filterType)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </motion.button>
          ))}
        </div>

        <motion.div 
          className="todos-container"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatePresence>
            {filteredTodos.map(todo => (
              <motion.div
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                layout
              >
                <button
                  className="toggle-btn"
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <CheckCircle size={24} />
                    </motion.div>
                  ) : (
                    <Circle size={24} />
                  )}
                </button>
                <span className="todo-text">{todo.text}</span>
                <motion.button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 size={18} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredTodos.length === 0 && (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Eye size={48} />
              <p>No tasks found in the darkness...</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default App 