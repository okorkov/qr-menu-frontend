const defaultState = {
  logged_in: false,
  user: null,
}

export default (state = defaultState, action) => {

  switch(action.type) {
    case 'CHECK_LOGIN_STATUS':
      // if authenticate, then ->
      return {
        ...state,
        logged_in: true,
      };
    case 'LOGIN':
      return {
        ...state,
        logged_in: true,
        user: action.payload.data.user
      }

    default:
      return state;

  }
}