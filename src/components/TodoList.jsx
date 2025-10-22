import { Button } from "./ui/button";
import {motion, AnimatePresence} from "framer-motion"
import React from "react";
import { useState } from "react";

export default React.memo(function TodoList({todos, filter, toggleCompleted, handleDelete, handleEdit}){
    console.log("Todolist Rendered");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const handleEditClick = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    };
    const handleSaveEdit = (id) => {
        if (editText.trim()) {
            handleEdit(id, editText);
            setEditingId(null);
        }
    };
    const handleCancelEdit = () => {
      setEditingId(null);
      setEditText("");
    }
    const filteredTodos = todos.filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true; // 'all'
      });

  return (
        <>
        <ul className="space-y-2">
        <AnimatePresence>
          {filteredTodos.length === 0 ? (
            <p className="text-center text-gray-400">No tasks yet.</p>
          ) : (
            filteredTodos.map((todo) => (
            <motion.li 
            key={todo.id}
            initial={{oppacity: 0, y: 15}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -15}}
            transition={{duration: 0.25}}
            className="flex items-center justify-between px-3 py-2 rounded-lg border border-border bg-card"
            >
            {/* Left Section: checkbox + text/input */}
            <div className="flex items-center flex-1 space-x-2">
            <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleCompleted(todo.id)}
            className="w-4 h-4 accent-green-500"
            />
            <AnimatePresence mode="wait" initial={false}>
            {editingId === todo.id ? (
              <motion.div
              key="edit"
              initial={{opacity: 0, scale: 0.95}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.95}}
              transition={{duaration: 0.2}}
              className="flex flex-1 items-center space-x-2"
              >
                <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => handleSaveEdit(todo.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit(todo.id);
                  if (e.key === "Escape") handleCancelEdit();
                }}
                className="border px-2 py-1 flex-1 rounded 
                focus:outline-none bg-input focus:ring-2 focus:ring-ring"
                autoFocus
                />
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(todo)}
                    >
                        💾
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelEdit}
                    >
                      ✖️
                  </Button>
                  </motion.div>
            ) : (
              <motion.div
              key="edit"
              initial={{opacity: 0, scale: 0.95}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.95}}
              transition={{duaration: 0.2}}
              className="flex flex-1 items-center space-x-2"
              >
              <span className={`flex-1 truncate ${todo.completed ? "line-through text-gray-500": ""}`}>
                {todo.text}
              </span>
              <div className="flex items-center space-x-2 ml-2">
                <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(todo)}
                    >
                        ✏️
                </Button>
                <Button 
                variant="ghost" 
                onClick={() => handleDelete(todo.id)}
                className=" hover:bg-red-600"
                size="sm"
                >
                  🗑️
                </Button>
              </div>
              </motion.div>
            )}
            </AnimatePresence>
            </div>
          </motion.li>
          ))
          )}
        </AnimatePresence>
        </ul>
        {/* Clear Completed Button */}
        {filter === "completed" && filteredTodos.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() =>
              setTodos((prev) => prev.filter((t) => !t.completed))
            }
            className="text-sm text-red-500 hover:underline"
          >
            Clear Completed
          </button>
        </div>
        )}
    </>
  );
});
