import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import React from "react";

function App() {
  const [length, setLength] = useState("6");
  const [numbers, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let createPassword = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) string += "0123456789";
    if (characters) string += "!@#$%^&*()_+-={}?`~/";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1);
      createPassword += string.charAt(char);
    }
    setPassword(createPassword);
  }, [length, numbers, characters, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, characters, passwordGenerator]);

  return (
    <>
      <div className="bg-white mx-20 my-20 px-20 py-10 text-center max-md:mx-4 max-md:px-5">
        <h1 className="text-black text-center text-4xl m-10 max-md:m-5">
          Password Generator
        </h1>
        <div className="bg-gray-600 px-4 py-10">
          <div className="rounded-lg max-md:px-4 px-20 max-md:mx-2 mx-20 mt-4 flex justify-evenly">
            <input
              type="text"
              name="password"
              placeholder="Password"
              readOnly
              value={password}
              className="w-full px-2 py-3 outline-none"
              ref={passwordRef}
            />
            <button
              className="bg-blue-600 rounded-e-lg px-8 py-3 outline-none text-white"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>
          <div className="flex flex-wrap text-lg gap-x-2 mt-10 items-center justify-center">
            <div className="flex items-center gap-x-2 flex-wrap">
              <input
                type="range"
                name="range"
                max={50}
                min={6}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  // console.log(e.target);
                  setLength(e.target.value);
                }}
              />
              <label htmlFor="range" className="m-4 text-white">
                Length : {length}
              </label>
            </div>

            <div className="flex items-center gap-x-2 flex-wrap">
              <input
                type="checkbox"
                name="numbers"
                defaultChecked={numbers}
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
              />
              <label htmlFor="Numbers" className="m-4 text-white">
                Numbers
              </label>
            </div>

            <div className="flex items-center gap-x-2 flex-wrap">
              <input
                type="checkbox"
                name="specialCharacters"
                defaultChecked={characters}
                onChange={() => {
                  setCharacters((prev) => !prev);
                }}
              />
              <label htmlFor="specialCharacters" className="m-4 text-white">
                Special Charcters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
