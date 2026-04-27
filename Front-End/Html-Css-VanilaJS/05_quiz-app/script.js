document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById("question-container")
    const questionText = document.getElementById("question-text")
    const choicesList = document.getElementById("choices-list")
    const nextBtn = document.getElementById("next-btn")
    const resultContainer = document.getElementById("result-container")
    const scoreDisplay = document.getElementById("score")
    const restartBtn = document.getElementById("restart-btn")
    const startBtn = document.getElementById("start-btn")
    
    const questions = [
  {
    question: "Which of the following data structures operates on the principle of Last-In, First-Out (LIFO)?",
    choices: [
      "Queue",
      "Stack",
      "Linked List",
      "Hash Map"
    ],
    answer: "Stack"
  },
  {
    question: "What is the worst-case time complexity for searching an element in a balanced Binary Search Tree (BST)?",
    choices: [
      "(n)",
      "(1)",
      "(n^2)",
      "(log n)"
    ],
    answer: "(log n)"
  },
  {
    question: "In Object-Oriented Programming (OOP), the mechanism that allows a function or operator to exhibit different behaviors based on the context (like different parameters or class) is known as:",
    choices: [
      "Inheritance",
      "Encapsulation",
      "Abstraction",
      "Polymorphism"
    ],
    answer: "Polymorphism"
  },
  // {
  //   question: "Which sorting algorithm typically has the best average-case performance and is often chosen for large datasets due to its divide-and-conquer approach?",
  //   choices: [
  //     "Bubble Sort",
  //     "Insertion Sort",
  //     "Merge Sort",
  //     "Selection Sort"
  //   ],
  //   answer: "Merge Sort"
  // },
  // {
  //   question: "What is the primary difference between a 'list' and a 'tuple' in Python?",
  //   choices: [
  //     "Lists store homogeneous data, tuples store heterogeneous data.",
  //     "Lists are immutable, tuples are mutable.",
  //     "Lists are mutable, tuples are immutable.",
  //     "Lists can store only 10 elements, tuples can store unlimited elements."
  //   ],
  //   answer: "Lists are mutable, tuples are immutable."
  // }

]
    let currentQIndex = 0;
    let score = 0;

    startBtn.addEventListener("click", startQuiz);

    nextBtn.addEventListener('click', () => {
      currentQIndex++
      if (currentQIndex < questions.length) {
        showQuestion()
      }
      else {
        showResult()
      }
    })

    restartBtn.addEventListener('click', () => {
      currentQIndex = 0
      score = 0

      startQuiz()
    })

    function startQuiz() {
      startBtn.classList.add('hidden')
      questionContainer.classList.remove('hidden')
      showQuestion()
    }

    function showQuestion() {
      nextBtn.classList.add('hidden')
      resultContainer.classList.add('hidden')
      questionText.textContent = questions[currentQIndex].question
      choicesList.innerHTML = ""; //clear previous choices
      questions[currentQIndex].choices.forEach(choice => {
        const li = document.createElement('li')
        li.textContent = choice;
        li.addEventListener("click", () => {
          selectAnswer(choice);
        })
        choicesList.appendChild(li)
      })
    }

    function selectAnswer(choice){
      const correctAnswer = questions[currentQIndex].answer
      if (choice === correctAnswer) {
        score++
      }
      nextBtn.classList.remove('hidden')
    }

    function showResult () {
      resultContainer.classList.remove('hidden')
      questionContainer.classList.add('hidden')
      scoreDisplay.textContent = `${score} out of ${questions.length}`
    }   
    
})