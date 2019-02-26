import { handleActions } from 'redux-actions'
import { SET_AUTHOR, SET_BOOK, SET_STAR } from '../types/info'

export default handleActions(
  {
    [SET_AUTHOR](state, action) {
      return {
        ...state,
        author: action.payload
      }
    },
    [SET_BOOK](state, action) {
      return {
        ...state,
        book: action.payload
      }
    },
    [SET_STAR](state, action) {
      return {
        ...state,
        star: action.payload
      }
    }
  },
  {
    book: {},
    author: {},
    star: {}
  }
)
