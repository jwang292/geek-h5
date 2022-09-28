import React from 'react'
import styles from './index.module.scss'
import Icon from '../../componets/Icon'
import { useHistory, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/index'
import QA from '../QA/index'
import Video from '../Video/index'
import Profile from '../Profile/index'

export default function Layout() {
  const tabBar = [
    { title: 'home', icon: 'iconbtn_home', path: '/home' },
    { title: 'Q&A', icon: 'iconbtn_qa', path: '/home/qa' },
    { title: 'video', icon: 'iconbtn_video', path: '/home/video' },
    { title: 'profile', icon: 'iconbtn_mine', path: '/home/profile' },
  ]
  const history = useHistory()
  const location = useLocation()
  return (
    <div className={styles.root}>
      {/* 点击按钮切换显示内容 */}
      <div className="tab-content">
        {/* 配置2级路由 */}
        <Switch>
          {/* exact 否则全部匹配到home 不跳转了 */}
          <Route path="/home" exact component={Home}></Route>
          <Route path="/home/qa" component={QA}></Route>
          <Route path="/home/video" component={Video}></Route>
          <Route path="/home/profile" component={Profile}></Route>
        </Switch>
      </div>
      {/* 按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tabbar">
        {tabBar.map((item) => (
          <div
            className={classNames(
              'tabbar-item',
              item.path === location.pathname ? 'tabbar-item-active' : ''
            )}
            key={item.title}
            onClick={() => {
              history.push(item.path)
            }}
          >
            <Icon
              type={
                item.path === location.pathname ? item.icon + '_sel' : item.icon
              }
            ></Icon>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
