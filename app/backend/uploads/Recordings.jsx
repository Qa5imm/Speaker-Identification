import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
const Recordings = () => {
    const state = useSelector((state) => state.stateSlice)
    const [file, setFile] = useState(null)
    const handleFile = (e) => {
      console.log(e.target.files[0])
      setFile(e.target.files[0])
    }
    const handleSubmit = async (e) => {
      e.preventDefault()
      let formData = new FormData()
      formData.append('file_upload', file)
      console.log("formData ", formData)
      // const base_url = 'http://localhost:3003'
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const res = await axios.post(`http://localhost:8000/uploadfile`, formData, headers)
      console.log(res)
    }

  return (
    <div>
      <h1 className='font-bold m-12 text-2xl'>Upload file</h1>
      <form onSubmit={handleSubmit} >
        <input type="file" onChange={handleFile} />
        <button type="submit">Upload</button>
      </form>
      {file && <h1>{file.name}</h1>}
    </div>
  )
}

export default Recordings
