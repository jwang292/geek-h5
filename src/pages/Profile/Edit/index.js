import React from 'react'
import styles from './index.module.scss'
import NavBar from '../../../componets/NavBar'
import { List, DatePicker, Form } from 'antd-mobile'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProfile } from '../../../store/actions/profile'
const { Item } = List
export default function ProfileEdit() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])
  const profile = useSelector((state) => state.profile.profile)
  const [visible, setVisible] = useState(false)

  return (
    <div className={styles.root}>
      <div className="content">
        <NavBar>个人信息</NavBar>
        <div className="wrapper">
          <List className="profile-list">
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img src={profile.photo} alt="" />
                </span>
              }
              onClick={() => {}}
            >
              logo
            </Item>
            <Item extra={profile.nam} onClick={() => {}}>
              nick
            </Item>
            <Item
              extra={<span className="intro">{profile.intro || 'none'}</span>}
              onClick={() => {}}
            >
              info
            </Item>
          </List>
          <List className="profile-list">
            <Item
              extra={profile.gendere === 0 ? 'femal' : 'male'}
              onClick={() => {}}
            >
              gender
            </Item>
            <Item
              onClick={() => {}}
              extra={
                profile.birthday ? (
                  profile.birthday
                ) : (
                  <Form.Item
                    name="birthday"
                    onClick={() => {
                      setVisible(true)
                    }}
                  >
                    <DatePicker
                      min={new Date('1900-01-01')}
                      max={new Date()}
                      title="birthday"
                      visible={visible}
                      onClose={() => {
                        setVisible(false)
                      }}
                    >
                      {(value) =>
                        value
                          ? dayjs(value).format('YYYY-MM-DD')
                          : 'Please select'
                      }
                    </DatePicker>
                  </Form.Item>
                )
              }
            >
              brith:
            </Item>
          </List>
        </div>
        {/* <div className="logout">
          <button className="btn">Log Out</button>
        </div> */}
      </div>
    </div>
  )
}
