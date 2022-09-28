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
