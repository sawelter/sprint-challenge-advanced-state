// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTER_CLOCKWISE } from './action-types';
import { SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from "./action-types"
import { RESET_FORM, INPUT_CHANGE } from "./action-types"
import { SET_INFO_MESSAGE } from "./action-types"




// FORM //
const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type) {
    case INPUT_CHANGE:
      switch(action.payload.inputField) {
        case "question":
          return {
            ...state,
            newQuestion: action.payload.inputUpdate
          };
        case "trueAnswer":
          return {
            ...state,
            newTrueAnswer: action.payload.inputUpdate
          };
        case "falseAnswer":
          return {
            ...state,
            newFalseAnswer: action.payload.inputUpdate
          };
          return state;
      }
    case RESET_FORM:
      return initialFormState;
    default:
      return state;
  }
}



// DONE///////////////////////////////////////

// WHEEL //
const initialWheelState = 0
function wheel(state = initialWheelState, action) {  
  switch(action.type) {
    case MOVE_CLOCKWISE:
      return (state < 5 ? state + 1 : 0)
    case MOVE_COUNTER_CLOCKWISE:
      return (state > 0 ? state - 1 : 5 )
    default:
      return state;
  }
}


// QUIZ // 
const initialQuizState = null;
function quiz(state = initialQuizState, action) {
  switch(action.type){
    case SET_QUIZ_INTO_STATE:
      return action.payload;
    default: 
      return state;
  }
}


// MESSAGE //
const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type) {
    case SET_INFO_MESSAGE:
      return action.payload;
    default: 
      return state;
  }
}



// ALSO QUIZ // 
const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    case SET_SELECTED_ANSWER:
      return action.payload;
    default: 
      return state;
  }
}



export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
