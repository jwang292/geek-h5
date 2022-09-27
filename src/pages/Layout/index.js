import React from 'react'
import styles from './index.module.scss'
import Icon from '../../componets/Icon'

export default function Home() {
  return (
    <div className={styles.root}>
      {/* 点击按钮切换显示内容 */}
      <div className="tab-content"></div>
      {/* 按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tabbar">
        <div className="tabbar-item tabbar-item-active">
          <Icon type="iconbtn_home_sel"></Icon>
          <span>home</span>
        </div>
        <div className="tabbar-item">
          <Icon type="iconbtn_qa"></Icon>
          <span>qustion</span>
        </div>
        <div className="tabbar-item">
          <Icon type="iconbtn_video"></Icon>
          <span>video</span>
        </div>
        <div className="tabbar-item">
          <Icon type="iconbtn_mine"></Icon>
          <span>mine</span>
        </div>
      </div>
    </div>
  )
}
