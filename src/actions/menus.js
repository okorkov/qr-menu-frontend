
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