import { useState } from "react";

function DarkModeToggle() {

    const [darkToggle, setDarkToggle] = useState(false)

    return (
        <>
      <div class={`h-screen w-full flex items-center justify-center bg-gray-300 flex-col ${darkToggle && 'dark'}`}>

      <label class="toggleDarkBtn">
        <input type="checkbox" onClick={() => setDarkToggle(!darkToggle)} />
        <span class="slideBtnTg round"></span>
      </label>
      </div>
      </>
      )
}

export { DarkModeToggle }
