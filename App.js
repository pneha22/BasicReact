import { useState, useRef , useEffect } from "react";
import {v4} from "uuid";

import TodoList from "./TodoList";
const LOC_KEY = 'todoApp.todos'
function App() {
  const [todos, setTodos]  = useState([])
  const todoNameRef = useRef()

  useEffect(()=>{
  const storedTodos = JSON.parse(localStorage.getItem(LOC_KEY))
  if (storedTodos) setTodos(storedTodos)   
  }, [])

  useEffect(()=> {
    localStorage.setItem(LOC_KEY,JSON.stringify(todos))
  },[todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos) 

  }
  function handleCLear(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  function handleAddTodo(e){
 const name = todoNameRef.current.value
 if (name === '') return
 setTodos(prevTodos => {
  return [...prevTodos, {id: v4(),name: name, complete:false}]
 })
 todoNameRef.current.value = null
 }
  return (
  <>

  <TodoList todos={todos} toggleTodo={toggleTodo}/>
  <input ref={todoNameRef} type="text" />
  <button onClick={handleAddTodo}> Add Todo </button>
  <button onClick={handleCLear}> Clear done Todos</button>
 <div> {todos.filter(todo => !todo.complete).length} left to do</div>
  </>
 )
}

export default App;
