import React, { useCallback, useEffect, useRef, useState } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passGen = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "@#$%^&*+_!";

    for (var i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPass = useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passRef = useRef(null)

  useEffect(()=>{passGen()}, [length, charAllowed, numAllowed, passGen])

  return (
    <>
      <div className="wrapper h-screen w-full bg-black text-white flex items-center justify-center flex-col gap-8">
        <h1 className="font-bold text-3xl">PASSWORD GENERATOR</h1>
        <div className="card h-[20vw] w-[25vw] bg-zinc-400 rounded-xl flex flex-col">
          <div className="inputDiv w-full h-10 mt-6 flex p-1 px-2 gap-2">
            <input
              type="text"
              readOnly
              value={password}
              className="outline-none w-full rounded-full px-2 text-black"
              placeholder="Password"
              ref={passRef}
            />
            <button 
            onClick={copyPass}
            className="px-4  bg-sky-500 text-white rounded-full">
              Copy
            </button>
          </div>
          <div className="dependencies flex flex-col gap-2 p-4">
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className="cursor-pointer w-[50%]"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label> length is : {length} </label>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="numberInput"
                defaultChecked={numAllowed}
                onChange={() => {
                  setNumAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers Allowed</label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="charInput"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="charInput">Character Allowed </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
