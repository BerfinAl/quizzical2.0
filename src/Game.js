// import React, { useState, useEffect } from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { decode } from "he";

// import Question from "./Question";

// import { getQuestion } from "./utils";

// function Game() {
//   const navigate = useNavigate();
//   const [question, setQuestion] = useState();
//   const [correctAnswer, setcorrectAnswer] = useState();
//   const [answers, setAnswers] = useState();
//   const [isLoading, setIsLoading] = useState(false);
//   const [err, setErr] = useState(null);
//   const [turn, setTurn] = useState(1);
//   const [totalTurns, setTotalTurns] = useState([1, 2, 3, 4, 5]);

//   function shuffle(data) {
//     const num = Math.floor(Math.random() * 4 + 1);
//     const arr = data.incorrect_answers;
//     arr.splice(num, 0, data.correct_answer);
//     return arr;
//   }

//   function decodeData(str) {
//     return decode(str);
//   }

//   function fetchQuestionData() {
//     setIsLoading(true);
//     getQuestion()
//       .then((data) => {
//         setQuestion(decodeData(data.question));
//         setcorrectAnswer(data.correct_answer);
//         setAnswers(shuffle(data));
//       })
//       .catch((err) => {
//         setErr(err);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }

//   useEffect(() => {
//     fetchQuestionData();
//   }, []);

//   function handleClick(answer) {
//     if (answer === correctAnswer) {
//       if (turn < totalTurns) {
//         fetchQuestionData();
//         setTurn((prev) => prev + 1);
//       } else {
//         navigate("/gameover", { state: true, replace: true });
//       }
//     } else {
//       navigate("/gameover", { state: false, replace: true });
//     }
//   }

//   const turnElements = totalTurns.map((turnEl , i) => {
//     return (<span className={turnEl === turn ? "current-turn turn-span" : "turn-span" } key={i}> {turnEl} </span>);
//   });

//   const answerElements =
//     answers &&
//     answers.map((answer, i) => {
//       return (
//         <li className={answer === correctAnswer ? "green" : ""} key={i}>
//           <Link onClick={() => handleClick(answer)}>{decodeData(answer)} </Link>
//         </li>
//       );
//     });

//   return (
//     <>
//       {!isLoading ? (
//         <>
//           <div className="turns-wrapper"> {turnElements} </div>
//           <Question
//             question={question}
//             answerElements={answerElements}
//             handleClick={handleClick}
//           />
//         </>
//       ) : (
//         <h1>Loading...</h1>
//       )}
//     </>
//   );
// }

// export default Game;

import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { decode } from "he";

import Question from "./Question";
import { getQuestion } from "./utils";

function Game() {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState({
    question: "",
    correctAnswer: "",
    answers: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [turn, setTurn] = useState(1);
  const totalTurns = 5;

  // Function to shuffle the answers
  function shuffle(data) {
    const num = Math.floor(Math.random() * 4 + 1);
    const arr = data.incorrect_answers.slice();
    arr.splice(num, 0, data.correct_answer);
    return arr;
  }

  // Function to decode the question and answers
  function decodeData(str) {
    return decode(str);
  }

  // Function to fetch a new question
  function fetchQuestionData() {
    setIsLoading(true);
    getQuestion()
      .then((data) => {
        setQuestionData({
          question: decodeData(data.question),
          correctAnswer: data.correct_answer,
          answers: shuffle(data),
        });
      })
      .catch((err) => {
        setErr(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Function to handle answer click
  function handleClick(answer) {
    const { correctAnswer } = questionData;
    if (answer === correctAnswer) {
      if (turn < totalTurns) {
        fetchQuestionData();
        setTurn((prev) => prev + 1);
      } else {
        navigate("/gameover", { state: true, replace: true });
      }
    } else {
      navigate("/gameover", { state: false, replace: true });
    }
  }

  useEffect(() => {
    fetchQuestionData();
  }, []);

  const { question, answers } = questionData;

  // Generate the turn elements using .map()
  const turnElements = Array.from(
    { length: totalTurns },
    (_, index) => index + 1
  ).map((turnEl) => (
    <span
      className={turnEl === turn ? "current-turn turn-span" : "turn-span"}
      key={turnEl}
    >
      {turnEl}
    </span>
  ));

  const answerElements =
    answers &&
    answers.map((answer, i) => (
      <li
        className={answer === questionData.correctAnswer ? "correct" : ""}
        key={i}
        onClick={() => handleClick(answer)}
      >
        {decodeData(answer)}
      </li>
    ));

  return (
    <div className="game-wrapper">
      {!isLoading ? (
        <>
          <div className="turns-wrapper">{turnElements}</div>
          <Question
            question={question}
            answerElements={answerElements}
            handleClick={handleClick}
          />
        </>
      ) : (
        <div className="loading-img-wrapper">
          <img src="assets/loading.gif" />
        </div>
      )}
    </div>
  );
}

export default Game;
