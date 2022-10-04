import instance from '../../utils/request'

export const saveUser = (payload) => {
  return {
    type: 'profile/user',
    payload,
  }
}

/**
 * get user info
 * @returns
 */
export const getUser = () => {
  return async (dispatch) => {
    const res = await instance.get('/user')
    dispatch(saveUser(res.data))
  }
}
export const saveProfile = (payload) => {
  return {
    type: 'profile/profile',
    payload,
  }
}
export const getProfile = () => {
  return async (dispatch) => {
    const res = await instance.get('/user/profile')
    dispatch(saveProfile(res.data))
  }
}
