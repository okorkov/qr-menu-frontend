

const defaultState = {
  logged_in: false,
  isDataLoaded: false,
  lastFile: { has_file: false, pdf_file: null, qr_code: null, uploaded: null },
  allFiles: [],
  menuFile: null,
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
          allFiles: action.payload.data.all_files,
          menuQRLink: `${process.env.REACT_APP_BASE_URL}/menu/${action.payload.data.menu_qr_link}`,
          menuFile: action.payload.data.menu_file,
          menuQRLink: action.payload.data.menu_link,
        };

    case 'LOGIN':
      localStorage.setItem('token', JSON.stringify(action.payload.data.token));
      return {
        ...state,
        logged_in: action.payload.data.logged_in,
        isDataLoaded: true,
        lastFile: action.payload.data.last_file,
        allFiles: action.payload.data.all_files,
        menuQRLink: `${process.env.REACT_APP_BASE_URL}/menu/${action.payload.data.menu_qr_link}`,
        menuFile: action.payload.data.menu_file,
        menuQRLink: action.payload.data.menu_link,
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

    case 'SINGLE_FILE_UPLOAD':
      return {
        ...state,
        lastFile: action.payload.last_file,
      }

    default:
      return state;

  }
}