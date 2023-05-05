import React, { useContext, useState } from "react";
import Todo from "./Todo";
import { ThemeContext } from "../Context";
import { AnimatePresence, motion } from "framer-motion";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Todos = () => {
  const { todosList, ClearCompleted, setTodos } = useContext(ThemeContext);
  const [tab, setTab] = useState("All");

  const [filteredTodos, setFilteredTodos] = useState(
    todosList.filter((item) => !item.completed)
  );

  const [filteredTodos1, setFilteredTodos1] = useState(
    todosList.filter((item) => item.completed)
  );

  function handleDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(todosList);
    const [removedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removedItem);

    setTodos(newItems);
    setFilteredTodos(newItems.filter((item) => !item.completed));
    setFilteredTodos1(newItems.filter((item) => item.completed));
  }

  const uncompletedTodos = todosList.filter((todo) => !todo.completed);
  const completedTodos = todosList.filter((todo) => todo.completed);
  return (
    <>
      <div className="mt-6 bg-white shadow-2xl rounded-md dark:bg-[#25273c]">
        <DragDropContext onDragEnd={handleDragEnd}>
          {tab === "All" && (
            <div className="bg-white pt-1 rounded-md dark:bg-[#25273c]">
              {todosList.length === 0 && (
                <h4 className="text-center py-5 border-b-[1px] dark:border-[#4d50668b] border-[#9ba2dd51] text-2xl dark:text-[#cacde8] text-[#4d5066]">
                  No work to do!
                </h4>
              )}
              <Droppable droppableId="array">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <AnimatePresence>
                      {todosList.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <motion.div
                              initial={{ opacity: 0, y: -50 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 50 }}
                            >
                              <Todo
                                id={item.id}
                                index={index}
                                isCompleted={item.completed}
                                todo_name={item.todo_name}
                                provided={provided}
                                snapshot={snapshot}
                              />
                            </motion.div>
                          )}
                        </Draggable>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </DragDropContext>
        {tab === "Active" && (
          <div className="bg-white rounded-md dark:bg-[#25273c]">
            {uncompletedTodos.length === 0 && (
              <h4 className="text-center py-5 border-b-[1px] dark:border-[#4d50668b] border-[#9ba2dd51] text-2xl dark:text-[#cacde8] text-[#4d5066]">
                No work to do!
              </h4>
            )}

            <AnimatePresence>
              {todosList
                .filter((item) => !item.completed)
                .map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                  >
                    <Todo
                      id={item.id}
                      index={index}
                      isCompleted={item.completed}
                      todo_name={item.todo_name}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        )}

        {tab === "Completed" && (
          <div className="bg-white rounded-md dark:bg-[#25273c]">
            {completedTodos.length === 0 && (
              <h4 className="text-center py-5 border-b-[1px] dark:border-[#4d50668b] border-[#9ba2dd51] text-2xl dark:text-[#cacde8] text-[#4d5066]">
                No work has done!
              </h4>
            )}
            <AnimatePresence>
              {todosList
                .filter((item) => item.completed)
                .map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                  >
                    <Todo
                      id={item.id}
                      index={index}
                      isCompleted={item.completed}
                      todo_name={item.todo_name}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        )}

        <div className="py-4 px-6 flex justify-between items-center w-full dark:text-[#4d5066] text-[#41435c63]">
          <p>{uncompletedTodos.length} items left</p>

          <div className="sm:flex hidden items-center font-semibold gap-5 justify-between">
            <div
              onClick={() => setTab("All")}
              className={`cursor-pointer ${
                tab === "All" ? " text-indigo-500" : ""
              }`}
            >
              All
            </div>
            <div
              onClick={() => setTab("Active")}
              className={`cursor-pointer ${
                tab === "Active" ? " text-indigo-500" : ""
              }`}
            >
              Active
            </div>
            <div
              onClick={() => setTab("Completed")}
              className={`cursor-pointer ${
                tab === "Completed" ? " text-indigo-500" : ""
              }`}
            >
              Completed
            </div>
          </div>

          <div
            onClick={ClearCompleted}
            className="hover:text-indigo-500 cursor-pointer"
          >
            Clear Completed
          </div>
        </div>
      </div>

      <div className="sm:hidden p-4 mt-5 bg-white shadow-2xl rounded-md dark:text-[#4d5066] text-[#41435c63] dark:bg-[#25273c] flex items-center font-semibold gap-5 justify-center">
        <div
          onClick={() => setTab("All")}
          className={`cursor-pointer ${
            tab === "All" ? " text-indigo-500" : ""
          }`}
        >
          All
        </div>
        <div
          onClick={() => setTab("Active")}
          className={`cursor-pointer ${
            tab === "Active" ? " text-indigo-500" : ""
          }`}
        >
          Active
        </div>
        <div
          onClick={() => setTab("Completed")}
          className={`cursor-pointer ${
            tab === "Completed" ? " text-indigo-500" : ""
          }`}
        >
          Completed
        </div>
      </div>

      <h5 className="text-center text-base mt-14 dark:text-[#4d5066] text-[#41435c63] font-semibold">
        Drag and drop to reorder list (For All only)
      </h5>
    </>
  );
};

export default Todos;
