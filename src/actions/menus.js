
export const singleFileUpload = (payload) => {
  return {
    type: "SINGLE_FILE_UPLOAD",
    payload
  }
}


export const generateQR = (payload) => {
  return {
    type: "GENERATE_QR",
    payload
  }
}

export const uploadMenu = (payload) => {
  return {
    type: "UPLOAD_MENU",
    payload
  }
}

export const generateQRLink = (payload) => {
  return {
    type: "GENERATE_QR_LINK",
    payload
  }
}