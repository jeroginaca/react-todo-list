import React, { useEffect, useState } from 'react'

const App = () => {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState("")

  useEffect(() => {
    const temp = localStorage.getItem("todos")
    const loadadedTodos = JSON.parse(temp)

    if(loadadedTodos){
      setTodos(loadadedTodos)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])

  const handleSubmit = (e) => {
    e.preventDefault()

    if(todo.trim() === ""){
      return(alert("No hay texto para añadir"))
    }

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false
    }

    setTodos([...todos].concat(newTodo))
    setTodo("")

  }

  const deleteTodo = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id)

    setTodos(updatedTodos)
  }

  const toggleComplete = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id){
        todo.completed = !todo.completed
      } return todo
    })

    setTodos(updatedTodos)
  } 

  const editTodo = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id){
        todo.text = editingText
      } return todo
    })
    setTodos(updatedTodos)

    // resetear
    setTodoEditing(null)
    setEditingText(" ")
  }

  const startEditing = (id, text) => {
    setTodoEditing(id);
    setEditingText(text);
  }


  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo}/>
        <button type='submit' style={{ padding:"0.5rem 1rem", height:"3.1rem", width:"6rem" }}>Añadir Tarea</button>
      </form>

      <div className="todos-container">
        {todos.slice().reverse().map((todo) => 
        <div key={todo.id} className="todos">
        {todoEditing === todo.id ? (
                <input
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                  value={editingText}
                />
              ) : todo.completed ? (
                <div className="todo-text completed">{todo.text}</div>
              ) : (
                <div className='todo-text'>{todo.text}</div>
              )}

            <div className="todo-options">
              
              {todoEditing === todo.id ? (
                <button onClick={() => editTodo(todo.id)}>Finalizar Edición</button>
              ) : (
                <>
              <button onClick={() => deleteTodo(todo.id)}>Borrar</button>

              <button className="check-button">
                <span style={{ marginRight:"10px"}}>Finalizada</span>
                <input 
                  type="checkbox" 
                  onChange={()=> toggleComplete(todo.id)}
                  checked={todo.completed}
                  />
              </button>

              <button onClick={() => startEditing(todo.id, todo.text)}>Editar</button>
              </>
              )}
              
            </div>
          </div> )}
      </div>

    </div>
  )
}

export default App