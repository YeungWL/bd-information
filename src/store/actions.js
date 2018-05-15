import Cookies from 'js-cookie'
import * as types from './mutation-types'
import * as config from 'utils/config'

// 登录
export const Login = ({ commit }, userInfo) => {
  return new Promise((resolve, reject) => {
    console.log(userInfo)
    commit(types.SET_TOKEN, userInfo.password)
    commit(types.SET_USER, userInfo.user)
    Cookies.set(config.TOKEN, userInfo.password)
    Cookies.set(config.USER, userInfo.user)
    resolve()
  })
}

// 退出
export const Logout = ({ commit }) => {
  return new Promise(resolve => {
    Cookies.remove(config.TOKEN)
    Cookies.remove(config.USER)
    commit(types.SET_TOKEN, '')
    commit(types.SET_USER, '')
    resolve()
  })
}
