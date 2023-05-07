import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { ThemeContext } from "../Context";

const Input = () => {
  const { AddTodo } = useContext(ThemeContext);
  const unique_id = uuid();
  const [checked, setChecked] = useState(false);
  const [todoData, setTodoData] = useState({
    id: "",
    todo_name: "",
    completed: false,
  });

  const handleChange = (e) => {
    setTodoData({
      completed: checked,
      id: unique_id,
      todo_name: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AddTodo(todoData);

    setTodoData({
      completed: "",
      id: "",
      todo_name: "",
    });
  };

  return (
    <div className="mt-10 bg-white sm:px-5 sm:py-4 px-6 py-5 shadow-2xl rounded-md flex gap-6 items-center dark:bg-[#25273c]">
      <div className="checkbox-wrapper-18">
        <div className="round ">
          <input
            type="checkbox"
            onChange={(e) => setChecked(e.target.checked)}
            id="checkbox-18"
          />
          <label
            htmlFor="checkbox-18"
            className="dark:bg-[#2a2c43] border dark:border-[#cccccc43] border-[#13065a43] bg-white"
          ></label>
        </div>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <input
          className="sm:text-[18px] w-full text-base p-0 m-0 focus:outline-none bg-transparent dark:text-white text-[#25273c] placeholder:mt-0 placeholder:text-[#9394a5]"
          placeholder="Create a new todo..."
          onChange={handleChange}
          value={todoData.todo_name}
          type="text"
        />
      </form>
    </div>
  );
};

export default Input;
