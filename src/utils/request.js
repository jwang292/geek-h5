import axios from 'axios'
import { Toast } from 'antd-mobile'
import { getTokenInfo, setTokenInfo } from './storage'
import { logout, saveToken } from '../store/actions/login'
import history from './history'
import { config } from 'antd-mobile/es/components/toast/methods'
import store from '../store'
const instance = axios.create({
  timeout: 5000,
  baseURL: 'http://geek.itheima.net/v1_0',
})

instance.interceptors.request.use((config) => {
  //获取token
  const token = getTokenInfo().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    // 因为网络问题，response没有，给予提示
    if (!error.response) {
      Toast.show({
        icon: 'loading',
        content: 'server busy',
      })
      return Promise.reject(error)
    }
    // 网络没问题返回数据，不是token失效
    if (error.response.status !== 401) {
      Toast.show({
        icon: 'success',
        content: error.response.data.message,
      })
      return Promise.reject(error)
    }
    //网络没问题，但是TOKEN失效
    //1.判断又没有刷新token
    const { token, refresh_token } = getTokenInfo()
    if (!refresh_token) {
      //没token
      //跳转登录页
      history.push({
        pathname: '/login',
        state: {
          from: history.location.pathname,
        },
      })
      return Promise.reject(error)
    }
    try {
      //是401错误，又刷新token，刷新token
      //尝试发请求，获取新token，注意:刷新token发送请求，不能使用封装的instance
      const res = await axios({
        method: 'put',
        url: 'http://geek.itheima.net/v1_0' + 'authorizations',
        headers: {
          Authorization: 'Bearer ' + refresh_token,
        },
      })
      //刷新token成功
      const tokenInfo = {
        token: res.data.data.token,
        refresh_token: refresh_token,
      }
      store.dispatch(saveToken(tokenInfo))
      setTokenInfo(tokenInfo)
      //token刷新成功后，要重新把最开始失败的请求再发一次
      return instance(config)
    } catch {
      //刷新token失败
      store.dispatch(logout())
      //跳转登录页
      history.push({
        pathname: '/login',
        state: {
          from: history.location.pathname,
        },
      })
      return Promise.reject(error)
    }
  }
)

export default instance
