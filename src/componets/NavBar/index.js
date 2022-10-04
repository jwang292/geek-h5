import React from 'react'
import Icon from '../../componets/Icon'
import styles from './index.module.scss'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
// 拿到 history mathch location的前提是，这个组件是通过路由配置的； 此处navbar不是通过路由配置的，
// login home却是。

function NavBar({ children, extra, history, className }) {
  const back = () => {
    //返回上一页
    history.go(-1)
  }
  return (
    <div className={classNames(styles.root, className)}>
      {/* 后退按钮 */}
      <div className="left">
        <Icon type="iconfanhui" onClick={back} />
      </div>
      <div className="title">{children}</div>
      {/* 右侧内容 */}
      <div className="right">{extra}</div>
    </div>
  )
}
export default withRouter(NavBar)
