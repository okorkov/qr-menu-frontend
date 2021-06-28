const defaultState = {
  logged_in: false,
}

export default (state = defaultState, action) => {

  switch(action.type) {
    case 'CHECK_LOGIN_STATUS':
      // if authenticate, then ->
      return {
        ...state,
        logged_in: true,
      };

    default:
      return state;

  }
}