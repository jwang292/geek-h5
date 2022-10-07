import React from 'react'
import NavBar from '../../componets/NavBar'
import styles from './index.module.scss'
import Input from '../../componets/input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { login, sendCode } from '../../store/actions/login'
import { Toast } from 'antd-mobile'
import { useHistory, useLocation } from 'react-router-dom'
export default function Login() {
  const history = useHistory()
  const location = useLocation()
  const formik = useFormik({
    initialValues: {
      mobile: '',
      code: '',
    },
    //form 提交会触发
    async onSubmit(values) {
      await dispatch(login(values))
      Toast.show({
        icon: 'success',
        content: 'success login',
      })
      const pathname = location.state ? location.state.from : '/home'
      history.replace(pathname)
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required('phone cannot be empty')
        .matches(/^1\d{10}$/, 'phone formate is wrong'),
      code: Yup.string()
        .required('code cannot be empty')
        .matches(/^\d{6}$/, 'phone formate is wrong'),
    }),
  })

  const {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isValid,
  } = formik
  const dispatch = useDispatch()
  const onExtraClick = async () => {
    if (!/^1\d{10}$/.test(mobile)) {
      //点击校验，触发开启手机号检查
      formik.setTouched({
        mobile: true,
      })
      return
    }
    try {
      await dispatch(sendCode(mobile))
      Toast.show({
        icon: 'success',
        content: 'Got code',
      })
    } catch (error) {
      if (error.response) {
        Toast.show({
          icon: 'loading',
          content: error.response.data.message,
        })
      } else {
        Toast.show({
          icon: 'loading',
          content: 'server busy',
        })
      }
    }
  }
  return (
    <div className={styles.root}>
      <NavBar>Login</NavBar>
      <div className="content">
        <h3>Phone Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input
              placeholder="enter a phone number"
              value={mobile}
              //一定要加name否则formik不知道改谁
              name="mobile"
              onChange={handleChange}
              onBlur={handleBlur}
            ></Input>
            {touched.mobile && errors.mobile ? (
              <div className="validate">{errors.mobile}</div>
            ) : null}
          </div>
          <div className="input-item">
            <Input
              placeholder="enter the verification code"
              extra="get verfication code"
              value={code}
              name="code"
              onChange={handleChange}
              onBlur={handleBlur}
              onExtraClick={onExtraClick}
            ></Input>
            {touched.code && errors.code ? (
              <div className="validate">{errors.code}</div>
            ) : null}
          </div>
          <button
            className={classNames('login-btn', { disabled: !isValid })}
            type="submit"
            disabled={!isValid}
          >
            Login
          </button>
        </form>
      </div>
      <NavBar extra="middle">Home</NavBar>
      <NavBar extra="right">Article</NavBar>
    </div>
  )
}
