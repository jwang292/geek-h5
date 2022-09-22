import React from 'react'
import NavBar from '../../componets/NavBar'
import styles from './index.module.scss'
import Input from '../../componets/input'
export default function Login() {
  const onExtraClick = () => {
    console.log(12)
  }
  return (
    <div className={styles.root}>
      <NavBar>Login</NavBar>
      <div className="content">
        <h3>Phone Login</h3>
        <form>
          <div className="input-item">
            <Input placeholder="enter a phone number"></Input>
            <div className="validate">wrong verification code</div>
          </div>
          <div className="input-item">
            <Input
              placeholder="enter the verification code"
              extra="get verfication code"
              onExtraClick={onExtraClick}
            ></Input>
            <div className="validate">wrong verification code</div>
          </div>
          <button className="login-btn">Login</button>
        </form>
      </div>
      <NavBar extra="middle">Home</NavBar>
      <NavBar extra="right">Article</NavBar>
    </div>
  )
}
