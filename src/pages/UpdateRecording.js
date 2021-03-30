import React, { useState } from 'react'
import { Link, useParams } from "react-router-dom";
import axios from 'axios'

function UpdateRecording() {
  
  const [newTitle, setNewTitle] = useState('')
  const { id } = useParams();
  
  const handleUpdate = async () => { 

    if (newTitle !== ''){

      const formData = new FormData()
      formData.append('title', newTitle)
      
      await axios({
        method: 'patch',
        url: `http://localhost:3001/recordings/${id}`,
        data: formData,
        headers: {
            'Content-Type': `multipart/form-data`,
        }
      })
      .catch(err => {
        console.error(err)
      })
    }
  }

  return (
    <div className='container'>
      <label>Change title:</label>
      <input value={newTitle} onInput={e => setNewTitle(e.target.value)}/>
      <button onClick={() => handleUpdate()}> 
        <Link to="/"> update </Link>  
      </button>
    </div>
  );
}

export default UpdateRecording;
