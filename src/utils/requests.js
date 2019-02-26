import wepy from 'wepy'
import { login } from '@/config'
import { Base64 } from 'js-base64'

function valid(token) {
  if (!token) {
    return false
  }
  let exp = JSON.parse(Base64.decode(token.split('.')[1], 'utf-8')).exp
  return exp > new Date().getTime() / 1000 - 10
}

function checkToken() {
  return new Promise((resolve, reject) => {
    let info = wepy.getStorageSync('account')
    if (!valid(info.token)) {
      wepy.login().then(res => {
        wepy
          .request({
            url: login,
            data: {
              code: res.code
            }
          })
          .then(d => {
            wepy.setStorageSync('account', d.data)
            resolve('OK')
          })
      })
    } else {
      resolve('OK')
    }
  })
}

const request = async ({ method, url, data, session, ...rest } = {}) => {
  await checkToken()
  let _headers = {
    'content-type': 'application/json',
    Authorization: await wepy.getStorageSync('account').token
  }
  if (session) {
    _headers['sid'] = await wepy.getStorageSync('account').sid
  }
  if (rest['headers']) {
    _headers = rest['headers']
  }
  if (rest['showLoading']) {
    wepy.showLoading({
      title: '加载中',
      mask: true
    })
  }
  return wepy
    .request({
      method: method,
      url: url,
      header: _headers,
      data: data
    })
    .then(res => {
      wepy.hideLoading()
      return res
    })
    .catch(err => {
      wepy.hideLoading()
      wepy.showToast({
        title: '请求失败',
        icon: 'none',
        duration: 2000
      })
      throw err
    })
}

export function get({ url, data = {}, session = false, ...rest } = {}) {
  return request({
    method: 'GET',
    url: url,
    data: data,
    session: session,
    ...rest
  })
}

export function post({ url, data = {}, session = false, ...rest } = {}) {
  return request({
    method: 'POST',
    url: url,
    data: data,
    session: session,
    ...rest
  })
}

export function put({ url, data = {}, session = false, ...rest } = {}) {
  return request({
    method: 'PUT',
    url: url,
    data: data,
    session: session,
    ...rest
  })
}

export function _delete({ url, data = {}, session = false, ...rest } = {}) {
  return request({
    method: 'DELETE',
    url: url,
    data: data,
    session: session,
    ...rest
  })
}

const requests = {
  get: get,
  post: post,
  put: put,
  delete: _delete
}

export default requests
