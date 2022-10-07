import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch, //多个路由规则
  Redirect, //重镜像跳转
  // Link,
} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Layout'
import ProfileEdit from './pages/Profile/Edit'
import ProfileChat from './pages/Profile/Chat'
import AuthRoute from './componets/AuthRoute'
import history from './utils/history'
import NotFound from './pages/NotFound'
//按需加载
// const Login = React.lazy(() => {
//   import('./pages/Login')
// })
// const Home = React.lazy(() => {
//   import('./pages/Home')
// })
export default function App() {
  return (
    <Router history={history}>
      <div className="app">
        {/* <Link to="./login">login</Link>
        <Link to="./home">home</Link> */}
        {/* <Suspense fallback={<div>loading</div>}> */}
        <Switch>
          {/* 组件加载中，显示loading */}
          <Redirect exact from="/" to="/home"></Redirect>
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          {/* 需要登录才能访问 */}
          <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
          <AuthRoute path="/profile/chat" component={ProfileChat}></AuthRoute>
          {/* 不用写path这样前面路由都匹配不到就是404 会自动访问 */}
          <Route component={NotFound}></Route>
        </Switch>
        {/* </Suspense> */}
      </div>
    </Router>
  )
}
