

const defaultState = {
  logged_in: false,
  isDataLoaded: false,
  lastFile: { hasFile: false, pdfFile: null, qrCode: null, uploaded: null },
  allFiles: [],
  allMenuFiles: [],
  menuQRLink: null
}

export default (state = defaultState, action) => {

  switch(action.type) {

    case 'CHECK_LOGIN_STATUS':
        return {
          ...state,
          logged_in: action.payload.data.logged_in,
          isDataLoaded: true,
          lastFile: action.payload.data.last_file,
          allFiles: action.payload.data.all_files
        };

    case 'LOGIN':
      localStorage.setItem('token', JSON.stringify(action.payload.data.token));
      return {
        ...state,
        logged_in: action.payload.data.logged_in,
        isDataLoaded: true,
        lastFile: action.payload.data.last_file,
        allFiles: action.payload.data.all_files
      }

    case 'SIGNUP':
      if(action.payload.data.errors) {
        return state
      } else {
        localStorage.setItem('token', JSON.stringify(action.payload.data.token));
        return {
          ...state,
          logged_in: true,
        }
      }

    case 'LOGOUT':
      return {
        ...state,
        logged_in: false
      }

    default:
      return state;

  }
}