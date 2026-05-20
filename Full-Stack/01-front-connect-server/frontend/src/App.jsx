import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((res) => {
        console.log(res);
        setJokes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(jokes);
    console.log('working');
    
  }, []);

  return (
    <div>
      <h1>Let's Connect front-end with back-end</h1>
      <p>JOKES: {jokes.length}</p>

      {jokes.map((joke) => {
        return (
          <div key={joke.id}>
            <h3>
              {joke.id}. {joke.title}
            </h3>
            <p>{joke.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
