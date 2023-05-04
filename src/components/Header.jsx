import React, { useContext } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { ThemeContext } from "../Context";

const Header = () => {
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-between text-white mt-10 sm:mt-24 tracking-[14px]">
      <h1 className="sm:text-4xl text-3xl font-semibold">TODO</h1>
      <div className=" cursor-pointer text-3xl" onClick={toggleTheme}>
        {theme === "dark" ? <FiSun /> : <FiMoon />}
      </div>
    </div>
  );
};

export default Header;
