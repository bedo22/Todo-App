import { Button } from "./ui/button"
import { useState} from "react";
import { useTheme } from "@/hooks/useTheme";
import { Moon,Sun } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function Header({filter, setFilter, setTodos}) {
    const {theme, toggleTheme} = useTheme();

    console.log("Header Rendered")
    const [task, setTask] = useState("");
    const handleAdd = async () => {
    if (!task.trim()) return;
    const newTodo= { text: task, completed: false};
    const {data, error} = await supabase.from("todos").insert([newTodo]).select();
    if (error) console.error("Error adding todo: ", error);
    else setTodos((prev) => [...prev, ...(data || [])]);
    setTask("");
  };
  return (
    <>
        <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4 text-center ">
          Todo App
        </h1>
        <Button variant="outline" 
        className="border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        size="icon" 
        onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-5 w-5 text-gray-800" /> 
            : <Sun className="h-5 w-5 text-yellow-400" /> }
        </Button>
        </header>
        {/* filtered buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
              All
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
        </div>
        
        {/* Input Section */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key ==="Enter" && handleAdd()}
            className="flex-1 rounded-lg px-3 py-2 border border-border bg-input
            focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>
    </>
  )
}

