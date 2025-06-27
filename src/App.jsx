
import "./App.css";
import { useState, useCallback ,useEffect,useRef} from "react";
import React from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pass, setPass] = useState("");

  const passwordGenerator = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numAllowed) chars += "0123456789";
    if (charAllowed) chars += "!@#$%^&*()_+[]{}<>?/";

    let password = "";

    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length + 1);
      password += chars.charAt(randomIndex);
    }
    setPass(password);
  }, [numAllowed, charAllowed, setPass, length]);

  useEffect(()=>{
    passwordGenerator();
  },[length,charAllowed,numAllowed,setPass])

  const refbutton=useRef(null);

  const copyPassWord=useCallback(()=>{
    refbutton.current?.select()
    window.navigator.clipboard.writeText(pass)
  },[pass])

const change=()=>{
  
 passwordGenerator()
}

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
      <main className="bg-white text-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700">
          Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-6 space-y-2 sm:space-y-0">
          <input
            type="text"
            value={pass}
            readOnly
            ref={refbutton}
            className="flex-1 px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            placeholder="Generated password"
          />
          <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" onClick={copyPassWord} >
            Copy
          </button>
          <button className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition" onClick={change}>
            🔄 Refresh
          </button>
        </div>

        {/* Length Slider */}
        <div className="mb-6">
          <label
            htmlFor="length"
            className="block mb-1 font-semibold text-gray-700"
          >
            Password Length: ({length})
          </label>
          <input
            type="range"
            name="length"
            id="length"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setlength(e.target.value)}
            className="w-full accent-blue-600"
          />
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <label className="inline-flex items-center text-gray-700 font-medium">
            <input
              type="checkbox"
              id="number"
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
              className="mr-2 accent-blue-600"
            />
            Include Numbers
          </label>
          <label className="inline-flex items-center text-gray-700 font-medium">
            <input
              type="checkbox"
              id="character"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              className="mr-2 accent-blue-600"
            />
            Include Special Characters
          </label>
        </div>
      </main>
    </div>
  );
}

export default App;
