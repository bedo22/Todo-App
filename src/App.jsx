import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import TodoList  from "./components/TodoList";
import Footer from "./components/Footer";

export default function App() {
  console.log("App Rendered");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : []; 
  });
  const [filter, setFilter] = useState("all");
  
  const handleDelete= (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  const toggleCompleted = (id) => {
    setTodos((prev) => prev.map((t) => t.id === id ? {...t, completed: !t.completed} : t))
  };
  const handleEdit = (id, newText) => {
    setTodos(prev => prev.map(todo => todo.id === id ? {...todo, text: newText}: todo))
  }
  //save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-md rounded-2xl shadow-lg p-6 bg-card transition-colors duration-300 border border-border">
        <Header
        filter={filter}
        setFilter={setFilter}
        setTodos={setTodos}
        />
        <TodoList
        todos={todos}
        filter={filter}
        toggleCompleted={toggleCompleted}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        />
        <Footer 
        todos={todos} 
        />
      </div>
    </div>
  );
}
