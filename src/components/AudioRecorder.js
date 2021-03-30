import React, { useState } from 'react'
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css' //tiene un problema, habria que hacerlo nuevo
import axios from 'axios'

function AudioRecorder() {

  const [audioDetails, setAudioDetails] = useState({  url: null, blob: null, chunks: null, duration: { h: 0, m: 0, s: 0}})
  const [title, setTitle] = useState('')

  const handleAudioStop = (data) => {
    setAudioDetails({ data })
  }
  const handleAudioUpload = async (file) => {
    //send to the backend with the text
    if (file && title !== ''){
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
          const base64Audio = reader.result.split(',')[1]
          const formData = new FormData()
          formData.append('audio', base64Audio)
          formData.append('audioSize', file.size)
          formData.append('title', title)
          
          await axios({
            method: 'post',
            url: 'http://localhost:3001/recordings',
            data: formData,
            headers: {
                'Content-Type': `multipart/form-data`,
            },
          })
          .catch(err => {
            console.error(err)
          })
          

      }

    }
  }
  const handleRest = () => {
    const reset = {  url: null, blob: null, chunks: null, duration: { h: 0, m: 0, s: 0}}
    setAudioDetails( reset )
  }

  return (
    <div className='d-flex flex-column'>
      <div class="p-2">
        <Recorder
            record={true}
            title={"New recording"}
            audioURL={audioDetails.url}
            showUIAudio
            handleAudioStop={data => handleAudioStop(data)}
            handleAudioUpload={data => handleAudioUpload(data)}
            handleRest={() => handleRest()} 
        />
      </div>
      <div className='p-2 justify-content-center'>
      <label>Add a title:</label>
      <input value={title} onInput={e => setTitle(e.target.value)}/>
      </div>
    </div>
  )
}

export default AudioRecorder;
