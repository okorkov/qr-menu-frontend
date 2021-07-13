

const defaultState = {
  logged_in: false,
  isDataLoaded: false,
  lastFile: { has_file: false, pdf_file: null, qr_code: null, uploaded: null },
  allFiles: [],
  menuFile: null,
  menuQRLink: null,
  domainLink: null
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
          domainLink: `menu/${action.payload.data.menu_qr_link}`,
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
        domainLink: `menu/${action.payload.data.menu_qr_link}`,
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
          logged_in: action.payload.data.logged_in,
          isDataLoaded: true,
          domainLink: `menu/${action.payload.data.menu_qr_link}`,
        }
      }

    case 'LOGOUT':
      return {
        logged_in: false,
        isDataLoaded: false,
        lastFile: { has_file: false, pdf_file: null, qr_code: null, uploaded: null },
        allFiles: [],
        menuFile: null,
        menuQRLink: null,
        domainLink: null
      }

    case 'SINGLE_FILE_UPLOAD':
      return {
        ...state,
        lastFile: action.payload.last_file,
        allFiles: [...state.allFiles, {
          link: action.payload.last_file.pdf_file,
          qr_code_link: action.payload.last_file.qr_code, 
          updated_at: action.payload.last_file.uploaded}]
      }

    case 'GENERATE_QR':
      return {
        ...state,
        menuQRLink: action.payload.qr_code_link,
        domainLink: action.payload.domain
      }

    case 'UPLOAD_MENU':
      return {
        ...state,
        menuFile: action.payload.file_link
      }

    default:
      return state;

  }
}