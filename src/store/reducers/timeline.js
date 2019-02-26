import { handleActions } from 'redux-actions'
import { SET_TIMELINE } from '../types/timeline'

export default handleActions(
  {
    [SET_TIMELINE](state, action) {
      return {
        ...state,
        timelines: action.payload
      }
    }
  },
  {
    timelines: []
  }
)
