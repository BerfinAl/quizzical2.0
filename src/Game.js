import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { decode } from "he";

import Question from "./Question";

import { getQuestion } from "./utils";

function Game() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState();
  const [correctAnswer, setcorrectAnswer] = useState();
  const [answers, setAnswers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [turn, setTurn] = useState(1);

  function shuffle(data) {
    const num = Math.floor(Math.random() * 4 + 1);
    const arr = data.incorrect_answers;
    arr.splice(num, 0, data.correct_answer);
    return arr;
  }

  function decodeData(str) {
    return decode(str);
  }

  function fetchQuestionData() {
    setIsLoading(true);
    getQuestion()
      .then((data) => {
        setQuestion(decodeData(data.question));
        setcorrectAnswer(data.correct_answer);
        setAnswers(shuffle(data));
      })
      .catch((err) => {
        setErr(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchQuestionData();
  }, []);

  function handleClick(answer) {
    if (answer === correctAnswer) {
      if (turn < 5) {
        fetchQuestionData();
        setTurn((prev) => prev + 1);
      } else {
        navigate("/gameover", { state: true, replace: true });
      }
    } else {
        navigate("/gameover", { state:false, replace: true });
    }
  }

  const answerElements =
    answers &&
    answers.map((answer, i) => {
      return (
        <li className={answer === correctAnswer ? "green" : ""} key={i}>
          <Link onClick={() => handleClick(answer)}>{decodeData(answer)} </Link>
        </li>
      );
    });

  return (
    <>
      {!isLoading ? (
        <>
          <h1 style={{ border: "5px solid red", color: "white" }}>{turn}</h1>
          <Question
            question={question}
            answerElements={answerElements}
            handleClick={handleClick}
          />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default Game;
