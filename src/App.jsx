import { useContext, useEffect, useState } from "react";
import "./App.css";
import { ThemeContext } from "./Context";
import Header from "./components/Header";
import Input from "./components/Input";
import Todos from "./components/Todos";
import { Toaster } from "react-hot-toast";

function App() {
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.body.setAttribute(
        "style",
        "background-color: hsl(235, 21%, 11%);"
      );
    } else {
      document.body.setAttribute(
        "style",
        "background-color: hsl(0, 0%, 98%);  "
      );
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("class", theme);
  }, [theme]);

  return (
    <div className="container max-w-xl px-4 mx-auto">
      {theme === "dark" ? (
        <img
          className="absolute sm:block hidden top-0 left-0 w-full -z-50"
          src="/images/bg-desktop-dark.jpg"
          alt="image"
        />
      ) : (
        <img
          className="absolute sm:block hidden top-0 left-0 w-full -z-50"
          src="/images/bg-desktop-light.jpg"
          alt="image"
        />
      )}

      {theme === "dark" ? (
        <img
          className="absolute sm:hidden block top-0 left-0 w-full -z-50"
          src="/images/bg-mobile-dark.jpg"
          alt="image"
        />
      ) : (
        <img
          className="absolute sm:hidden block top-0 left-0 w-full -z-50"
          src="/images/bg-mobile-light.jpg"
          alt="image"
        />
      )}
      <Toaster 
        position="bottom-right"
        reverseOrder={false} 
      />
      <Header />
      <Input />
      <Todos />
    </div>
  );
}

export default App;
