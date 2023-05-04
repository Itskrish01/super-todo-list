import React, { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { ThemeContext } from "../Context";

const Todo = ({ todo_name, isCompleted, id }) => {
  const {DeleteTodo, SetCompleted} = useContext(ThemeContext)
  return (
    <div className="border-[#9ba2dd51] rounded-t-md dark:border-[#4d50668b] border-b-[1px] bg-white px-5 py-5 flex justify-between items-center dark:bg-[#25273c]">
      <div className="flex gap-6 items-center sm:w-full w-[280px]">
        <div className="checkbox-wrapper-18">
          <div className="round ">
            <input
              type="checkbox"
              onChange={(e) => {
                SetCompleted(id, e.target.checked)
              }}
              defaultChecked={isCompleted}
              id={`checkbox-${id}`}
            />
            <label
              htmlFor={`checkbox-${id}`}
              className="dark:bg-[#2a2c43] border dark:border-[#cccccc43] border-[#13065a43] bg-white"
            ></label>
          </div>
        </div>
        <p
          className={`sm:text-[18px] text-base p-0 mt-1  ${
            isCompleted
              ? "text-[#41435c63] dark:text-[#cccccc43]"
              : "dark:text-[#cacde8] text-[#4d5066]"
          }`}
          style={{
            textDecoration: isCompleted ? "line-through" : "none",
          }}
        >
          {todo_name}
        </p>
      </div>
      <RxCross2 onClick={() => DeleteTodo(id)} className="dark:text-[#4d5066] text-[#41435c63] text-xl cursor-pointer hover:text-black/50 hover:dark:text-white/50" />
    </div>
  );
};

export default Todo;
