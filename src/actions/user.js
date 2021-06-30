
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

