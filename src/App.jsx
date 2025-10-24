import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import TodoList  from "./components/TodoList";
import Footer from "./components/Footer";
import { supabase } from "./lib/supabaseClient";

export default function App() {
  console.log("App Rendered");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  
  const handleDelete= async (id) => {
    const {error} = await supabase.from("todos").delete().eq("id", id);
    if (error) console.error("Error deleting todo: ", error);
    else setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  const toggleCompleted = async (id, currentValue) => {
    const {error} = await supabase.from("todos").update({completed: !currentValue}).eq("id", id);
    if (error) console.error("Error updating todo: ", error);
    else setTodos((prev) => prev.map((t) => t.id === id ? {...t, completed: !t.completed} : t));
  };
  const handleEdit = async (id, newText) => {
    const {error} = await supabase.from("todos").update({text: newText}).eq("id",id);
    if (error) console.error("Error updating todo: ", error);
    else setTodos(prev => prev.map(todo => todo.id === id ? {...todo, text: newText}: todo))
  }
  const clearCompleted = async () => {
      const { error } = await supabase.from("todos").delete().eq("completed", true);
      if (error) console.error("Error clearing completed:", error);
      else setTodos((prev) => prev.filter((t) => !t.completed));
    }
  const clearAll = async () => {
    const { error } = await supabase.from("todos").delete().not("id", "is", null); // deletes all rows
    if (error) console.error("Error clearing all todos:", error);
    else setTodos([]);
  }
  useEffect(() => {
    const loadTodos = async() => {
      const{data, error} = await supabase.from("todos").select("*").order("created_at",{ascending: true});
      if(error) console.error("Error fetching todos: ", error);
      else setTodos(data);
    }
    loadTodos();
  }, [])
  //save todos to local storage whenever they change
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
        clearCompleted={clearCompleted}
        />
        <Footer 
        todos={todos} 
        clearAll={clearAll}
        />
      </div>
    </div>
  );
}
