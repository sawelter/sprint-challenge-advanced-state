import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import { setMessage, postQuiz, inputChange, resetForm } from '../state/action-creators'

export function Form(props) {

  const onChange = (evt, inputField) => {
    const { value } = evt.target;
    props.inputChange(value, inputField);
  }

  const onSubmit = evt => {
    evt.preventDefault();
    // props.setMessage(`Congrats: "${props.form.newQuestion}" is a great question!`);
    props.postQuiz(props.form)
    props.resetForm();
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input 
        maxLength={50} 
        value={props.form.newQuestion}
        onChange={(e) => onChange(e, "question")} 
        id="newQuestion" 
        placeholder="Enter question" 
      
      />
      <input 
        maxLength={50} 
        onChange={(e) => onChange(e, "trueAnswer")} 
        id="newTrueAnswer" 
        placeholder="Enter true answer"
        value={props.form.newTrueAnswer}
      />
      <input 
        maxLength={50} 
        onChange={(e) => onChange(e, "falseAnswer")} 
        id="newFalseAnswer" 
        placeholder="Enter false answer" 
        value={props.form.newFalseAnswer}
      />
      <button id="submitNewQuizBtn" disabled={!props.form.newQuestion.trim().length > 0 || !props.form.newTrueAnswer.trim().length > 0 || !props.form.newFalseAnswer.trim().length > 0}>Submit new quiz</button>
    </form>
  )
}


export default connect(st => st, actionCreators)(Form)
