import React from 'react'
import Icon from '../../componets/Icon'
import './index.scss'

export default function Login() {
  return (
    <div>
      <h1>login</h1>
      <Icon
        type="iconfanhui"
        className="big"
        onClick={() => alert('hi')}
      ></Icon>
    </div>
  )
}
