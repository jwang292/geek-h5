import request from '../../utils/request'
import { removeTokenInfo, setTokenInfo } from '../../utils/storage'

export const sendCode = (mobile) => {
  //获取验证码不需要 保存数据，所以不用传dispatch
  return async () => {
    const res = await request({
      url: `/sms/codes/${mobile}`,
      method: 'GET',
    })
  }
}

export const saveToken = (payload) => {
  return {
    type: 'login/token',
    payload,
  }
}

/**
 * 登录
 * @param {*} data
 * @returns
 */
export const login = (data) => {
  return async (dispatch) => {
    const res = await request({
      method: 'post',
      url: '/authorizations',
      data,
    })
    //保存token到redux中
    dispatch(saveToken(res.data))
    //保存本地
    setTokenInfo(res.data)
  }
}

export const logout = () => {
  return (dispatch) => {
    removeTokenInfo()
    dispatch({
      type: 'login/logout',
    })
  }
}
