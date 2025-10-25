import React ,{ useState, useEffect, useCallback } from "react";
import Header from "./Header";
import TodoList  from "./TodoList";
import Footer from "./Footer";
import { supabase } from "../lib/supabaseClient";

export default function TodoApp({session}) {
  console.log("App Rendered");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  
  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
  },[]);

  const handleDelete= useCallback(async (id) => {
    const {error} = await supabase.from("todos").delete().eq("id", id).eq("user_id", session.user.id);
    if (error) console.error("Error deleting todo: ", error);
    else setTodos((prev) => prev.filter((t) => t.id !== id));
  },[session]);
  
  const toggleCompleted = useCallback(async (id, currentValue) => {
    const {error} = await supabase.from("todos").update({is_complete: !currentValue}).eq("id", id).eq("user_id", session.user.id);
    if (error) console.error("Error updating todo: ", error);
    else setTodos((prev) => prev.map((t) => t.id === id ? {...t, is_complete: !t.is_complete} : t));
  },[session]);
  
  const handleEdit = useCallback(async (id, newText) => {
    const {error} = await supabase.from("todos").update({task: newText}).eq("id",id).eq("user_id", session.user.id);
    if (error) console.error("Error updating todo: ", error);
    else setTodos(prev => prev.map(todo => todo.id === id ? {...todo, task: newText}: todo));
  },[session]);
  
  const clearCompleted = useCallback(async () => {
      const { error } = await supabase.from("todos").delete().eq("is_complete", true).eq("user_id", session.user.id);
      if (error) console.error("Error clearing completed:", error);
      else setTodos((prev) => prev.filter((t) => !t.is_complete));
    },[session]);
  
    const clearAll = useCallback(async () => {
    const { error } = await supabase.from("todos").delete().eq("user_id", session.user.id); // deletes all rows
    if (error) console.error("Error clearing all todos:", error);
    else setTodos([]);
  },[session]);

  useEffect(() => {
    const loadTodos = async() => {
      if (!session) return;

      const{data, error} = await supabase.from("todos")
      .select("*").eq("user_id", session.user.id)
      .order("created_at",{ascending: true});

      if(error) console.error("Error fetching todos: ", error);
      else setTodos(data);
    }
    loadTodos();
  }, [session])

  useEffect(() => {
    if(!("Notification" in window)) return;

    const checkReminders = async () => {
      const now = new Date();

      for (const todo of todos){
        if(!todo.reminder_time || todo.notified) continue;

        const reminderTime = new Date(todo.reminder_time);

        if(reminderTime <= now && !todo.notified){
            new Notification("Task Reminder", {
              body: todo.task,
            });

            const {error} = await supabase.from("todos")
            .update({notified: true})
            .eq("id",todo.id);

            if (error) console.error("Error updating notification:", error);

            //update state locally

            setTodos((prev) => prev.map((t) => t.id === todo.id ? {...t, notified: true} : t));
      }
    }
  };

    const interval = setInterval(checkReminders, 60000);
    checkReminders();

    return () => clearInterval(interval);
  }, [todos]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-md rounded-2xl shadow-lg p-6 bg-card transition-colors duration-300 border border-border">
        
        <Header
        handleLogout={handleLogout}
        filter={filter}
        setFilter={setFilter}
        setTodos={setTodos}
        session={session}
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
