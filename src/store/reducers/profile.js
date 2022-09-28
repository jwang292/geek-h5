const initValue = {
  user: {},
  profile: {},
}

/**
 *
 */

export default function reducer(state = initValue, action) {
  if (action.type === 'profile/user') {
    return {
      ...state,
      user: action.payload,
    }
  }
  return state
}
