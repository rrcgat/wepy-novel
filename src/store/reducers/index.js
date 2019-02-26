import { combineReducers } from 'redux'
import chart from './chart'
import timeline from './timeline'
import info from './info'

export default combineReducers({
  chart,
  timeline,
  info
})
