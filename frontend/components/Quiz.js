import React from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, selectAnswer, setMessage } from '../state/action-creators';

function Quiz(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    if(props.quiz.answers[0].answer_id === props.selected) {
      props.setMessage("Nice job! That was the correct answer");
    } else {
      props.setMessage("What a shame! That was the incorrect answer")
    }
    props.fetchQuiz();
    props.selectAnswer(null);
  }

  return (
    <div id="wrapper" key={props.quiz ? props.quiz.quiz_id : ""}>
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${props.quiz.answers[0].answer_id === props.selected ? "selected" : ""}`} key={props.quiz.answers[0].answer_id}>
                {props.quiz.answers[0].text}
                <button onClick={() => props.selectAnswer(props.quiz.answers[0].answer_id)}>
                  {props.quiz.answers[0].answer_id === props.selected ? "SELECTED" : "select"}
                </button>
              </div>

              <div className={`answer ${props.quiz.answers[1].answer_id === props.selected ? "selected" : ""}`} key={props.quiz.answers[1].answer_id}>
              {props.quiz.answers[1].text}
                <button onClick={() => props.selectAnswer(props.quiz.answers[1].answer_id)}>
                 {props.quiz.answers[1].answer_id === props.selected ? "SELECTED" : "select"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={handleSubmit} disabled={!props.selected}>Submit answer</button>
          </>
        ) : (
          <>
          {props.fetchQuiz()}
          Loading next question...
          </>
        )
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    selected: state.selectedAnswer,
  }
}

export default connect(mapStateToProps, {fetchQuiz, selectAnswer, setMessage})(Quiz);