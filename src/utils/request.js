import axios from 'axios'
import { Toast } from 'antd-mobile'
import { getTokenInfo } from './storage'
const instance = axios.create({
  timeout: 3000,
  baseURL: 'http://geek.itheima.net/v1_0',
})

instance.interceptors.request.use(
  (config) => {
    //获取token
    const token = getTokenInfo().token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    if (error.response) {
      Toast.show({
        icon: 'success',
        content: error.response.data.message,
      })
    } else {
      Toast.show({
        icon: 'loading',
        content: 'server busy',
      })
    }
    return Promise.reject(error)
  }
)
export default instance
