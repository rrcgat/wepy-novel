import wepy from 'wepy'

function save(value) {
  let history = wepy.getStorageSync('history') || []
  let index = history.indexOf(value)
  if (index !== -1) {
    history.splice(index, 1)
  }
  if (history.length > 10) {
    history.pop()
  }
  history.unshift(value)
  wepy.setStorageSync('history', history)
}

const history = {
  save: save
}

export default history
