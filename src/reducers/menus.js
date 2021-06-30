

const defaultState = {
  logged_in: false,
}

export default (state = defaultState, action) => {

  switch(action.type) {

    case 'CHECK_LOGIN_STATUS':
        return {
          ...state,
          logged_in: action.payload.data.logged_in,
        };

    case 'LOGIN':
      localStorage.setItem('token', JSON.stringify(action.payload.data.token));
      return {
        ...state,
        logged_in: true,
        token: action.payload.data.token
      }

    case 'SIGNUP':
      if(action.payload.data.errors) {
        return state
      } else {
        localStorage.setItem('token', JSON.stringify(action.payload.data.token));
        return {
          ...state,
          logged_in: true,
          token: action.payload.data.token
        }
      }

    default:
      return state;

  }
}