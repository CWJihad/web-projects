import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [len, setLen] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(0);
  const [bgChange, setBgChange] = useState('blue');

  // useRef hook
  const passRef = useRef(null)
  
  // useCallback hook
  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) str += "0123456789";
    if (charAllow) str += "~!@#$&";

    for (let i = 1; i <= len; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [len, numAllow, charAllow, setPassword]);

  const copyPassword = useCallback(() => {

    passRef.current?.select()
    // passRef.current?.setSelectionRange(0,3)
    
    window.navigator.clipboard.writeText(password)
 
    setShow(1),
    setBgChange('darkblue')
    setTimeout(() => {
      setShow(0),
      setBgChange('blue')
    }, 1000);

  }, [password])
  
  // useEffect hook
  useEffect(() => {
    passwordGen()
  }, [len, numAllow, charAllow])

  return (
    <div className="h-screen bg-gray-900 p-10">
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-8 py-3 bg-gray-700 text-white">

        <h1 className="text-white text-2xl font-bold text-center m-2">Password Generator</h1>

        <div className="flex relative shadow rounded-lg mb-4">

          <input
            className="outline-none rounded-l-lg text-orange-500 bg-white w-full py-1 px-3"
            readOnly
            value={password}
            placeholder="Password"
            type="text"
            ref={passRef}
          />

  

          <button
          onClick={copyPassword}
          className="text-white rounded-r-lg font-semibold px-3 py-0.5 shrink-0 text-sm cursor-pointer"
          style={{background: bgChange}}
          >Copy
          </button>
          <label htmlFor="" className="absolute right-0 bottom-10 " style={{opacity: show}}>Copied!</label>

      
          
        </div>

        <div className="flex text-sm flex-wrap justify-evenly">
          <div className="flex items-center gap-x-1">
            <input
            className="cursor-pointer"
            min={6}
            max={20}
            value={len}
            type="range" 
            onChange={(e) => {setLen(e.target.value)}}
            />
            <label className="font-semibold">Length: {len}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
            className="cursor-pointer"
            defaultChecked={numAllow}
            id="numInput"
            type="checkbox"
            onChange={() => {
              setNumAllow((prev) => !prev) // we got previous value
            }}
            />
            <label className="font-semibold">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
            className="cursor-pointer"
            defaultChecked={charAllow}
            id="charInput"
            type="checkbox"
            onChange={() => {
              setCharAllow((prev) => !prev)
            }}
            />
            <label className="font-semibold">Character</label>
          </div>

        </div>

      </div>
    </div>
  );
};

export default App;
