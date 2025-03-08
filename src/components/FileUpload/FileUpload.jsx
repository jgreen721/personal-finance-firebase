import React, {useState} from 'react'
import {FaUpload, FaUser} from "react-icons/fa"
import "./FileUpload.css"

const FileUpload = ({setSelectedFile}) => {
    const [uploadedFile,setUploadedFile] = useState()


    const handleUpload=(e)=>{
        // e.preventDefault();
        // setSelectedFile(e.target.files[0])
        console.log("handleUpload fired!")
        console.log(e.target.files[0])
        let file = e.target.files[0];
        setSelectedFile({file: file,
          preview: URL.createObjectURL(file)
        })
        setUploadedFile({file: file,
            preview: URL.createObjectURL(file)
          })
      }
  return (
    <div className="form-div">
    <label htmlFor="avatar">Avatar:</label>
    <button className="form-upload-btn">
      {uploadedFile ? <img className="avatar-preview-img" src={uploadedFile.preview} alt="avatar"/> : <FaUser/>}
      <FaUpload/>
    <input type="file" onChange ={handleUpload} className="form-upload" id="avatar" name="avatar" />
    </button>
  </div>
  )
}

export default FileUpload