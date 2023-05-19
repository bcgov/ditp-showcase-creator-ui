function DarkModeToggle({darkMode, setDarkMode}) {

  function toggleDarkMode() {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }

    return (
        <>
        <div className="">
        <img onClick={toggleDarkMode} 
            className={`w-12 ${darkMode ? "filter invert" : "fill-black"}`} 
            src={darkMode ? "./images/_dark-mode-toggle-icon.svg" : "./images/_light-mode-toggle-icon.svg"} 
            alt={darkMode ? "Turn off dark mode" : " Turn on dark mode"}/>
        </div>
            
      </>
      )
}

export { DarkModeToggle }
