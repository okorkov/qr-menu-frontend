
export const loginUser = (payload) => {
  return {
    type: "LOGIN",
    payload
  }
}

export const signupUser = (payload) => {
  return {
    type: "SIGNUP",
    payload
  }
}

export const logOut = (payload) => {
  return {
    type: "LOGOUT",
    payload
  }
}

export const checkLogin = (payload) => {
  return {
    type: "CHECK_LOGIN_STATUS",
    payload
  }
}

export const changeLanguage = (payload) => {
  return {
    type: "CHANGE_LANGUAGE",
    payload
  }
}