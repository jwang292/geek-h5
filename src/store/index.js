import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import { getTokenInfo } from '../utils/storage'
//参数1 reducer
//参数2 store初始值
//参数3 指定中间件
const store = createStore(
  reducer,
  { login: getTokenInfo() },
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
