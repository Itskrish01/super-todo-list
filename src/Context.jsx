import React, { createContext, useState } from "react";
import { toast } from "react-hot-toast";

export const ThemeContext = createContext();

const todos = [
  {
    id: 1,
    todo_name: "Eat food",
    completed: true,
  },
  {
    id: 2,
    todo_name: "Write a line of code",
    completed: false,
  },
  {
    id: 3,
    todo_name: "Get started with this app",
    completed: false,
  },
  {
    id: 4,
    todo_name: "Go outside",
    completed: false,
  },
];

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("");
  const [todosList, setTodos] = useState(todos);

  const AddTodo = (item) => {
    if(item.todo_name === ""){
      toast.error("Invalid input!", {
        style: {
          borderRadius: "10px",
          background: theme === "dark" ? "#25273c" : "white",
          color: theme === "dark" ? "#cacde8" : "#4d5066"

        }
      })
      return
    }
    setTodos([item, ...todosList ]);
  };

  const ClearCompleted = () => {
    const newState = todosList.filter(todo => !todo.completed);
    setTodos(newState)
  }

  const DeleteTodo = async (todoId) => {
    const newState = todosList.filter((item) => item.id !== todoId);
    setTodos(newState);
    setTimeout(() => {
      toast.success("Success Deleted the todo.",
      {
        style: {
          borderRadius: "10px",
          background: theme === "dark" ? "#25273c" : "white",
          color: theme === "dark" ? "#cacde8" : "#4d5066"

        }
      } 
      )
    }, 500)
  }

  const SetCompleted = (todoid, checked) => {
    const updatedArray = todosList.map((item) => {
      if (item.id === todoid) {
        return {
          ...item,
          completed: checked,
        };
      }
      return item;
    });
    setTodos(updatedArray)
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const themes = {
    theme,
    toggleTheme,
    setTheme,
    todosList,
    AddTodo,
    DeleteTodo,
    SetCompleted,
    ClearCompleted
  };

  return (
    <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
