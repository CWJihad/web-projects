import React, { useState } from "react";
import note from "./assets/note.png";
import { X } from "lucide-react";

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("Empty Notes");

  const [task, setTask] = useState([]);

  return (
    <div className="h-screen overflow-auto  border-amber-500 lg:flex bg-gray-800 text-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const newTask = [...task];
          newTask.push({ title, description });

          setTask(newTask);
          
          if (newTask != "") {
            setNote("Your Notes")
          }

          setTitle("");
          setDescription("");
        }}
        className="flex lg:w-1/2 flex-col gap-4 p-10 items-start"
      >
        {/* note title */}
        <input
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          value={title}
          placeholder="Enter note heading"
          className="border-2 w-full border-gray-500 rounded-lg px-5 py-2 outline-0"
        />

        {/* note description */}
        <textarea
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          type="text"
          placeholder="Write your note details........."
          className="border-2 h-35 w-full border-gray-500 rounded-lg px-5 py-2 outline-0"
        />
        <button className="bg-white cursor-pointer hover:bg-gray-200 active:scale-95 text-black px-5 py-2 mx-auto w-1/2 rounded-2xl font-bold">
          Add Note
        </button>
      </form>

      <div className="mx-5 lg:w-1/2 text-center lg:mt-7 overflow-auto no-scrollbar">
        <h1 className="text-3xl font-bold">{note}</h1>
        <div className="flex flex-wrap gap-5 justify-center mb-8 mt-5">
          {task.map(function (elem, idx) {
            return (
              <div
                key={idx}
                className="h-52 p-2 w-40 border-dashed border-2 border-gray-500 rounded-2xl bg-gray-700 shadow-2xl"
              >
                <div className="flex justify-between items-center">
                  <div className="h-6 w-6 font-semibold rounded-full bg-gray-900 text-gray-400 flex items-center justify-center">
                    <span className="text-xs">{idx + 1}</span>
                  </div>
                  <div onClick={() => {
                    const copyTask = [...task]
                    
                    copyTask.splice(idx, 1)
                    setTask(copyTask)
                    

                    if (copyTask.length === 0) {
                      setNote("Empty Notes")
                    }
                    
                  }} className="h-6 w-6 rounded-full bg-gray-900 text-gray-400 flex items-center justify-center hover:text-amber-600 cursor-pointer">
                    <X size={14} />{" "}
                  </div>
                </div>
                <h3 className="text-2xl mt-1 font-bold leading-tight border-b-2 text-gray-400">
                  {elem.title}
                </h3>
                <p className="leading-none mt-3 text-start text-gray-200">
                  {elem.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
