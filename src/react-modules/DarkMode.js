import { useState } from "react";

function DarkModeToggle({darkMode, toggleDarkMode}) {

    return (
        <>
        <div className="">
        <img onClick={toggleDarkMode} className="w-12" 
            src={darkMode ? "./images/_dark-mode-toggle-icon.svg" : "./images/_light-mode-toggle-icon.svg"} 
            alt={darkMode ? "Turn off dark mode" : " Turn on dark mode"}/>
        </div>
            
      </>
      )
}

export { DarkModeToggle }
