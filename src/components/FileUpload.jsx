import React from 'react';



const FileUpload = () => {

  const [file, setFile] = React.useState(null);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("token", JSON.parse(localStorage.getItem('token')));

    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/menus`, {
      method: 'POST',
      body: formData
    })
    .then(data => data.json())
    .then(response => console.log(response))
    .catch(err => alert(err.message))
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
        type="file" 
        className="btn" 
        style={{fontSize: '18px', color: 'white'}}
        name="menu" 
        accept=".doc, .pdf, image/png, image/jpeg, application/pdf" 
        required
        onChange={(e) => handleImageChange(e)}/>
        <br /> <br />
        <button type="submit" className="btn btn-warning">Upload</button>
      </form>
    </>
  );
}

export default FileUpload;
