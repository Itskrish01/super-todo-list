import React, { useContext, useState } from "react";
import Todo from "./Todo";
import { ThemeContext } from "../Context";
import { AnimatePresence, motion } from "framer-motion";

const Todos = () => {
  const { todosList, ClearCompleted } = useContext(ThemeContext);
  const [tab, setTab] = useState('All')

  const uncompletedTodos = todosList.filter(todo => !todo.completed);
  const completedTodos = todosList.filter(todo => todo.completed);
  return (
    <>
      <div className="mt-6 bg-white shadow-2xl rounded-md dark:bg-[#25273c]">
        {tab === "All" && <div className="bg-white rounded-md dark:bg-[#25273c]">
          {todosList.length === 0 && <h4 className="text-center py-5 border-b-[1px] dark:border-[#4d50668b] border-[#9ba2dd51] text-2xl dark:text-[#cacde8] text-[#4d5066]">No work to do!</h4> }
            <AnimatePresence>
              {todosList.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                >
                  <Todo 
                    id={item.id}
                    isCompleted={item.completed}
                    todo_name={item.todo_name}
                  />
                </motion.div>
              ))}
           </AnimatePresence>
        </div>}

        {tab === "Active" && <div className="bg-white rounded-md dark:bg-[#25273c]">
          {uncompletedTodos.length === 0 && <h4 className="text-center py-5 border-b-[1px] dark:border-[#4d50668b] border-[#9ba2dd51] text-2xl dark:text-[#cacde8] text-[#4d5066]">No active work to do!</h4> }
            <AnimatePresence>
              {todosList.filter(todo => !todo.completed).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                >
                  <Todo 
                    id={item.id}
                    isCompleted={item.completed}
                    todo_name={item.todo_name}
                  />
                </motion.div>
              ))}
           </AnimatePresence>
        </div>}

        {tab === "Completed" && <div className="bg-white rounded-md dark:bg-[#25273c]">
          {completedTodos.length === 0 && <h4 className="text-center py-5 border-b-[1px] dark:border-[#4d50668b] border-[#9ba2dd51] text-2xl dark:text-[#cacde8] text-[#4d5066]">No work completed!</h4> }
            <AnimatePresence>
              {todosList.filter(todo => todo.completed).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                >
                  <Todo 
                    id={item.id}
                    isCompleted={item.completed}
                    todo_name={item.todo_name}
                  />
                </motion.div>
              ))}
           </AnimatePresence>
        </div>}
        
        <div className="py-4 px-6 flex justify-between items-center w-full dark:text-[#4d5066] text-[#41435c63]">
          <p>{uncompletedTodos.length} items left</p>

          <div className="sm:flex hidden items-center font-semibold gap-5 justify-between">
            <div onClick={() => setTab("All")} className={`cursor-pointer ${tab === "All" ? " text-indigo-500": ""}`}>All</div>
            <div onClick={() => setTab("Active")} className={`cursor-pointer ${tab === "Active" ? " text-indigo-500": ""}`}>Active</div>
            <div onClick={() => setTab("Completed")} className={`cursor-pointer ${tab === "Completed" ? " text-indigo-500": ""}`}>Completed</div>
          </div>

          <div onClick={ClearCompleted} className="hover:text-indigo-500 cursor-pointer">Clear Completed</div>
        </div>
      </div>
      <div className="sm:hidden p-4 mt-5 bg-white shadow-2xl rounded-md dark:text-[#4d5066] text-[#41435c63] dark:bg-[#25273c] flex items-center font-semibold gap-5 justify-center">
        <div onClick={() => setTab("All")} className={`cursor-pointer ${tab === "All" ? " text-indigo-500": ""}`}>All</div>
        <div onClick={() => setTab("Active")} className={`cursor-pointer ${tab === "Active" ? " text-indigo-500": ""}`}>Active</div>
        <div onClick={() => setTab("Completed")} className={`cursor-pointer ${tab === "Completed" ? " text-indigo-500": ""}`}>Completed</div>
      </div>
    </>
  );
};

export default Todos;
