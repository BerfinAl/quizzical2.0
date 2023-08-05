function Question({ question, answerElements }) {


  return (
    <div className="question-wrapper">
      <h2 className="question">{question}</h2>
      <ul>{answerElements}</ul>
    </div>
  );
}

export default Question;

