import { handleActions } from 'redux-actions'
import { SET_BAR, SET_PIE } from '../types/chart'

export default handleActions(
  {
    [SET_BAR](state, action) {
      return {
        ...state,
        bar: action.payload
      }
    },
    [SET_PIE](state, action) {
      return {
        ...state,
        pie: action.payload
      }
    }
  },
  {
    bar: {},
    pie: {}
  }
)
