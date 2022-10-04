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
//按需加载
// const Login = React.lazy(() => {
//   import('./pages/Login')
// })
// const Home = React.lazy(() => {
//   import('./pages/Home')
// })
export default function App() {
  return (
    <Router>
      <div className="app">
        {/* <Link to="./login">login</Link>
        <Link to="./home">home</Link> */}
        {/* <Suspense fallback={<div>loading</div>}> */}
        <Switch>
          {/* 组件加载中，显示loading */}

          <Redirect exact from="/" to="/home"></Redirect>
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/profile/edit" component={ProfileEdit}></Route>
          <Route path="/profile/chat" component={ProfileChat}></Route>
        </Switch>
        {/* </Suspense> */}
      </div>
    </Router>
  )
}
