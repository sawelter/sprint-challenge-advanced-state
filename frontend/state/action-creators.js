import { MOVE_CLOCKWISE, MOVE_COUNTER_CLOCKWISE } from "./action-types"
import { SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from "./action-types"
import { RESET_FORM, INPUT_CHANGE } from "./action-types"
import { SET_INFO_MESSAGE } from "./action-types"

import axios from "axios"


const API_URL = "http://localhost:9000/api/quiz/"


export function moveClockwise() {
  return{type:MOVE_CLOCKWISE}
}

export function moveCounterClockwise() { 
  return {type: MOVE_COUNTER_CLOCKWISE}
}


/*************************************
 *************************************
 ***************** QUIZ **************
 *************************************
 *************************************/
// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get(`${API_URL}next`)
      .then( res => {
        dispatch(setQuiz(res.data));
      })
      .catch(err => console.log(err))
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}

export function selectAnswer(answer) { 
  return {type:SET_SELECTED_ANSWER, payload:answer}
}

// ASYNC
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}



/*************************************
 *************************************
 ***************** FORM **************
 *************************************
 *************************************/
export function setQuiz(question) { 
  return {type: SET_QUIZ_INTO_STATE, payload:question }
}

export function inputChange(inputUpdate, inputField) {
  return {type: INPUT_CHANGE, payload:{inputUpdate, inputField}}
 }

export function resetForm() {
  return {type:RESET_FORM}
}

// async
export function postQuiz(quiz) {
  const toPost = {
    question_text: quiz.newQuestion,
    true_answer_text: quiz.newTrueAnswer,
    false_answer_text: quiz.newFalseAnswer,
  }
  return function (dispatch) {
    axios.post(`${API_URL}new`, toPost)
      .then(res => {
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`));
        dispatch(resetForm());
      })
      .catch(err => console.error(err))
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form    
  }
}





export function setMessage(message) { 
  return {type:SET_INFO_MESSAGE, payload:message}
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
