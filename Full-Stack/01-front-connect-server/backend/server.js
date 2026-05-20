import express from "express";

const app = express();

// get a list of 5 objects

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "A Joke",
      content: "This is a joke",
    },
    {
      id: 2,
      title: "Programmer Joke",
      content:
        "Why do programmers prefer dark mode? Because light attracts bugs!",
    },
    {
      id: 3,
      title: "Math Joke",
      content: "Why was the math book sad? Because it had too many problems.",
    },
    {
      id: 4,
      title: "Computer Joke",
      content:
        "Why did the computer go to therapy? It had too many bytes of emotional damage.",
    },
    {
      id: 5,
      title: "Internet Joke",
      content:
        "I told my WiFi we needed a break. Now it won’t connect with me anymore.",
    },
  ];
  res.send(jokes);
});

const port = process.env.PORT || 3000;
const hostname = "localhost";

app.listen(port, hostname, () => {
  console.log(`server running: http://${hostname}:${port}`);
});
